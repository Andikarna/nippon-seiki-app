import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout, B as Badge } from "./app-layout-DECZbxqI.mjs";
import { u as useUser, C as Card, a as CardHeader, b as CardTitle, c as CardContent, I as Input, B as Button } from "./card-CvatCQhy.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-R9seCpD8.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { o as checkFifoPosition, m as dispatchFifoMaterial, l as getFifoMaterials } from "./router-cT5_Z0GV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-D-0t4uZa.mjs";
import "../_libs/seroval.mjs";
import { u as CircleCheck, v as TriangleAlert, V as CircleX, z as ScanLine, S as ShieldCheck, C as Clock } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "./server-DvOc5icW.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
function FifoPage() {
  const user = useUser();
  const isSupervisor = user?.role === "supervisor" || user?.role === "manager";
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["fifoMaterials"],
    queryFn: () => getFifoMaterials()
  });
  const [lotNumber, setLotNumber] = reactExports.useState("");
  const [scanResult, setScanResult] = reactExports.useState(null);
  const [scanLoading, setScanLoading] = reactExports.useState(false);
  const [isApprovalsOpen, setIsApprovalsOpen] = reactExports.useState(false);
  const [approvals, setApprovals] = reactExports.useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("npms_approvals");
      if (saved) return JSON.parse(saved);
      const initial = [{
        id: "APP-4011",
        lotNumber: "SC1 126-8",
        partNumber: "K18H",
        quantity: 900,
        operator: "Afifi Rouf",
        reason: "FIFO Violation (SC1 126-7 is older)"
      }, {
        id: "APP-4012",
        lotNumber: "SC1 126-14",
        partNumber: "1PA",
        quantity: 200,
        operator: "Bayu Saputra",
        reason: "FIFO Violation (SC1 126-10 is older)"
      }];
      localStorage.setItem("npms_approvals", JSON.stringify(initial));
      return initial;
    } catch {
      return [];
    }
  });
  const handleApprove = async (a) => {
    try {
      const res = await dispatchFifoMaterial({
        data: {
          partNumber: a.partNumber,
          productName: `SS COMP ${a.partNumber} Assy`,
          quantity: a.quantity,
          destinationLine: "SS-2",
          operator: a.operator,
          lotNumber: a.lotNumber,
          date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16)
        }
      });
      if (res.success) {
        toast.success(`Lot ${a.lotNumber} bypass approved and dispatched successfully.`);
        const updated = approvals.filter((item) => item.id !== a.id);
        setApprovals(updated);
        localStorage.setItem("npms_approvals", JSON.stringify(updated));
      }
    } catch (err) {
      toast.error("Failed to process approval dispatch.");
      console.error(err);
    }
  };
  const handleReject = (id, lotNumber2) => {
    const updated = approvals.filter((a) => a.id !== id);
    setApprovals(updated);
    localStorage.setItem("npms_approvals", JSON.stringify(updated));
    toast.error(`Request for Lot ${lotNumber2} rejected.`);
  };
  const materials = data?.materials ?? [];
  const counts = data?.counts ?? {
    compliant: 0,
    warning: 0,
    violation: 0
  };
  const handleCheckFifo = async (e) => {
    e.preventDefault();
    if (!lotNumber.trim()) {
      toast.error("Please enter a lot number");
      return;
    }
    setScanLoading(true);
    try {
      const result = await checkFifoPosition({
        data: {
          lotNumber: lotNumber.trim()
        }
      });
      setScanResult(result);
      if (result.found) {
        if (result.isNext) {
          toast.success(`${lotNumber} is next in queue!`);
        } else {
          toast.warning(`${lotNumber} is NOT next in queue.`);
        }
      } else {
        toast.error(`Lot number ${lotNumber} not found in database.`);
      }
    } catch (err) {
      toast.error("Failed to check lot number");
    } finally {
      setScanLoading(false);
    }
  };
  const timeline = scanResult?.found ? scanResult.timeline : materials.slice(0, 5).map((m) => ({
    lot: m.lotNumber.slice(0, 5) + "..." + m.lotNumber.slice(-3),
    date: new Date(m.incomingDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    }),
    status: m.status === "Compliant" ? "use-next" : m.status === "Violation" ? "violation" : "queue"
  })).reverse();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "FIFO Check", subtitle: "Enforce First-In-First-Out material flow across the floor.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusCard, { label: "FIFO Compliant", value: counts.compliant, icon: CircleCheck, color: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusCard, { label: "Warnings", value: counts.warning, icon: TriangleAlert, color: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusCard, { label: "FIFO Violations", value: counts.violation, icon: CircleX, color: "destructive" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-1 border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Scan Lot Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Check FIFO position instantly." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCheckFifo, className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: lotNumber, onChange: (e) => setLotNumber(e.target.value), placeholder: "LOT-2025XXXXX", className: "pl-9 h-12 font-mono" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: scanLoading, className: "w-full h-11 bg-gradient-primary gap-2", children: [
              scanLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
              "Check FIFO position"
            ] })
          ] }),
          scanResult && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-lg p-3 text-xs flex items-start gap-2 border ${!scanResult.found ? "bg-destructive/10 text-destructive border-destructive/20" : scanResult.isNext ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}`, children: !scanResult.found ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Lot number not found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-80", children: "Make sure the lot exists in stock." })
            ] })
          ] }) : scanResult.isNext ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
                scanResult.lotNumber,
                " is next in queue"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-80", children: "Position 1 · use this material first." })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "FIFO Alert: Not next in queue" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "opacity-80", children: [
                "Position ",
                scanResult.position,
                " · Older lots exist for part ",
                scanResult.partNumber,
                "."
              ] })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Material Flow Timeline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: scanResult?.found ? `FIFO order for ${scanResult.partNumber}` : "Active production lot flow order" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[10%] right-[10%] top-10 h-0.5 bg-border" }),
          timeline.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-6 text-xs text-muted-foreground", children: "No active lots in timeline." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid gap-4 relative grid-cols-2 md:grid-cols-5`, children: timeline.map((s, i) => {
            const isNext = s.status === "use-next" || i === 0;
            const isV = s.status === "violation";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mx-auto h-12 w-12 rounded-full grid place-items-center text-white shadow-soft ring-4 ring-background ${isNext ? "bg-gradient-primary" : isV ? "bg-destructive" : "bg-muted-foreground/40"}`, children: isNext ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5" }) : isV ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs font-mono", children: s.lot }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: s.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `mt-1 text-[10px] ${isNext ? "bg-primary/10 text-primary border-primary/20" : isV ? "bg-destructive/10 text-destructive border-destructive/20" : ""}`, children: isNext ? "Use next" : isV ? "Violation" : "Queue" })
            ] }, i);
          }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "FIFO Materials" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "All tracked lots and their current FIFO status" })
        ] }),
        isSupervisor && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setIsApprovalsOpen(true), children: [
          "Supervisor approval queue ",
          approvals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1.5 bg-primary/10 text-primary", children: approvals.length })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40 hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Material ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Part Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Lot Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Incoming Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Position" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Qty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "FIFO Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { colSpan: 7, className: "text-center py-10 text-muted-foreground text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" }),
          "Loading FIFO materials..."
        ] }) }) : materials.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 7, className: "text-center py-10 text-muted-foreground text-sm", children: "No materials in stock." }) }) : materials.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs font-medium", children: m.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: m.partNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: m.lotNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: m.incomingDate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: m.position }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right tabular-nums font-medium", children: m.quantity }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
            m.status === "Compliant" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "bg-success/15 text-success border-success/20 gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
              "Compliant"
            ] }),
            m.status === "Warning" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "bg-warning/15 text-warning border-warning/20 gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
              "Warning"
            ] }),
            m.status === "Violation" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "bg-destructive/15 text-destructive border-destructive/20 gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
              "Violation"
            ] })
          ] })
        ] }, m.id)) })
      ] }) }) })
    ] }),
    isSupervisor && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isApprovalsOpen, onOpenChange: setIsApprovalsOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Supervisor Approval Queue" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Review pending FIFO bypass approval requests from operators." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2 max-h-[350px] overflow-y-auto pr-1", children: [
        approvals.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 rounded-xl border border-border bg-card hover:bg-muted/30 transition-all space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-primary", children: a.id }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] bg-warning/10 text-warning border-warning/20", children: "Pending" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-sm font-semibold font-mono", children: [
                a.lotNumber,
                " (",
                a.partNumber,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Submitted by Operator: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: a.operator })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Qty Requested" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-base font-semibold text-foreground tabular-nums", children: [
                a.quantity,
                " pcs"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs rounded-lg bg-destructive/5 border border-destructive/15 text-destructive p-2 flex items-start gap-1.5 font-sans", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: a.reason })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", className: "h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 hover:border-destructive/30", onClick: () => handleReject(a.id, a.lotNumber), children: "Reject Bypass" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", className: "h-8 text-xs bg-gradient-primary text-white", onClick: () => handleApprove(a), children: "Approve Bypass" })
          ] })
        ] }, a.id)),
        approvals.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground text-center py-8 italic flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8 text-success animate-bounce" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "All approval queues cleared! No pending bypass requests." })
        ] })
      ] })
    ] }) })
  ] });
}
function StatusCard({
  label,
  value,
  icon: Icon,
  color
}) {
  const map = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-3xl font-semibold tabular-nums", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-12 w-12 rounded-xl grid place-items-center border ${map[color]}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) })
  ] }) });
}
export {
  FifoPage as component
};
