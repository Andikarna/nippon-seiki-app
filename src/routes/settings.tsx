import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, MoreHorizontal, ShieldCheck, Pencil, Trash2, UserCheck, UserX, Save, Link2, Bell, Mail, Printer as PrinterIcon, AlignJustify, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSettingsData, addSettingUser, addSettingLine,
  updateSettingUser, deleteSettingUser,
  updateSettingLine, deleteSettingLine,
  getParts, addPart, updatePart, deletePart,
} from "@/lib/api/db.functions";
import {
  ALL_PERMISSIONS,
  DEFAULT_ROLE_PERMISSIONS,
  PERMISSION_ROUTES,
  loadRolePermissions,
  saveRolePermissions,
  type Permission,
} from "@/lib/permissions";
import {
  loadPreferences, savePreferences, applyCompactDensity,
  type AppPreferences,
} from "@/lib/preferences";
import { useUser, type Role } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — NPMS" }] }),
  component: SettingsPage,
});

// Role labels for display (count from DB would be ideal; using static for now)
const ROLE_META: Record<Role, { label: string; count: number }> = {
  operator_in:  { label: "Operator In",  count: 12 },
  operator_out: { label: "Operator Out", count: 12 },
  supervisor:   { label: "Supervisor",   count: 6 },
  manager:      { label: "Manager",      count: 2 },
};

/** Build the display-friendly roles array from stored permissions */
function buildRolesDisplay(stored: Record<Role, Permission[]>) {
  return (Object.keys(ROLE_META) as Role[]).map((role) => ({
    role,
    name: ROLE_META[role].label,
    count: ROLE_META[role].count,
    perms: stored[role] ?? DEFAULT_ROLE_PERMISSIONS[role],
  }));
}

// ── Types ──────────────────────────────────────────────────────────────────
type UserRow = { name: string; username: string; email: string; role: string; line: string; active: boolean };
type LineRow = { id: string; name: string; type: string; active: boolean; capacity: number; shifts: number; operators: number };

