<<<<<<< HEAD
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "NPMS" }] }),
  component: () => <Navigate to="/dashboard" />,
});
=======
import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { loginUser, getUser, DEMO_USERS, useUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  ArrowRight,
  User,
  ShieldCheck,
  Briefcase,
  Eye,
  EyeOff,
  Factory,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — NPMS" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const user = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      navigate({ to: "/dashboard" });
    }
  }, [user, navigate]);

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your Email / Employee ID");
      return;
    }
    if (!password) {
      toast.error("Please enter your Password");
      return;
    }

    setLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const loggedIn = await loginUser(email, password);
    setLoading(false);

    if (loggedIn) {
      toast.success(`Welcome back, ${loggedIn.name}!`, {
        description: `Logged in as ${loggedIn.role.toUpperCase()}`,
      });
      navigate({ to: "/dashboard" });
    } else {
      toast.error("Authentication failed", {
        description: "Please use a demo profile or enter a valid email.",
      });
    }
  };

  const handleQuickLogin = async (demoEmail: string, role: string) => {
    if (loading) return;
    setSelectedRole(role);
    setLoading(true);

    // Simulated authenticating state
    await new Promise((resolve) => setTimeout(resolve, 600));

    const loggedIn = await loginUser(demoEmail, "123456");
    setLoading(false);
    setSelectedRole(null);

    if (loggedIn) {
      toast.success(`Access granted: ${loggedIn.name}`, {
        description: `Redirecting to ${loggedIn.role.toUpperCase()} workspace...`,
      });
      navigate({ to: "/dashboard" });
    } else {
      toast.error("Quick login failed");
    }
  };

  // Icon selector based on demo user role
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "operator":
        return <User className="h-4 w-4" />;
      case "supervisor":
        return <ShieldCheck className="h-4 w-4" />;
      case "manager":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  // Color theme badges based on role
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "operator":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "supervisor":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "manager":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* High-tech tech mesh background gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(var(--border) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        {/* Large flowing blur background nodes */}
        <div className="absolute -top-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-primary-dark/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full bg-orange-500/5 blur-[80px] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[480px] py-12">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8 text-center animate-fade-in">
          <div className="h-12 w-12 rounded-2xl bg-gradient-primary grid place-items-center text-primary-foreground font-bold shadow-glow text-xl mb-4">
            N
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 justify-center">
            <Factory className="h-5 w-5 text-primary" /> NPMS
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-sm">
            Nippon Production Monitoring System
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-2xl bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 pb-6 border-b border-slate-800/50">
            <CardTitle className="text-xl font-semibold text-white">Login to Account</CardTitle>
            <CardDescription className="text-slate-400">
              Access the manufacturing monitoring and FIFO audit system.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Manual Form */}
            <form onSubmit={handleManualLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 text-xs font-semibold tracking-wide uppercase">
                  Email / Employee ID
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    id="email"
                    placeholder="operator@ins.co.id"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="pl-9 h-11 bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-primary focus-visible:border-primary focus-visible:ring-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-slate-300 text-xs font-semibold tracking-wide uppercase">
                    Password
                  </Label>
                  <a href="#" className="text-xs text-primary hover:underline" onClick={(e) => { e.preventDefault(); toast.info("Demo mode: Use standard password '123456' or any characters."); }}>
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="pl-9 pr-10 h-11 bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-primary focus-visible:border-primary focus-visible:ring-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-500 hover:text-slate-300 hover:bg-transparent"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-gradient-primary hover:opacity-95 text-white font-medium rounded-xl transition-all shadow-glow flex items-center justify-center gap-2 mt-2"
              >
                {loading && !selectedRole ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    Sign In <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Quick Demo Section separator */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-800" />
              </div>
              <span className="relative bg-slate-900 px-3 text-xs text-slate-500 uppercase font-semibold tracking-wider">
                Quick Access Demo
              </span>
            </div>

            {/* Quick Login Profiles */}
            <div className="grid grid-cols-1 gap-2.5">
              {DEMO_USERS.map((demo) => {
                const isLoggingIn = loading && selectedRole === demo.role;
                return (
                  <button
                    key={demo.role}
                    type="button"
                    disabled={loading}
                    onClick={() => handleQuickLogin(demo.email, demo.role)}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/35 hover:bg-slate-950/80 hover:border-slate-700/80 transition-all text-left group disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 grid place-items-center text-primary group-hover:text-primary-dark transition-colors">
                        {isLoggingIn ? (
                          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : (
                          getRoleIcon(demo.role)
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                          {demo.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate max-w-[200px]">
                          {demo.email}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full border transition-all ${getRoleBadgeColor(
                        demo.role
                      )}`}
                    >
                      {demo.role}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-slate-600">
          <p>© 2026 PT. Indonesia Nippon Seiki. All rights reserved.</p>
          <p className="mt-1.5 text-[11px] text-slate-600/70">
            For operational support, contact System Administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
>>>>>>> origin/connection-database
