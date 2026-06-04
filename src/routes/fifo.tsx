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
import { fifoMaterials } from "@/lib/mock-data";

export const Route = createFileRoute("/fifo")({
  head: () => ({ meta: [{ title: "FIFO Check — NPMS" }] }),
  component: FifoPage,
});

const counts = {
  compliant: fifoMaterials.filter((m) => m.status === "Compliant").length,
  warning: fifoMaterials.filter((m) => m.status === "Warning").length,
  violation: fifoMaterials.filter((m) => m.status === "Violation").length,
};

function FifoPage() {
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
            <div className="relative">
              <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              <Input placeholder="LOT-2025XXXXX" className="pl-9 h-12 font-mono" />
            </div>
            <Button className="w-full h-11 bg-gradient-primary gap-2"><ShieldCheck className="h-4 w-4" />Check FIFO position</Button>
            <div className="rounded-lg bg-success/10 border border-success/20 p-3 text-xs text-success flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">LOT-202511019 is next in queue</div>
                <div className="text-success/80">Position 1 of 6 · use this material first.</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Material Flow Timeline</CardTitle>
            <p className="text-xs text-muted-foreground">FIFO order for SC-425-25 at Rack A-3</p>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-0 right-0 top-6 h-0.5 bg-border" />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
                {[
                  { lot: "LOT-...019", date: "Nov 19", status: "use-next" },
                  { lot: "LOT-...020", date: "Nov 20", status: "queue" },
                  { lot: "LOT-...021", date: "Nov 21", status: "queue" },
                  { lot: "LOT-...022", date: "Nov 22", status: "queue" },
                  { lot: "LOT-...023", date: "Nov 23", status: "violation" },
                ].map((s, i) => {
                  const isNext = s.status === "use-next";
                  const isV = s.status === "violation";
                  return (
                    <div key={i} className="text-center">
                      <div className={`mx-auto h-12 w-12 rounded-full grid place-items-center text-white shadow-soft ring-4 ring-background ${isNext ? "bg-gradient-primary" : isV ? "bg-destructive" : "bg-muted-foreground/40"}`}>
                        {isNext ? <ShieldCheck className="h-5 w-5" /> : isV ? <XCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                      </div>
                      <div className="mt-2 text-xs font-mono">{s.lot}</div>
                      <div className="text-[11px] text-muted-foreground">{s.date}</div>
                      <Badge variant="outline" className={`mt-1 text-[10px] ${isNext ? "bg-primary/10 text-primary border-primary/20" : isV ? "bg-destructive/10 text-destructive border-destructive/20" : ""}`}>
                        {isNext ? "Use next" : isV ? "Violation" : "Queue"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
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
                {fifoMaterials.map((m) => (
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
                ))}
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
