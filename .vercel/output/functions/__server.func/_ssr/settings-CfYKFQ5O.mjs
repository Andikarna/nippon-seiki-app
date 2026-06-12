import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { l as loadRolePermissions, a as loadPreferences, b as applyCompactDensity, A as AppLayout, B as Badge, D as DropdownMenu, c as DropdownMenuTrigger, d as DropdownMenuContent, e as DropdownMenuItem, f as DropdownMenuSeparator, g as ALL_PERMISSIONS, P as PERMISSION_ROUTES, h as DEFAULT_ROLE_PERMISSIONS, s as savePreferences, i as saveRolePermissions } from "./app-layout-DIu8u0Fv.mjs";
import { C as Card, a as CardHeader, b as CardTitle, B as Button, I as Input, c as CardContent, d as cn, e as buttonVariants } from "./card-DwF1RqPI.mjs";
import { L as Label } from "./label-iU8VJ1mI.mjs";
import { R as Root, T as Thumb } from "../_libs/radix-ui__react-switch.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-xtipYBen.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-BXkIf75U.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CTYi7Z2Z.mjs";
import { R as Root2$1, P as Portal2, C as Content2, T as Title2, D as Description2, a as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as addSettingUser, u as updateSettingUser, b as addSettingLine, d as deleteSettingUser, c as updateSettingLine, e as deleteSettingLine, g as getSettingsData } from "./router-Cmfz48Et.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { P as Plus, E as Ellipsis, a as Pencil, U as UserX, b as UserCheck, T as Trash2, S as ShieldCheck, B as Bell, M as Mail, c as Printer, d as TextAlignJustify, C as Clock, e as Save, L as Link2, f as Check } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-BUYfpcon.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Root.displayName;
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const AlertDialog = Root2$1;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const ROLE_META = {
  operator: {
    label: "Operator",
    count: 24
  },
  supervisor: {
    label: "Supervisor",
    count: 6
  },
  manager: {
    label: "Manager",
    count: 2
  }
};
function buildRolesDisplay(stored) {
  return Object.keys(ROLE_META).map((role) => ({
    role,
    name: ROLE_META[role].label,
    count: ROLE_META[role].count,
    perms: stored[role] ?? DEFAULT_ROLE_PERMISSIONS[role]
  }));
}
function SettingsPage() {
  const queryClient = useQueryClient();
  const [roles, setRoles] = reactExports.useState(() => buildRolesDisplay(loadRolePermissions()));
  const [editRoleOpen, setEditRoleOpen] = reactExports.useState(false);
  const [editRoleTarget, setEditRoleTarget] = reactExports.useState(null);
  const [editRolePerms, setEditRolePerms] = reactExports.useState([]);
  const [editRoleLoading, setEditRoleLoading] = reactExports.useState(false);
  const openEditRole = (r) => {
    setEditRoleTarget(r);
    setEditRolePerms([...r.perms]);
    setEditRoleOpen(true);
  };
  const togglePerm = (perm) => {
    setEditRolePerms((prev) => prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]);
  };
  const handleSaveRolePerms = async () => {
    if (!editRoleTarget) return;
    setEditRoleLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setRoles((prev) => prev.map((r) => r.role === editRoleTarget.role ? {
      ...r,
      perms: editRolePerms
    } : r));
    const current = loadRolePermissions();
    current[editRoleTarget.role] = editRolePerms;
    saveRolePermissions(current);
    toast.success(`Izin untuk "${editRoleTarget.name}" disimpan — sidebar diperbarui.`);
    setEditRoleOpen(false);
    setEditRoleLoading(false);
  };
  const [userDialogOpen, setUserDialogOpen] = reactExports.useState(false);
  const [userForm, setUserForm] = reactExports.useState({
    name: "",
    username: "",
    email: "",
    role: "operator",
    password: ""
  });
  const [userLoading, setUserLoading] = reactExports.useState(false);
  const [editUserOpen, setEditUserOpen] = reactExports.useState(false);
  const [editUserTarget, setEditUserTarget] = reactExports.useState(null);
  const [editUserForm, setEditUserForm] = reactExports.useState({
    name: "",
    username: "",
    role: "operator"
  });
  const [editUserLoading, setEditUserLoading] = reactExports.useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = reactExports.useState(false);
  const [deleteUserTarget, setDeleteUserTarget] = reactExports.useState(null);
  const [deleteUserLoading, setDeleteUserLoading] = reactExports.useState(false);
  const [lineDialogOpen, setLineDialogOpen] = reactExports.useState(false);
  const [lineForm, setLineForm] = reactExports.useState({
    id: "",
    name: "",
    capacity: "120",
    shifts: "3",
    operators: "4"
  });
  const [lineLoading, setLineLoading] = reactExports.useState(false);
  const [editLineOpen, setEditLineOpen] = reactExports.useState(false);
  const [editLineTarget, setEditLineTarget] = reactExports.useState(null);
  const [editLineForm, setEditLineForm] = reactExports.useState({
    name: "",
    capacity: "120",
    shifts: "3",
    operators: "4"
  });
  const [editLineLoading, setEditLineLoading] = reactExports.useState(false);
  const [deleteLineOpen, setDeleteLineOpen] = reactExports.useState(false);
  const [deleteLineTarget, setDeleteLineTarget] = reactExports.useState(null);
  const [deleteLineLoading, setDeleteLineLoading] = reactExports.useState(false);
  const [appPrefs, setAppPrefs] = reactExports.useState(() => loadPreferences());
  const [prefSaving, setPrefSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    applyCompactDensity(appPrefs.compactDensity);
  }, [appPrefs.compactDensity]);
  const updatePref = (key, value) => {
    setAppPrefs((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["settingsData"],
    queryFn: () => getSettingsData()
  });
  const users = data?.users ?? [];
  const productionLines = data?.productionLines ?? [];
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!userForm.name.trim() || !userForm.username.trim() || !userForm.email.trim()) {
      toast.error("Harap isi semua kolom yang diperlukan.");
      return;
    }
    setUserLoading(true);
    try {
      await addSettingUser({
        data: {
          name: userForm.name.trim(),
          username: userForm.username.trim(),
          email: userForm.email.trim(),
          role: userForm.role,
          password: userForm.password.trim() || void 0
        }
      });
      toast.success("Pengguna berhasil ditambahkan.");
      setUserForm({
        name: "",
        username: "",
        email: "",
        role: "operator",
        password: ""
      });
      setUserDialogOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["settingsData"]
      });
    } catch {
      toast.error("Gagal menambahkan pengguna.");
    } finally {
      setUserLoading(false);
    }
  };
  const openEditUser = (u) => {
    setEditUserTarget(u);
    setEditUserForm({
      name: u.name,
      username: u.username,
      role: u.role.toLowerCase()
    });
    setEditUserOpen(true);
  };
  const handleEditUser = async (e) => {
    e.preventDefault();
    if (!editUserTarget) return;
    setEditUserLoading(true);
    try {
      await updateSettingUser({
        data: {
          email: editUserTarget.email,
          name: editUserForm.name.trim(),
          username: editUserForm.username.trim(),
          role: editUserForm.role,
          active: editUserTarget.active
        }
      });
      toast.success("Pengguna berhasil diperbarui.");
      setEditUserOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["settingsData"]
      });
    } catch {
      toast.error("Gagal memperbarui pengguna.");
    } finally {
      setEditUserLoading(false);
    }
  };
  const openDeleteUser = (u) => {
    setDeleteUserTarget(u);
    setDeleteUserOpen(true);
  };
  const handleDeleteUser = async () => {
    if (!deleteUserTarget) return;
    setDeleteUserLoading(true);
    try {
      await deleteSettingUser({
        data: {
          email: deleteUserTarget.email
        }
      });
      toast.success(`Pengguna "${deleteUserTarget.name}" dihapus.`);
      setDeleteUserOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["settingsData"]
      });
    } catch {
      toast.error("Gagal menghapus pengguna.");
    } finally {
      setDeleteUserLoading(false);
    }
  };
  const handleToggleUserStatus = async (u) => {
    try {
      await updateSettingUser({
        data: {
          email: u.email,
          name: u.name,
          role: u.role.toLowerCase(),
          active: !u.active
        }
      });
      toast.success(`Pengguna "${u.name}" ${u.active ? "dinonaktifkan" : "diaktifkan"}.`);
      queryClient.invalidateQueries({
        queryKey: ["settingsData"]
      });
    } catch {
      toast.error("Gagal memperbarui status pengguna.");
    }
  };
  const handleAddLine = async (e) => {
    e.preventDefault();
    if (!lineForm.id.trim() || !lineForm.name.trim()) {
      toast.error("Harap isi semua kolom yang diperlukan.");
      return;
    }
    setLineLoading(true);
    try {
      await addSettingLine({
        data: {
          id: lineForm.id.trim(),
          name: lineForm.name.trim(),
          capacity: Number(lineForm.capacity),
          shifts: Number(lineForm.shifts),
          operators: Number(lineForm.operators)
        }
      });
      toast.success("Lini Produksi berhasil ditambahkan.");
      setLineForm({
        id: "",
        name: "",
        capacity: "120",
        shifts: "3",
        operators: "4"
      });
      setLineDialogOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["settingsData"]
      });
    } catch {
      toast.error("Gagal menambahkan lini produksi.");
    } finally {
      setLineLoading(false);
    }
  };
  const openEditLine = (l) => {
    setEditLineTarget(l);
    setEditLineForm({
      name: l.name,
      capacity: String(l.capacity),
      shifts: String(l.shifts),
      operators: String(l.operators)
    });
    setEditLineOpen(true);
  };
  const handleEditLine = async (e) => {
    e.preventDefault();
    if (!editLineTarget) return;
    setEditLineLoading(true);
    try {
      await updateSettingLine({
        data: {
          id: editLineTarget.id,
          name: editLineForm.name.trim(),
          capacity: Number(editLineForm.capacity),
          shifts: Number(editLineForm.shifts),
          operators: Number(editLineForm.operators)
        }
      });
      toast.success("Lini produksi diperbarui.");
      setEditLineOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["settingsData"]
      });
    } catch {
      toast.error("Gagal memperbarui lini produksi.");
    } finally {
      setEditLineLoading(false);
    }
  };
  const openDeleteLine = (l) => {
    setDeleteLineTarget(l);
    setDeleteLineOpen(true);
  };
  const handleDeleteLine = async () => {
    if (!deleteLineTarget) return;
    setDeleteLineLoading(true);
    try {
      await deleteSettingLine({
        data: {
          id: deleteLineTarget.id
        }
      });
      toast.success(`Lini "${deleteLineTarget.name}" dihapus.`);
      setDeleteLineOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["settingsData"]
      });
    } catch {
      toast.error("Gagal menghapus lini produksi.");
    } finally {
      setDeleteLineLoading(false);
    }
  };
  const handleSavePreferences = async () => {
    setPrefSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    savePreferences(appPrefs);
    toast.success("Preferensi tersimpan.", {
      description: [appPrefs.realtimeNotifications && "Notifikasi: AKTIF", !appPrefs.realtimeNotifications && "Notifikasi: MATI", appPrefs.auditTrailEmails && "Email audit: AKTIF", appPrefs.autoPrintLabels && "Auto-print: AKTIF", appPrefs.compactDensity && "Mode compact: AKTIF", `Shift default: ${appPrefs.defaultShift}`].filter(Boolean).join(" · ")
    });
    setPrefSaving(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppLayout, { title: "Settings", subtitle: "Kelola pengguna, peran, lini produksi, dan preferensi.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "users", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "users", children: "Pengguna" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "roles", children: "Peran" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "lines", children: "Lini Produksi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "prefs", children: "Preferensi" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "users", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Pengguna" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              users.length,
              " pengguna aktif di sistem"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: userDialogOpen, onOpenChange: setUserDialogOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2 bg-gradient-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Tambah pengguna"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Tambah Pengguna Baru" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Daftarkan operator atau manajer baru di lantai produksi." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddUser, className: "space-y-4 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "usrName", children: "Nama" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "usrName", value: userForm.name, onChange: (e) => setUserForm({
                    ...userForm,
                    name: e.target.value
                  }), placeholder: "Afifi Rouf", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "usrUsername", children: "Username" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "usrUsername", value: userForm.username, onChange: (e) => setUserForm({
                    ...userForm,
                    username: e.target.value
                  }), placeholder: "afifi", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "usrEmail", children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "usrEmail", type: "email", value: userForm.email, onChange: (e) => setUserForm({
                    ...userForm,
                    email: e.target.value
                  }), placeholder: "afifi@ins.co.id", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "usrPassword", children: "Password (Opsional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "usrPassword", type: "password", value: userForm.password, onChange: (e) => setUserForm({
                    ...userForm,
                    password: e.target.value
                  }), placeholder: "Kosongkan untuk '123456'" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "usrRole", children: "Peran" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: userForm.role, onValueChange: (v) => setUserForm({
                    ...userForm,
                    role: v
                  }), children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "usrRole", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "operator", children: "Operator" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "supervisor", children: "Supervisor" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "manager", children: "Manager" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setUserDialogOpen(false), children: "Batal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: userLoading, className: "bg-gradient-primary", children: userLoading ? "Menyimpan..." : "Simpan Pengguna" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40 hover:bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nama" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Username" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Peran" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Lini" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-12" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { colSpan: 7, className: "text-center py-8 text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" }),
            "Memuat pengguna..."
          ] }) }) : users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: u.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-sm font-mono", children: [
              "@",
              u.username
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: u.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "capitalize", children: u.role }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: u.line }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: u.active ? "bg-success/15 text-success border-success/20" : "bg-muted text-muted-foreground", children: u.active ? "Aktif" : "Tidak Aktif" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => openEditUser(u), className: "gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
                  " Edit Pengguna"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onClick: () => handleToggleUserStatus(u), className: "gap-2 cursor-pointer", children: u.active ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "h-3.5 w-3.5" }),
                  " Nonaktifkan"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-3.5 w-3.5" }),
                  " Aktifkan"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => openDeleteUser(u), className: "gap-2 text-destructive focus:text-destructive cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                  " Hapus Pengguna"
                ] })
              ] })
            ] }) })
          ] }, u.email)) })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "roles", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "flex-row items-start justify-between pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              r.count,
              " pengguna · ",
              r.perms.length,
              " izin"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-1.5", children: [
          r.perms.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" }),
            p
          ] }, p)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "mt-4 w-full gap-2", onClick: () => openEditRole(r), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
            "Edit izin"
          ] })
        ] })
      ] }, r.name)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "lines", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Lini Produksi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: lineDialogOpen, onOpenChange: setLineDialogOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2 bg-gradient-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Tambah lini"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Tambah Lini Produksi" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Daftarkan lini assembly atau sub-assembly baru." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddLine, className: "space-y-4 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lnId", children: "Kode Lini / ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "lnId", value: lineForm.id, onChange: (e) => setLineForm({
                    ...lineForm,
                    id: e.target.value
                  }), placeholder: "Line D1", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lnName", children: "Nama Lini" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "lnName", value: lineForm.name, onChange: (e) => setLineForm({
                    ...lineForm,
                    name: e.target.value
                  }), placeholder: "Line D1 - Sub-Assy", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lnCap", children: "Kapasitas/jam" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "lnCap", type: "number", value: lineForm.capacity, onChange: (e) => setLineForm({
                      ...lineForm,
                      capacity: e.target.value
                    }), required: true })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lnShifts", children: "Shift" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "lnShifts", type: "number", value: lineForm.shifts, onChange: (e) => setLineForm({
                      ...lineForm,
                      shifts: e.target.value
                    }), required: true })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lnOps", children: "Operator" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "lnOps", type: "number", value: lineForm.operators, onChange: (e) => setLineForm({
                      ...lineForm,
                      operators: e.target.value
                    }), required: true })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setLineDialogOpen(false), children: "Batal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: lineLoading, className: "bg-gradient-primary", children: lineLoading ? "Menyimpan..." : "Simpan Lini" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full py-8 text-center text-muted-foreground text-sm flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" }),
          "Memuat lini produksi..."
        ] }) : productionLines.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border p-4 group relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: l.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "bg-success/15 text-success border-success/20", children: "Aktif" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-3.5 w-3.5" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => openEditLine(l), className: "gap-2 cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
                    " Edit Lini"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => openDeleteLine(l), className: "gap-2 text-destructive focus:text-destructive cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                    " Hapus Lini"
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
            "Kapasitas: ",
            l.capacity,
            " unit/jam"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
            "Shift: ",
            l.shifts,
            " · Operator: ",
            l.operators
          ] })
        ] }, l.id)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "prefs", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-0 shadow-soft max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Preferensi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Perubahan diterapkan segera. Klik Simpan untuk mempertahankan antar sesi." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors ${appPrefs.realtimeNotifications ? "bg-primary/5 border border-primary/20" : "bg-muted/40 border border-transparent"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-9 w-9 rounded-lg grid place-items-center shrink-0 ${appPrefs.realtimeNotifications ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Notifikasi real-time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Bel peringatan otomatis diperbarui setiap 10 detik untuk pelanggaran FIFO & peringatan stok." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: appPrefs.realtimeNotifications ? "bg-success/15 text-success border-success/20 text-[10px]" : "text-[10px]", children: appPrefs.realtimeNotifications ? "ON" : "OFF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: appPrefs.realtimeNotifications, onCheckedChange: (v) => updatePref("realtimeNotifications", v) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors ${appPrefs.auditTrailEmails ? "bg-primary/5 border border-primary/20" : "bg-muted/40 border border-transparent"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-9 w-9 rounded-lg grid place-items-center shrink-0 ${appPrefs.auditTrailEmails ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Email audit trail" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Email ringkasan harian dari semua tindakan supervisor dan manajer." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: appPrefs.auditTrailEmails ? "bg-success/15 text-success border-success/20 text-[10px]" : "text-[10px]", children: appPrefs.auditTrailEmails ? "ON" : "OFF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: appPrefs.auditTrailEmails, onCheckedChange: (v) => updatePref("auditTrailEmails", v) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors ${appPrefs.autoPrintLabels ? "bg-primary/5 border border-primary/20" : "bg-muted/40 border border-transparent"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-9 w-9 rounded-lg grid place-items-center shrink-0 ${appPrefs.autoPrintLabels ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Auto-print label" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Otomatis memicu pencetakan label QR setelah pengiriman Part Input berhasil." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: appPrefs.autoPrintLabels ? "bg-success/15 text-success border-success/20 text-[10px]" : "text-[10px]", children: appPrefs.autoPrintLabels ? "ON" : "OFF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: appPrefs.autoPrintLabels, onCheckedChange: (v) => updatePref("autoPrintLabels", v) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors ${appPrefs.compactDensity ? "bg-primary/5 border border-primary/20" : "bg-muted/40 border border-transparent"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-9 w-9 rounded-lg grid place-items-center shrink-0 ${appPrefs.compactDensity ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextAlignJustify, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Tampilan compact" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Mengurangi padding di tabel, kartu, dan daftar. Diterapkan segera di semua halaman." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: appPrefs.compactDensity ? "bg-success/15 text-success border-success/20 text-[10px]" : "text-[10px]", children: appPrefs.compactDensity ? "ON" : "OFF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: appPrefs.compactDensity, onCheckedChange: (v) => updatePref("compactDensity", v) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Shift default" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mengisi kolom shift secara otomatis di formulir Part In dan Part Out." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2", children: ["Shift 1 · 07:00 – 15:00", "Shift 2 · 15:00 – 23:00", "Shift 3 · 23:00 – 07:00"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updatePref("defaultShift", s), className: `text-xs rounded-lg border px-3 py-2.5 text-left transition-colors font-medium ${appPrefs.defaultShift === s ? "border-primary/40 bg-primary/5 text-primary" : "border-border bg-muted/40 hover:bg-muted/70 text-muted-foreground"}`, children: s }, s)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: appPrefs.defaultShift, onChange: (e) => updatePref("defaultShift", e.target.value), placeholder: "Nama shift kustom...", className: "mt-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Terakhir disimpan: ",
              typeof window !== "undefined" && localStorage.getItem("npms_app_preferences") ? "tersimpan" : "belum disimpan"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-gradient-primary gap-2", onClick: handleSavePreferences, disabled: prefSaving, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
              prefSaving ? "Menyimpan..." : "Simpan Preferensi"
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: editUserOpen, onOpenChange: setEditUserOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Pengguna" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Perbarui nama atau peran untuk ",
          editUserTarget?.email,
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleEditUser, className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "editUsrName", children: "Nama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "editUsrName", value: editUserForm.name, onChange: (e) => setEditUserForm({
            ...editUserForm,
            name: e.target.value
          }), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "editUsrUsername", children: "Username" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "editUsrUsername", value: editUserForm.username, onChange: (e) => setEditUserForm({
            ...editUserForm,
            username: e.target.value
          }), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "editUsrRole", children: "Peran" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: editUserForm.role, onValueChange: (v) => setEditUserForm({
            ...editUserForm,
            role: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "editUsrRole", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "operator", children: "Operator" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "supervisor", children: "Supervisor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "manager", children: "Manager" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setEditUserOpen(false), children: "Batal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: editUserLoading, className: "bg-gradient-primary", children: editUserLoading ? "Menyimpan..." : "Simpan Perubahan" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deleteUserOpen, onOpenChange: setDeleteUserOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Hapus Pengguna" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Apakah Anda yakin ingin menghapus ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteUserTarget?.name }),
          "? Tindakan ini tidak dapat dibatalkan."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleteUserLoading, children: "Batal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: handleDeleteUser, disabled: deleteUserLoading, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: deleteUserLoading ? "Menghapus..." : "Hapus" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: editLineOpen, onOpenChange: setEditLineOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Lini Produksi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Perbarui detail untuk ",
          editLineTarget?.id,
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleEditLine, className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "editLnName", children: "Nama Lini" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "editLnName", value: editLineForm.name, onChange: (e) => setEditLineForm({
            ...editLineForm,
            name: e.target.value
          }), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "editLnCap", children: "Capacity/hr" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "editLnCap", type: "number", value: editLineForm.capacity, onChange: (e) => setEditLineForm({
              ...editLineForm,
              capacity: e.target.value
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "editLnShifts", children: "Shifts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "editLnShifts", type: "number", value: editLineForm.shifts, onChange: (e) => setEditLineForm({
              ...editLineForm,
              shifts: e.target.value
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "editLnOps", children: "Operators" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "editLnOps", type: "number", value: editLineForm.operators, onChange: (e) => setEditLineForm({
              ...editLineForm,
              operators: e.target.value
            }), required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setEditLineOpen(false), children: "Batal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: editLineLoading, className: "bg-gradient-primary", children: editLineLoading ? "Menyimpan..." : "Simpan Perubahan" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deleteLineOpen, onOpenChange: setDeleteLineOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Hapus Lini Produksi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Apakah Anda yakin ingin menghapus ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteLineTarget?.name }),
          "? Tindakan ini tidak dapat dibatalkan."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleteLineLoading, children: "Batal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: handleDeleteLine, disabled: deleteLineLoading, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: deleteLineLoading ? "Menghapus..." : "Hapus" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: editRoleOpen, onOpenChange: setEditRoleOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg bg-primary/10 text-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }) }),
          "Edit Izin ",
          editRoleTarget?.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Centang izin untuk memberikan akses. Setiap izin mengontrol item menu mana yang terlihat untuk pengguna ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: editRoleTarget?.name }),
          ". Perubahan berlaku segera tanpa memerlukan reload."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 py-2 max-h-80 overflow-y-auto pr-1", children: ALL_PERMISSIONS.map((perm) => {
        const checked = editRolePerms.includes(perm);
        const routes = PERMISSION_ROUTES[perm] ?? [];
        const routeLabels = {
          "/dashboard": "Dashboard",
          "/part-input": "Part In",
          "/part-out": "Part Out",
          "/fifo": "FIFO Check",
          "/production": "Production Data",
          "/reports": "Reports",
          "/settings": "Settings"
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: `perm-${perm}`, className: `flex items-center gap-3 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors ${checked ? "border-primary/40 bg-primary/5" : "border-transparent hover:bg-muted/50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: `perm-${perm}`, checked, onCheckedChange: () => togglePerm(perm) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: perm }),
            routes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-2.5 w-2.5 text-muted-foreground shrink-0" }),
              routes.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono", children: routeLabels[r] ?? r }, r))
            ] })
          ] })
        ] }, perm);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          editRolePerms.length,
          " dari ",
          ALL_PERMISSIONS.length,
          " izin aktif"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => setEditRoleOpen(false), children: "Batal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "bg-gradient-primary gap-1.5", disabled: editRoleLoading || editRolePerms.length === 0, onClick: handleSaveRolePerms, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
            editRoleLoading ? "Menyimpan..." : "Simpan & Terapkan"
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  SettingsPage as component
};
