import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  FileText, Calendar, Download, Printer, QrCode, FileSpreadsheet, FileType,
} from "lucide-react";
import { useState } from "react";
<<<<<<< HEAD
import { productionData } from "@/lib/mock-data";
=======
import { useQuery } from "@tanstack/react-query";
import { getReportsData } from "@/lib/api/db.functions";
import { toast } from "sonner";
>>>>>>> origin/connection-database

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — NPMS" }] }),
  component: Reports,
});

const reportTypes = [
  { id: "daily", title: "Daily Production", desc: "Today's production output by line and operator." },
  { id: "weekly", title: "Weekly Production", desc: "7-day rolling production summary." },
  { id: "monthly", title: "Monthly Production", desc: "Full month performance review." },
  { id: "fifo", title: "FIFO Compliance", desc: "Material flow compliance audit." },
  { id: "movement", title: "Material Movement", desc: "Incoming and outgoing material trace." },
];

function Reports() {
  const [selected, setSelected] = useState("daily");
  const current = reportTypes.find((r) => r.id === selected)!;

<<<<<<< HEAD
=======
  // Query reports data from database
  const { data, isLoading } = useQuery({
    queryKey: ["reportsData"],
    queryFn: () => getReportsData(),
  });

  const productionData = data?.productionData ?? [];

>>>>>>> origin/connection-database
  return (
    <AppLayout title="Reports & Print" subtitle="Generate, preview, and export production documents.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-3"><CardTitle className="text-base">Report type</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              {reportTypes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-colors ${selected === r.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/60"}`}
                >
                  <div className={`h-9 w-9 rounded-lg grid place-items-center shrink-0 ${selected === r.id ? "bg-gradient-primary text-white" : "bg-muted text-muted-foreground"}`}>
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground">{r.desc}</div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-3"><CardTitle className="text-base">Parameters</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Date range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
                  <Input type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Line</Label>
                <Select defaultValue="all">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All lines</SelectItem>
                    <SelectItem value="A">Line A1 / A2</SelectItem>
                    <SelectItem value="B">Line B1 / B2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Copies</Label>
                <Input type="number" defaultValue="1" min={1} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-3"><CardTitle className="text-base">Output format</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-3 gap-2">
              {[
                { l: "PDF", icon: FileType },
                { l: "Excel", icon: FileSpreadsheet },
                { l: "CSV", icon: FileText },
              ].map((f, i) => (
<<<<<<< HEAD
                <Button key={f.l} variant={i === 0 ? "default" : "outline"} className={`h-auto flex-col py-3 gap-1 ${i === 0 ? "bg-gradient-primary" : ""}`}>
=======
                <Button key={f.l} variant={i === 0 ? "default" : "outline"} className={`h-auto flex-col py-3 gap-1 ${i === 0 ? "bg-gradient-primary" : ""}`} onClick={() => toast.success(`Preparing ${f.l} download...`)}>
>>>>>>> origin/connection-database
                  <f.icon className="h-5 w-5" />
                  <span className="text-xs">{f.l}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader className="flex-row items-center justify-between border-b">
            <div>
              <CardTitle className="text-base">{current.title} — Preview</CardTitle>
              <p className="text-xs text-muted-foreground">Document will be generated using current parameters.</p>
            </div>
            <div className="flex gap-2">
<<<<<<< HEAD
              <Button variant="outline" className="gap-2"><QrCode className="h-4 w-4" />Print Label</Button>
              <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Download</Button>
              <Button className="gap-2 bg-gradient-primary"><Printer className="h-4 w-4" />Print</Button>
=======
              <Button variant="outline" className="gap-2" onClick={() => toast.success("Simulating label printing...")}><QrCode className="h-4 w-4" />Print Label</Button>
              <Button variant="outline" className="gap-2" onClick={() => toast.success("Downloading report...")}><Download className="h-4 w-4" />Download</Button>
              <Button className="gap-2 bg-gradient-primary" onClick={() => window.print()}><Printer className="h-4 w-4" />Print</Button>
>>>>>>> origin/connection-database
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-muted/30">
            {/* Document */}
            <div className="bg-card rounded-lg border shadow-elevated mx-auto max-w-[760px] p-8 font-sans">
              <div className="flex items-start justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center text-white font-bold">N</div>
                  <div>
                    <div className="text-sm font-semibold">PT. Indonesia Nippon Seiki</div>
                    <div className="text-xs text-muted-foreground">Production Monitoring System · Confidential</div>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>Document #: NPMS-{Date.now().toString().slice(-6)}</div>
                  <div>Issued: {new Date().toLocaleDateString()}</div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold">{current.title} Report</h2>
                <p className="text-sm text-muted-foreground mt-1">Period: {new Date().toLocaleDateString()} · Lines: All</p>
              </div>

              <div className="grid grid-cols-4 gap-3 mt-6">
                {[
<<<<<<< HEAD
                  { l: "Total Output", v: "2,847" },
                  { l: "Sub-Assy", v: "1,524" },
                  { l: "Assy", v: "1,318" },
=======
                  { l: "Total Output", v: "Active" },
                  { l: "Sub-Assy", v: "Live" },
                  { l: "Assy", v: "Live" },
>>>>>>> origin/connection-database
                  { l: "FIFO Rate", v: "98.4%" },
                ].map((s) => (
                  <div key={s.l} className="rounded-lg border p-3">
                    <div className="text-[11px] text-muted-foreground">{s.l}</div>
                    <div className="text-lg font-semibold mt-0.5">{s.v}</div>
                  </div>
                ))}
              </div>

              <table className="w-full mt-6 text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b">
                    <th className="py-2 font-medium">ID</th>
                    <th className="py-2 font-medium">Part</th>
                    <th className="py-2 font-medium">Product</th>
                    <th className="py-2 font-medium">Line</th>
                    <th className="py-2 font-medium text-right">Qty</th>
                  </tr>
                </thead>
                <tbody>
<<<<<<< HEAD
                  {productionData.slice(0, 8).map((r) => (
                    <tr key={r.id} className="border-b last:border-0">
                      <td className="py-2 font-mono text-xs">{r.id}</td>
                      <td className="py-2 font-mono text-xs">{r.partNumber}</td>
                      <td className="py-2">{r.productName}</td>
                      <td className="py-2"><Badge variant="outline" className="text-[10px]">{r.line}</Badge></td>
                      <td className="py-2 text-right tabular-nums">{r.quantity}</td>
                    </tr>
                  ))}
=======
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground text-xs">
                        Loading report details...
                      </td>
                    </tr>
                  ) : productionData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground text-xs">
                        No production data available for report.
                      </td>
                    </tr>
                  ) : (
                    productionData.slice(0, 8).map((r: any) => (
                      <tr key={r.id} className="border-b last:border-0">
                        <td className="py-2 font-mono text-xs">{r.id}</td>
                        <td className="py-2 font-mono text-xs">{r.partNumber}</td>
                        <td className="py-2">{r.productName}</td>
                        <td className="py-2"><Badge variant="outline" className="text-[10px]">{r.line}</Badge></td>
                        <td className="py-2 text-right tabular-nums">{r.quantity}</td>
                      </tr>
                    ))
                  )}
>>>>>>> origin/connection-database
                </tbody>
              </table>

              <div className="mt-8 flex justify-between items-end text-xs text-muted-foreground">
                <div>
                  <div className="h-12 w-32 border-b" />
                  <div className="mt-1">Supervisor</div>
                </div>
                <div className="text-right">
                  <div className="font-mono">SHA256: 9f3a…b27e</div>
                  <div className="flex items-center gap-1 justify-end mt-1"><Calendar className="h-3 w-3" />Auto-generated · NPMS v2.4.1</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
