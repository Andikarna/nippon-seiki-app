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
  FileText, Calendar, Download, Printer, QrCode,
  FileSpreadsheet, FileType, BarChart3, Package,
  CheckCircle, TrendingUp, ClipboardList, Loader2,
} from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReportsData, getActiveLines } from "@/lib/api/db.functions";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — NPMS" }] }),
  component: Reports,
});

// ─── Report type metadata ──────────────────────────────────────────────────
const reportTypes = [
  {
    id: "daily",
    title: "Daily Production",
    desc: "Today's production output by line and operator.",
    icon: BarChart3,
    color: "text-primary bg-primary/10",
  },
  {
    id: "weekly",
    title: "Weekly Production",
    desc: "7-day rolling production summary.",
    icon: TrendingUp,
    color: "text-info bg-info/10",
  },
  {
    id: "monthly",
    title: "Monthly Production",
    desc: "Full month performance review.",
    icon: Calendar,
    color: "text-success bg-success/10",
  },
  {
    id: "fifo",
    title: "FIFO Compliance",
    desc: "Material flow compliance audit.",
    icon: CheckCircle,
    color: "text-warning bg-warning/10",
  },
  {
    id: "movement",
    title: "Material Movement",
    desc: "Incoming and outgoing material trace.",
    icon: Package,
    color: "text-purple-500 bg-purple-500/10",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────
function today() {
  return new Date().toISOString().slice(0, 10);
}
function sevenDaysAgo() {
  const d = new Date();
  d.setDate(d.getDate() - 6);
  return d.toISOString().slice(0, 10);
}
function monthStart() {
  const d = new Date();
  d.setDate(1);
  return d.toISOString().slice(0, 10);
}
function getDefaultDates(type: string) {
  if (type === "daily") return { start: today(), end: today() };
  if (type === "weekly") return { start: sevenDaysAgo(), end: today() };
  if (type === "monthly") return { start: monthStart(), end: today() };
  return { start: monthStart(), end: today() };
}

// ─── Main Component ────────────────────────────────────────────────────────
function Reports() {
  const [selectedType, setSelectedType] = useState("daily");
  const current = reportTypes.find((r) => r.id === selectedType)!;

  const defaultDates = getDefaultDates(selectedType);
  const [startDate, setStartDate] = useState(defaultDates.start);
  const [endDate, setEndDate] = useState(defaultDates.end);
  const [lineFilter, setLineFilter] = useState("all");
  const [outputFormat, setOutputFormat] = useState("excel");

  const printRef = useRef<HTMLDivElement>(null);

  // ── Data fetching ──
  const { data, isLoading } = useQuery({
    queryKey: ["reportsData"],
    queryFn: () => getReportsData(),
  });
  const { data: dbLines } = useQuery({
    queryKey: ["activeLines"],
    queryFn: () => getActiveLines(),
  });

  const allLines: string[] = dbLines?.map((l: any) => l.name) ?? [];

  const productionData: any[] = data?.productionData ?? [];
  const fifoData: any[] = data?.fifoMaterials ?? [];

  // ── Filtered table rows based on report type + parameters ──
  const tableRows = useMemo(() => {
    if (selectedType === "fifo") {
      // FIFO compliance view — show fifo_materials table
      return fifoData.filter((row) => {
        const inRange =
          (!startDate || row.incomingDate >= startDate) &&
          (!endDate || row.incomingDate <= endDate);
        const lineMatch =
          lineFilter === "all" || row.position?.includes(lineFilter);
        return inRange && lineMatch;
      });
    }
    // Production records for daily / weekly / monthly / movement
    return productionData.filter((row) => {
      const inRange =
        (!startDate || row.date >= startDate) &&
        (!endDate || row.date <= endDate);
      const lineMatch =
        lineFilter === "all" ||
        (lineFilter === "SC" && row.line?.startsWith("SC")) ||
        (lineFilter === "SS" && row.line?.startsWith("SS")) ||
        row.line === lineFilter;
      return inRange && lineMatch;
    });
  }, [selectedType, productionData, fifoData, startDate, endDate, lineFilter]);

  // ── KPI summary ──
  const totalQty = tableRows.reduce((s, r) => s + (Number(r.quantity) || 0), 0);
  const compliantCount = tableRows.filter((r) => r.status === "Compliant" || r.status === "Completed").length;
  const complianceRate = tableRows.length > 0 ? Math.round((compliantCount / tableRows.length) * 1000) / 10 : 0;

  // Switches the report type and resets dates to sensible defaults
  const handleSelectType = (id: string) => {
    setSelectedType(id);
    const d = getDefaultDates(id);
    setStartDate(d.start);
    setEndDate(d.end);
  };

  // ── Export to Excel ──
  const handleExportExcel = () => {
    if (tableRows.length === 0) { toast.warning("No data to export."); return; }
    const isfifo = selectedType === "fifo";
    const headers = isfifo
      ? ["ID", "Part Number", "Lot Number", "Incoming Date", "Position", "Status", "Qty"]
      : ["ID", "Date", "Part Number", "Product Name", "Qty", "Line", "Operator", "Status"];
    const rows = tableRows.map((r) =>
      isfifo
        ? [r.id, r.partNumber, r.lotNumber, r.incomingDate, r.position, r.status, Number(r.quantity)]
        : [r.id, r.date, r.partNumber, r.productName, Number(r.quantity), r.line, r.operator, r.status]
    );
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws["!cols"] = headers.map(() => ({ wch: 20 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, current.title);
    XLSX.writeFile(wb, `NPMS_${current.title.replace(/\s+/g, "_")}_${today()}.xlsx`);
    toast.success(`Exported ${tableRows.length} rows to Excel.`);
  };

  // ── Export to CSV ──
  const handleExportCSV = () => {
    if (tableRows.length === 0) { toast.warning("No data to export."); return; }
    const isfifo = selectedType === "fifo";
    const headers = isfifo
      ? ["ID", "Part Number", "Lot Number", "Incoming Date", "Position", "Status", "Qty"]
      : ["ID", "Date", "Part Number", "Product Name", "Qty", "Line", "Operator", "Status"];
    const csvRows = [headers.join(",")];
    tableRows.forEach((r) => {
      const row = isfifo
        ? [r.id, r.partNumber, r.lotNumber, r.incomingDate, r.position, r.status, r.quantity]
        : [r.id, r.date, r.partNumber, `"${(r.productName ?? "").replace(/"/g, '""')}"`, r.quantity, r.line, r.operator, r.status];
      csvRows.push(row.join(","));
    });
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NPMS_${current.title.replace(/\s+/g, "_")}_${today()}.csv`;
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success(`Exported ${tableRows.length} rows to CSV.`);
  };

  // ── Print document ──
  const handlePrint = () => {
    const el = printRef.current;
    if (!el) return;
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${current.title} Report — NPMS</title>
          <style>
            * { box-sizing: border-box; font-family: Arial, sans-serif; }
            body { margin: 0; padding: 24px; background: white; color: #111; font-size: 12px; }
            img { max-height: 28px; width: auto; object-fit: contain; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 6px 10px; border-bottom: 1px solid #e5e5e5; text-align: left; }
            th { font-weight: 600; color: #666; font-size: 10px; text-transform: uppercase; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e5e5e5; padding-bottom: 12px; margin-bottom: 20px; }
            .logo-wrap { background: white; padding: 4px 8px; border: 1px solid #e5e5e5; border-radius: 6px; display: inline-flex; align-items: center; }
            .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; }
            .kpi-box { border: 1px solid #e5e5e5; border-radius: 6px; padding: 10px; }
            .kpi-label { font-size: 10px; color: #888; }
            .kpi-val { font-size: 20px; font-weight: 700; margin-top: 2px; }
            .footer { margin-top: 32px; display: flex; justify-content: space-between; font-size: 10px; color: #888; }
            .sig-line { height: 40px; width: 120px; border-bottom: 1px solid #ccc; margin-bottom: 4px; }
          </style>
        </head>
        <body>${el.innerHTML}</body>
      </html>`;
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) { toast.error("Pop-up blocked — please allow pop-ups."); return; }
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 400);
    toast.success("Sent to printer.");
  };

  // ── Download button — dispatches to format ──
  const handleDownload = () => {
    if (outputFormat === "excel") { handleExportExcel(); return; }
    if (outputFormat === "csv") { handleExportCSV(); return; }
    // PDF: open print dialog in new window (browser saves as PDF)
    handlePrint();
    toast.info("To save as PDF: select 'Save as PDF' in the print dialog.");
  };

  // ── Print QR Label ──
  const handlePrintLabel = () => {
    if (tableRows.length === 0) { toast.warning("No records to label."); return; }
    const labelHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Labels — NPMS</title>
          <style>
            * { box-sizing: border-box; font-family: Arial, sans-serif; }
            body { margin: 0; padding: 16px; background: white; }
            .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
            .label { border: 1px solid #ccc; border-radius: 6px; padding: 8px; font-size: 9px; page-break-inside: avoid; }
            .label-id { font-weight: 700; font-size: 10px; margin-bottom: 4px; }
            .qr { width: 56px; height: 56px; border: 1px solid #999; display: grid; place-items: center; font-size: 7px; color: #999; margin: 4px 0; }
            .label-row { color: #555; margin: 1px 0; }
          </style>
        </head>
        <body>
          <div class="grid">
            ${tableRows.slice(0, 20).map((r) => `
              <div class="label">
                <div class="label-id">${r.id}</div>
                <div class="qr">QR<br/>${r.partNumber ?? r.lotNumber ?? ""}</div>
                <div class="label-row">Part: ${r.partNumber ?? r.lotNumber ?? "—"}</div>
                <div class="label-row">Line: ${r.line ?? r.position ?? "—"}</div>
                <div class="label-row">Qty: ${r.quantity ?? "—"}</div>
                <div class="label-row">Date: ${r.date ?? r.incomingDate ?? "—"}</div>
              </div>`).join("")}
          </div>
        </body>
      </html>`;
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) { toast.error("Pop-up blocked — please allow pop-ups."); return; }
    win.document.write(labelHtml);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 400);
    toast.success(`Printing ${Math.min(tableRows.length, 20)} QR labels.`);
  };

  // ── FIFO table columns ──
  const isFifo = selectedType === "fifo";

  return (
    <AppLayout title="Reports & Print" subtitle="Generate, preview, and export production documents.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ── Left sidebar ─────────────────────────────── */}
        <div className="space-y-4">

          {/* Report type selector */}
          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" />
                Report type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 pt-0">
              {reportTypes.map((r) => {
                const Icon = r.icon;
                const active = selectedType === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleSelectType(r.id)}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-all ${
                      active ? "bg-primary/10 border border-primary/20 shadow-sm" : "hover:bg-muted/60 border border-transparent"
                    }`}
                  >
                    <div className={`h-9 w-9 rounded-lg grid place-items-center shrink-0 ${active ? "bg-gradient-primary text-white shadow-sm" : r.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{r.title}</div>
                      <div className="text-xs text-muted-foreground">{r.desc}</div>
                    </div>
                    {active && <div className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse mt-1.5 shrink-0" />}
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Parameters */}
          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-9 text-xs"
                  />
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Production line</Label>
                <Select value={lineFilter} onValueChange={setLineFilter}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All lines</SelectItem>
                    <SelectItem value="SC">Lines SC (SC-1, SC-2…)</SelectItem>
                    <SelectItem value="SS">Lines SS (SS-1, SS-2…)</SelectItem>
                    {allLines.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-1 text-xs text-muted-foreground">
                {isLoading ? "Loading…" : (
                  <span>
                    <span className="font-semibold text-foreground">{tableRows.length}</span> records matched
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Output format */}
          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Output format</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2 pt-0">
              {[
                { id: "pdf",   label: "PDF",   icon: FileType       },
                { id: "excel", label: "Excel", icon: FileSpreadsheet },
                { id: "csv",   label: "CSV",   icon: FileText       },
              ].map((f) => {
                const Icon = f.icon;
                const active = outputFormat === f.id;
                return (
                  <Button
                    key={f.id}
                    variant={active ? "default" : "outline"}
                    className={`h-auto flex-col py-3 gap-1.5 relative ${active ? "bg-gradient-primary border-primary shadow-md" : ""}`}
                    onClick={() => setOutputFormat(f.id)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{f.label}</span>
                    {active && (
                      <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-white/80" />
                    )}
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* ── Preview panel ─────────────────────────────── */}
        <Card className="lg:col-span-2 border-0 shadow-soft flex flex-col">
          <CardHeader className="flex-row items-center justify-between border-b shrink-0 gap-4 flex-wrap">
            <div>
              <CardTitle className="text-base">{current.title} — Preview</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {startDate} → {endDate} &nbsp;·&nbsp; {lineFilter === "all" ? "All lines" : lineFilter}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handlePrintLabel}
                disabled={isLoading || tableRows.length === 0}
                title="Print QR labels for matched records"
              >
                <QrCode className="h-4 w-4" />
                Print Label
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleDownload}
                disabled={isLoading || tableRows.length === 0}
                title={`Download as ${outputFormat.toUpperCase()}`}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-gradient-primary"
                onClick={handlePrint}
                disabled={isLoading || tableRows.length === 0}
                title="Print document"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 bg-muted/30 flex-1 overflow-auto">
            {/* Printable document */}
            <div
              ref={printRef}
              className="bg-card rounded-xl border shadow-elevated mx-auto max-w-[760px] p-8 font-sans"
            >
              {/* Document header */}
              <div className="header flex items-start justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1 border rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                    <img src="/logo.png" alt="Nippon Seiki Indonesia" className="h-5 w-auto object-contain" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">PT. Indonesia Nippon Seiki</div>
                    <div className="text-xs text-muted-foreground">Production Monitoring System · Confidential</div>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div className="font-mono font-medium">Document #: NPMS-{Date.now().toString().slice(-6)}</div>
                  <div>Issued: {new Date().toLocaleDateString("id-ID")}</div>
                </div>
              </div>

              {/* Report title */}
              <div className="mt-5">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{current.title} Report</h2>
                  <Badge variant="outline" className="text-[10px] font-mono">NPMS v2.4.1</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Period: {startDate} – {endDate} &nbsp;·&nbsp;
                  Line: {lineFilter === "all" ? "All" : lineFilter} &nbsp;·&nbsp;
                  Generated: {new Date().toLocaleString("id-ID")}
                </p>
              </div>

              {/* KPI boxes */}
              <div className="kpi-grid grid grid-cols-4 gap-3 mt-5">
                {[
                  { l: "Total Records",  v: tableRows.length },
                  { l: "Total Qty",      v: totalQty.toLocaleString() },
                  { l: "Compliant",      v: compliantCount },
                  { l: "FIFO Rate",      v: `${complianceRate}%` },
                ].map((s) => (
                  <div key={s.l} className="kpi-box rounded-lg border p-3">
                    <div className="kpi-label text-[10px] text-muted-foreground">{s.l}</div>
                    <div className="kpi-val text-lg font-bold mt-0.5">{isLoading ? "…" : s.v}</div>
                  </div>
                ))}
              </div>

              {/* Data table */}
              <div className="mt-5 rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/60 text-left text-xs text-muted-foreground">
                      {isFifo ? (
                        <>
                          <th className="py-2 px-3 font-semibold">ID</th>
                          <th className="py-2 px-3 font-semibold">Part Number</th>
                          <th className="py-2 px-3 font-semibold">Lot Number</th>
                          <th className="py-2 px-3 font-semibold">Date</th>
                          <th className="py-2 px-3 font-semibold">Position</th>
                          <th className="py-2 px-3 font-semibold">Status</th>
                          <th className="py-2 px-3 font-semibold text-right">Qty</th>
                        </>
                      ) : (
                        <>
                          <th className="py-2 px-3 font-semibold">ID</th>
                          <th className="py-2 px-3 font-semibold">Date</th>
                          <th className="py-2 px-3 font-semibold">Part</th>
                          <th className="py-2 px-3 font-semibold">Product</th>
                          <th className="py-2 px-3 font-semibold">Line</th>
                          <th className="py-2 px-3 font-semibold">Operator</th>
                          <th className="py-2 px-3 font-semibold text-right">Qty</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={7} className="py-10 text-center text-muted-foreground text-xs">
                          <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
                          Loading report data…
                        </td>
                      </tr>
                    ) : tableRows.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-10 text-center text-muted-foreground text-xs">
                          No records match the selected parameters.
                        </td>
                      </tr>
                    ) : (
                      tableRows.slice(0, 15).map((r: any, i: number) => (
                        <tr key={r.id ?? i} className="border-t last:border-0 hover:bg-muted/30 transition-colors">
                          {isFifo ? (
                            <>
                              <td className="py-2 px-3 font-mono text-xs">{r.id}</td>
                              <td className="py-2 px-3 font-mono text-xs">{r.partNumber}</td>
                              <td className="py-2 px-3 font-mono text-xs">{r.lotNumber}</td>
                              <td className="py-2 px-3 text-xs">{r.incomingDate}</td>
                              <td className="py-2 px-3 text-xs">{r.position}</td>
                              <td className="py-2 px-3">
                                <Badge
                                  variant="outline"
                                  className={`text-[10px] ${
                                    r.status === "Compliant" ? "text-success border-success/30 bg-success/10" :
                                    r.status === "Warning" ? "text-warning border-warning/30 bg-warning/10" :
                                    "text-destructive border-destructive/30 bg-destructive/10"
                                  }`}
                                >
                                  {r.status}
                                </Badge>
                              </td>
                              <td className="py-2 px-3 text-right tabular-nums font-medium">{r.quantity}</td>
                            </>
                          ) : (
                            <>
                              <td className="py-2 px-3 font-mono text-xs">{r.id}</td>
                              <td className="py-2 px-3 text-xs">{r.date}</td>
                              <td className="py-2 px-3 font-mono text-xs">{r.partNumber}</td>
                              <td className="py-2 px-3 text-xs max-w-[180px] truncate">{r.productName}</td>
                              <td className="py-2 px-3">
                                <Badge variant="outline" className="text-[10px]">{r.line}</Badge>
                              </td>
                              <td className="py-2 px-3 text-xs text-muted-foreground">{r.operator}</td>
                              <td className="py-2 px-3 text-right tabular-nums font-medium">{r.quantity}</td>
                            </>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {tableRows.length > 15 && !isLoading && (
                <p className="text-center text-xs text-muted-foreground mt-2">
                  Showing 15 of {tableRows.length} records — download to get full dataset.
                </p>
              )}

              {/* Document footer */}
              <div className="footer mt-8 flex justify-between items-end text-xs text-muted-foreground border-t pt-4">
                <div>
                  <div className="h-12 w-36 border-b border-muted-foreground/40 mb-1" />
                  <div>Supervisor / Authorized by</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px]">SHA256: {Date.now().toString(16).toUpperCase().padStart(16, "0")}…</div>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <Calendar className="h-3 w-3" />
                    Auto-generated · NPMS v2.4.1
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
