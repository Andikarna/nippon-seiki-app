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

export const Route = createFileRoute("/part-out")({
  head: () => ({ meta: [{ title: "Part Out — NPMS" }] }),
  component: PartOut,
});

const stock = [
  { part: "SC-425-25", name: "Speedometer Sub-Assy", available: 320, reserved: 80, threshold: 100 },
  { part: "SC-426-21", name: "Cluster Sub-Assy", available: 145, reserved: 30, threshold: 80 },
  { part: "SC-427-22", name: "Tachometer Assy", available: 64, reserved: 20, threshold: 100 },
  { part: "SC-428-23", name: "Indicator Unit", available: 210, reserved: 0, threshold: 60 },
];

function PartOut() {
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
          </CardContent>
        </Card>

        {/* Stock panel */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Boxes className="h-4 w-4 text-primary" />Stock summary</CardTitle>
            <p className="text-xs text-muted-foreground">Real-time inventory</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {stock.map((s) => {
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
