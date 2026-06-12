import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useUser, g as getUser, C as Card, a as CardHeader, b as CardTitle, f as CardDescription, c as CardContent, I as Input, B as Button, D as DEMO_USERS, l as loginUser } from "./card-DOXbU1xW.mjs";
import { L as Label } from "./label-Cj9YMssb.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { z as Factory, A as User, G as Lock, H as EyeOff, r as Eye, I as ArrowRight, J as Briefcase, S as ShieldCheck } from "../_libs/lucide-react.mjs";
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
import "./router--DqMp0Ks.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-CtKxx6LB.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
function LoginPage() {
  const navigate = useNavigate();
  const user = useUser();
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [selectedRole, setSelectedRole] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      navigate({
        to: "/dashboard"
      });
    }
  }, [user, navigate]);
  const handleManualLogin = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error("Harap masukkan Username Anda");
      return;
    }
    if (!password) {
      toast.error("Harap masukkan Password Anda");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const loggedIn = await loginUser(username, password);
    setLoading(false);
    if (loggedIn) {
      toast.success(`Selamat datang kembali, ${loggedIn.name}!`, {
        description: `Masuk sebagai ${loggedIn.role.toUpperCase()}`
      });
      navigate({
        to: "/dashboard"
      });
    } else {
      toast.error("Autentikasi gagal", {
        description: "Gunakan profil demo atau masukkan username yang valid."
      });
    }
  };
  const handleQuickLogin = async (demoUsername, role) => {
    if (loading) return;
    setSelectedRole(role);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const loggedIn = await loginUser(demoUsername, "123456");
    setLoading(false);
    setSelectedRole(null);
    if (loggedIn) {
      toast.success(`Akses diberikan: ${loggedIn.name}`, {
        description: `Mengarahkan ke workspace ${loggedIn.role.toUpperCase()}...`
      });
      navigate({
        to: "/dashboard"
      });
    } else {
      toast.error("Login cepat gagal");
    }
  };
  const getRoleIcon = (role) => {
    switch (role) {
      case "operator_in":
      case "operator_out":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" });
      case "supervisor":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" });
      case "manager":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" });
    }
  };
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "operator_in":
      case "operator_out":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "supervisor":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "manager":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.03]", style: {
        backgroundImage: `radial-gradient(var(--border) 1px, transparent 1px)`,
        backgroundSize: "24px 24px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-primary-dark/10 blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full bg-green-500/5 blur-[80px] pointer-events-none" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-[480px] py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8 text-center animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-3 rounded-2xl flex items-center justify-center shadow-glow mb-4 max-w-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Nippon Seiki Indonesia", className: "h-10 w-auto object-contain" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold tracking-tight text-white flex items-center gap-2 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Factory, { className: "h-5 w-5 text-primary" }),
          " NPMS"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm mt-1 max-w-sm", children: "Nippon Production Monitoring System" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-2xl bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-1 pb-6 border-b border-slate-800/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl font-semibold text-white", children: "Masuk ke Akun" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-slate-400", children: "Akses sistem monitoring manufaktur dan audit FIFO." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleManualLogin, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "username", className: "text-slate-300 text-xs font-semibold tracking-wide uppercase", children: "Username" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "username", placeholder: "operator_in", type: "text", value: username, onChange: (e) => setUsername(e.target.value), disabled: loading, className: "pl-9 h-11 bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-primary focus-visible:border-primary focus-visible:ring-1" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-slate-300 text-xs font-semibold tracking-wide uppercase", children: "Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-xs text-primary hover:underline", onClick: (e) => {
                  e.preventDefault();
                  toast.info("Mode demo: Gunakan password standar '123456' atau karakter apa pun.");
                }, children: "Lupa password?" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: showPassword ? "text" : "password", placeholder: "••••••••", value: password, onChange: (e) => setPassword(e.target.value), disabled: loading, className: "pl-9 pr-10 h-11 bg-slate-950/60 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-primary focus-visible:border-primary focus-visible:ring-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => setShowPassword(!showPassword), className: "absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-500 hover:text-slate-300 hover:bg-transparent", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "w-full h-11 bg-gradient-primary hover:opacity-95 text-white font-medium rounded-xl transition-all shadow-glow flex items-center justify-center gap-2 mt-2", children: loading && !selectedRole ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Masuk ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative my-4 flex items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full border-t border-slate-800" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative bg-slate-900 px-3 text-xs text-slate-500 uppercase font-semibold tracking-wider", children: "Akses Cepat Demo" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2.5", children: DEMO_USERS.map((demo) => {
            const isLoggingIn = loading && selectedRole === demo.role;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: loading, onClick: () => handleQuickLogin(demo.username, demo.role), className: "flex items-center justify-between p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/35 hover:bg-slate-950/80 hover:border-slate-700/80 transition-all text-left group disabled:opacity-50 disabled:pointer-events-none cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 grid place-items-center text-primary group-hover:text-primary-dark transition-colors", children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" }) : getRoleIcon(demo.role) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-slate-200 group-hover:text-white transition-colors", children: demo.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-500 truncate max-w-[200px]", children: [
                    "@",
                    demo.username
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full border transition-all ${getRoleBadgeColor(demo.role)}`, children: demo.role })
            ] }, demo.role);
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center text-xs text-slate-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "© 2026 PT. Indonesia Nippon Seiki. Hak cipta dilindungi." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] text-slate-600/70", children: "Untuk dukungan operasional, hubungi Administrator Sistem." })
      ] })
    ] })
  ] });
}
export {
  LoginPage as component
};
