import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CtKxx6LB.mjs";
import { o as objectType, n as numberType, s as stringType, b as booleanType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const appCss = "/assets/styles-BRW6Xdz_.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$9 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$9.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] });
}
const $$splitComponentImporter$8 = () => import("./settings-BM9R-F4c.mjs");
const Route$8 = createFileRoute("/settings")({
  head: () => ({
    meta: [{
      title: "Settings — NPMS"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./reports-DKcoYqR0.mjs");
const Route$7 = createFileRoute("/reports")({
  head: () => ({
    meta: [{
      title: "Reports — NPMS"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./production-BjkscMeh.mjs");
const Route$6 = createFileRoute("/production")({
  head: () => ({
    meta: [{
      title: "Production Data — NPMS"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./part-out-BvRqIl_0.mjs");
const Route$5 = createFileRoute("/part-out")({
  head: () => ({
    meta: [{
      title: "Part Out — NPMS"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./part-input-p8R4PCDI.mjs");
const Route$4 = createFileRoute("/part-input")({
  head: () => ({
    meta: [{
      title: "Part In — NPMS"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./login-CCU9sbzd.mjs");
const Route$3 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Login — NPMS"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./fifo-D4ja5S7q.mjs");
const Route$2 = createFileRoute("/fifo")({
  head: () => ({
    meta: [{
      title: "FIFO Check — NPMS"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getDashboardData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("9e879fbcee41a161a551fcde6359bacb0351b88e4ae6dd706908f02a0f7fa2ce"));
const getProductionRecords = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  q: stringType().optional(),
  line: stringType().optional(),
  status: stringType().optional(),
  startDate: stringType().optional(),
  endDate: stringType().optional(),
  page: numberType().default(1),
  perPage: numberType().default(10)
})).handler(createSsrRpc("f787eea0bdd5a5b8af32fe9c3693c4004114c0d287af0c7bfc94e48e535d7749"));
const getFifoMaterials = createServerFn({
  method: "GET"
}).handler(createSsrRpc("75d80cc003bb9a7332af46efbab40c480fba32a3b17aa52ad4d0611a642e553d"));
const checkFifoPosition = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  lotNumber: stringType().min(1)
})).handler(createSsrRpc("06e8d08bc5ac38c8b0500b0076172b529c12875f4267fabc37900ea75ede46ac"));
const addProductionRecord = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  partNumber: stringType().min(1),
  productName: stringType().min(1),
  quantity: numberType(),
  line: stringType().min(1),
  operator: stringType().min(1),
  lotNumber: stringType().min(1),
  date: stringType().min(1)
})).handler(createSsrRpc("6cc8fc63e1f8d50e1585cf9bb9ac8558c001882bee5c79c2d0cf3595569df14a"));
const dispatchFifoMaterial = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  partNumber: stringType().min(1),
  productName: stringType().min(1),
  quantity: numberType(),
  destinationLine: stringType().min(1),
  operator: stringType().min(1),
  lotNumber: stringType().min(1),
  date: stringType().min(1)
})).handler(createSsrRpc("5bf166b628442609013c87225af646a452f2666d09479b3de20864b3ed0651ec"));
const getSettingsData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("3bd82c7c4245a50f8cd3ea9c5e9b542b5aed0b5643c926b1f3924866e3b436a4"));
const addSettingUser = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  name: stringType().min(1),
  username: stringType().min(1),
  email: stringType().email(),
  role: stringType().min(1),
  password: stringType().optional()
})).handler(createSsrRpc("879fd574915bd709a878f537bbf120e4ffcbbe9d7868f74a89827a411f8d6695"));
const addSettingLine = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1),
  name: stringType().min(1),
  type: stringType().min(1).default("in"),
  capacity: numberType(),
  shifts: numberType(),
  operators: numberType()
})).handler(createSsrRpc("a9ac0541fcd53d3cfcfb87497bead0384a2363dc3401849e0fe0ee652b25c7c4"));
const updateSettingUser = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().email(),
  name: stringType().min(1),
  username: stringType().min(1),
  role: stringType().min(1),
  active: booleanType()
})).handler(createSsrRpc("df9c0c4b323b38353b7e5d5ca83a6065e67d05842484144df99fc04d79cd5b5a"));
const deleteSettingUser = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().email()
})).handler(createSsrRpc("2dde6c570981696a3e97582ee8c7e95dd5e531eefd92c12fff113054a796bed3"));
const updateSettingLine = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1),
  name: stringType().min(1),
  type: stringType().min(1).default("in"),
  capacity: numberType(),
  shifts: numberType(),
  operators: numberType()
})).handler(createSsrRpc("d3c152e6ee8752aad8aec0f4018f38f041dbc977db7327a3d9f59b4e42c343e7"));
const deleteSettingLine = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(createSsrRpc("aa04548dace634d992e019a24d924709eb5ead8c531701e543ef74515eb90746"));
const getReportsData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("e999894cb4a27fc3360c9aceb38957bb70e8311dd8147508e7610eeed95c1545"));
const authenticateUser = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  username: stringType().min(1),
  password: stringType().optional()
})).handler(createSsrRpc("fefdc7caf229a0aabf53565a44911dd30246d633bdb733ab2fd179b003e638f9"));
const getAlerts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("862b2ed0ba1c16e03d536242f61de2d770937144cf43e97470ad771049d0c017"));
const getActiveLines = createServerFn({
  method: "GET"
}).handler(createSsrRpc("75659a1ccdbcb516866b67fc0b52ac835b5f20faa590c420f52a8cc114afc799"));
const updateProductionRecord = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1),
  quantity: numberType(),
  line: stringType().min(1),
  operator: stringType().min(1),
  status: stringType().min(1)
})).handler(createSsrRpc("93583c2e29869933a9bec01db77f71133d41ac5d2be11ec528f6d93af52354c7"));
const deleteProductionRecord = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(createSsrRpc("e972f54971109f50ab053596eca4b6b21d84989e5231b521f17f163d5239687d"));
const getNextLotNumber = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  line: stringType().min(1),
  date: stringType().min(1)
})).handler(createSsrRpc("c26fd779dda0245bee08ddc5d6ae671875a26ffa00cf133e4a7aa17e4367e6c6"));
const getParts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("31592cba9d9bc29a292a8b6e3dadf0f111ffd3d86365bc13b918f3418433e807"));
const addPart = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  partNumber: stringType().min(1),
  productName: stringType().min(1),
  threshold: numberType()
})).handler(createSsrRpc("fd038362282fb52af730a3c94c169732d0e0755940135483815ce0020fb2736d"));
const updatePart = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  partNumber: stringType().min(1),
  productName: stringType().min(1),
  threshold: numberType()
})).handler(createSsrRpc("0e6ba0eede7dc731dd9da2f2037e83d2440671e04e2e5a2d327b0d16345e1b39"));
const deletePart = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  partNumber: stringType().min(1)
})).handler(createSsrRpc("46a4bef42551f766f2114026cb409ae16c0b9f6d9bb3866229829be9dfe3923c"));
const $$splitComponentImporter$1 = () => import("./dashboard-B3ycQ4EU.mjs");
const Route$1 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — NPMS"
    }]
  }),
  loader: async () => {
    return getDashboardData();
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-D_-2npqT.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "NPMS — Nippon Production Monitoring System"
    }, {
      name: "description",
      content: "Enterprise manufacturing production monitoring, FIFO control, and reporting."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SettingsRoute = Route$8.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$9
});
const ReportsRoute = Route$7.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => Route$9
});
const ProductionRoute = Route$6.update({
  id: "/production",
  path: "/production",
  getParentRoute: () => Route$9
});
const PartOutRoute = Route$5.update({
  id: "/part-out",
  path: "/part-out",
  getParentRoute: () => Route$9
});
const PartInputRoute = Route$4.update({
  id: "/part-input",
  path: "/part-input",
  getParentRoute: () => Route$9
});
const LoginRoute = Route$3.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$9
});
const FifoRoute = Route$2.update({
  id: "/fifo",
  path: "/fifo",
  getParentRoute: () => Route$9
});
const DashboardRoute = Route$1.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$9
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const rootRouteChildren = {
  IndexRoute,
  DashboardRoute,
  FifoRoute,
  LoginRoute,
  PartInputRoute,
  PartOutRoute,
  ProductionRoute,
  ReportsRoute,
  SettingsRoute
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  getParts as a,
  addSettingUser as b,
  addSettingLine as c,
  addPart as d,
  deleteSettingUser as e,
  updateSettingLine as f,
  getSettingsData as g,
  deleteSettingLine as h,
  updatePart as i,
  deletePart as j,
  getReportsData as k,
  getActiveLines as l,
  getProductionRecords as m,
  updateProductionRecord as n,
  deleteProductionRecord as o,
  getFifoMaterials as p,
  dispatchFifoMaterial as q,
  getNextLotNumber as r,
  addProductionRecord as s,
  checkFifoPosition as t,
  updateSettingUser as u,
  getAlerts as v,
  authenticateUser as w,
  router as x
};
