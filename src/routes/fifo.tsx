import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, AlertTriangle, XCircle, ScanLine, ShieldCheck, Clock } from "lucide-react";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFifoMaterials, checkFifoPosition, dispatchFifoMaterial } from "@/lib/api/db.functions";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@/lib/auth";

export const Route = createFileRoute("/fifo")({
  head: () => ({ meta: [{ title: "FIFO Check — NPMS" }] }),
  component: FifoPage,
});

function FifoPage() {
  const user = useUser();
  const isSupervisor = user?.role === "supervisor" || user?.role === "manager";

  const { data, isLoading } = useQuery({
    queryKey: ["fifoMaterials"],
    queryFn: () => getFifoMaterials(),
  });

  const [lotNumber, setLotNumber] = useState("");
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [filterPartNumber, setFilterPartNumber] = useState<string>("All");

  const [isApprovalsOpen, setIsApprovalsOpen] = useState(false);
  const [approvals, setApprovals] = useState<any[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("npms_approvals");
      if (saved) return JSON.parse(saved);
      const initial = [
        { id: "APP-4011", lotNumber: "SC1 126-8", partNumber: "K18H", quantity: 900, operator: "Afifi Rouf", reason: "FIFO Violation (SC1 126-7 is older)" },
        { id: "APP-4012", lotNumber: "SC1 126-14", partNumber: "1PA", quantity: 200, operator: "Bayu Saputra", reason: "FIFO Violation (SC1 126-10 is older)" }
      ];
      localStorage.setItem("npms_approvals", JSON.stringify(initial));
      return initial;
    } catch {
      return [];
    }
  });

  const handleApprove = async (a: any) => {
    try {
      const res = await dispatchFifoMaterial({
        data: {
          partNumber: a.partNumber,
          productName: `SS COMP ${a.partNumber} Assy`,
          quantity: a.quantity,
          destinationLine: "SS-2",
          operator: a.operator,
          lotNumber: a.lotNumber,
          date: new Date().toISOString().slice(0, 16),
        }
      });
      
      if (res.success) {
        toast.success(`Lot ${a.lotNumber} bypass approved and dispatched successfully.`);
        const updated = approvals.filter((item) => item.id !== a.id);
        setApprovals(updated);
        localStorage.setItem("npms_approvals", JSON.stringify(updated));
      }
    } catch (err) {
      toast.error("Failed to process approval dispatch.");
      console.error(err);
    }
  };

  const handleReject = (id: string, lotNumber: string) => {
    const updated = approvals.filter((a) => a.id !== id);
    setApprovals(updated);
    localStorage.setItem("npms_approvals", JSON.stringify(updated));
    toast.error(`Permintaan Lot ${lotNumber} ditolak.`);
  };

  const materials = data?.materials ?? [];
  const counts = data?.counts ?? { compliant: 0, warning: 0, violation: 0 };
  
  const uniquePartNumbers = ["All", ...Array.from(new Set(materials.map((m: any) => m.partNumber)))];
  const filteredMaterials = filterPartNumber === "All" 
    ? materials 
    : materials.filter((m: any) => m.partNumber === filterPartNumber);

  const handleCheckFifo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lotNumber.trim()) {
      toast.error("Harap masukkan nomor lot");
      return;
    }
    setScanLoading(true);
    try {
      const result = await checkFifoPosition({ data: { lotNumber: lotNumber.trim() } });
      setScanResult(result);
      if (result.found) {
        if (result.isNext) {
          toast.success(`${lotNumber} is next in queue!`);
        } else {
          toast.warning(`${lotNumber} is NOT next in queue.`);
        }
      } else {
        toast.error(`Nomor lot ${lotNumber} tidak ditemukan di database.`);
      }
    } catch (err) {
      toast.error("Gagal memeriksa nomor lot");
    } finally {
      setScanLoading(false);
    }
  };

  // Get active queue timeline: either scanned result or oldest 5 lots from table
  const timeline = scanResult?.found
    ? scanResult.timeline
    : materials
        .slice(0, 5)
        .map((m: any) => ({
          lot: m.lotNumber.slice(0, 5) + "..." + m.lotNumber.slice(-3),
          date: new Date(m.incomingDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          status: m.status === "Compliant" ? "use-next" : m.status === "Violation" ? "violation" : "queue",
        }))
        .reverse(); // oldest first
  return (
    <AppLayout title="FIFO Check" subtitle="Terapkan aliran material First-In-First-Out di seluruh lantai produksi.">
      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatusCard label="FIFO Sesuai" value={counts.compliant} icon={CheckCircle2} color="success" />
        <StatusCard label="Peringatan" value={counts.warning} icon={AlertTriangle} color="warning" />
        <StatusCard label="Pelanggaran FIFO" value={counts.violation} icon={XCircle} color="destructive" />
      </div>

      {/* Scan + timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Scan Nomor Lot</CardTitle>
            <p className="text-xs text-muted-foreground">Periksa posisi FIFO secara instan.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <form onSubmit={handleCheckFifo} className="space-y-3">
              <div className="relative">
                <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                  placeholder="LOT-2025XXXXX"
                  className="pl-9 h-12 font-mono"
                />
              </div>
              <Button type="submit" disabled={scanLoading} className="w-full h-11 bg-gradient-primary gap-2">
                {scanLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <ShieldCheck className="h-4 w-4" />
                )}
                Periksa posisi FIFO
              </Button>
            </form>

            {scanResult && (
              <div className={`rounded-lg p-3 text-xs flex items-start gap-2 border ${
                !scanResult.found
                  ? "bg-destructive/10 text-destructive border-destructive/20"
                  : scanResult.isNext
                  ? "bg-success/10 text-success border-success/20"
                  : "bg-warning/10 text-warning border-warning/20"
              }`}>
                {!scanResult.found ? (
                  <>
                    <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Nomor lot tidak ditemukan</div>
                      <div className="opacity-80">Pastikan lot ada di stok.</div>
                    </div>
                  </>
                ) : scanResult.isNext ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{scanResult.lotNumber} adalah berikutnya dalam antrian</div>
                      <div className="opacity-80">Posisi 1 · gunakan material ini terlebih dahulu.</div>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Peringatan FIFO: Bukan berikutnya dalam antrian</div>
                      <div className="opacity-80">Posisi {scanResult.position} · Lot yang lebih lama ada untuk part {scanResult.partNumber}.</div>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Timeline Aliran Material</CardTitle>
            <p className="text-xs text-muted-foreground">
              {scanResult?.found 
                ? `Urutan FIFO untuk ${scanResult.partNumber}`
                : "Urutan aliran lot produksi aktif"}
            </p>
          </CardHeader>
          <CardContent>
            <div className="relative py-4">
              <div className="absolute left-[10%] right-[10%] top-10 h-0.5 bg-border" />
              {timeline.length === 0 ? (
                <div className="text-center py-6 text-xs text-muted-foreground">Tidak ada lot aktif di timeline.</div>
              ) : (
                <div className={`grid gap-4 relative grid-cols-2 md:grid-cols-5`}>
                  {timeline.map((s: any, i: number) => {
                    const isNext = s.status === "use-next" || i === 0;
                    const isV = s.status === "violation";
                    return (
                      <div key={i} className="text-center">
                        <div className={`mx-auto h-12 w-12 rounded-full grid place-items-center text-white shadow-soft ring-4 ring-background ${
                          isNext ? "bg-gradient-primary" : isV ? "bg-destructive" : "bg-muted-foreground/40"
                        }`}>
                          {isNext ? <ShieldCheck className="h-5 w-5" /> : isV ? <XCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                        </div>
                        <div className="mt-2 text-xs font-mono">{s.lot}</div>
                        <div className="text-[11px] text-muted-foreground">{s.date}</div>
                        <Badge variant="outline" className={`mt-1 text-[10px] ${
                          isNext ? "bg-primary/10 text-primary border-primary/20" : isV ? "bg-destructive/10 text-destructive border-destructive/20" : ""
                        }`}>
                          {isNext ? "Gunakan berikutnya" : isV ? "Pelanggaran" : "Antrian"}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-soft">
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Material FIFO</CardTitle>
            <p className="text-xs text-muted-foreground">Semua lot yang dilacak dan status FIFO mereka saat ini</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={filterPartNumber} onValueChange={setFilterPartNumber}>
              <SelectTrigger className="w-[180px] h-9 text-xs">
                <SelectValue placeholder="Filter Nomor Part" />
              </SelectTrigger>
              <SelectContent>
                {uniquePartNumbers.map((part: any) => (
                  <SelectItem key={part} value={part} className="text-xs">
                    {part === "All" ? "Semua Part" : part}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isSupervisor && (
              <Button variant="outline" size="sm" onClick={() => setIsApprovalsOpen(true)}>
                Antrian persetujuan supervisor {approvals.length > 0 && <Badge variant="secondary" className="ml-1.5 bg-primary/10 text-primary">{approvals.length}</Badge>}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>ID Material</TableHead>
                  <TableHead>Nomor Part</TableHead>
                  <TableHead>Nomor Lot</TableHead>
                  <TableHead>Tanggal Masuk</TableHead>
                  <TableHead>Posisi</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead>Status FIFO</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground text-sm">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" />
                      Memuat material FIFO...
                    </TableCell>
                  </TableRow>
                ) : filteredMaterials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground text-sm">
                      Tidak ada material di stok.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMaterials.map((m: any) => (
                    <TableRow key={m.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs font-medium">{m.id}</TableCell>
                      <TableCell className="font-mono text-xs">{m.partNumber}</TableCell>
                      <TableCell className="font-mono text-xs">{m.lotNumber}</TableCell>
                      <TableCell className="text-sm">{m.incomingDate}</TableCell>
                      <TableCell><Badge variant="outline">{m.position}</Badge></TableCell>
                      <TableCell className="text-right tabular-nums font-medium">{m.quantity}</TableCell>
                      <TableCell>
                        {m.status === "Compliant" && (
                          <Badge variant="outline" className="bg-success/15 text-success border-success/20 gap-1"><CheckCircle2 className="h-3 w-3" />Compliant</Badge>
                        )}
                        {m.status === "Warning" && (
                          <Badge variant="outline" className="bg-warning/15 text-warning border-warning/20 gap-1"><AlertTriangle className="h-3 w-3" />Warning</Badge>
                        )}
                        {m.status === "Violation" && (
                          <Badge variant="outline" className="bg-destructive/15 text-destructive border-destructive/20 gap-1"><XCircle className="h-3 w-3" />Violation</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {isSupervisor && (
        <Dialog open={isApprovalsOpen} onOpenChange={setIsApprovalsOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Antrian Persetujuan Supervisor</span>
              </DialogTitle>
              <DialogDescription>
                Tinjau permintaan persetujuan bypass FIFO yang tertunda dari operator.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2 max-h-[350px] overflow-y-auto pr-1">
              {approvals.map((a) => (
                <div key={a.id} className="p-3.5 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-primary">{a.id}</span>
                        <Badge variant="outline" className="text-[10px] bg-warning/10 text-warning border-warning/20">Pending</Badge>
                      </div>
                      <div className="mt-1 text-sm font-semibold font-mono">{a.lotNumber} ({a.partNumber})</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Diajukan oleh Operator: <span className="font-medium text-foreground">{a.operator}</span></div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">Qty Diminta</span>
                      <div className="text-base font-semibold text-foreground tabular-nums">{a.quantity} pcs</div>
                    </div>
                  </div>

                  <div className="text-xs rounded-lg bg-destructive/5 border border-destructive/15 text-destructive p-2 flex items-start gap-1.5 font-sans">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>{a.reason}</span>
                  </div>

                  <div className="flex gap-2 justify-end pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 hover:border-destructive/30"
                      onClick={() => handleReject(a.id, a.lotNumber)}
                    >
                      Tolak Bypass
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="h-8 text-xs bg-gradient-primary text-white"
                      onClick={() => handleApprove(a)}
                    >
                      Setujui Bypass
                    </Button>
                  </div>
                </div>
              ))}
              {approvals.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-8 italic flex flex-col items-center gap-2">
                  <CheckCircle2 className="h-8 w-8 text-success animate-bounce" />
                  <span>Semua antrian persetujuan bersih! Tidak ada permintaan bypass yang tertunda.</span>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AppLayout>
  );
}

function StatusCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: "success" | "warning" | "destructive" }) {
  const map = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
  } as const;
  return (
    <Card className="border-0 shadow-soft">
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-semibold tabular-nums">{value}</div>
        </div>
        <div className={`h-12 w-12 rounded-xl grid place-items-center border ${map[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}
