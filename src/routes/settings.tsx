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
import type { Role } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — NPMS" }] }),
  component: SettingsPage,
});

// Role labels for display (count from DB would be ideal; using static for now)
const ROLE_META: Record<Role, { label: string; count: number }> = {
  operator:   { label: "Operator",   count: 24 },
  supervisor: { label: "Supervisor", count: 6 },
  manager:    { label: "Manager",    count: 2 },
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
type UserRow = { name: string; email: string; role: string; line: string; active: boolean };
type LineRow = { id: string; name: string; active: boolean; capacity: number; shifts: number; operators: number };

function SettingsPage() {
  const queryClient = useQueryClient();

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

    toast.success(`Permissions for "${editRoleTarget.name}" saved — sidebar updated.`);
    setEditRoleOpen(false);
    setEditRoleLoading(false);
  };

  // ── Add User dialog ────────────────────────────────────────────────────
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [userForm, setUserForm] = useState({ name: "", email: "", role: "operator", password: "" });
  const [userLoading, setUserLoading] = useState(false);

  // ── Edit User dialog ───────────────────────────────────────────────────
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [editUserTarget, setEditUserTarget] = useState<UserRow | null>(null);
  const [editUserForm, setEditUserForm] = useState({ name: "", role: "operator" });
  const [editUserLoading, setEditUserLoading] = useState(false);

  // ── Delete User confirm ────────────────────────────────────────────────
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const [deleteUserTarget, setDeleteUserTarget] = useState<UserRow | null>(null);
  const [deleteUserLoading, setDeleteUserLoading] = useState(false);

  // ── Add Line dialog ────────────────────────────────────────────────────
  const [lineDialogOpen, setLineDialogOpen] = useState(false);
  const [lineForm, setLineForm] = useState({ id: "", name: "", capacity: "120", shifts: "3", operators: "4" });
  const [lineLoading, setLineLoading] = useState(false);

  // ── Edit Line dialog ───────────────────────────────────────────────────
  const [editLineOpen, setEditLineOpen] = useState(false);
  const [editLineTarget, setEditLineTarget] = useState<LineRow | null>(null);
  const [editLineForm, setEditLineForm] = useState({ name: "", capacity: "120", shifts: "3", operators: "4" });
  const [editLineLoading, setEditLineLoading] = useState(false);

  // ── Delete Line confirm ────────────────────────────────────────────────
  const [deleteLineOpen, setDeleteLineOpen] = useState(false);
  const [deleteLineTarget, setDeleteLineTarget] = useState<LineRow | null>(null);
  const [deleteLineLoading, setDeleteLineLoading] = useState(false);

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

  // ── Handlers: Add User ─────────────────────────────────────────────────
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name.trim() || !userForm.email.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }
    setUserLoading(true);
    try {
      await addSettingUser({
        data: {
          name: userForm.name.trim(),
          email: userForm.email.trim(),
          role: userForm.role,
          password: userForm.password.trim() || undefined,
        },
      });
      toast.success("User added successfully.");
      setUserForm({ name: "", email: "", role: "operator", password: "" });
      setUserDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Failed to add user.");
    } finally {
      setUserLoading(false);
    }
  };

  // ── Handlers: Edit User ────────────────────────────────────────────────
  const openEditUser = (u: UserRow) => {
    setEditUserTarget(u);
    setEditUserForm({ name: u.name, role: u.role.toLowerCase() });
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
          role: editUserForm.role,
          active: editUserTarget.active,
        },
      });
      toast.success("User updated successfully.");
      setEditUserOpen(false);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Failed to update user.");
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
      toast.success(`User "${deleteUserTarget.name}" deleted.`);
      setDeleteUserOpen(false);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Failed to delete user.");
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
          role: u.role.toLowerCase(),
          active: !u.active,
        },
      });
      toast.success(`User "${u.name}" ${u.active ? "deactivated" : "activated"}.`);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Failed to update user status.");
    }
  };

  // ── Handlers: Add Line ─────────────────────────────────────────────────
  const handleAddLine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lineForm.id.trim() || !lineForm.name.trim()) {
      toast.error("Please fill all required fields.");
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
          operators: Number(lineForm.operators),
        },
      });
      toast.success("Production Line added successfully.");
      setLineForm({ id: "", name: "", capacity: "120", shifts: "3", operators: "4" });
      setLineDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Failed to add production line.");
    } finally {
      setLineLoading(false);
    }
  };

  // ── Handlers: Edit Line ────────────────────────────────────────────────
  const openEditLine = (l: LineRow) => {
    setEditLineTarget(l);
    setEditLineForm({
      name: l.name,
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
          capacity: Number(editLineForm.capacity),
          shifts: Number(editLineForm.shifts),
          operators: Number(editLineForm.operators),
        },
      });
      toast.success("Production line updated.");
      setEditLineOpen(false);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Failed to update production line.");
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
      toast.success(`Line "${deleteLineTarget.name}" deleted.`);
      setDeleteLineOpen(false);
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
    } catch {
      toast.error("Failed to delete production line.");
    } finally {
      setDeleteLineLoading(false);
    }
  };

  // ── Handlers: Save Preferences ─────────────────────────────────────
  const handleSavePreferences = async () => {
    setPrefSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    savePreferences(appPrefs);
    toast.success("Preferences saved.", {
      description: [
        appPrefs.realtimeNotifications && "Notifications: ON",
        !appPrefs.realtimeNotifications && "Notifications: OFF",
        appPrefs.auditTrailEmails && "Audit emails: ON",
        appPrefs.autoPrintLabels && "Auto-print: ON",
        appPrefs.compactDensity && "Compact mode: ON",
        `Default shift: ${appPrefs.defaultShift}`,
      ].filter(Boolean).join(" · "),
    });
    setPrefSaving(false);
  };

  return (
    <AppLayout title="Settings" subtitle="Manage users, roles, production lines, and preferences.">
      <Tabs defaultValue="users">
        <TabsList className="bg-muted/60">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="lines">Production Lines</TabsTrigger>
          <TabsTrigger value="prefs">Preferences</TabsTrigger>
        </TabsList>

        {/* ── USERS TAB ─────────────────────────────────────────────────── */}
        <TabsContent value="users" className="mt-4">
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Users</CardTitle>
                <p className="text-xs text-muted-foreground">{users.length} active users in the system</p>
              </div>
              <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-gradient-primary"><Plus className="h-4 w-4" />Add user</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Register a new operator or manager on the shop floor.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddUser} className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="usrName">Name</Label>
                      <Input id="usrName" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} placeholder="Afifi Rouf" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usrEmail">Email</Label>
                      <Input id="usrEmail" type="email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} placeholder="afifi@ins.co.id" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usrPassword">Password (Optional)</Label>
                      <Input id="usrPassword" type="password" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} placeholder="Leave blank for '123456'" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usrRole">Role</Label>
                      <Select value={userForm.role} onValueChange={(v) => setUserForm({ ...userForm, role: v })}>
                        <SelectTrigger id="usrRole"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operator">Operator</SelectItem>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="button" variant="outline" onClick={() => setUserDialogOpen(false)}>Cancel</Button>
                      <Button type="submit" disabled={userLoading} className="bg-gradient-primary">
                        {userLoading ? "Saving..." : "Save User"}
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
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Line</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground text-sm">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" />
                          Loading users...
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((u) => (
                        <TableRow key={u.email}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-gradient-primary grid place-items-center text-white text-xs font-semibold">{u.name[0]}</div>
                              <span className="font-medium">{u.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                          <TableCell><Badge variant="outline">{u.role}</Badge></TableCell>
                          <TableCell className="text-sm">{u.line}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={u.active ? "bg-success/15 text-success border-success/20" : "bg-muted text-muted-foreground"}>
                              {u.active ? "Active" : "Inactive"}
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
                                  <Pencil className="h-3.5 w-3.5" /> Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleUserStatus(u)} className="gap-2 cursor-pointer">
                                  {u.active
                                    ? <><UserX className="h-3.5 w-3.5" /> Deactivate</>
                                    : <><UserCheck className="h-3.5 w-3.5" /> Activate</>
                                  }
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => openDeleteUser(u)} className="gap-2 text-destructive focus:text-destructive cursor-pointer">
                                  <Trash2 className="h-3.5 w-3.5" /> Delete User
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

        {/* ── ROLES TAB ─────────────────────────────────────────────────── */}
        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((r) => (
              <Card key={r.name} className="border-0 shadow-soft">
                <CardHeader className="flex-row items-start justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center"><ShieldCheck className="h-4 w-4" /></div>
                    <div>
                      <CardTitle className="text-base">{r.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{r.count} users · {r.perms.length} permissions</p>
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
                    Edit permissions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── LINES TAB ─────────────────────────────────────────────────── */}
        <TabsContent value="lines" className="mt-4">
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Production Lines</CardTitle>
              <Dialog open={lineDialogOpen} onOpenChange={setLineDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-gradient-primary"><Plus className="h-4 w-4" />Add line</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Production Line</DialogTitle>
                    <DialogDescription>Register a new assembly or sub-assembly line.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddLine} className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="lnId">Line Code / ID</Label>
                      <Input id="lnId" value={lineForm.id} onChange={(e) => setLineForm({ ...lineForm, id: e.target.value })} placeholder="Line D1" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lnName">Line Name</Label>
                      <Input id="lnName" value={lineForm.name} onChange={(e) => setLineForm({ ...lineForm, name: e.target.value })} placeholder="Line D1 - Sub-Assy" required />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="lnCap">Capacity/hr</Label>
                        <Input id="lnCap" type="number" value={lineForm.capacity} onChange={(e) => setLineForm({ ...lineForm, capacity: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lnShifts">Shifts</Label>
                        <Input id="lnShifts" type="number" value={lineForm.shifts} onChange={(e) => setLineForm({ ...lineForm, shifts: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lnOps">Operators</Label>
                        <Input id="lnOps" type="number" value={lineForm.operators} onChange={(e) => setLineForm({ ...lineForm, operators: e.target.value })} required />
                      </div>
                    </div>
                    <DialogFooter className="pt-2">
                      <Button type="button" variant="outline" onClick={() => setLineDialogOpen(false)}>Cancel</Button>
                      <Button type="submit" disabled={lineLoading} className="bg-gradient-primary">
                        {lineLoading ? "Saving..." : "Save Line"}
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
                  Loading production lines...
                </div>
              ) : (
                productionLines.map((l: any) => (
                  <div key={l.id} className="rounded-xl border p-4 group relative">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{l.name}</div>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="bg-success/15 text-success border-success/20">Active</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditLine(l)} className="gap-2 cursor-pointer">
                              <Pencil className="h-3.5 w-3.5" /> Edit Line
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openDeleteLine(l)} className="gap-2 text-destructive focus:text-destructive cursor-pointer">
                              <Trash2 className="h-3.5 w-3.5" /> Delete Line
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">Capacity: {l.capacity} units/hr</div>
                    <div className="mt-1 text-xs text-muted-foreground">Shifts: {l.shifts} · Operators: {l.operators}</div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── PREFERENCES TAB ───────────────────────────────────────────── */}
        <TabsContent value="prefs" className="mt-4">
          <Card className="border-0 shadow-soft max-w-2xl">
            <CardHeader>
              <CardTitle className="text-base">Preferences</CardTitle>
              <p className="text-xs text-muted-foreground">Changes are applied immediately. Click Save to persist across sessions.</p>
            </CardHeader>
            <CardContent className="space-y-1">

              {/* Real-time Notifications */}
              <div className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors ${appPrefs.realtimeNotifications ? "bg-primary/5 border border-primary/20" : "bg-muted/40 border border-transparent"}`}>
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg grid place-items-center shrink-0 ${appPrefs.realtimeNotifications ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Real-time notifications</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">Alert bell auto-refreshes every 10 s for FIFO violations &amp; stock warnings.</p>
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
                    <Label className="text-sm font-medium">Audit trail emails</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">Daily summary email of all supervisor and manager actions.</p>
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
                    <Label className="text-sm font-medium">Auto-print labels</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">Automatically trigger QR label printing after a successful Part Input submission.</p>
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
                    <Label className="text-sm font-medium">Compact density</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">Reduces padding in tables, cards, and lists. Applied instantly across all pages.</p>
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
                  <Label className="text-sm font-medium">Default shift</Label>
                </div>
                <p className="text-xs text-muted-foreground">Pre-fills the shift field in Part Input and Part Out forms.</p>
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
                  placeholder="Custom shift name..."
                  className="mt-1"
                />
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  Last saved: {typeof window !== "undefined" && localStorage.getItem("npms_app_preferences") ? "persisted" : "not yet saved"}
                </p>
                <Button
                  className="bg-gradient-primary gap-2"
                  onClick={handleSavePreferences}
                  disabled={prefSaving}
                >
                  <Save className="h-4 w-4" />
                  {prefSaving ? "Saving..." : "Save Preferences"}
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
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update name or role for {editUserTarget?.email}.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditUser} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="editUsrName">Name</Label>
              <Input id="editUsrName" value={editUserForm.name} onChange={(e) => setEditUserForm({ ...editUserForm, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editUsrRole">Role</Label>
              <Select value={editUserForm.role} onValueChange={(v) => setEditUserForm({ ...editUserForm, role: v })}>
                <SelectTrigger id="editUsrRole"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setEditUserOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={editUserLoading} className="bg-gradient-primary">
                {editUserLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── DELETE USER CONFIRM ──────────────────────────────────────────── */}
      <AlertDialog open={deleteUserOpen} onOpenChange={setDeleteUserOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deleteUserTarget?.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteUserLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={deleteUserLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteUserLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── EDIT LINE DIALOG ─────────────────────────────────────────────── */}
      <Dialog open={editLineOpen} onOpenChange={setEditLineOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Production Line</DialogTitle>
            <DialogDescription>Update details for {editLineTarget?.id}.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditLine} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="editLnName">Line Name</Label>
              <Input id="editLnName" value={editLineForm.name} onChange={(e) => setEditLineForm({ ...editLineForm, name: e.target.value })} required />
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
              <Button type="button" variant="outline" onClick={() => setEditLineOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={editLineLoading} className="bg-gradient-primary">
                {editLineLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── DELETE LINE CONFIRM ──────────────────────────────────────────── */}
      <AlertDialog open={deleteLineOpen} onOpenChange={setDeleteLineOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Production Line</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deleteLineTarget?.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLineLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteLine}
              disabled={deleteLineLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLineLoading ? "Deleting..." : "Delete"}
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
              Edit {editRoleTarget?.name} Permissions
            </DialogTitle>
            <DialogDescription>
              Check permissions to grant access. Each permission controls which
              menu items are visible for <strong>{editRoleTarget?.name}</strong> users.
              Changes take effect immediately without requiring a reload.
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
              {editRolePerms.length} of {ALL_PERMISSIONS.length} permissions active
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditRoleOpen(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-gradient-primary gap-1.5"
                disabled={editRoleLoading || editRolePerms.length === 0}
                onClick={handleSaveRolePerms}
              >
                <Save className="h-3.5 w-3.5" />
                {editRoleLoading ? "Saving..." : "Save & Apply"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