function SettingsPage() {
  const queryClient = useQueryClient();
  const user = useUser();
  const storedPerms = loadRolePermissions();
  const userPerms = user ? (storedPerms[user.role] ?? []) : [];

  const canManageUsers = userPerms.includes("Manage Users");
  const canManageLines = userPerms.includes("Manage Production Lines");
  const canManageParts = userPerms.includes("Manage Parts");

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (user) {
      const stored = loadRolePermissions();
      const perms = stored[user.role] ?? [];
      if (perms.includes("Manage Users")) {
        setActiveTab((prev) => prev || "users");
      } else if (perms.includes("Manage Production Lines")) {
        setActiveTab((prev) => prev || "lines");
      } else if (perms.includes("Manage Parts")) {
        setActiveTab((prev) => prev || "parts");
      } else {
        setActiveTab((prev) => prev || "prefs");
      }
    }
  }, [user]);

  // ── Role Permissions state ─────────────────────────────────────────────
  const [roles, setRoles] = useState(() => buildRolesDisplay(loadRolePermissions()));
  const [editRoleOpen, setEditRoleOpen] = useState(false);
  const [editRoleTarget, setEditRoleTarget] = useState<ReturnType<typeof buildRolesDisplay>[0] | null>(null);
  const [editRolePerms, setEditRolePerms] = useState<Permission[]>([]);
  const [editRoleLoading, setEditRoleLoading] = useState(false);

  const openEditRole = (r: ReturnType<typeof buildRolesDisplay>[0]) => {
    setEditRoleTarget(r);
    setEditRolePerms([...r.perms] as Permission[]);
    setEditRoleOpen(true);
  };

  const togglePerm = (perm: Permission) => {
    setEditRolePerms((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleSaveRolePerms = async () => {
    if (!editRoleTarget) return;
    setEditRoleLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    // 1. Update local UI state
    setRoles((prev) =>
      prev.map((r) =>
        r.role === editRoleTarget.role ? { ...r, perms: editRolePerms } : r
      )
    );

    // 2. Persist to localStorage and broadcast to sidebar
    const current = loadRolePermissions();
    current[editRoleTarget.role] = editRolePerms;
    saveRolePermissions(current);

    toast.success(`Izin untuk "${editRoleTarget.name}" disimpan — sidebar diperbarui.`);
    setEditRoleOpen(false);
    setEditRoleLoading(false);
  };

  // ── Add User dialog ────────────────────────────────────────────────────
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [userForm, setUserForm] = useState({ name: "", username: "", email: "", role: "operator_in", password: "" });
  const [userLoading, setUserLoading] = useState(false);

  // ── Edit User dialog ───────────────────────────────────────────────────
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [editUserTarget, setEditUserTarget] = useState<UserRow | null>(null);
  const [editUserForm, setEditUserForm] = useState({ name: "", username: "", role: "operator_in" });
  const [editUserLoading, setEditUserLoading] = useState(false);

  // ── Delete User confirm ────────────────────────────────────────────────
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const [deleteUserTarget, setDeleteUserTarget] = useState<UserRow | null>(null);
  const [deleteUserLoading, setDeleteUserLoading] = useState(false);

  // ── Add Line dialog ────────────────────────────────────────────────────
  const [lineDialogOpen, setLineDialogOpen] = useState(false);
  const [lineForm, setLineForm] = useState({ id: "", name: "", type: "in", capacity: "120", shifts: "3", operators: "4" });
  const [lineLoading, setLineLoading] = useState(false);

  // ── Edit Line dialog ───────────────────────────────────────────────────
  const [editLineOpen, setEditLineOpen] = useState(false);
  const [editLineTarget, setEditLineTarget] = useState<LineRow | null>(null);
  const [editLineForm, setEditLineForm] = useState({ name: "", type: "in", capacity: "120", shifts: "3", operators: "4" });
  const [editLineLoading, setEditLineLoading] = useState(false);

  // ── Delete Line confirm ────────────────────────────────────────────────
  const [deleteLineOpen, setDeleteLineOpen] = useState(false);
  const [deleteLineTarget, setDeleteLineTarget] = useState<LineRow | null>(null);
  const [deleteLineLoading, setDeleteLineLoading] = useState(false);

  // ── Add Part dialog ────────────────────────────────────────────────────
  const [partDialogOpen, setPartDialogOpen] = useState(false);
  const [partForm, setPartForm] = useState({ partNumber: "", productName: "", threshold: "100" });
  const [partLoading, setPartLoading] = useState(false);

  // ── Edit Part dialog ───────────────────────────────────────────────────
  const [editPartOpen, setEditPartOpen] = useState(false);
  const [editPartTarget, setEditPartTarget] = useState<any | null>(null);
  const [editPartForm, setEditPartForm] = useState({ productName: "", threshold: "100" });
  const [editPartLoading, setEditPartLoading] = useState(false);

  // ── Delete Part confirm ────────────────────────────────────────────────
  const [deletePartOpen, setDeletePartOpen] = useState(false);
  const [deletePartTarget, setDeletePartTarget] = useState<any | null>(null);
  const [deletePartLoading, setDeletePartLoading] = useState(false);

  // ── Preferences ─────────────────────────────────────────────────
  const [appPrefs, setAppPrefs] = useState<AppPreferences>(() => loadPreferences());
  const [prefSaving, setPrefSaving] = useState(false);

  // Apply compact density live when the switch is toggled
  useEffect(() => {
    applyCompactDensity(appPrefs.compactDensity);
  }, [appPrefs.compactDensity]);

  const updatePref = <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => {
    setAppPrefs((prev) => ({ ...prev, [key]: value }));
  };

  // ── Load Settings Data ─────────────────────────────────────────────────
  const { data, isLoading } = useQuery({
    queryKey: ["settingsData"],
    queryFn: () => getSettingsData(),
  });

  const users = data?.users ?? [];
  const productionLines = data?.productionLines ?? [];

  // ── Load Parts Data ────────────────────────────────────────────────────
  const { data: dbParts, isLoading: isPartsLoading } = useQuery({
    queryKey: ["parts"],
    queryFn: () => getParts(),
  });

  const parts = dbParts ?? [];

  // ── Handlers: Add User ─────────────────────────────────────────────────
  const handleAddUser = async (e: React.FormEvent) => {
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
          password: userForm.password.trim() || undefined,
        },
      });
      toast.success("Pengguna berhasil ditambahkan.");
      setUserForm({ name: "", username: "", email: "", role: "operator_in", password: "" });
      setUserDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Gagal menambahkan pengguna.");
    } finally {
      setUserLoading(false);
    }
  };

  // ── Handlers: Edit User ────────────────────────────────────────────────
  const openEditUser = (u: UserRow) => {
    setEditUserTarget(u);
    setEditUserForm({ name: u.name, username: u.username, role: u.role.toLowerCase() });
    setEditUserOpen(true);
  };

  const handleEditUser = async (e: React.FormEvent) => {
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
          active: editUserTarget.active,
        },
      });
      toast.success("Pengguna berhasil diperbarui.");
      setEditUserOpen(false);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Gagal memperbarui pengguna.");
    } finally {
      setEditUserLoading(false);
    }
  };

  // ── Handlers: Delete User ──────────────────────────────────────────────
  const openDeleteUser = (u: UserRow) => {
    setDeleteUserTarget(u);
    setDeleteUserOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!deleteUserTarget) return;
    setDeleteUserLoading(true);
    try {
      await deleteSettingUser({ data: { email: deleteUserTarget.email } });
      toast.success(`Pengguna "${deleteUserTarget.name}" dihapus.`);
      setDeleteUserOpen(false);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Gagal menghapus pengguna.");
    } finally {
      setDeleteUserLoading(false);
    }
  };

  // ── Handlers: Toggle User Status ───────────────────────────────────────
  const handleToggleUserStatus = async (u: UserRow) => {
    try {
      await updateSettingUser({
        data: {
          email: u.email,
          name: u.name,
          username: u.username,
          role: u.role.toLowerCase(),
          active: !u.active,
        },
      });
      toast.success(`Pengguna "${u.name}" ${u.active ? "dinonaktifkan" : "diaktifkan"}.`);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Gagal memperbarui status pengguna.");
    }
  };

  // ── Handlers: Add Line ─────────────────────────────────────────────────
  const handleAddLine = async (e: React.FormEvent) => {
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
          type: lineForm.type,
          capacity: Number(lineForm.capacity),
          shifts: Number(lineForm.shifts),
          operators: Number(lineForm.operators),
        },
      });
      toast.success("Lini Produksi berhasil ditambahkan.");
      setLineForm({ id: "", name: "", type: "in", capacity: "120", shifts: "3", operators: "4" });
      setLineDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Gagal menambahkan lini produksi.");
    } finally {
      setLineLoading(false);
    }
  };

  // ── Handlers: Edit Line ────────────────────────────────────────────────
  const openEditLine = (l: LineRow) => {
    setEditLineTarget(l);
    setEditLineForm({
      name: l.name,
      type: l.type || "in",
      capacity: String(l.capacity),
      shifts: String(l.shifts),
      operators: String(l.operators),
    });
    setEditLineOpen(true);
  };

  const handleEditLine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editLineTarget) return;
    setEditLineLoading(true);
    try {
      await updateSettingLine({
        data: {
          id: editLineTarget.id,
          name: editLineForm.name.trim(),
          type: editLineForm.type,
          capacity: Number(editLineForm.capacity),
          shifts: Number(editLineForm.shifts),
          operators: Number(editLineForm.operators),
        },
      });
      toast.success("Lini produksi diperbarui.");
      setEditLineOpen(false);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Gagal memperbarui lini produksi.");
    } finally {
      setEditLineLoading(false);
    }
  };

  // ── Handlers: Delete Line ──────────────────────────────────────────────
  const openDeleteLine = (l: LineRow) => {
    setDeleteLineTarget(l);
    setDeleteLineOpen(true);
  };

  const handleDeleteLine = async () => {
    if (!deleteLineTarget) return;
    setDeleteLineLoading(true);
    try {
      await deleteSettingLine({ data: { id: deleteLineTarget.id } });
      toast.success(`Lini "${deleteLineTarget.name}" dihapus.`);
      setDeleteLineOpen(false);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Gagal menghapus lini produksi.");
    } finally {
      setDeleteLineLoading(false);
    }
  };

  // ── Handlers: Add Part ──────────────────────────────────────────────────
  const handleAddPart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partForm.partNumber.trim() || !partForm.productName.trim()) {
      toast.error("Harap isi semua kolom yang diperlukan.");
      return;
    }
    setPartLoading(true);
    try {
      await addPart({
        data: {
          partNumber: partForm.partNumber.trim(),
          productName: partForm.productName.trim(),
          threshold: Number(partForm.threshold),
        },
      });
      toast.success("Part berhasil ditambahkan.");
      setPartForm({ partNumber: "", productName: "", threshold: "100" });
      setPartDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["parts"] });
    } catch {
      toast.error("Gagal menambahkan part.");
    } finally {
      setPartLoading(false);
    }
  };

  // ── Handlers: Edit Part ─────────────────────────────────────────────────
  const openEditPart = (p: any) => {
    setEditPartTarget(p);
    setEditPartForm({ productName: p.productName, threshold: String(p.threshold) });
    setEditPartOpen(true);
  };

  const handleEditPart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPartTarget) return;
    setEditPartLoading(true);
    try {
      await updatePart({
        data: {
          partNumber: editPartTarget.partNumber,
          productName: editPartForm.productName.trim(),
          threshold: Number(editPartForm.threshold),
        },
      });
      toast.success("Part berhasil diperbarui.");
      setEditPartOpen(false);
      queryClient.invalidateQueries({ queryKey: ["parts"] });
    } catch {
      toast.error("Gagal memperbarui part.");
    } finally {
      setEditPartLoading(false);
    }
  };

  // ── Handlers: Delete Part ───────────────────────────────────────────────
  const openDeletePart = (p: any) => {
    setDeletePartTarget(p);
    setDeletePartOpen(true);
  };

  const handleDeletePart = async () => {
    if (!deletePartTarget) return;
    setDeletePartLoading(true);
    try {
      await deletePart({ data: { partNumber: deletePartTarget.partNumber } });
      toast.success(`Part "${deletePartTarget.partNumber}" dihapus.`);
      setDeletePartOpen(false);
      queryClient.invalidateQueries({ queryKey: ["parts"] });
    } catch {
      toast.error("Gagal menghapus part.");
    } finally {
      setDeletePartLoading(false);
    }
  };

  // ── Handlers: Save Preferences ─────────────────────────────────────
  const handleSavePreferences = async () => {
    setPrefSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    savePreferences(appPrefs);
    toast.success("Preferensi tersimpan.", {
      description: [
        appPrefs.realtimeNotifications && "Notifikasi: AKTIF",
        !appPrefs.realtimeNotifications && "Notifikasi: MATI",
        appPrefs.auditTrailEmails && "Email audit: AKTIF",
        appPrefs.autoPrintLabels && "Auto-print: AKTIF",
        appPrefs.compactDensity && "Mode compact: AKTIF",
        `Shift default: ${appPrefs.defaultShift}`,
      ].filter(Boolean).join(" · "),
    });
    setPrefSaving(false);
  };

  return (
    <AppLayout title="Settings" subtitle="Kelola pengguna, peran, lini produksi, dan preferensi.">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/60">
          {canManageUsers && <TabsTrigger value="users">Pengguna</TabsTrigger>}
          {canManageUsers && <TabsTrigger value="roles">Peran</TabsTrigger>}
          {canManageLines && <TabsTrigger value="lines">Lini Produksi</TabsTrigger>}
          {canManageParts && <TabsTrigger value="parts">Master Part</TabsTrigger>}
          <TabsTrigger value="prefs">Preferensi</TabsTrigger>
        </TabsList>

        {/* ── USERS TAB ─────────────────────────────────────────────────── */}
        {canManageUsers && (
          <TabsContent value="users" className="mt-4">
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Pengguna</CardTitle>
                <p className="text-xs text-muted-foreground">{users.length} pengguna aktif di sistem</p>
              </div>
              <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-gradient-primary"><Plus className="h-4 w-4" />Tambah pengguna</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Pengguna Baru</DialogTitle>
                    <DialogDescription>Daftarkan operator atau manajer baru di lantai produksi.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddUser} className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="usrName">Nama</Label>
                      <Input id="usrName" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} placeholder="Afifi Rouf" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usrUsername">Username</Label>
                      <Input id="usrUsername" value={userForm.username} onChange={(e) => setUserForm({ ...userForm, username: e.target.value })} placeholder="afifi" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usrEmail">Email</Label>
                      <Input id="usrEmail" type="email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} placeholder="afifi@ins.co.id" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usrPassword">Password (Opsional)</Label>
                      <Input id="usrPassword" type="password" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} placeholder="Kosongkan untuk '123456'" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usrRole">Peran</Label>
                      <Select value={userForm.role} onValueChange={(v) => setUserForm({ ...userForm, role: v })}>
                        <SelectTrigger id="usrRole"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operator_in">Operator In (Part In)</SelectItem>
                          <SelectItem value="operator_out">Operator Out (FIFO & Part Out)</SelectItem>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="button" variant="outline" onClick={() => setUserDialogOpen(false)}>Batal</Button>
                      <Button type="submit" disabled={userLoading} className="bg-gradient-primary">
                        {userLoading ? "Menyimpan..." : "Simpan Pengguna"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableHead>Nama</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Peran</TableHead>
                      <TableHead>Lini</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground text-sm">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" />
                          Memuat pengguna...
                        </TableCell>
                      </TableRow>
                    ) : (

                      users.map((u: any) => (
                        <TableRow key={u.email}>
                          <TableCell className="font-medium">{u.name}</TableCell>
                          <TableCell className="text-sm font-mono">@{u.username}</TableCell>
                          <TableCell className="text-muted-foreground">{u.email}</TableCell>
                          <TableCell className="capitalize">{u.role}</TableCell>
                          <TableCell className="text-sm">{u.line}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={u.active ? "bg-success/15 text-success border-success/20" : "bg-muted text-muted-foreground"}>
                              {u.active ? "Aktif" : "Tidak Aktif"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditUser(u)} className="gap-2 cursor-pointer">
                                  <Pencil className="h-3.5 w-3.5" /> Edit Pengguna
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleUserStatus(u)} className="gap-2 cursor-pointer">
                                  {u.active
                                    ? <><UserX className="h-3.5 w-3.5" /> Nonaktifkan</>
                                    : <><UserCheck className="h-3.5 w-3.5" /> Aktifkan</>
                                  }
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => openDeleteUser(u)} className="gap-2 text-destructive focus:text-destructive cursor-pointer">
                                  <Trash2 className="h-3.5 w-3.5" /> Hapus Pengguna
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          </TabsContent>
        )}

        {/* ── ROLES TAB ─────────────────────────────────────────────────── */}
        {canManageUsers && (
          <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((r) => (
              <Card key={r.name} className="border-0 shadow-soft">
                <CardHeader className="flex-row items-start justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center"><ShieldCheck className="h-4 w-4" /></div>
                    <div>
                      <CardTitle className="text-base">{r.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{r.count} pengguna · {r.perms.length} izin</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1.5">
                  {r.perms.map((p) => (
                    <div key={p} className="text-sm flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />{p}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full gap-2"
                    onClick={() => openEditRole(r)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit izin
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          </TabsContent>
        )}

        {/* ── LINES TAB ─────────────────────────────────────────────────── */}
        {canManageLines && (
          <TabsContent value="lines" className="mt-4">
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Lini Produksi</CardTitle>
              <Dialog open={lineDialogOpen} onOpenChange={setLineDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-gradient-primary"><Plus className="h-4 w-4" />Tambah lini</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Lini Produksi</DialogTitle>
                    <DialogDescription>Daftarkan lini assembly atau sub-assembly baru.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddLine} className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="lnId">Kode Lini / ID</Label>
                      <Input id="lnId" value={lineForm.id} onChange={(e) => setLineForm({ ...lineForm, id: e.target.value })} placeholder="Line D1" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lnName">Nama Lini</Label>
                      <Input id="lnName" value={lineForm.name} onChange={(e) => setLineForm({ ...lineForm, name: e.target.value })} placeholder="Line D1 - Sub-Assy" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lnType">Tipe (In / Out)</Label>
                      <Select value={lineForm.type} onValueChange={(v) => setLineForm({ ...lineForm, type: v })}>
                        <SelectTrigger id="lnType"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in">In (Part In)</SelectItem>
                          <SelectItem value="out">Out (Part Out)</SelectItem>
                          <SelectItem value="both">Both (In & Out)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="lnCap">Kapasitas/jam</Label>
                        <Input id="lnCap" type="number" value={lineForm.capacity} onChange={(e) => setLineForm({ ...lineForm, capacity: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lnShifts">Shift</Label>
                        <Input id="lnShifts" type="number" value={lineForm.shifts} onChange={(e) => setLineForm({ ...lineForm, shifts: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lnOps">Operator</Label>
                        <Input id="lnOps" type="number" value={lineForm.operators} onChange={(e) => setLineForm({ ...lineForm, operators: e.target.value })} required />
                      </div>
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="button" variant="outline" onClick={() => setLineDialogOpen(false)}>Batal</Button>
                      <Button type="submit" disabled={lineLoading} className="bg-gradient-primary">
                        {lineLoading ? "Menyimpan..." : "Simpan Lini"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {isLoading ? (
                <div className="col-span-full py-8 text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Memuat lini produksi...
                </div>
              ) : (
                productionLines.map((l: any) => (
                  <div key={l.id} className="rounded-xl border p-4 group relative">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{l.name}</div>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 capitalize">{l.type}</Badge>
                        <Badge variant="outline" className="bg-success/15 text-success border-success/20">Aktif</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditLine(l)} className="gap-2 cursor-pointer">
                              <Pencil className="h-3.5 w-3.5" /> Edit Lini
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openDeleteLine(l)} className="gap-2 text-destructive focus:text-destructive cursor-pointer">
                              <Trash2 className="h-3.5 w-3.5" /> Hapus Lini
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">Kapasitas: {l.capacity} unit/jam</div>
                    <div className="mt-1 text-xs text-muted-foreground">Shift: {l.shifts} · Operator: {l.operators}</div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          </TabsContent>
        )}

        {/* ── PARTS TAB ─────────────────────────────────────────────────── */}
        {canManageParts && (
          <TabsContent value="parts" className="mt-4">
            <Card className="border-0 shadow-soft">
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Master Part</CardTitle>
                  <p className="text-xs text-muted-foreground">{parts.length} part terdaftar di database</p>
                </div>
                <Dialog open={partDialogOpen} onOpenChange={setPartDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-gradient-primary">
                      <Plus className="h-4 w-4" />Tambah part
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tambah Part Master</DialogTitle>
                      <DialogDescription>Daftarkan tipe part number baru di sistem.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddPart} className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="partNum">Tipe (Part Number)</Label>
                        <Input id="partNum" value={partForm.partNumber} onChange={(e) => setPartForm({ ...partForm, partNumber: e.target.value })} placeholder="K18H" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partName">Nama Produk</Label>
                        <Input id="partName" value={partForm.productName} onChange={(e) => setPartForm({ ...partForm, productName: e.target.value })} placeholder="SS COMP K18H Assy" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partThresh">Safety Threshold (Minimum Stock)</Label>
                        <Input id="partThresh" type="number" value={partForm.threshold} onChange={(e) => setPartForm({ ...partForm, threshold: e.target.value })} required />
                      </div>
                      <DialogFooter className="pt-2">
                        <Button type="button" variant="outline" onClick={() => setPartDialogOpen(false)}>Batal</Button>
                        <Button type="submit" disabled={partLoading} className="bg-gradient-primary">
                          {partLoading ? "Menyimpan..." : "Simpan Part"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40 hover:bg-muted/40">
                        <TableHead>Tipe (Part Number)</TableHead>
                        <TableHead>Nama Produk</TableHead>
                        <TableHead>Safety Threshold</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isPartsLoading ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground text-sm">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" />
                            Memuat part master...
                          </TableCell>
                        </TableRow>
                      ) : parts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground text-sm">
                            Tidak ada part terdaftar.
                          </TableCell>
                        </TableRow>
                      ) : (
                        parts.map((p: any) => (
                          <TableRow key={p.partNumber}>
                            <TableCell className="font-semibold font-mono">{p.partNumber}</TableCell>
                            <TableCell className="text-sm">{p.productName}</TableCell>
                            <TableCell className="text-sm font-medium tabular-nums">{p.threshold} unit</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEditPart(p)} className="gap-2 cursor-pointer">
                                    <Pencil className="h-3.5 w-3.5" /> Edit Part
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => openDeletePart(p)} className="gap-2 text-destructive focus:text-destructive cursor-pointer">
                                    <Trash2 className="h-3.5 w-3.5" /> Hapus Part
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* ── PREFERENCES TAB ───────────────────────────────────────────── */}
        <TabsContent value="prefs" className="mt-4">
          <Card className="border-0 shadow-soft max-w-2xl">
            <CardHeader>
              <CardTitle className="text-base">Preferensi</CardTitle>
              <p className="text-xs text-muted-foreground">Perubahan diterapkan segera. Klik Simpan untuk mempertahankan antar sesi.</p>
            </CardHeader>
            <CardContent className="space-y-1">

              {/* Real-time Notifications */}
              <div className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors ${appPrefs.realtimeNotifications ? "bg-primary/5 border border-primary/20" : "bg-muted/40 border border-transparent"}`}>
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg grid place-items-center shrink-0 ${appPrefs.realtimeNotifications ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Notifikasi real-time</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">Bel peringatan otomatis diperbarui setiap 10 detik untuk pelanggaran FIFO &amp; peringatan stok.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className={appPrefs.realtimeNotifications ? "bg-success/15 text-success border-success/20 text-[10px]" : "text-[10px]"}>
                    {appPrefs.realtimeNotifications ? "ON" : "OFF"}
                  </Badge>
                  <Switch
                    checked={appPrefs.realtimeNotifications}
                    onCheckedChange={(v) => updatePref("realtimeNotifications", v)}
                  />
                </div>
              </div>

              {/* Audit Trail Emails */}
              <div className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors ${appPrefs.auditTrailEmails ? "bg-primary/5 border border-primary/20" : "bg-muted/40 border border-transparent"}`}>
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg grid place-items-center shrink-0 ${appPrefs.auditTrailEmails ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email audit trail</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">Email ringkasan harian dari semua tindakan supervisor dan manajer.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className={appPrefs.auditTrailEmails ? "bg-success/15 text-success border-success/20 text-[10px]" : "text-[10px]"}>
                    {appPrefs.auditTrailEmails ? "ON" : "OFF"}
                  </Badge>
                  <Switch
                    checked={appPrefs.auditTrailEmails}
                    onCheckedChange={(v) => updatePref("auditTrailEmails", v)}
                  />
                </div>
              </div>

              {/* Auto-print Labels */}
              <div className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors ${appPrefs.autoPrintLabels ? "bg-primary/5 border border-primary/20" : "bg-muted/40 border border-transparent"}`}>
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg grid place-items-center shrink-0 ${appPrefs.autoPrintLabels ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <PrinterIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Auto-print label</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">Otomatis memicu pencetakan label QR setelah pengiriman Part Input berhasil.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className={appPrefs.autoPrintLabels ? "bg-success/15 text-success border-success/20 text-[10px]" : "text-[10px]"}>
                    {appPrefs.autoPrintLabels ? "ON" : "OFF"}
                  </Badge>
                  <Switch
                    checked={appPrefs.autoPrintLabels}
                    onCheckedChange={(v) => updatePref("autoPrintLabels", v)}
                  />
                </div>
              </div>

              {/* Compact Density */}
              <div className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors ${appPrefs.compactDensity ? "bg-primary/5 border border-primary/20" : "bg-muted/40 border border-transparent"}`}>
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg grid place-items-center shrink-0 ${appPrefs.compactDensity ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <AlignJustify className="h-4 w-4" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Tampilan compact</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">Mengurangi padding di tabel, kartu, dan daftar. Diterapkan segera di semua halaman.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className={appPrefs.compactDensity ? "bg-success/15 text-success border-success/20 text-[10px]" : "text-[10px]"}>
                    {appPrefs.compactDensity ? "ON" : "OFF"}
                  </Badge>
                  <Switch
                    checked={appPrefs.compactDensity}
                    onCheckedChange={(v) => updatePref("compactDensity", v)}
                  />
                </div>
              </div>

              {/* Default Shift */}
              <div className="pt-4 border-t space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm font-medium">Shift default</Label>
                </div>
                <p className="text-xs text-muted-foreground">Mengisi kolom shift secara otomatis di formulir Part In dan Part Out.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {["Shift 1 · 07:00 – 15:00", "Shift 2 · 15:00 – 23:00", "Shift 3 · 23:00 – 07:00"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => updatePref("defaultShift", s)}
                      className={`text-xs rounded-lg border px-3 py-2.5 text-left transition-colors font-medium ${
                        appPrefs.defaultShift === s
                          ? "border-primary/40 bg-primary/5 text-primary"
                          : "border-border bg-muted/40 hover:bg-muted/70 text-muted-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <Input
                  value={appPrefs.defaultShift}
                  onChange={(e) => updatePref("defaultShift", e.target.value)}
                  placeholder="Nama shift kustom..."
                  className="mt-1"
                />
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  Terakhir disimpan: {typeof window !== "undefined" && localStorage.getItem("npms_app_preferences") ? "tersimpan" : "belum disimpan"}
                </p>
                <Button
                  className="bg-gradient-primary gap-2"
                  onClick={handleSavePreferences}
                  disabled={prefSaving}
                >
                  <Save className="h-4 w-4" />
                  {prefSaving ? "Menyimpan..." : "Simpan Preferensi"}
                </Button>
              </div>

            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ── EDIT USER DIALOG ────────────────────────────────────────────── */}
      <Dialog open={editUserOpen} onOpenChange={setEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Pengguna</DialogTitle>
            <DialogDescription>Perbarui nama atau peran untuk {editUserTarget?.email}.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditUser} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="editUsrName">Nama</Label>
              <Input id="editUsrName" value={editUserForm.name} onChange={(e) => setEditUserForm({ ...editUserForm, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editUsrUsername">Username</Label>
              <Input id="editUsrUsername" value={editUserForm.username} onChange={(e) => setEditUserForm({ ...editUserForm, username: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editUsrRole">Peran</Label>
              <Select value={editUserForm.role} onValueChange={(v) => setEditUserForm({ ...editUserForm, role: v })}>
                <SelectTrigger id="editUsrRole"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="operator_in">Operator In (Part In)</SelectItem>
                  <SelectItem value="operator_out">Operator Out (FIFO & Part Out)</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setEditUserOpen(false)}>Batal</Button>
              <Button type="submit" disabled={editUserLoading} className="bg-gradient-primary">
                {editUserLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── DELETE USER CONFIRM ──────────────────────────────────────────── */}
      <AlertDialog open={deleteUserOpen} onOpenChange={setDeleteUserOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Pengguna</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus <strong>{deleteUserTarget?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteUserLoading}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={deleteUserLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteUserLoading ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── EDIT LINE DIALOG ─────────────────────────────────────────────── */}
      <Dialog open={editLineOpen} onOpenChange={setEditLineOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lini Produksi</DialogTitle>
            <DialogDescription>Perbarui detail untuk {editLineTarget?.id}.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditLine} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="editLnName">Nama Lini</Label>
              <Input id="editLnName" value={editLineForm.name} onChange={(e) => setEditLineForm({ ...editLineForm, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editLnType">Tipe (In / Out)</Label>
              <Select value={editLineForm.type} onValueChange={(v) => setEditLineForm({ ...editLineForm, type: v })}>
                <SelectTrigger id="editLnType"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="in">In (Part In)</SelectItem>
                  <SelectItem value="out">Out (Part Out)</SelectItem>
                  <SelectItem value="both">Both (In & Out)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label htmlFor="editLnCap">Capacity/hr</Label>
                <Input id="editLnCap" type="number" value={editLineForm.capacity} onChange={(e) => setEditLineForm({ ...editLineForm, capacity: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLnShifts">Shifts</Label>
                <Input id="editLnShifts" type="number" value={editLineForm.shifts} onChange={(e) => setEditLineForm({ ...editLineForm, shifts: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLnOps">Operators</Label>
                <Input id="editLnOps" type="number" value={editLineForm.operators} onChange={(e) => setEditLineForm({ ...editLineForm, operators: e.target.value })} required />
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setEditLineOpen(false)}>Batal</Button>
              <Button type="submit" disabled={editLineLoading} className="bg-gradient-primary">
                {editLineLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── DELETE LINE CONFIRM ──────────────────────────────────────────── */}
      <AlertDialog open={deleteLineOpen} onOpenChange={setDeleteLineOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Lini Produksi</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus <strong>{deleteLineTarget?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLineLoading}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteLine}
              disabled={deleteLineLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLineLoading ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── EDIT PART DIALOG ────────────────────────────────────────────── */}
      <Dialog open={editPartOpen} onOpenChange={setEditPartOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Part Master</DialogTitle>
            <DialogDescription>Perbarui detail untuk part number {editPartTarget?.partNumber}.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditPart} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="editPartName">Nama Produk</Label>
              <Input id="editPartName" value={editPartForm.productName} onChange={(e) => setEditPartForm({ ...editPartForm, productName: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editPartThresh">Safety Threshold (Minimum Stock)</Label>
              <Input id="editPartThresh" type="number" value={editPartForm.threshold} onChange={(e) => setEditPartForm({ ...editPartForm, threshold: e.target.value })} required />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setEditPartOpen(false)}>Batal</Button>
              <Button type="submit" disabled={editPartLoading} className="bg-gradient-primary">
                {editPartLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── DELETE PART CONFIRM ──────────────────────────────────────────── */}
      <AlertDialog open={deletePartOpen} onOpenChange={setDeletePartOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Part Master</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus part <strong>{deletePartTarget?.partNumber}</strong>? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletePartLoading}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePart}
              disabled={deletePartLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletePartLoading ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── EDIT ROLE PERMISSIONS DIALOG ─────────────────────────────────── */}
      <Dialog open={editRoleOpen} onOpenChange={setEditRoleOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
              Edit Izin {editRoleTarget?.name}
            </DialogTitle>
            <DialogDescription>
              Centang izin untuk memberikan akses. Setiap izin mengontrol item menu mana yang terlihat untuk pengguna <strong>{editRoleTarget?.name}</strong>.
              Perubahan berlaku segera tanpa memerlukan reload.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1.5 py-2 max-h-80 overflow-y-auto pr-1">
            {ALL_PERMISSIONS.map((perm) => {
              const checked = editRolePerms.includes(perm as Permission);
              const routes = PERMISSION_ROUTES[perm as Permission] ?? [];
              // Map route paths to friendly labels
              const routeLabels: Record<string, string> = {
                "/dashboard":  "Dashboard",
                "/part-input": "Part In",
                "/part-out":   "Part Out",
                "/fifo":       "FIFO Check",
                "/production": "Production Data",
                "/reports":    "Reports",
                "/settings":   "Settings",
              };
              return (
                <label
                  key={perm}
                  htmlFor={`perm-${perm}`}
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors ${
                    checked
                      ? "border-primary/40 bg-primary/5"
                      : "border-transparent hover:bg-muted/50"
                  }`}
                >
                  <Checkbox
                    id={`perm-${perm}`}
                    checked={checked}
                    onCheckedChange={() => togglePerm(perm as Permission)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{perm}</div>
                    {routes.length > 0 && (
                      <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                        <Link2 className="h-2.5 w-2.5 text-muted-foreground shrink-0" />
                        {routes.map((r) => (
                          <span
                            key={r}
                            className="text-[10px] bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono"
                          >
                            {routeLabels[r] ?? r}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </label>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              {editRolePerms.length} dari {ALL_PERMISSIONS.length} izin aktif
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditRoleOpen(false)}>
                Batal
              </Button>
              <Button
                size="sm"
                className="bg-gradient-primary gap-1.5"
                disabled={editRoleLoading || editRolePerms.length === 0}
                onClick={handleSaveRolePerms}
              >
                <Save className="h-3.5 w-3.5" />
                {editRoleLoading ? "Menyimpan..." : "Simpan & Terapkan"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
