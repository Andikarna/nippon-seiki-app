import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { QrCode, Send, CheckCircle2, AlertTriangle, Boxes } from "lucide-react";
import { productionLines } from "@/lib/mock-data";
<<<<<<< HEAD
=======
import { useState, useEffect } from "react";
import { useUser } from "@/lib/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFifoMaterials, dispatchFifoMaterial } from "@/lib/api/db.functions";
import { toast } from "sonner";
>>>>>>> origin/connection-database

export const Route = createFileRoute("/part-out")({
  head: () => ({ meta: [{ title: "Part Out — NPMS" }] }),
  component: PartOut,
});

<<<<<<< HEAD
const stock = [
=======
const defaultStock = [
>>>>>>> origin/connection-database
  { part: "SC-425-25", name: "Speedometer Sub-Assy", available: 320, reserved: 80, threshold: 100 },
  { part: "SC-426-21", name: "Cluster Sub-Assy", available: 145, reserved: 30, threshold: 80 },
  { part: "SC-427-22", name: "Tachometer Assy", available: 64, reserved: 20, threshold: 100 },
  { part: "SC-428-23", name: "Indicator Unit", available: 210, reserved: 0, threshold: 60 },
];

function PartOut() {
<<<<<<< HEAD
=======
  const user = useUser();
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState(false);

  // Load stock materials from MySQL
  const { data: fifoData } = useQuery({
    queryKey: ["fifoMaterials"],
    queryFn: () => getFifoMaterials(),
  });

  const materials = fifoData?.materials ?? [];

  const [form, setForm] = useState({
    part: "SC-425-25",
    product: "Speedometer Sub-Assy",
    qty: "60",
    line: "Line B1",
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
        product: firstMat.partNumber.includes("425") ? "Speedometer Sub-Assy" : firstMat.partNumber.includes("426") ? "Cluster Sub-Assy" : firstMat.partNumber.includes("427") ? "Tachometer Assy" : "Indicator Unit",
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
        product: found.partNumber.includes("425") ? "Speedometer Sub-Assy" : found.partNumber.includes("426") ? "Cluster Sub-Assy" : found.partNumber.includes("427") ? "Tachometer Assy" : "Indicator Unit",
        qty: String(Math.min(Number(form.qty), found.quantity)),
      });
    }
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
        if (res.fifoStatus === "Violation") {
          toast.warning(`FIFO VIOLATION recorded for LOT-${form.lot.replace("LOT-", "")}! An alert has been raised.`, {
            duration: 6000,
          });
        } else {
          toast.success("Part Out transaction logged successfully.");
        }
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

  // Check if current selection is compliant
  const selectedMat = materials.find((m: any) => m.lotNumber === form.lot);
  const isFIFOCompliant = selectedMat ? selectedMat.status === "Compliant" : true;

>>>>>>> origin/connection-database
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
<<<<<<< HEAD
              <Button variant="outline">Activate camera</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Part Number</Label><Input defaultValue="SC-425-25" className="font-mono h-11" /></div>
              <div className="space-y-2"><Label>Product Name</Label><Input defaultValue="Speedometer Sub-Assy" className="h-11" /></div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" defaultValue="60" className="h-11 text-lg font-semibold tabular-nums" />
              </div>
              <div className="space-y-2">
                <Label>Destination Line</Label>
                <Select defaultValue="Line B1">
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>{productionLines.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Operator</Label><Input defaultValue="Afifi Rouf" className="h-11" /></div>
              <div className="space-y-2">
                <Label>Date / Time</Label>
                <Input type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Shift</Label>
                <Select defaultValue="Shift 1">
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Shift 1">Shift 1 · 07:00 – 15:00</SelectItem>
                    <SelectItem value="Shift 2">Shift 2 · 15:00 – 23:00</SelectItem>
                    <SelectItem value="Shift 3">Shift 3 · 23:00 – 07:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>FIFO Lot</Label>
                <Select defaultValue="LOT-202511019">
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOT-202511019">LOT-202511019 (next)</SelectItem>
                    <SelectItem value="LOT-202511020">LOT-202511020</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-lg bg-success/10 border border-success/20 p-3 text-xs text-success flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Stock available · FIFO order respected. Ready to submit.
            </div>

            <Button className="w-full h-12 bg-gradient-primary shadow-glow gap-2 text-base">
              <Send className="h-4 w-4" />Submit Part Out
            </Button>
=======
              <Button variant="outline" type="button" onClick={() => toast.info("Camera activation is simulated.")}>Activate camera</Button>
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
                    <SelectContent>{productionLines.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
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
>>>>>>> origin/connection-database
          </CardContent>
        </Card>

        {/* Stock panel */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Boxes className="h-4 w-4 text-primary" />Stock summary</CardTitle>
            <p className="text-xs text-muted-foreground">Real-time inventory</p>
          </CardHeader>
          <CardContent className="space-y-3">
<<<<<<< HEAD
            {stock.map((s) => {
=======
            {stockSummary.map((s) => {
>>>>>>> origin/connection-database
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
    </AppLayout>
  );
}
