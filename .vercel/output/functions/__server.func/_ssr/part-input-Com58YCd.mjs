import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout, B as Badge, j as getPref } from "./app-layout-DECZbxqI.mjs";
import { u as useUser, C as Card, a as CardHeader, b as CardTitle, c as CardContent, I as Input, B as Button } from "./card-CvatCQhy.mjs";
import { L as Label } from "./label-hPahR7yQ.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-SaV2XhpA.mjs";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-D-0t4uZa.mjs";
import { n as addProductionRecord, h as getActiveLines } from "./router-cT5_Z0GV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import "../_libs/seroval.mjs";
import { z as ScanLine, e as Save, w as Send, k as Package, A as Layers, C as Clock, u as CircleCheck, T as Trash2, c as Printer } from "../_libs/lucide-react.mjs";
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
import "./server-DvOc5icW.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
function PartInput() {
  const user = useUser();
  const [open, setOpen] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const {
    data: dbLines
  } = useQuery({
    queryKey: ["activeLines"],
    queryFn: () => getActiveLines()
  });
  const lines = dbLines && dbLines.length > 0 ? dbLines.map((l) => l.name) : ["SC-1", "SC-2", "SC-3", "SS-1", "SS-2"];
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
    barcode: "",
    part: "K18H",
    product: "SS COMP K18H Sub-Assy",
    line: "SC-1",
    qty: "400",
    lot: "SC1 126-7",
    date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
  });
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
    toast.success("Draft saved successfully.");
  };
  const handleLoadDraft = (d) => {
    setForm({
      ...d.data
    });
    toast.info(`Draft ${d.id} loaded.`);
  };
  const handleDeleteDraft = (id, e) => {
    e.stopPropagation();
    const updated = drafts.filter((d) => d.id !== id);
    setDrafts(updated);
    localStorage.setItem("npms_drafts", JSON.stringify(updated));
    toast.success("Draft deleted.");
  };
  const handleBarcodeChange = (val) => {
    let part = "K18H";
    let product = "SS COMP K18H Sub-Assy";
    let qty = "400";
    const normalizedVal = val.toUpperCase().trim();
    if (normalizedVal.includes("K84A")) {
      part = "K84A";
      product = "SS COMP K84A Sub-Assy";
      qty = "512";
    } else if (normalizedVal.includes("KRHW")) {
      part = "KRHW";
      product = "SS COMP KRHW Sub-Assy";
      qty = "200";
    } else if (normalizedVal.includes("XD 831") || normalizedVal.includes("XD831")) {
      part = "XD 831";
      product = "SS COMP XD 831 Sub-Assy";
      qty = "41";
    } else if (normalizedVal.includes("1PA")) {
      part = "1PA";
      product = "SS COMP 1PA Sub-Assy";
      qty = "19";
    } else if (normalizedVal.includes("1WD")) {
      part = "1WD";
      product = "SS COMP 1WD Sub-Assy";
      qty = "100";
    } else if (normalizedVal.includes("KYEG")) {
      part = "KYEG";
      product = "SS COMP KYEG Sub-Assy";
      qty = "150";
    } else if (normalizedVal.includes("K45A")) {
      part = "K45A";
      product = "SS COMP K45A Sub-Assy";
      qty = "250";
    }
    const counter = Math.floor(10 + Math.random() * 89);
    const lotNum = normalizedVal.startsWith("SC1") || normalizedVal.startsWith("LOT") ? normalizedVal : `SC1 126-${counter}`;
    setForm({
      ...form,
      barcode: val,
      part,
      product,
      qty,
      lot: lotNum
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.part.trim()) {
      toast.error("Part Number is required");
      return;
    }
    if (!form.lot.trim()) {
      toast.error("Lot Number is required");
      return;
    }
    if (!form.qty || Number(form.qty) <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    setSubmitting(true);
    try {
      const res = await addProductionRecord({
        data: {
          partNumber: form.part,
          productName: form.product,
          quantity: Number(form.qty),
          line: form.line,
          operator: user?.name || "Demo Operator",
          lotNumber: form.lot,
          date: form.date
        }
      });
      if (res.success) {
        setOpen(true);
        setForm((f) => ({
          ...f,
          barcode: ""
        }));
        toast.success("Transaction submitted to database.");
        if (getPref("autoPrintLabels")) {
          toast.info("Auto-print triggered.", {
            description: `Printing QR label for ${form.part} (${form.qty} pcs) · ${form.lot}`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
            duration: 4e3
          });
        }
      }
    } catch (err) {
      toast.error("Failed to submit production record.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Part In", subtitle: "Quickly record Sub-Assy and Assy production transactions (Part Input).", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Production Transaction" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Scan a barcode or fill in the fields manually." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "h-7 w-7" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Barcode Scanner" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Focus the input and scan, or type manually." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "bg-success/10 text-success border-success/20 gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success animate-pulse" }),
                " Ready"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, value: form.barcode, onChange: (e) => handleBarcodeChange(e.target.value), placeholder: "Scan or enter barcode (e.g. K18H, K84A, SC1 126-7)...", className: "mt-4 h-12 text-base font-mono bg-background", disabled: submitting })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "part", children: "TYPE (Part Number)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "part", value: form.part, onChange: (e) => setForm({
                  ...form,
                  part: e.target.value
                }), className: "font-mono h-11", disabled: submitting })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "product", children: "Product Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "product", value: form.product, onChange: (e) => setForm({
                  ...form,
                  product: e.target.value
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "lot", value: form.lot, onChange: (e) => setForm({
                  ...form,
                  lot: e.target.value
                }), className: "font-mono h-11", disabled: submitting })
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
                "Save Draft"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: submitting, className: "gap-2 sm:flex-1 h-11 bg-gradient-primary shadow-glow", children: [
                submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
                "Submit Transaction"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Auto-fill preview" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Package, label: "Product", value: form.product }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Layers, label: "Category", value: form.product.toLowerCase().includes("sub") ? "Sub-Assy" : "Assy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Clock, label: "Default shift", value: getPref("defaultShift") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-success/10 border border-success/20 p-3 text-xs text-success flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
              " Validation passed — ready to submit."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Today's tally" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "grid grid-cols-2 gap-3 text-sm", children: [{
            l: "Submitted",
            v: "Active"
          }, {
            l: "Drafts",
            v: String(drafts.length)
          }, {
            l: "Approved",
            v: "Live"
          }, {
            l: "Rejected",
            v: "0"
          }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.l }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-semibold mt-1", children: s.v })
          ] }, s.l)) })
        ] }),
        drafts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saved Drafts" }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-center", children: "Transaction Submitted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-center", children: [
          "Part ",
          form.part,
          " (",
          form.qty,
          " pcs) recorded on ",
          form.line,
          ". The transaction has been persisted in MySQL."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-gradient-primary", onClick: () => setOpen(false), children: "Continue" }) })
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
