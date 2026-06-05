import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { CheckCircle2, AlertTriangle, XCircle, ScanLine, ShieldCheck, Clock } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFifoMaterials, checkFifoPosition } from "@/lib/api/db.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/fifo")({
  head: () => ({ meta: [{ title: "FIFO Check — NPMS" }] }),
  component: FifoPage,
});

function FifoPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["fifoMaterials"],
    queryFn: () => getFifoMaterials(),
  });

  const [lotNumber, setLotNumber] = useState("");
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanLoading, setScanLoading] = useState(false);

  const materials = data?.materials ?? [];
  const counts = data?.counts ?? { compliant: 0, warning: 0, violation: 0 };

  const handleCheckFifo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lotNumber.trim()) {
      toast.error("Please enter a lot number");
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
        toast.error(`Lot number ${lotNumber} not found in database.`);
      }
    } catch (err) {
      toast.error("Failed to check lot number");
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
    <AppLayout title="FIFO Check" subtitle="Enforce First-In-First-Out material flow across the floor.">
      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatusCard label="FIFO Compliant" value={counts.compliant} icon={CheckCircle2} color="success" />
        <StatusCard label="Warnings" value={counts.warning} icon={AlertTriangle} color="warning" />
        <StatusCard label="FIFO Violations" value={counts.violation} icon={XCircle} color="destructive" />
      </div>

      {/* Scan + timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Scan Lot Number</CardTitle>
            <p className="text-xs text-muted-foreground">Check FIFO position instantly.</p>
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
                Check FIFO position
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
                      <div className="font-medium">Lot number not found</div>
                      <div className="opacity-80">Make sure the lot exists in stock.</div>
                    </div>
                  </>
                ) : scanResult.isNext ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{scanResult.lotNumber} is next in queue</div>
                      <div className="opacity-80">Position 1 · use this material first.</div>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">FIFO Alert: Not next in queue</div>
                      <div className="opacity-80">Position {scanResult.position} · Older lots exist for part {scanResult.partNumber}.</div>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Material Flow Timeline</CardTitle>
            <p className="text-xs text-muted-foreground">
              {scanResult?.found 
                ? `FIFO order for ${scanResult.partNumber}`
                : "Active production lot flow order"}
            </p>
          </CardHeader>
          <CardContent>
            <div className="relative py-4">
              <div className="absolute left-[10%] right-[10%] top-10 h-0.5 bg-border" />
              {timeline.length === 0 ? (
                <div className="text-center py-6 text-xs text-muted-foreground">No active lots in timeline.</div>
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
                          {isNext ? "Use next" : isV ? "Violation" : "Queue"}
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
            <CardTitle className="text-base">FIFO Materials</CardTitle>
            <p className="text-xs text-muted-foreground">All tracked lots and their current FIFO status</p>
          </div>
          <Button variant="outline" size="sm">Supervisor approval queue</Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Material ID</TableHead>
                  <TableHead>Part Number</TableHead>
                  <TableHead>Lot Number</TableHead>
                  <TableHead>Incoming Date</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead>FIFO Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground text-sm">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" />
                      Loading FIFO materials...
                    </TableCell>
                  </TableRow>
                ) : materials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground text-sm">
                      No materials in stock.
                    </TableCell>
                  </TableRow>
                ) : (
                  materials.map((m: any) => (
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
