import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Factory, PackagePlus, ListChecks, PackageMinus,
  Printer, Settings, LogOut, Bell, Search, Moon, Sun, User as UserIcon,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { setUser, useUser, getUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const nav = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, group: "Main" },
  { label: "Production Data", to: "/production", icon: Factory, group: "Production" },
  { label: "Part Input", to: "/part-input", icon: PackagePlus, group: "Production" },
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

  useEffect(() => {
    const saved = localStorage.getItem("npms_theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate({ to: "/login" });
    }
  }, [user, navigate]);



  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("npms_theme", next ? "dark" : "light");
  };

  const groups = Array.from(new Set(nav.map((n) => n.group)));

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

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground shrink-0">
        <div className="h-16 flex items-center gap-3 px-5 border-b border-sidebar-border">
          <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground font-bold shadow-glow">N</div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">NPMS</div>
            <div className="text-[11px] text-sidebar-foreground/60">Nippon Production</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {groups.map((g) => (
            <div key={g}>
              <div className="px-2 mb-1 text-[10px] uppercase tracking-wider text-sidebar-foreground/40 font-semibold">{g}</div>
              <div className="space-y-0.5">
                {nav.filter((n) => n.group === g).map((n) => {
                  const active = path === n.to || (n.to !== "/dashboard" && path.startsWith(n.to));
                  const Icon = n.icon;
                  return (
                    <Link
                      key={n.to}
                      to={n.to}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        active
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
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>
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
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            <Badge variant="outline" className="gap-1.5 py-1.5 px-3 bg-success/10 text-success border-success/20">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Live · Real-time
            </Badge>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
