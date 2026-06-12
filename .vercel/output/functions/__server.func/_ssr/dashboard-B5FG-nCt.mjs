import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppLayout, B as Badge } from "./app-layout-DIu8u0Fv.mjs";
import { u as useUser, C as Card, c as CardContent, a as CardHeader, b as CardTitle, B as Button } from "./card-DwF1RqPI.mjs";
import { d as fifoPerformance } from "./mock-data-DRcJGsO9.mjs";
import { R as Route$1 } from "./router-Cmfz48Et.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { W as Activity, Y as PackagePlus, Z as PackageMinus, x as Boxes, _ as ArrowUpRight, $ as ArrowDownRight, h as TrendingUp, V as CircleX, v as TriangleAlert, a0 as Info, u as CircleCheck } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Area, L as LineChart, b as Line, B as BarChart, c as Bar } from "../_libs/recharts.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tailwind-merge.mjs";
import "./server-BUYfpcon.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/es-toolkit.mjs";
import "../_libs/reselect.mjs";
import "../_libs/react-is.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/reduxjs__toolkit.mjs";
import "../_libs/redux.mjs";
import "../_libs/immer.mjs";
import "../_libs/redux-thunk.mjs";
import "../_libs/react-redux.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function Dashboard() {
  const data = Route$1.useLoaderData();
  const user = useUser();
  const firstName = user?.name ? user.name.split(" ")[0] : "Operator";
  const {
    kpis: dbKpis,
    dailyTrend,
    productionLines,
    activities,
    alerts
  } = data;
  const kpiCards = [{
    label: "Produksi Hari Ini",
    value: dbKpis.todayProduction.toLocaleString(),
    delta: "+12.4%",
    up: true,
    icon: Activity,
    hint: "vs kemarin"
  }, {
    label: "Total Part Masuk",
    value: dbKpis.totalPartsIn.toLocaleString(),
    delta: "+8.1%",
    up: true,
    icon: PackagePlus,
    hint: "Sub-Assy"
  }, {
    label: "Total Part Keluar",
    value: dbKpis.totalPartsOut.toLocaleString(),
    delta: "-2.3%",
    up: false,
    icon: PackageMinus,
    hint: "Lini Assy"
  }, {
    label: "Kepatuhan FIFO",
    value: dbKpis.fifoCompliance,
    delta: "+1.2%",
    up: true,
    icon: Boxes,
    hint: "rata-rata 7 hari"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Dashboard", subtitle: `Halo, ${firstName} — Anda memiliki 3 tugas produksi hari ini.`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: kpiCards.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-0 shadow-soft hover:shadow-elevated transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground", children: k.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-3xl font-semibold tracking-tight", children: k.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-2 inline-flex items-center gap-1 text-xs font-medium ${k.up ? "text-success" : "text-destructive"}`, children: [
          k.up ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "h-3.5 w-3.5" }),
          k.delta,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-1", children: k.hint })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-gradient-primary/10 grid place-items-center text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(k.icon, { className: "h-5 w-5" }) })
    ] }) }) }, k.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Tren Produksi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Output harian Sub-Assy dan Assy" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
            "Minggu ini"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: dailyTrend, margin: {
            left: -10,
            right: 8,
            top: 8
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g1", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.61 0.20 144)", stopOpacity: 0.35 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.61 0.20 144)", stopOpacity: 0 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g2", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.51 0.18 142)", stopOpacity: 0.25 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.51 0.18 142)", stopOpacity: 0 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)", vertical: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", stroke: "var(--muted-foreground)", fontSize: 12, tickLine: false, axisLine: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 12, tickLine: false, axisLine: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              fontSize: 12
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "subAssy", stroke: "oklch(0.61 0.20 144)", fill: "url(#g1)", strokeWidth: 2 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "assy", stroke: "oklch(0.51 0.18 142)", fill: "url(#g2)", strokeWidth: 2 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 mt-3 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-primary" }),
              "Sub-Assy"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[oklch(0.51_0.18_142)]" }),
              "Assy"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Performa FIFO" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tingkat kepatuhan mingguan" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-semibold tracking-tight", children: "98.4%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-success mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" }),
            " +1.2% vs minggu lalu"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: fifoPerformance, margin: {
            left: -20,
            right: 8,
            top: 8
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)", vertical: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "week", stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: [85, 100], stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              fontSize: 12
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "rate", stroke: "oklch(0.61 0.20 144)", strokeWidth: 2.5, dot: {
              r: 3,
              fill: "oklch(0.61 0.20 144)"
            } })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Sub-Assy vs Assy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Perbandingan volume produksi" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: dailyTrend, margin: {
          left: -10,
          right: 8
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", stroke: "var(--muted-foreground)", fontSize: 12, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 12, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "subAssy", fill: "oklch(0.61 0.20 144)", radius: [6, 6, 0, 0] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "assy", fill: "oklch(0.51 0.18 142)", radius: [6, 6, 0, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Lini Produksi Aktif" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Status langsung" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: productionLines.map((l, i) => {
          const lineId = l.id || l;
          const lineName = l.name || l;
          const lineActive = l.active !== void 0 ? l.active : true;
          const status = !lineActive ? "idle" : i === 1 ? "idle" : i === 4 ? "warning" : "running";
          const pct = l.percentage ?? [88, 0, 76, 92, 64][i % 5];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${status === "running" ? "bg-success animate-pulse" : status === "warning" ? "bg-warning" : "bg-muted-foreground"}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: lineName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${status === "running" ? "bg-gradient-primary" : status === "warning" ? "bg-warning" : "bg-muted-foreground/40"}`, style: {
              width: `${pct}%`
            } }) })
          ] }, lineId);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Peringatan Produksi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Perlu perhatian" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: alerts.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          alerts.map((a) => {
            const Icon = a.severity === "error" ? CircleX : a.severity === "warning" ? TriangleAlert : Info;
            const color = a.severity === "error" ? "text-destructive bg-destructive/10" : a.severity === "warning" ? "text-warning bg-warning/15" : "text-info bg-info/10";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/40 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-8 w-8 rounded-lg grid place-items-center shrink-0 ${color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: a.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: a.desc })
              ] })
            ] }, a.id);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "w-full mt-2 text-primary", children: "Lihat semua peringatan" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Aktivitas Terkini" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Log audit langsung di seluruh lantai produksi" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", children: "Lihat log lengkap" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[7px] top-1 bottom-1 w-px bg-border" }),
        activities.map((a) => {
          const Icon = a.type === "error" ? CircleX : a.type === "warning" ? TriangleAlert : a.type === "success" ? CircleCheck : Info;
          const color = a.type === "error" ? "bg-destructive" : a.type === "warning" ? "bg-warning" : a.type === "success" ? "bg-success" : "bg-info";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pb-4 last:pb-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -left-[22px] top-1 h-3.5 w-3.5 rounded-full ${color} ring-4 ring-background grid place-items-center text-white`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-2 w-2" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: a.text }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground shrink-0", children: a.time })
            ] })
          ] }, a.id);
        })
      ] }) })
    ] })
  ] });
}
export {
  Dashboard as component
};
