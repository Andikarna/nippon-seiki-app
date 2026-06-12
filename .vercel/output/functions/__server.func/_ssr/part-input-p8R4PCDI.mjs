import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout, j as getPref, B as Badge } from "./app-layout-BECCBZkF.mjs";
import { u as useUser, C as Card, a as CardHeader, b as CardTitle, c as CardContent, I as Input, B as Button } from "./card-DOXbU1xW.mjs";
import { L as Label } from "./label-Cj9YMssb.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Cz3gOylx.mjs";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-BcU1k-16.mjs";
import { s as addProductionRecord, l as getActiveLines, a as getParts, r as getNextLotNumber } from "./router--DqMp0Ks.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import "../_libs/seroval.mjs";
import { e as Save, x as Send, k as Package, y as Layers, C as Clock, v as CircleCheck, T as Trash2, c as Printer } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-CtKxx6LB.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
function PartInput() {
  const user = useUser();
  const queryClient = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const {
    data: dbLines
  } = useQuery({
    queryKey: ["activeLines"],
    queryFn: () => getActiveLines()
  });
  const lines = dbLines && dbLines.length > 0 ? dbLines.filter((l) => l.type === "in" || l.type === "both").map((l) => l.name) : ["SC-1", "SC-2", "SC-3"];
  const {
    data: dbParts
  } = useQuery({
    queryKey: ["parts"],
    queryFn: () => getParts()
  });
  const partsList = dbParts ?? [];
  const [drafts, setDrafts] = reactExports.useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("npms_drafts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [form, setForm] = reactExports.useState({
    part: "",
    operator: "",
    line: "SC-1",
    qty: "400",
    lot: "",
    date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
  });
  reactExports.useEffect(() => {
    if (partsList.length > 0 && !form.part) {
      setForm((prev) => ({
        ...prev,
        part: partsList[0].partNumber
      }));
    }
  }, [partsList, form.part]);
  reactExports.useEffect(() => {
    if (user?.name) {
      setForm((prev) => ({
        ...prev,
        operator: prev.operator || user.name
      }));
    }
  }, [user]);
  const {
    data: lotData
  } = useQuery({
    queryKey: ["nextLotNumber", form.line, form.date],
    queryFn: () => getNextLotNumber({
      data: {
        line: form.line,
        date: form.date
      }
    }),
    enabled: !!form.line && !!form.date
  });
  reactExports.useEffect(() => {
    if (lotData?.lotNumber) {
      setForm((prev) => ({
        ...prev,
        lot: lotData.lotNumber
      }));
    }
  }, [lotData]);
  const handleSaveDraft = () => {
    const newDraft = {
      id: `DFT-${Math.floor(1e3 + Math.random() * 9e3)}`,
      time: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
      }),
      data: {
        ...form
      }
    };
    const updated = [newDraft, ...drafts];
    setDrafts(updated);
    localStorage.setItem("npms_drafts", JSON.stringify(updated));
    toast.success("Draft berhasil disimpan.");
  };
  const handleLoadDraft = (d) => {
    setForm({
      ...d.data
    });
    toast.info(`Draft ${d.id} dimuat.`);
  };
  const handleDeleteDraft = (id, e) => {
    e.stopPropagation();
    const updated = drafts.filter((d) => d.id !== id);
    setDrafts(updated);
    localStorage.setItem("npms_drafts", JSON.stringify(updated));
    toast.success("Draft dihapus.");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.part.trim()) {
      toast.error("Nomor Part wajib diisi");
      return;
    }
    if (!form.operator.trim()) {
      toast.error("Nama Operator wajib diisi");
      return;
    }
    if (!form.lot.trim()) {
      toast.error("Nomor Lot wajib diisi");
      return;
    }
    if (!form.qty || Number(form.qty) <= 0) {
      toast.error("Jumlah harus lebih dari 0");
      return;
    }
    setSubmitting(true);
    try {
      const res = await addProductionRecord({
        data: {
          partNumber: form.part,
          productName: partsList.find((p) => p.partNumber === form.part)?.productName || `SS COMP ${form.part} Sub-Assy`,
          quantity: Number(form.qty),
          line: form.line,
          operator: form.operator,
          lotNumber: form.lot,
          date: form.date
        }
      });
      if (res.success) {
        setOpen(true);
        toast.success("Transaksi berhasil dikirim ke database.");
        queryClient.invalidateQueries({
          queryKey: ["nextLotNumber"]
        });
        if (getPref("autoPrintLabels")) {
          toast.info("Auto-print dipicu.", {
            description: `Mencetak label QR untuk ${form.part} (${form.qty} pcs) · ${form.lot}`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
            duration: 4e3
          });
        }
      }
    } catch (err) {
      toast.error("Gagal mengirim data produksi.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Part In", subtitle: "Catat transaksi produksi Sub-Assy dan Assy dengan cepat (Input Part).", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Transaksi Produksi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Isi kolom di bawah ini untuk mencatat transaksi produksi." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "part", children: "TYPE (Part Number)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.part, onValueChange: (v) => setForm({
                ...form,
                part: v
              }), disabled: submitting, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "part", className: "h-11 font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih Part" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  partsList.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.partNumber, className: "font-mono", children: p.partNumber }, p.partNumber)),
                  partsList.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", disabled: true, children: "Tidak ada part terdaftar" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "operator", children: "Operator Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "operator", value: form.operator, onChange: (e) => setForm({
                ...form,
                operator: e.target.value
              }), className: "h-11", disabled: submitting })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "line", children: "LINE (Production Line)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.line, onValueChange: (v) => setForm({
                ...form,
                line: v
              }), disabled: submitting, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "line", className: "h-11", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: lines.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l, children: l }, l)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "qty", children: "TOTAL QTY (Quantity)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "qty", type: "number", value: form.qty, onChange: (e) => setForm({
                ...form,
                qty: e.target.value
              }), className: "h-11 text-lg font-semibold tabular-nums", disabled: submitting })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lot", children: "KODE (Lot Number)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "lot", value: form.lot, className: "font-mono h-11 bg-muted/40", disabled: true, readOnly: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", children: "TGL PROD (Production Date)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "date", type: "date", value: form.date, onChange: (e) => setForm({
                ...form,
                date: e.target.value
              }), className: "h-11", disabled: submitting })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", className: "gap-2 sm:flex-1 h-11", disabled: submitting, onClick: handleSaveDraft, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
              "Simpan Draft"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: submitting, className: "gap-2 sm:flex-1 h-11 bg-gradient-primary shadow-glow", children: [
              submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
              "Kirim Transaksi"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Pratinjau auto-fill" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Package, label: "Product", value: partsList.find((p) => p.partNumber === form.part)?.productName || `SS COMP ${form.part} Sub-Assy` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Layers, label: "Category", value: "Sub-Assy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Clock, label: "Shift default", value: getPref("defaultShift") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-success/10 border border-success/20 p-3 text-xs text-success flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
              " Validasi berhasil — siap untuk dikirim."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Rekap hari ini" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "grid grid-cols-2 gap-3 text-sm", children: [{
            l: "Terkirim",
            v: "Aktif"
          }, {
            l: "Draft",
            v: String(drafts.length)
          }, {
            l: "Disetujui",
            v: "Live"
          }, {
            l: "Ditolak",
            v: "0"
          }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.l }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-semibold mt-1", children: s.v })
          ] }, s.l)) })
        ] }),
        drafts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Draft Tersimpan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-primary/10 text-primary hover:bg-primary/20", children: drafts.length })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2 max-h-[250px] overflow-y-auto pr-1", children: drafts.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => handleLoadDraft(d), className: "flex items-center justify-between p-2.5 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs font-semibold text-primary", children: d.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground truncate", children: [
                d.data.part,
                " · ",
                d.data.qty,
                " pcs · ",
                d.data.line
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono", children: d.time }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity", onClick: (e) => handleDeleteDraft(d.id, e), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }, d.id)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-12 w-12 rounded-full bg-success/15 text-success grid place-items-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-center", children: "Transaksi Berhasil Dikirim" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-center", children: [
          "Part ",
          form.part,
          " (",
          form.qty,
          " pcs) dicatat pada ",
          form.line,
          ". Transaksi telah tersimpan di MySQL."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-gradient-primary", onClick: () => setOpen(false), children: "Lanjutkan" }) })
    ] }) })
  ] });
}
function Row({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: value })
  ] });
}
export {
  PartInput as component
};
