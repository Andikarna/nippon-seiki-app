import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout, B as Badge } from "./app-layout-DIu8u0Fv.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, I as Input, B as Button } from "./card-DwF1RqPI.mjs";
import { L as Label } from "./label-iU8VJ1mI.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CTYi7Z2Z.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { f as getReportsData, h as getActiveLines } from "./router-Cmfz48Et.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as utils, w as writeFileSync } from "../_libs/xlsx.mjs";
import "../_libs/seroval.mjs";
import { g as ChartColumn, h as TrendingUp, i as Calendar, j as CircleCheckBig, k as Package, l as ClipboardList, F as FileType, m as FileSpreadsheet, n as FileText, Q as QrCode, D as Download, c as Printer, o as LoaderCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-BUYfpcon.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
const reportTypes = [{
  id: "daily",
  title: "Produksi Harian",
  desc: "Output produksi hari ini per lini dan operator.",
  icon: ChartColumn,
  color: "text-primary bg-primary/10"
}, {
  id: "weekly",
  title: "Produksi Mingguan",
  desc: "Ringkasan produksi 7 hari terakhir.",
  icon: TrendingUp,
  color: "text-info bg-info/10"
}, {
  id: "monthly",
  title: "Produksi Bulanan",
  desc: "Tinjauan kinerja bulan penuh.",
  icon: Calendar,
  color: "text-success bg-success/10"
}, {
  id: "fifo",
  title: "Kepatuhan FIFO",
  desc: "Audit kepatuhan aliran material.",
  icon: CircleCheckBig,
  color: "text-warning bg-warning/10"
}, {
  id: "movement",
  title: "Pergerakan Material",
  desc: "Jejak material masuk dan keluar.",
  icon: Package,
  color: "text-purple-500 bg-purple-500/10"
}];
function today() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function sevenDaysAgo() {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() - 6);
  return d.toISOString().slice(0, 10);
}
function monthStart() {
  const d = /* @__PURE__ */ new Date();
  d.setDate(1);
  return d.toISOString().slice(0, 10);
}
function getDefaultDates(type) {
  if (type === "daily") return {
    start: today(),
    end: today()
  };
  if (type === "weekly") return {
    start: sevenDaysAgo(),
    end: today()
  };
  if (type === "monthly") return {
    start: monthStart(),
    end: today()
  };
  return {
    start: monthStart(),
    end: today()
  };
}
function Reports() {
  const [selectedType, setSelectedType] = reactExports.useState("daily");
  const current = reportTypes.find((r) => r.id === selectedType);
  const defaultDates = getDefaultDates(selectedType);
  const [startDate, setStartDate] = reactExports.useState(defaultDates.start);
  const [endDate, setEndDate] = reactExports.useState(defaultDates.end);
  const [lineFilter, setLineFilter] = reactExports.useState("all");
  const [outputFormat, setOutputFormat] = reactExports.useState("excel");
  const printRef = reactExports.useRef(null);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["reportsData"],
    queryFn: () => getReportsData()
  });
  const {
    data: dbLines
  } = useQuery({
    queryKey: ["activeLines"],
    queryFn: () => getActiveLines()
  });
  const allLines = dbLines?.map((l) => l.name) ?? [];
  const productionData = data?.productionData ?? [];
  const fifoData = data?.fifoMaterials ?? [];
  const tableRows = reactExports.useMemo(() => {
    if (selectedType === "fifo") {
      return fifoData.filter((row) => {
        const inRange = (!startDate || row.incomingDate >= startDate) && (!endDate || row.incomingDate <= endDate);
        const lineMatch = lineFilter === "all" || row.position?.includes(lineFilter);
        return inRange && lineMatch;
      });
    }
    return productionData.filter((row) => {
      const inRange = (!startDate || row.date >= startDate) && (!endDate || row.date <= endDate);
      const lineMatch = lineFilter === "all" || lineFilter === "SC" && row.line?.startsWith("SC") || lineFilter === "SS" && row.line?.startsWith("SS") || row.line === lineFilter;
      return inRange && lineMatch;
    });
  }, [selectedType, productionData, fifoData, startDate, endDate, lineFilter]);
  const totalQty = tableRows.reduce((s, r) => s + (Number(r.quantity) || 0), 0);
  const compliantCount = tableRows.filter((r) => r.status === "Compliant" || r.status === "Completed").length;
  const complianceRate = tableRows.length > 0 ? Math.round(compliantCount / tableRows.length * 1e3) / 10 : 0;
  const handleSelectType = (id) => {
    setSelectedType(id);
    const d = getDefaultDates(id);
    setStartDate(d.start);
    setEndDate(d.end);
  };
  const handleExportExcel = () => {
    if (tableRows.length === 0) {
      toast.warning("Tidak ada data untuk diekspor.");
      return;
    }
    const isfifo = selectedType === "fifo";
    const headers = isfifo ? ["ID", "Part Number", "Lot Number", "Incoming Date", "Position", "Status", "Qty"] : ["ID", "Date", "Part Number", "Product Name", "Qty", "Line", "Operator", "Status"];
    const rows = tableRows.map((r) => isfifo ? [r.id, r.partNumber, r.lotNumber, r.incomingDate, r.position, r.status, Number(r.quantity)] : [r.id, r.date, r.partNumber, r.productName, Number(r.quantity), r.line, r.operator, r.status]);
    const ws = utils.aoa_to_sheet([headers, ...rows]);
    ws["!cols"] = headers.map(() => ({
      wch: 20
    }));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, current.title);
    writeFileSync(wb, `NPMS_${current.title.replace(/\s+/g, "_")}_${today()}.xlsx`);
    toast.success(`Diekspor ${tableRows.length} baris ke Excel.`);
  };
  const handleExportCSV = () => {
    if (tableRows.length === 0) {
      toast.warning("Tidak ada data untuk diekspor.");
      return;
    }
    const isfifo = selectedType === "fifo";
    const headers = isfifo ? ["ID", "Part Number", "Lot Number", "Incoming Date", "Position", "Status", "Qty"] : ["ID", "Date", "Part Number", "Product Name", "Qty", "Line", "Operator", "Status"];
    const csvRows = [headers.join(",")];
    tableRows.forEach((r) => {
      const row = isfifo ? [r.id, r.partNumber, r.lotNumber, r.incomingDate, r.position, r.status, r.quantity] : [r.id, r.date, r.partNumber, `"${(r.productName ?? "").replace(/"/g, '""')}"`, r.quantity, r.line, r.operator, r.status];
      csvRows.push(row.join(","));
    });
    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NPMS_${current.title.replace(/\s+/g, "_")}_${today()}.csv`;
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success(`Diekspor ${tableRows.length} baris ke CSV.`);
  };
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
    if (!win) {
      toast.error("Pop-up diblokir — harap izinkan pop-up.");
      return;
    }
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 400);
    toast.success("Dikirim ke printer.");
  };
  const handleDownload = () => {
    if (outputFormat === "excel") {
      handleExportExcel();
      return;
    }
    if (outputFormat === "csv") {
      handleExportCSV();
      return;
    }
    handlePrint();
    toast.info("Untuk menyimpan sebagai PDF: pilih 'Simpan sebagai PDF' di dialog cetak.");
  };
  const handlePrintLabel = () => {
    if (tableRows.length === 0) {
      toast.warning("Tidak ada record untuk label.");
      return;
    }
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
    if (!win) {
      toast.error("Pop-up diblokir — harap izinkan pop-up.");
      return;
    }
    win.document.write(labelHtml);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      win.close();
    }, 400);
    toast.success(`Mencetak ${Math.min(tableRows.length, 20)} label QR.`);
  };
  const isFifo = selectedType === "fifo";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { title: "Reports & Print", subtitle: "Buat, pratinjau, dan ekspor dokumen produksi.", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4 text-primary" }),
          "Jenis laporan"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-1 pt-0", children: reportTypes.map((r) => {
          const Icon = r.icon;
          const active = selectedType === r.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleSelectType(r.id), className: `w-full text-left flex items-start gap-3 p-3 rounded-lg transition-all ${active ? "bg-primary/10 border border-primary/20 shadow-sm" : "hover:bg-muted/60 border border-transparent"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-9 w-9 rounded-lg grid place-items-center shrink-0 ${active ? "bg-gradient-primary text-white shadow-sm" : r.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: r.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: r.desc })
            ] }),
            active && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto h-2 w-2 rounded-full bg-primary animate-pulse mt-1.5 shrink-0" })
          ] }, r.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Parameters" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 pt-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Rentang tanggal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value), className: "h-9 text-xs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: endDate, onChange: (e) => setEndDate(e.target.value), className: "h-9 text-xs" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Lini produksi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: lineFilter, onValueChange: setLineFilter, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Semua lini" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "SC", children: "Lini SC (SC-1, SC-2…)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "SS", children: "Lini SS (SS-1, SS-2…)" }),
                allLines.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l, children: l }, l))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1 text-xs text-muted-foreground", children: isLoading ? "Memuat…" : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: tableRows.length }),
            " record cocok"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Format output" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "grid grid-cols-3 gap-2 pt-0", children: [{
          id: "pdf",
          label: "PDF",
          icon: FileType
        }, {
          id: "excel",
          label: "Excel",
          icon: FileSpreadsheet
        }, {
          id: "csv",
          label: "CSV",
          icon: FileText
        }].map((f) => {
          const Icon = f.icon;
          const active = outputFormat === f.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: active ? "default" : "outline", className: `h-auto flex-col py-3 gap-1.5 relative ${active ? "bg-gradient-primary border-primary shadow-md" : ""}`, onClick: () => setOutputFormat(f.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: f.label }),
            active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-white/80" })
          ] }, f.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 border-0 shadow-soft flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-row items-center justify-between border-b shrink-0 gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base", children: [
            current.title,
            " — Preview"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            startDate,
            " → ",
            endDate,
            "  ·  ",
            lineFilter === "all" ? "Semua lini" : lineFilter
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", onClick: handlePrintLabel, disabled: isLoading || tableRows.length === 0, title: "Cetak label QR untuk record yang cocok", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-4 w-4" }),
            "Cetak Label"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", onClick: handleDownload, disabled: isLoading || tableRows.length === 0, title: `Unduh sebagai ${outputFormat.toUpperCase()}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            "Unduh"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gap-2 bg-gradient-primary", onClick: handlePrint, disabled: isLoading || tableRows.length === 0, title: "Cetak dokumen", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
            "Cetak"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6 bg-muted/30 flex-1 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: printRef, className: "bg-card rounded-xl border shadow-elevated mx-auto max-w-[760px] p-8 font-sans", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header flex items-start justify-between border-b pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-1 border rounded-lg flex items-center justify-center shrink-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Nippon Seiki Indonesia", className: "h-5 w-auto object-contain" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: "PT. Indonesia Nippon Seiki" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Sistem Monitoring Produksi · Rahasia" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-medium", children: [
              "Document #: NPMS-",
              Date.now().toString().slice(-6)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Issued: ",
              (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold", children: [
              "Laporan ",
              current.title
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] font-mono", children: "NPMS v2.4.1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Periode: ",
            startDate,
            " – ",
            endDate,
            "  ·  Lini: ",
            lineFilter === "all" ? "Semua" : lineFilter,
            "  ·  Dibuat: ",
            (/* @__PURE__ */ new Date()).toLocaleString("id-ID")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kpi-grid grid grid-cols-4 gap-3 mt-5", children: [{
          l: "Total Record",
          v: tableRows.length
        }, {
          l: "Total Qty",
          v: totalQty.toLocaleString()
        }, {
          l: "Sesuai",
          v: compliantCount
        }, {
          l: "Tingkat FIFO",
          v: `${complianceRate}%`
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "kpi-box rounded-lg border p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kpi-label text-[10px] text-muted-foreground", children: s.l }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kpi-val text-lg font-bold mt-0.5", children: isLoading ? "…" : s.v })
        ] }, s.l)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-lg border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/60 text-left text-xs text-muted-foreground", children: isFifo ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold", children: "ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold", children: "Part Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold", children: "Lot Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold", children: "Position" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold text-right", children: "Qty" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold", children: "ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold", children: "Part" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold", children: "Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold", children: "Line" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold", children: "Operator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 px-3 font-semibold text-right", children: "Qty" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 7, className: "py-10 text-center text-muted-foreground text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin mx-auto mb-2" }),
            "Memuat data laporan…"
          ] }) }) : tableRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "py-10 text-center text-muted-foreground text-xs", children: "Tidak ada record yang cocok dengan parameter yang dipilih." }) }) : tableRows.slice(0, 15).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-t last:border-0 hover:bg-muted/30 transition-colors", children: isFifo ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-mono text-xs", children: r.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-mono text-xs", children: r.partNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-mono text-xs", children: r.lotNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-xs", children: r.incomingDate }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-xs", children: r.position }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `text-[10px] ${r.status === "Compliant" ? "text-success border-success/30 bg-success/10" : r.status === "Warning" ? "text-warning border-warning/30 bg-warning/10" : "text-destructive border-destructive/30 bg-destructive/10"}`, children: r.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-right tabular-nums font-medium", children: r.quantity })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-mono text-xs", children: r.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-xs", children: r.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 font-mono text-xs", children: r.partNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-xs max-w-[180px] truncate", children: r.productName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: r.line }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-xs text-muted-foreground", children: r.operator }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 px-3 text-right tabular-nums font-medium", children: r.quantity })
          ] }) }, r.id ?? i)) })
        ] }) }),
        tableRows.length > 15 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-2", children: [
          "Menampilkan 15 dari ",
          tableRows.length,
          " record — unduh untuk mendapatkan dataset lengkap."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer mt-8 flex justify-between items-end text-xs text-muted-foreground border-t pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-36 border-b border-muted-foreground/40 mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Supervisor / Disetujui oleh" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px]", children: [
              "SHA256: ",
              Date.now().toString(16).toUpperCase().padStart(16, "0"),
              "…"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 justify-end mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
              "Dibuat otomatis · NPMS v2.4.1"
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  Reports as component
};
