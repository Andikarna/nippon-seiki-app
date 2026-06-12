import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { A as AppLayout, B as Badge, D as DropdownMenu, c as DropdownMenuTrigger, d as DropdownMenuContent, e as DropdownMenuItem } from "./app-layout-DIu8u0Fv.mjs";
import { u as useUser, C as Card, c as CardContent, I as Input, B as Button } from "./card-DwF1RqPI.mjs";
import { L as Label } from "./label-iU8VJ1mI.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CTYi7Z2Z.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-xtipYBen.mjs";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-BXkIf75U.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as getProductionRecords, j as updateProductionRecord, k as deleteProductionRecord, h as getActiveLines } from "./router-Cmfz48Et.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as utils, w as writeFileSync } from "../_libs/xlsx.mjs";
import "../_libs/seroval.mjs";
import { p as Search, q as Funnel, D as Download, P as Plus, E as Ellipsis, r as Eye, a as Pencil, T as Trash2, s as ChevronLeft, t as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-BUYfpcon.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
function statusBadge(status) {
  const map = {
    Completed: "bg-success/15 text-success border-success/20",
    "In Progress": "bg-info/15 text-info border-info/20",
    Pending: "bg-warning/15 text-warning border-warning/20"
  };
  return map[status] ?? "bg-muted text-muted-foreground";
}
function ProductionPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = useUser();
  const canCreateEntry = user?.role === "operator";
  const [q, setQ] = reactExports.useState("");
  const [line, setLine] = reactExports.useState("all");
  const [status, setStatus] = reactExports.useState("all");
  const [startDate, setStartDate] = reactExports.useState("");
  const [endDate, setEndDate] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const perPage = 10;
  const [showDateRangeDialog, setShowDateRangeDialog] = reactExports.useState(false);
  const [viewRecord, setViewRecord] = reactExports.useState(null);
  const [editRecord, setEditRecord] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [editForm, setEditForm] = reactExports.useState({
    quantity: "",
    line: "",
    operator: "",
    status: ""
  });
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["productionRecords", q, line, status, startDate, endDate, page],
    queryFn: () => getProductionRecords({
      data: {
        q,
        line,
        status,
        startDate,
        endDate,
        page,
        perPage
      }
    })
  });
  const records = data?.records ?? [];
  const total = data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const {
    data: dbLines
  } = useQuery({
    queryKey: ["activeLines"],
    queryFn: () => getActiveLines()
  });
  const lines = dbLines && dbLines.length > 0 ? dbLines.map((l) => l.name) : ["SC-1", "SC-2", "SC-3", "SS-1", "SS-2"];
  const startEdit = (r) => {
    setEditRecord(r);
    setEditForm({
      quantity: String(r.quantity),
      line: r.line,
      operator: r.operator,
      status: r.status
    });
  };
  const handleSaveEdit = async () => {
    if (!editRecord) return;
    try {
      const res = await updateProductionRecord({
        data: {
          id: editRecord.id,
          quantity: Number(editForm.quantity),
          line: editForm.line,
          operator: editForm.operator,
          status: editForm.status
        }
      });
      if (res.success) {
        toast.success(`Record ${editRecord.id} berhasil diperbarui.`);
        setEditRecord(null);
        queryClient.invalidateQueries({
          queryKey: ["productionRecords"]
        });
      } else {
        toast.error("Gagal memperbarui record.");
      }
    } catch {
      toast.error("Gagal menyimpan perubahan.");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await deleteProductionRecord({
        data: {
          id: deleteId
        }
      });
      if (res.success) {
        toast.success(`Record ${deleteId} dihapus.`);
        setDeleteId(null);
        queryClient.invalidateQueries({
          queryKey: ["productionRecords"]
        });
      } else {
        toast.error("Gagal menghapus record.");
      }
    } catch {
      toast.error("Gagal menyelesaikan penghapusan.");
    }
  };
  const handleExportExcel = async () => {
    try {
      const res = await getProductionRecords({
        data: {
          q,
          line,
          status,
          startDate,
          endDate,
          page: 1,
          perPage: 1e4
        }
      });
      const allRecords = res?.records ?? [];
      if (allRecords.length === 0) {
        toast.warning("Tidak ada record untuk diekspor.");
        return;
      }
      const dataRows = [["ID Produksi", "Tanggal", "Nomor Part", "Nama Produk", "Qty", "Lini", "Operator", "Status"], ...allRecords.map((r) => [r.id, r.date, r.partNumber, r.productName, Number(r.quantity), r.line, r.operator, r.status])];
      const worksheet = utils.aoa_to_sheet(dataRows);
      worksheet["!cols"] = [
        {
          wch: 18
        },
        // Production ID
        {
          wch: 14
        },
        // Date
        {
          wch: 16
        },
        // Part Number
        {
          wch: 32
        },
        // Product Name
        {
          wch: 10
        },
        // Qty
        {
          wch: 10
        },
        // Line
        {
          wch: 22
        },
        // Operator
        {
          wch: 15
        }
        // Status
      ];
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Production Data");
      const fileName = `production_records_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.xlsx`;
      writeFileSync(workbook, fileName);
      toast.success("Data produksi berhasil diekspor ke Excel.");
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengekspor data ke Excel.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Production Data", subtitle: "Pantau setiap transaksi produksi di semua lini.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 md:p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-3 lg:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => {
            setQ(e.target.value);
            setPage(1);
          }, placeholder: "Cari nomor part atau nama produk...", className: "pl-9 bg-muted/40 border-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: line, onValueChange: (v) => {
            setLine(v);
            setPage(1);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Semua lini" }),
              lines.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l, children: l }, l))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: status, onValueChange: (v) => {
            setStatus(v);
            setPage(1);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Semua status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Completed", children: "Selesai" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "In Progress", children: "Sedang Berjalan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Pending", children: "Menunggu" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", onClick: () => setShowDateRangeDialog(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4" }),
            startDate || endDate ? "Rentang tanggal (Aktif)" : "Rentang tanggal"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", onClick: handleExportExcel, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            "Export"
          ] }),
          canCreateEntry && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2 bg-gradient-primary", onClick: () => navigate({
            to: "/part-input"
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            "Entri Baru"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40 hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "ID Produksi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tanggal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nomor Part" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nama Produk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Qty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Lini" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Operator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-12" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { colSpan: 9, className: "text-center py-10 text-muted-foreground text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" }),
          "Memuat data produksi..."
        ] }) }) : records.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 9, className: "text-center py-10 text-muted-foreground text-sm", children: "Tidak ada record yang cocok." }) }) : records.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs font-medium", children: r.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: r.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: r.partNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.productName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-medium tabular-nums", children: r.quantity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: r.line }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: r.operator }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: statusBadge(r.status), children: r.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => setViewRecord(r), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 mr-2" }),
                "Lihat"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => startEdit(r), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4 mr-2" }),
                "Edit"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-destructive", onClick: () => setDeleteId(r.id), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                "Hapus"
              ] })
            ] })
          ] }) })
        ] }, r.id)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          "Menampilkan ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
            (page - 1) * perPage + 1,
            "-",
            Math.min(page * perPage, total)
          ] }),
          " dari ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: total })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", className: "h-8 w-8", disabled: page === 1, onClick: () => setPage((p) => p - 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          Array.from({
            length: pages
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: page === i + 1 ? "default" : "outline", size: "sm", className: `h-8 w-8 p-0 ${page === i + 1 ? "bg-gradient-primary" : ""}`, onClick: () => setPage(i + 1), children: i + 1 }, i)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", className: "h-8 w-8", disabled: page === pages, onClick: () => setPage((p) => p + 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDateRangeDialog, onOpenChange: setShowDateRangeDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Filter berdasarkan Rentang Tanggal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Pilih tanggal mulai dan akhir untuk memfilter data produksi." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "start", children: "Tanggal Mulai" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "start", type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "end", children: "Tanggal Akhir" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "end", type: "date", value: endDate, onChange: (e) => setEndDate(e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", type: "button", onClick: () => {
            setStartDate("");
            setEndDate("");
            setShowDateRangeDialog(false);
          }, children: "Hapus Filter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "bg-gradient-primary text-white", onClick: () => setShowDateRangeDialog(false), children: "Terapkan" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!viewRecord, onOpenChange: (open) => !open && setViewRecord(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Detail Entri Produksi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Tampilan detail record transaksi ",
          viewRecord?.id,
          "."
        ] })
      ] }),
      viewRecord && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 py-1.5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "ID Produksi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 font-mono text-primary font-semibold", children: viewRecord.id })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 py-1.5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "Tanggal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 font-mono", children: viewRecord.date })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 py-1.5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "Nomor Part" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 font-mono font-semibold", children: viewRecord.partNumber })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 py-1.5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "Nama Produk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2", children: viewRecord.productName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 py-1.5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "Jumlah" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "col-span-2 font-semibold text-foreground", children: [
            viewRecord.quantity,
            " pcs"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 py-1.5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "Lini Produksi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: viewRecord.line }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 py-1.5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "Operator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2", children: viewRecord.operator })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 py-1.5 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: statusBadge(viewRecord.status), children: viewRecord.status }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-gradient-primary", onClick: () => setViewRecord(null), children: "Tutup" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editRecord, onOpenChange: (open) => !open && setEditRecord(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Record Produksi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Ubah detail transaksi untuk ",
          editRecord?.id,
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-qty", children: "Jumlah" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "edit-qty", type: "number", value: editForm.quantity, onChange: (e) => setEditForm({
              ...editForm,
              quantity: e.target.value
            }), className: "h-11" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-line", children: "Lini Produksi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: editForm.line, onValueChange: (v) => setEditForm({
              ...editForm,
              line: v
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "edit-line", className: "h-11", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: lines.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l, children: l }, l)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-status", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: editForm.status, onValueChange: (v) => setEditForm({
              ...editForm,
              status: v
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "edit-status", className: "h-11", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Completed", children: "Completed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "In Progress", children: "In Progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Pending", children: "Pending" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-op", children: "Nama Operator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "edit-op", value: editForm.operator, onChange: (e) => setEditForm({
              ...editForm,
              operator: e.target.value
            }), className: "h-11" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", type: "button", onClick: () => setEditRecord(null), children: "Batal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "bg-gradient-primary text-white", onClick: handleSaveEdit, children: "Simpan Perubahan" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!deleteId, onOpenChange: (open) => !open && setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Konfirmasi Hapus" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Apakah Anda yakin ingin menghapus secara permanen record produksi ",
          deleteId,
          "? Tindakan ini tidak dapat dibatalkan."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", type: "button", onClick: () => setDeleteId(null), children: "Batal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "destructive", onClick: handleConfirmDelete, children: "Hapus Record" })
      ] })
    ] }) })
  ] });
}
export {
  ProductionPage as component
};
