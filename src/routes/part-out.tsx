import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { QrCode, Send, CheckCircle2, AlertTriangle, Boxes, Camera } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useUser } from "@/lib/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFifoMaterials, dispatchFifoMaterial, getActiveLines } from "@/lib/api/db.functions";
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
  const [isScanning, setIsScanning] = useState(false);
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

  const lines = dbLines && dbLines.length > 0
    ? dbLines.map((l: any) => l.name)
    : ["SC-1", "SC-2", "SC-3", "SS-1", "SS-2"];

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

  const handleLotChange = (selectedLot: string) => {
    const found = materials.find((m: any) => m.lotNumber === selectedLot);
    if (found) {
      setForm({
        ...form,
        lot: selectedLot,
        part: found.partNumber,
        product: `SS COMP ${found.partNumber} Assy`,
        qty: String(Math.min(Number(form.qty), found.quantity)),
      });
    }
  };

  const handleSimulateScan = (lotNumber: string) => {
    handleLotChange(lotNumber);
    setIsScanning(false);
    toast.success(`QR Code for Lot ${lotNumber} scanned successfully.`);
  };

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
        toast.success("Part Out transaction logged successfully.");
        // Invalidate queries to refresh stock tables
        queryClient.invalidateQueries({ queryKey: ["fifoMaterials"] });
      }
    } catch (err) {
      toast.error("Failed to complete checkout.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBypassRequest = () => {
    if (!bypassReason.trim()) {
      toast.error("Please provide a reason for the bypass.");
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
    toast.success(`Bypass request submitted for Lot ${form.lot}. Pending supervisor approval.`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.lot) {
      toast.error("No FIFO lot selected.");
      return;
    }
    if (!form.qty || Number(form.qty) <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    if (!isFIFOCompliant) {
      setShowBypassDialog(true);
      return;
    }

    await proceedSubmit();
  };

  // Compute live stock summary based on database values
  const stockSummary = defaultStock.map((s) => {
    // Sum database quantities for this part number
    const dbQty = materials
      .filter((m: any) => m.partNumber === s.part)
      .reduce((sum: number, m: any) => sum + Number(m.quantity), 0);
    
    return {
      ...s,
      available: materials.length > 0 ? dbQty : s.available,
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
    <AppLayout title="Part Out" subtitle="Record outgoing parts from Sub-Assy to Assy lines.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Outgoing Transaction</CardTitle>
            <p className="text-xs text-muted-foreground">Scan QR or enter manually. Stock is validated in real time.</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow">
                <QrCode className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">QR Scanner</div>
                <div className="text-xs text-muted-foreground">Position the QR code in the camera frame.</div>
              </div>
              <Button variant="outline" type="button" onClick={() => setIsScanning(true)}>Activate camera</Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lot">FIFO Lot</Label>
                  <Select value={form.lot} onValueChange={handleLotChange} disabled={submitting}>
                    <SelectTrigger id="lot" className="h-11 font-mono">
                      <SelectValue placeholder="Select Lot Number" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((m: any) => (
                        <SelectItem key={m.lotNumber} value={m.lotNumber} className="font-mono">
                          {m.lotNumber} ({m.partNumber} - Qty: {m.quantity})
                        </SelectItem>
                      ))}
                      {materials.length === 0 && (
                        <SelectItem value="none" disabled>No active lots in stock</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Part Number</Label>
                  <Input value={form.part} readOnly className="font-mono h-11 bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input value={form.product} readOnly className="h-11 bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qty">Quantity</Label>
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
                  <Label htmlFor="dest">Destination Line</Label>
                  <Select value={form.line} onValueChange={(v) => setForm({ ...form, line: v })} disabled={submitting}>
                    <SelectTrigger id="dest" className="h-11"><SelectValue /></SelectTrigger>
                    <SelectContent>{lines.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
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
                  <Label htmlFor="date">Date / Time</Label>
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

              {form.lot && (
                <div className={`rounded-lg p-3 text-xs flex items-center gap-2 border ${
                  isFIFOCompliant 
                    ? "bg-success/10 text-success border-success/20" 
                    : "bg-destructive/10 text-destructive border-destructive/20"
                }`}>
                  {isFIFOCompliant ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Stock available · FIFO order respected. Ready to submit.
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4" /> WARNING: Older lot exists in inventory! Submitting this lot will violate FIFO rules.
                    </>
                  )}
                </div>
              )}

              <Button type="submit" disabled={submitting} className="w-full h-12 bg-gradient-primary shadow-glow gap-2 text-base">
                {submitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mx-auto" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />Submit Part Out
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stock panel */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Boxes className="h-4 w-4 text-primary" />Stock summary</CardTitle>
            <p className="text-xs text-muted-foreground">Real-time inventory</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {stockSummary.map((s) => {
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
                    <span>Available <span className="font-medium text-foreground tabular-nums">{s.available}</span></span>
                    <span>Reserved <span className="tabular-nums">{s.reserved}</span></span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isScanning} onOpenChange={setIsScanning}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              <span>Simulated QR Scanner</span>
            </DialogTitle>
            <DialogDescription>
              Select an active lot below to simulate scanning its QR code.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-border flex flex-col items-center justify-center text-white">
              <div className="absolute inset-0 opacity-20 border-[20px] border-primary animate-pulse" />
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-success shadow-[0_0_8px_#10b981] animate-bounce" />
              <QrCode className="h-12 w-12 text-muted-foreground mb-2" />
              <span className="text-xs text-muted-foreground font-mono">Simulating camera feed...</span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground">Select a lot from current stock:</div>
              <div className="max-h-[180px] overflow-y-auto space-y-1.5 pr-1">
                {materials.map((m: any) => (
                  <button
                    key={m.lotNumber}
                    type="button"
                    onClick={() => handleSimulateScan(m.lotNumber)}
                    className="w-full text-left p-2.5 rounded-lg border border-border hover:border-primary hover:bg-primary/5 flex items-center justify-between text-sm transition-all font-mono"
                  >
                    <div>
                      <div className="font-semibold text-primary">{m.lotNumber}</div>
                      <div className="text-xs text-muted-foreground">{m.partNumber}</div>
                    </div>
                    <Badge variant="secondary" className="bg-muted text-foreground">
                      Qty: {m.quantity}
                    </Badge>
                  </button>
                ))}
                {materials.length === 0 && (
                  <div className="text-xs text-muted-foreground text-center py-4 italic">
                    No active lots available in stock to scan.
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBypassDialog} onOpenChange={setShowBypassDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <span>FIFO Violation Detected</span>
            </DialogTitle>
            <DialogDescription>
              Lot {form.lot} is not the oldest lot in stock. To proceed, you must submit an approval request to your supervisor.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for bypass (Required)</Label>
              <Input
                id="reason"
                placeholder="e.g. Older lot is damaged, inaccessible, or QC locked"
                value={bypassReason}
                onChange={(e) => setBypassReason(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" type="button" onClick={() => setShowBypassDialog(false)}>Cancel</Button>
              <Button type="button" className="bg-gradient-primary text-white" onClick={handleBypassRequest}>
                Submit Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
