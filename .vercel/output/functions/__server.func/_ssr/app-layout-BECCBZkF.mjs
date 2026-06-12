import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useRouterState, d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useUser, g as getUser, s as setUser, I as Input, B as Button, d as cn } from "./card-DOXbU1xW.mjs";
import { R as Root2, T as Trigger, P as Portal2, C as Content2, I as Item2, S as Separator2, L as Label2, a as SubTrigger2, b as SubContent2, c as CheckboxItem2, d as ItemIndicator2, e as RadioItem2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { v as getAlerts } from "./router--DqMp0Ks.mjs";
import { a0 as LayoutDashboard, z as Factory, W as PackagePlus, a1 as ListChecks, Y as PackageMinus, c as Printer, a2 as Settings, p as Search, a3 as Sun, a4 as Moon, B as Bell, K as CircleX, w as TriangleAlert, $ as Info, O as ChevronDown, A as User, a5 as LogOut, t as ChevronRight, f as Check, a6 as Circle } from "../_libs/lucide-react.mjs";
const PERMS_KEY = "npms_role_permissions";
const ALL_PERMISSIONS = [
  "View Dashboard",
  "Input Production",
  "Part Out",
  "FIFO Check",
  "View Production Data",
  "Approve Transactions",
  "Review FIFO Violations",
  "Generate Reports",
  "Access Analytics",
  "Access All Reports",
  "Manage Users",
  "Manage Production Lines",
  "Manage Parts",
  "Export Data"
];
const PERMISSION_ROUTES = {
  "View Dashboard": ["/dashboard"],
  "Input Production": ["/part-input"],
  "Part Out": ["/part-out"],
  "FIFO Check": ["/fifo"],
  "View Production Data": ["/production"],
  "Approve Transactions": ["/production"],
  "Review FIFO Violations": ["/fifo"],
  "Generate Reports": ["/reports"],
  "Access Analytics": ["/dashboard", "/reports"],
  "Access All Reports": ["/reports"],
  "Manage Users": ["/settings"],
  "Manage Production Lines": ["/settings"],
  "Manage Parts": ["/settings"],
  "Export Data": ["/reports"]
};
const DEFAULT_ROLE_PERMISSIONS = {
  operator_in: [
    "View Dashboard",
    "Input Production"
  ],
  operator_out: [
    "View Dashboard",
    "Part Out",
    "FIFO Check"
  ],
  supervisor: [
    "View Dashboard",
    "Approve Transactions",
    "Review FIFO Violations",
    "Generate Reports",
    "View Production Data",
    "Export Data",
    "Manage Production Lines",
    "Manage Parts"
  ],
  manager: [
    "View Dashboard",
    "Access Analytics",
    "Access All Reports",
    "Manage Users",
    "View Production Data",
    "Export Data"
  ]
};
function loadRolePermissions() {
  if (typeof window === "undefined") return { ...DEFAULT_ROLE_PERMISSIONS };
  try {
    const migrationKey = "npms_perms_migrated_v4";
    const raw = localStorage.getItem(PERMS_KEY);
    if (!localStorage.getItem(migrationKey)) {
      localStorage.setItem(PERMS_KEY, JSON.stringify(DEFAULT_ROLE_PERMISSIONS));
      localStorage.setItem(migrationKey, "true");
      window.dispatchEvent(new Event("npms-permissions-changed"));
      return { ...DEFAULT_ROLE_PERMISSIONS };
    }
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return { ...DEFAULT_ROLE_PERMISSIONS };
}
function saveRolePermissions(perms) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PERMS_KEY, JSON.stringify(perms));
  window.dispatchEvent(new Event("npms-permissions-changed"));
}
function getAllowedRoutes(role, perms) {
  const rolePerms = perms[role] ?? [];
  const routes = /* @__PURE__ */ new Set();
  for (const perm of rolePerms) {
    const mapped = PERMISSION_ROUTES[perm] ?? [];
    mapped.forEach((r) => routes.add(r));
  }
  return Array.from(routes);
}
const PREFS_KEY = "npms_app_preferences";
const PREFS_EVENT = "npms-preferences-changed";
const DEFAULT_PREFERENCES = {
  realtimeNotifications: true,
  auditTrailEmails: false,
  autoPrintLabels: true,
  compactDensity: false,
  defaultShift: "Shift 1 · 07:00 – 15:00"
};
function loadPreferences() {
  if (typeof window === "undefined") return { ...DEFAULT_PREFERENCES };
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch {
  }
  return { ...DEFAULT_PREFERENCES };
}
function savePreferences(prefs) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  applyCompactDensity(prefs.compactDensity);
  window.dispatchEvent(new CustomEvent(PREFS_EVENT, { detail: prefs }));
}
function applyCompactDensity(enabled) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("compact", enabled);
}
function getPref(key) {
  return loadPreferences()[key];
}
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const IDLE_TIMEOUT = 1 * 60 * 60 * 1e3;
const LAST_ACTIVE_KEY = "npms_last_active";
const nav = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, group: "Main" },
  { label: "Production Data", to: "/production", icon: Factory, group: "Production" },
  { label: "Part In", to: "/part-input", icon: PackagePlus, group: "Production" },
  { label: "FIFO Check", to: "/fifo", icon: ListChecks, group: "Production" },
  { label: "Part Out", to: "/part-out", icon: PackageMinus, group: "Production" },
  { label: "Reports", to: "/reports", icon: Printer, group: "Reports" },
  { label: "Settings", to: "/settings", icon: Settings, group: "System" }
];
function AppLayout({ children, title, subtitle }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const user = useUser();
  const navigate = useNavigate();
  const [dark, setDark] = reactExports.useState(false);
  const [permsVersion, setPermsVersion] = reactExports.useState(0);
  const [prefs, setPrefs] = reactExports.useState(() => loadPreferences());
  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ["headerAlerts"],
    queryFn: () => getAlerts(),
    // Poll only when real-time notifications are enabled
    refetchInterval: prefs.realtimeNotifications ? 1e4 : false
  });
  reactExports.useEffect(() => {
    const saved = localStorage.getItem("npms_theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
    applyCompactDensity(loadPreferences().compactDensity);
  }, []);
  reactExports.useEffect(() => {
    const handler = (e) => {
      const updated = e.detail;
      if (updated) setPrefs(updated);
    };
    window.addEventListener("npms-preferences-changed", handler);
    return () => window.removeEventListener("npms-preferences-changed", handler);
  }, []);
  reactExports.useEffect(() => {
    const handler = () => setPermsVersion((v) => v + 1);
    window.addEventListener("npms-permissions-changed", handler);
    return () => window.removeEventListener("npms-permissions-changed", handler);
  }, []);
  reactExports.useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate({ to: "/login" });
    }
  }, [user, navigate]);
  reactExports.useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) return;
    if (!localStorage.getItem(LAST_ACTIVE_KEY)) {
      localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
    }
    const updateActivity = () => {
      localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
    };
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"];
    events.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });
    const interval = setInterval(() => {
      const lastActive = Number(localStorage.getItem(LAST_ACTIVE_KEY) || Date.now());
      const now = Date.now();
      if (now - lastActive > IDLE_TIMEOUT) {
        setUser(null);
        localStorage.removeItem(LAST_ACTIVE_KEY);
        toast.warning("Sesi Berakhir", {
          description: "Anda telah keluar karena tidak aktif selama 1 jam."
        });
        navigate({ to: "/login" });
      }
    }, 1e4);
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
      clearInterval(interval);
    };
  }, [user, navigate]);
  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("npms_theme", next ? "dark" : "light");
  };
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: "Memverifikasi sesi..." })
    ] }) });
  }
  const storedPerms = loadRolePermissions();
  const allowedRoutes = user ? getAllowedRoutes(user.role, storedPerms) : [];
  const allowedNav = nav.filter((n) => allowedRoutes.includes(n.to));
  const groups = Array.from(new Set(allowedNav.map((n) => n.group)));
  const isAllowed = allowedRoutes.includes(path) || path === "/";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-muted/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-16 flex items-center gap-2 px-4 border-b border-sidebar-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-1 rounded-lg flex items-center justify-center shadow-sm shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Nippon Seiki Indonesia", className: "h-7 w-auto object-contain" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight ml-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold tracking-wide text-sidebar-foreground", children: "NPMS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-sidebar-foreground/60", children: "Nippon Seiki" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-3 py-4 space-y-5 overflow-y-auto", children: groups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 mb-1 text-[10px] uppercase tracking-wider text-sidebar-foreground/40 font-semibold", children: g }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: allowedNav.filter((n) => n.group === g).map((n) => {
          const active = path === n.to || n.to !== "/dashboard" && path.startsWith(n.to);
          const Icon = n.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: n.to,
              className: `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: n.label })
              ]
            },
            n.to
          );
        }) })
      ] }, g)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-sidebar-accent/50 p-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sidebar-foreground", children: "v2.4.1 · Production" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sidebar-foreground/60 mt-0.5", children: "Semua sistem berjalan normal" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-16 bg-background border-b flex items-center px-4 md:px-8 gap-3 sticky top-0 z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 max-w-md relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Cari nomor part, lot, operator...", className: "pl-9 bg-muted/50 border-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: toggleDark, "aria-label": "Toggle theme", className: "ml-auto", children: dark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "icon", className: "relative", "aria-label": "Notifications", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
            alerts && alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-80 mt-1.5 p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuLabel, { className: "font-semibold text-sm flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Peringatan & Notifikasi" }),
              alerts && alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "bg-destructive/10 text-destructive border-0 text-[10px]", children: [
                alerts.length,
                " baru"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4 text-center text-xs text-muted-foreground", children: "Memuat peringatan..." }) : !alerts || alerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-6 text-center text-xs text-muted-foreground", children: "Tidak ada notifikasi baru." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 max-h-64 overflow-y-auto", children: alerts.map((a) => {
              const Icon = a.severity === "error" ? CircleX : a.severity === "warning" ? TriangleAlert : Info;
              const color = a.severity === "error" ? "text-destructive bg-destructive/10" : a.severity === "warning" ? "text-warning bg-warning/15" : "text-info bg-info/10";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "flex items-start gap-2.5 p-2.5 focus:bg-muted/50 rounded-lg cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-7 w-7 rounded-lg grid place-items-center shrink-0 ${color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold leading-normal", children: a.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground leading-normal mt-0.5 whitespace-normal", children: a.desc })
                ] })
              ] }, a.id);
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "relative h-10 gap-2.5 px-3 rounded-full hover:bg-muted/80 transition-colors border border-transparent hover:border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground text-xs font-semibold shadow-sm", children: user?.name?.[0] ?? "A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left hidden sm:flex flex-col justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold leading-tight text-foreground", children: user?.name ?? "Operator" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground capitalize leading-none mt-0.5", children: user?.role ?? "operator" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 text-muted-foreground shrink-0" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-56 mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: user?.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 mr-2" }),
              "Profil"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => navigate({ to: "/settings" }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4 mr-2" }),
              "Settings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => {
              setUser(null);
              navigate({ to: "/login" });
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 mr-2" }),
              "Keluar"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 p-4 md:p-8 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-semibold tracking-tight", children: isAllowed ? title : "Akses Ditolak" }),
            subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: isAllowed ? subtitle : "Akses Halaman Tidak Diizinkan" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1.5 py-1.5 px-3 bg-success/10 text-success border-success/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success animate-pulse" }),
            "Live · Real-time"
          ] })
        ] }),
        isAllowed ? children : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-8 bg-card border rounded-xl shadow-soft max-w-md mx-auto text-center mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-destructive/10 text-destructive grid place-items-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-8 w-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground", children: "Akses Ditolak" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
            "Peran Anda (",
            user?.role,
            ') tidak memiliki akses ke halaman "',
            title,
            '". Hubungi supervisor atau manajer Anda.'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-6 bg-gradient-primary", onClick: () => navigate({ to: "/dashboard" }), children: "Kembali ke Dashboard" })
        ] })
      ] })
    ] })
  ] });
}
export {
  AppLayout as A,
  Badge as B,
  DropdownMenu as D,
  PERMISSION_ROUTES as P,
  loadPreferences as a,
  applyCompactDensity as b,
  DropdownMenuTrigger as c,
  DropdownMenuContent as d,
  DropdownMenuItem as e,
  DropdownMenuSeparator as f,
  ALL_PERMISSIONS as g,
  DEFAULT_ROLE_PERMISSIONS as h,
  saveRolePermissions as i,
  getPref as j,
  loadRolePermissions as l,
  savePreferences as s
};
