import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Send, CheckCircle2, AlertTriangle, Boxes } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useUser } from "@/lib/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFifoMaterials, dispatchFifoMaterial, getActiveLines, getParts } from "@/lib/api/db.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/part-out")({
  head: () => ({ meta: [{ title: "Part Out — NPMS" }] }),
  component: PartOut,
});

const defaultStock = [
  { part: "K18H", name: "SS COMP K18H", available: 1612, reserved: 0, threshold: 400 },
  { part: "K84A", name: "SS COMP K84A", available: 512, reserved: 0, threshold: 200 },
  { part: "KRHW", name: "SS COMP KRHW", available: 0, reserved: 0, threshold: 100 },
  { part: "XD 831", name: "SS COMP XD 831", available: 41, reserved: 0, threshold: 30 },
  { part: "1PA", name: "SS COMP 1PA", available: 19, reserved: 0, threshold: 20 },
  { part: "1WD", name: "SS COMP 1WD", available: 0, reserved: 0, threshold: 10 },
];

function PartOut() {
  const user = useUser();
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState(false);
  const [showBypassDialog, setShowBypassDialog] = useState(false);
  const [bypassReason, setBypassReason] = useState("");

  // Load stock materials from MySQL
  const { data: fifoData } = useQuery({
    queryKey: ["fifoMaterials"],
    queryFn: () => getFifoMaterials(),
  });

  const materials = fifoData?.materials ?? [];

  // Load active production lines from master database
  const { data: dbLines } = useQuery({
    queryKey: ["activeLines"],
    queryFn: () => getActiveLines(),
  });

  // Load master parts list from database
  const { data: dbParts } = useQuery({
    queryKey: ["parts"],
    queryFn: () => getParts(),
  });

  const lines = dbLines && dbLines.length > 0
    ? dbLines.filter((l: any) => l.type === "out" || l.type === "both").map((l: any) => l.name)
    : ["SS-1", "SS-2"];

  const [form, setForm] = useState({
    part: "K18H",
    product: "SS COMP K18H Assy",
    qty: "400",
    line: "SS-2",
    operator: "",
    lot: "",
    date: new Date().toISOString().slice(0, 16),
    shift: "Shift 1",
  });

  // Set default lot and operator once data is loaded
  useEffect(() => {
    if (user?.name) {
      setForm((f) => ({ ...f, operator: user.name }));
    }
  }, [user]);

  useEffect(() => {
    if (materials.length > 0 && !form.lot) {
      const firstMat = materials[0];
      setForm((f) => ({
        ...f,
        lot: firstMat.lotNumber,
        part: firstMat.partNumber,
        product: `SS COMP ${firstMat.partNumber} Assy`,
      }));
    }
  }, [materials]);

  const handlePartChange = (selectedPart: string) => {
    const foundPart = partsList.find((p: any) => p.partNumber === selectedPart);
    setForm({
      ...form,
      part: selectedPart,
      product: foundPart ? foundPart.productName : `SS COMP ${selectedPart} Assy`,
      lot: "",
    });
  };

  const handleLotChange = (selectedLot: string) => {
    const found = materials.find((m: any) => m.lotNumber === selectedLot);
    if (found) {
      setForm({
        ...form,
        lot: selectedLot,
        part: found.partNumber,
        product: `SS COMP ${found.partNumber} Assy`,
        qty: String(found.quantity), // Default to max available quantity
      });
    }
  };

  const availableLots = materials.filter((m: any) => m.partNumber === form.part);



  const proceedSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await dispatchFifoMaterial({
        data: {
          partNumber: form.part,
          productName: form.product,
          quantity: Number(form.qty),
          destinationLine: form.line,
          operator: form.operator || user?.name || "Demo Operator",
          lotNumber: form.lot,
          date: form.date,
        },
      });

      if (res.success) {
        toast.success("Transaksi Part Out berhasil dicatat.");
        // Invalidate queries to refresh stock tables
        queryClient.invalidateQueries({ queryKey: ["fifoMaterials"] });
      }
    } catch (err) {
      toast.error("Gagal menyelesaikan checkout.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBypassRequest = () => {
    if (!bypassReason.trim()) {
      toast.error("Harap berikan alasan untuk bypass.");
      return;
    }

    const saved = localStorage.getItem("npms_approvals");
    const currentApprovals = saved ? JSON.parse(saved) : [];
    
    const newBypass = {
      id: `APP-${Math.floor(4000 + Math.random() * 999)}`,
      lotNumber: form.lot,
      partNumber: form.part,
      quantity: Number(form.qty),
      operator: form.operator || user?.name || "Demo Operator",
      reason: `FIFO Violation Bypass: ${bypassReason.trim()}`,
    };

    const updated = [newBypass, ...currentApprovals];
    localStorage.setItem("npms_approvals", JSON.stringify(updated));
    
    setShowBypassDialog(false);
    setBypassReason("");
    toast.success(`Permintaan bypass dikirim untuk Lot ${form.lot}. Menunggu persetujuan supervisor.`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.lot) {
      toast.error("Tidak ada lot FIFO yang dipilih.");
      return;
    }
    if (!form.qty || Number(form.qty) <= 0) {
      toast.error("Jumlah harus lebih dari 0");
      return;
    }

    if (!isFIFOCompliant) {
      setShowBypassDialog(true);
      return;
    }

    await proceedSubmit();
  };

  // Compute live stock summary based on database values
  const partsList = dbParts && dbParts.length > 0
    ? dbParts
    : [
        { partNumber: "K18H", productName: "SS COMP K18H Assy", threshold: 400 },
        { partNumber: "K84A", productName: "SS COMP K84A Assy", threshold: 200 },
        { partNumber: "KRHW", productName: "SS COMP KRHW Assy", threshold: 100 },
        { partNumber: "XD 831", productName: "SS COMP XD 831 Assy", threshold: 30 },
        { partNumber: "1PA", productName: "SS COMP 1PA Assy", threshold: 20 },
        { partNumber: "1WD", productName: "SS COMP 1WD Assy", threshold: 10 },
      ];

  const stockSummary = partsList.map((s: any) => {
    const dbQty = materials
      .filter((m: any) => m.partNumber === s.partNumber)
      .reduce((sum: number, m: any) => sum + Number(m.quantity), 0);
    
    return {
      part: s.partNumber,
      name: s.productName,
      available: materials.length > 0 ? dbQty : 0,
      reserved: 0,
      threshold: s.threshold,
    };
  });

  // Check if current selection is compliant (i.e. is this the oldest lot in stock for this part?)
  const selectedMat = materials.find((m: any) => m.lotNumber === form.lot);
  const isFIFOCompliant = selectedMat
    ? !materials.some(
        (m: any) =>
          m.partNumber === selectedMat.partNumber &&
          new Date(m.incomingDate) < new Date(selectedMat.incomingDate)
      )
    : true;
  return (
    <AppLayout title="Part Out" subtitle="Catat part keluar dari lini Sub-Assy ke Assy.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Transaksi Keluar</CardTitle>
            <p className="text-xs text-muted-foreground">Pilih lot material untuk dicatat pengeluarannya. Stok divalidasi secara real-time.</p>
          </CardHeader>
          <CardContent className="space-y-5">

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="part">Nomor Part</Label>
                  <Select value={form.part} onValueChange={handlePartChange} disabled={submitting}>
                    <SelectTrigger id="part" className="h-11 font-mono">
                      <SelectValue placeholder="Pilih Nomor Part" />
                    </SelectTrigger>
                    <SelectContent>
                      {partsList.map((p: any) => (
                        <SelectItem key={p.partNumber} value={p.partNumber} className="font-mono">
                          {p.partNumber} - {p.productName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lot">Lot FIFO</Label>
                  <Select value={form.lot} onValueChange={handleLotChange} disabled={submitting || !form.part}>
                    <SelectTrigger id="lot" className="h-11 font-mono">
                      <SelectValue placeholder={form.part ? "Pilih Nomor Lot" : "Pilih Part dulu"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLots.map((m: any) => (
                        <SelectItem key={m.lotNumber} value={m.lotNumber} className="font-mono">
                          {m.lotNumber} (Tersedia: {m.quantity})
                        </SelectItem>
                      ))}
                      {availableLots.length === 0 && (
                        <SelectItem value="none" disabled>Tidak ada lot aktif</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Nama Produk</Label>
                  <Input value={form.product} readOnly className="h-11 bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qty">Jumlah</Label>
                  <Input
                    id="qty"
                    type="number"
                    value={form.qty}
                    onChange={(e) => setForm({ ...form, qty: e.target.value })}
                    className="h-11 text-lg font-semibold tabular-nums"
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dest">Lini Tujuan</Label>
                  <Select value={form.line} onValueChange={(v) => setForm({ ...form, line: v })} disabled={submitting}>
                    <SelectTrigger id="dest" className="h-11"><SelectValue /></SelectTrigger>
                    <SelectContent>{lines.map((l: any) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operator">Operator</Label>
                  <Input
                    id="operator"
                    value={form.operator}
                    onChange={(e) => setForm({ ...form, operator: e.target.value })}
                    className="h-11"
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Tanggal / Waktu</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="h-11"
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift">Shift</Label>
                  <Select value={form.shift} onValueChange={(v) => setForm({ ...form, shift: v })} disabled={submitting}>
                    <SelectTrigger id="shift" className="h-11"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Shift 1">Shift 1 · 07:00 – 15:00</SelectItem>
                      <SelectItem value="Shift 2">Shift 2 · 15:00 – 23:00</SelectItem>
                      <SelectItem value="Shift 3">Shift 3 · 23:00 – 07:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedMat && (
                <div className="rounded-lg p-4 text-sm flex flex-col gap-3 border bg-primary/5 border-primary/20">
                  <div className="font-semibold flex items-center gap-2 text-primary">
                    <Boxes className="h-4 w-4" /> Informasi Asal (Part In)
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Lini Asal</div>
                      <div className="font-medium mt-0.5">{selectedMat.originLine || "Tidak diketahui"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Qty Awal</div>
                      <div className="font-medium mt-0.5 tabular-nums">{selectedMat.originalQuantity || selectedMat.quantity}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Tanggal Masuk</div>
                      <div className="font-medium mt-0.5">{selectedMat.incomingDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Operator In</div>
                      <div className="font-medium mt-0.5">{selectedMat.operator || "Sistem"}</div>
                    </div>
                  </div>
                </div>
              )}

              {form.lot && (
                <div className={`rounded-lg p-3 text-xs flex items-center gap-2 border ${
                  isFIFOCompliant 
                    ? "bg-success/10 text-success border-success/20" 
                    : "bg-destructive/10 text-destructive border-destructive/20"
                }`}>
                  {isFIFOCompliant ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Stok tersedia · Urutan FIFO terpenuhi. Siap untuk dikirim.
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4" /> PERINGATAN: Lot yang lebih lama ada di inventori! Mengirim lot ini akan melanggar aturan FIFO.
                    </>
                  )}
                </div>
              )}

              <Button type="submit" disabled={submitting} className="w-full h-12 bg-gradient-primary shadow-glow gap-2 text-base">
                {submitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mx-auto" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />Kirim Part Out
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stock panel */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Boxes className="h-4 w-4 text-primary" />Ringkasan stok</CardTitle>
            <p className="text-xs text-muted-foreground">Inventori real-time</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {stockSummary.map((s: any) => {
              const low = s.available < s.threshold;
              const pct = Math.min(100, (s.available / (s.threshold * 2)) * 100);
              return (
                <div key={s.part} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">{s.part}</div>
                      <div className="text-sm font-medium">{s.name}</div>
                    </div>
                    {low && <Badge variant="outline" className="bg-warning/15 text-warning border-warning/20 gap-1"><AlertTriangle className="h-3 w-3" />Low</Badge>}
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${low ? "bg-warning" : "bg-gradient-primary"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                    <span>Tersedia <span className="font-medium text-foreground tabular-nums">{s.available}</span></span>
                    <span>Dipesan <span className="tabular-nums">{s.reserved}</span></span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>



      <Dialog open={showBypassDialog} onOpenChange={setShowBypassDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <span>Pelanggaran FIFO Terdeteksi</span>
            </DialogTitle>
            <DialogDescription>
              Lot {form.lot} bukan lot tertua di stok. Untuk melanjutkan, Anda harus mengajukan permintaan persetujuan ke supervisor Anda.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="reason">Alasan bypass (Wajib diisi)</Label>
              <Input
                id="reason"
                placeholder="mis. Lot lama rusak, tidak dapat diakses, atau dikunci QC"
                value={bypassReason}
                onChange={(e) => setBypassReason(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" type="button" onClick={() => setShowBypassDialog(false)}>Batal</Button>
              <Button type="button" className="bg-gradient-primary text-white" onClick={handleBypassRequest}>
                Kirim Permintaan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
