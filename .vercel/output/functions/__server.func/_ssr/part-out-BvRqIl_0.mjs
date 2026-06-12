import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout, B as Badge } from "./app-layout-BECCBZkF.mjs";
import { u as useUser, C as Card, a as CardHeader, b as CardTitle, c as CardContent, I as Input, B as Button } from "./card-DOXbU1xW.mjs";
import { L as Label } from "./label-Cj9YMssb.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Cz3gOylx.mjs";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-BcU1k-16.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { q as dispatchFifoMaterial, p as getFifoMaterials, l as getActiveLines, a as getParts } from "./router--DqMp0Ks.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { u as Boxes, v as CircleCheck, w as TriangleAlert, x as Send } from "../_libs/lucide-react.mjs";
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
function PartOut() {
  const user = useUser();
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [showBypassDialog, setShowBypassDialog] = reactExports.useState(false);
  const [bypassReason, setBypassReason] = reactExports.useState("");
  const {
    data: fifoData
  } = useQuery({
    queryKey: ["fifoMaterials"],
    queryFn: () => getFifoMaterials()
  });
  const materials = fifoData?.materials ?? [];
  const {
    data: dbLines
  } = useQuery({
    queryKey: ["activeLines"],
    queryFn: () => getActiveLines()
  });
  const {
    data: dbParts
  } = useQuery({
    queryKey: ["parts"],
    queryFn: () => getParts()
  });
  const lines = dbLines && dbLines.length > 0 ? dbLines.filter((l) => l.type === "out" || l.type === "both").map((l) => l.name) : ["SS-1", "SS-2"];
  const [form, setForm] = reactExports.useState({
    part: "K18H",
    product: "SS COMP K18H Assy",
    qty: "400",
    line: "SS-2",
    operator: "",
    lot: "",
    date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16),
    shift: "Shift 1"
  });
  reactExports.useEffect(() => {
    if (user?.name) {
      setForm((f) => ({
        ...f,
        operator: user.name
      }));
    }
  }, [user]);
  reactExports.useEffect(() => {
    if (materials.length > 0 && !form.lot) {
      const firstMat = materials[0];
      setForm((f) => ({
        ...f,
        lot: firstMat.lotNumber,
        part: firstMat.partNumber,
        product: `SS COMP ${firstMat.partNumber} Assy`
      }));
    }
  }, [materials]);
  const handlePartChange = (selectedPart) => {
    const foundPart = partsList.find((p) => p.partNumber === selectedPart);
    setForm({
      ...form,
      part: selectedPart,
      product: foundPart ? foundPart.productName : `SS COMP ${selectedPart} Assy`,
      lot: ""
    });
  };
  const handleLotChange = (selectedLot) => {
    const found = materials.find((m) => m.lotNumber === selectedLot);
    if (found) {
      setForm({
        ...form,
        lot: selectedLot,
        part: found.partNumber,
        product: `SS COMP ${found.partNumber} Assy`,
        qty: String(found.quantity)
        // Default to max available quantity
      });
    }
  };
  const availableLots = materials.filter((m) => m.partNumber === form.part);
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
          date: form.date
        }
      });
      if (res.success) {
        toast.success("Transaksi Part Out berhasil dicatat.");
        queryClient.invalidateQueries({
          queryKey: ["fifoMaterials"]
        });
      }
    } catch (err) {
      toast.error("Gagal menyelesaikan checkout.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  const handleBypassRequest = () => {
    if (!bypassReason.trim()) {
      toast.error("Harap berikan alasan untuk bypass.");
      return;
    }
    const saved = localStorage.getItem("npms_approvals");
    const currentApprovals = saved ? JSON.parse(saved) : [];
    const newBypass = {
      id: `APP-${Math.floor(4e3 + Math.random() * 999)}`,
      lotNumber: form.lot,
      partNumber: form.part,
      quantity: Number(form.qty),
      operator: form.operator || user?.name || "Demo Operator",
      reason: `FIFO Violation Bypass: ${bypassReason.trim()}`
    };
    const updated = [newBypass, ...currentApprovals];
    localStorage.setItem("npms_approvals", JSON.stringify(updated));
    setShowBypassDialog(false);
    setBypassReason("");
    toast.success(`Permintaan bypass dikirim untuk Lot ${form.lot}. Menunggu persetujuan supervisor.`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.lot) {
      toast.error("Tidak ada lot FIFO yang dipilih.");
      return;
    }
    if (!form.qty || Number(form.qty) <= 0) {
      toast.error("Jumlah harus lebih dari 0");
      return;
    }
    if (!isFIFOCompliant) {
      setShowBypassDialog(true);
      return;
    }
    await proceedSubmit();
  };
  const partsList = dbParts && dbParts.length > 0 ? dbParts : [{
    partNumber: "K18H",
    productName: "SS COMP K18H Assy",
    threshold: 400
  }, {
    partNumber: "K84A",
    productName: "SS COMP K84A Assy",
    threshold: 200
  }, {
    partNumber: "KRHW",
    productName: "SS COMP KRHW Assy",
    threshold: 100
  }, {
    partNumber: "XD 831",
    productName: "SS COMP XD 831 Assy",
    threshold: 30
  }, {
    partNumber: "1PA",
    productName: "SS COMP 1PA Assy",
    threshold: 20
  }, {
    partNumber: "1WD",
    productName: "SS COMP 1WD Assy",
    threshold: 10
  }];
  const stockSummary = partsList.map((s) => {
    const dbQty = materials.filter((m) => m.partNumber === s.partNumber).reduce((sum, m) => sum + Number(m.quantity), 0);
    return {
      part: s.partNumber,
      name: s.productName,
      available: materials.length > 0 ? dbQty : 0,
      reserved: 0,
      threshold: s.threshold
    };
  });
  const selectedMat = materials.find((m) => m.lotNumber === form.lot);
  const isFIFOCompliant = selectedMat ? !materials.some((m) => m.partNumber === selectedMat.partNumber && new Date(m.incomingDate) < new Date(selectedMat.incomingDate)) : true;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Part Out", subtitle: "Catat part keluar dari lini Sub-Assy ke Assy.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Transaksi Keluar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pilih lot material untuk dicatat pengeluarannya. Stok divalidasi secara real-time." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "part", children: "Nomor Part" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.part, onValueChange: handlePartChange, disabled: submitting, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "part", className: "h-11 font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih Nomor Part" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: partsList.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.partNumber, className: "font-mono", children: [
                  p.partNumber,
                  " - ",
                  p.productName
                ] }, p.partNumber)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lot", children: "Lot FIFO" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.lot, onValueChange: handleLotChange, disabled: submitting || !form.part, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "lot", className: "h-11 font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: form.part ? "Pilih Nomor Lot" : "Pilih Part dulu" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  availableLots.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: m.lotNumber, className: "font-mono", children: [
                    m.lotNumber,
                    " (Tersedia: ",
                    m.quantity,
                    ")"
                  ] }, m.lotNumber)),
                  availableLots.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", disabled: true, children: "Tidak ada lot aktif" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nama Produk" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.product, readOnly: true, className: "h-11 bg-muted/30" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "qty", children: "Jumlah" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "qty", type: "number", value: form.qty, onChange: (e) => setForm({
                ...form,
                qty: e.target.value
              }), className: "h-11 text-lg font-semibold tabular-nums", disabled: submitting })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dest", children: "Lini Tujuan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.line, onValueChange: (v) => setForm({
                ...form,
                line: v
              }), disabled: submitting, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "dest", className: "h-11", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: lines.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l, children: l }, l)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "operator", children: "Operator" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "operator", value: form.operator, onChange: (e) => setForm({
                ...form,
                operator: e.target.value
              }), className: "h-11", disabled: submitting })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", children: "Tanggal / Waktu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "date", type: "datetime-local", value: form.date, onChange: (e) => setForm({
                ...form,
                date: e.target.value
              }), className: "h-11", disabled: submitting })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "shift", children: "Shift" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.shift, onValueChange: (v) => setForm({
                ...form,
                shift: v
              }), disabled: submitting, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "shift", className: "h-11", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Shift 1", children: "Shift 1 · 07:00 – 15:00" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Shift 2", children: "Shift 2 · 15:00 – 23:00" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Shift 3", children: "Shift 3 · 23:00 – 07:00" })
                ] })
              ] })
            ] })
          ] }),
          selectedMat && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg p-4 text-sm flex flex-col gap-3 border bg-primary/5 border-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold flex items-center gap-2 text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-4 w-4" }),
              " Informasi Asal (Part In)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Lini Asal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mt-0.5", children: selectedMat.originLine || "Tidak diketahui" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Qty Awal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mt-0.5 tabular-nums", children: selectedMat.originalQuantity || selectedMat.quantity })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Tanggal Masuk" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mt-0.5", children: selectedMat.incomingDate })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Operator In" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mt-0.5", children: selectedMat.operator || "Sistem" })
              ] })
            ] })
          ] }),
          form.lot && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-lg p-3 text-xs flex items-center gap-2 border ${isFIFOCompliant ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}`, children: isFIFOCompliant ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
            " Stok tersedia · Urutan FIFO terpenuhi. Siap untuk dikirim."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
            " PERINGATAN: Lot yang lebih lama ada di inventori! Mengirim lot ini akan melanggar aturan FIFO."
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: submitting, className: "w-full h-12 bg-gradient-primary shadow-glow gap-2 text-base", children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
            "Kirim Part Out"
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-4 w-4 text-primary" }),
            "Ringkasan stok"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Inventori real-time" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: stockSummary.map((s) => {
          const low = s.available < s.threshold;
          const pct = Math.min(100, s.available / (s.threshold * 2) * 100);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-muted-foreground", children: s.part }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: s.name })
              ] }),
              low && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "bg-warning/15 text-warning border-warning/20 gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
                "Low"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${low ? "bg-warning" : "bg-gradient-primary"}`, style: {
              width: `${pct}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Tersedia ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground tabular-nums", children: s.available })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Dipesan ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: s.reserved })
              ] })
            ] })
          ] }, s.part);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showBypassDialog, onOpenChange: setShowBypassDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pelanggaran FIFO Terdeteksi" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Lot ",
          form.lot,
          " bukan lot tertua di stok. Untuk melanjutkan, Anda harus mengajukan permintaan persetujuan ke supervisor Anda."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reason", children: "Alasan bypass (Wajib diisi)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "reason", placeholder: "mis. Lot lama rusak, tidak dapat diakses, atau dikunci QC", value: bypassReason, onChange: (e) => setBypassReason(e.target.value), className: "h-11" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", type: "button", onClick: () => setShowBypassDialog(false), children: "Batal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "bg-gradient-primary text-white", onClick: handleBypassRequest, children: "Kirim Permintaan" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  PartOut as component
};
