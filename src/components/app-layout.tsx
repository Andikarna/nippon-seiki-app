import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Factory, PackagePlus, ListChecks, PackageMinus,
  Printer, Settings, LogOut, Bell, Search, Moon, Sun, User as UserIcon,
  ChevronDown, XCircle, AlertTriangle, Info,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { setUser, useUser, getUser, type Role } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getAlerts } from "@/lib/api/db.functions";

const IDLE_TIMEOUT = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
const LAST_ACTIVE_KEY = "npms_last_active";

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  operator: ["/dashboard", "/part-input", "/fifo", "/part-out"],
  supervisor: ["/dashboard", "/production", "/fifo", "/reports"],
  manager: ["/dashboard", "/production", "/reports", "/settings"],
};

const nav = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, group: "Main" },
  { label: "Production Data", to: "/production", icon: Factory, group: "Production" },
  { label: "Part In", to: "/part-input", icon: PackagePlus, group: "Production" },
  { label: "FIFO Check", to: "/fifo", icon: ListChecks, group: "Production" },
  { label: "Part Out", to: "/part-out", icon: PackageMinus, group: "Production" },
  { label: "Reports", to: "/reports", icon: Printer, group: "Reports" },
  { label: "Settings", to: "/settings", icon: Settings, group: "System" },
];

export function AppLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const user = useUser();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ["headerAlerts"],
    queryFn: () => getAlerts(),
    refetchInterval: 10000,
  });

  useEffect(() => {
    const saved = localStorage.getItem("npms_theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  // Verify authentication
  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate({ to: "/login" });
    }
  }, [user, navigate]);

  // Idle timeout auto logout (1 hour of inactivity)
  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) return;

    // Set initial activity time
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
        toast.warning("Session Expired", {
          description: "You have been logged out due to 1 hour of inactivity.",
        });
        navigate({ to: "/login" });
      }
    }, 10000); // Check every 10 seconds

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
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-sm font-medium text-muted-foreground">Verifying session...</span>
        </div>
      </div>
    );
  }

  const allowedNav = nav.filter((n) => ROLE_PERMISSIONS[user.role as Role]?.includes(n.to));
  const groups = Array.from(new Set(allowedNav.map((n) => n.group)));
  const isAllowed = ROLE_PERMISSIONS[user.role as Role]?.includes(path) || path === "/";

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground shrink-0">
        <div className="h-16 flex items-center gap-2 px-4 border-b border-sidebar-border">
          <div className="bg-white p-1 rounded-lg flex items-center justify-center shadow-sm shrink-0">
            <img src="/logo.png" alt="Nippon Seiki Indonesia" className="h-7 w-auto object-contain" />
          </div>
          <div className="leading-tight ml-1">
            <div className="text-sm font-bold tracking-wide text-sidebar-foreground">NPMS</div>
            <div className="text-[10px] text-sidebar-foreground/60">Nippon Seiki</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {groups.map((g) => (
            <div key={g}>
              <div className="px-2 mb-1 text-[10px] uppercase tracking-wider text-sidebar-foreground/40 font-semibold">{g}</div>
              <div className="space-y-0.5">
                {allowedNav.filter((n) => n.group === g).map((n) => {
                  const active = path === n.to || (n.to !== "/dashboard" && path.startsWith(n.to));
                  const Icon = n.icon;
                  return (
                    <Link
                      key={n.to}
                      to={n.to}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${active
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{n.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <div className="rounded-lg bg-sidebar-accent/50 p-3 text-xs">
            <div className="font-semibold text-sidebar-foreground">v2.4.1 · Production</div>
            <div className="text-sidebar-foreground/60 mt-0.5">All systems operational</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-background border-b flex items-center px-4 md:px-8 gap-3 sticky top-0 z-10">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search part number, lot, operator..." className="pl-9 bg-muted/50 border-0" />
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDark} aria-label="Toggle theme" className="ml-auto">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                {alerts && alerts.length > 0 && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 mt-1.5 p-2">
              <DropdownMenuLabel className="font-semibold text-sm flex items-center justify-between">
                <span>Alerts & Notifications</span>
                {alerts && alerts.length > 0 && (
                  <Badge variant="secondary" className="bg-destructive/10 text-destructive border-0 text-[10px]">
                    {alerts.length} new
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isLoading ? (
                <div className="py-4 text-center text-xs text-muted-foreground">Loading alerts...</div>
              ) : !alerts || alerts.length === 0 ? (
                <div className="py-6 text-center text-xs text-muted-foreground">No new notifications.</div>
              ) : (
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {alerts.map((a: any) => {
                    const Icon = a.severity === "error" ? XCircle : a.severity === "warning" ? AlertTriangle : Info;
                    const color = a.severity === "error" ? "text-destructive bg-destructive/10" : a.severity === "warning" ? "text-warning bg-warning/15" : "text-info bg-info/10";
                    return (
                      <DropdownMenuItem key={a.id} className="flex items-start gap-2.5 p-2.5 focus:bg-muted/50 rounded-lg cursor-pointer">
                        <div className={`h-7 w-7 rounded-lg grid place-items-center shrink-0 ${color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold leading-normal">{a.title}</div>
                          <div className="text-[10px] text-muted-foreground leading-normal mt-0.5 whitespace-normal">{a.desc}</div>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 gap-2.5 px-3 rounded-full hover:bg-muted/80 transition-colors border border-transparent hover:border-border/60">
                <div className="h-7 w-7 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground text-xs font-semibold shadow-sm">
                  {user?.name?.[0] ?? "A"}
                </div>
                <div className="text-left hidden sm:flex flex-col justify-center">
                  <div className="text-xs font-semibold leading-tight text-foreground">{user?.name ?? "Operator"}</div>
                  <div className="text-[10px] text-muted-foreground capitalize leading-none mt-0.5">{user?.role ?? "operator"}</div>
                </div>
                <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-1.5">
              <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><UserIcon className="h-4 w-4 mr-2" />Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
                <Settings className="h-4 w-4 mr-2" />Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { setUser(null); navigate({ to: "/login" }); }}>
                <LogOut className="h-4 w-4 mr-2" />Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-4 md:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{isAllowed ? title : "Access Denied"}</h1>
              {subtitle && <p className="text-sm text-muted-foreground mt-1">{isAllowed ? subtitle : "Unauthorized Page Access"}</p>}
            </div>
            <Badge variant="outline" className="gap-1.5 py-1.5 px-3 bg-success/10 text-success border-success/20">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Live · Real-time
            </Badge>
          </div>
          {isAllowed ? (
            children
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-card border rounded-xl shadow-soft max-w-md mx-auto text-center mt-10">
              <div className="h-16 w-16 rounded-full bg-destructive/10 text-destructive grid place-items-center mb-4">
                <XCircle className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Access Denied</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Your role ({user?.role}) is not authorized to access the "{title}" page. Please contact your supervisor or manager.
              </p>
              <Button className="mt-6 bg-gradient-primary" onClick={() => navigate({ to: "/dashboard" })}>
                Back to Dashboard
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
