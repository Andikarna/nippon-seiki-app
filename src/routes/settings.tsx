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
<<<<<<< HEAD
import { Plus, MoreHorizontal, ShieldCheck } from "lucide-react";
import { productionLines } from "@/lib/mock-data";
=======
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, MoreHorizontal, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettingsData, addSettingUser, addSettingLine } from "@/lib/api/db.functions";
import { toast } from "sonner";
>>>>>>> origin/connection-database

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — NPMS" }] }),
  component: SettingsPage,
});

<<<<<<< HEAD
const users = [
  { name: "Afifi Rouf", email: "operator@ins.co.id", role: "Operator", line: "Line A1", active: true },
  { name: "Bayu Saputra", email: "bayu@ins.co.id", role: "Operator", line: "Line B1", active: true },
  { name: "Sari Supervisor", email: "supervisor@ins.co.id", role: "Supervisor", line: "All", active: true },
  { name: "Andi Manager", email: "manager@ins.co.id", role: "Manager", line: "All", active: true },
  { name: "Dimas Pratama", email: "dimas@ins.co.id", role: "Operator", line: "Line C1", active: false },
];

const roles = [
=======
const rolesList = [
>>>>>>> origin/connection-database
  { name: "Operator", perms: ["Input Production", "Part Out", "FIFO Check"], count: 24 },
  { name: "Supervisor", perms: ["Approve Transactions", "Review FIFO Violations", "Generate Reports"], count: 6 },
  { name: "Manager", perms: ["Access Analytics", "Access All Reports", "Manage Users"], count: 2 },
];

function SettingsPage() {
<<<<<<< HEAD
=======
  const queryClient = useQueryClient();
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [lineDialogOpen, setLineDialogOpen] = useState(false);
  
  // User Form State
  const [userForm, setUserForm] = useState({ name: "", email: "", role: "operator", password: "" });
  const [userLoading, setUserLoading] = useState(false);

  // Line Form State
  const [lineForm, setLineForm] = useState({ id: "", name: "", capacity: "120", shifts: "3", operators: "4" });
  const [lineLoading, setLineLoading] = useState(false);

  // Load Settings Data
  const { data, isLoading } = useQuery({
    queryKey: ["settingsData"],
    queryFn: () => getSettingsData(),
  });

  const users = data?.users ?? [];
  const productionLines = data?.productionLines ?? [];

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
    } catch (err) {
      toast.error("Failed to add user.");
    } finally {
      setUserLoading(false);
    }
  };

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
    } catch (err) {
      toast.error("Failed to add production line.");
    } finally {
      setLineLoading(false);
    }
  };

>>>>>>> origin/connection-database
  return (
    <AppLayout title="Settings" subtitle="Manage users, roles, production lines, and preferences.">
      <Tabs defaultValue="users">
        <TabsList className="bg-muted/60">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="lines">Production Lines</TabsTrigger>
          <TabsTrigger value="prefs">Preferences</TabsTrigger>
        </TabsList>

<<<<<<< HEAD
=======
        {/* USERS TAB */}
>>>>>>> origin/connection-database
        <TabsContent value="users" className="mt-4">
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Users</CardTitle>
                <p className="text-xs text-muted-foreground">{users.length} active users in the system</p>
              </div>
<<<<<<< HEAD
              <Button className="gap-2 bg-gradient-primary"><Plus className="h-4 w-4" />Add user</Button>
=======
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
>>>>>>> origin/connection-database
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
<<<<<<< HEAD
                    {users.map((u) => (
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
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
=======
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
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
>>>>>>> origin/connection-database
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

<<<<<<< HEAD
        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((r) => (
=======
        {/* ROLES TAB */}
        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rolesList.map((r) => (
>>>>>>> origin/connection-database
              <Card key={r.name} className="border-0 shadow-soft">
                <CardHeader className="flex-row items-start justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center"><ShieldCheck className="h-4 w-4" /></div>
                    <div>
                      <CardTitle className="text-base">{r.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{r.count} users</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1.5">
                  {r.perms.map((p) => (
                    <div key={p} className="text-sm flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />{p}
                    </div>
                  ))}
<<<<<<< HEAD
                  <Button variant="outline" size="sm" className="mt-3 w-full">Edit permissions</Button>
=======
                  <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => toast.info("Role permissions modification is locked.")}>Edit permissions</Button>
>>>>>>> origin/connection-database
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

<<<<<<< HEAD
=======
        {/* LINES TAB */}
>>>>>>> origin/connection-database
        <TabsContent value="lines" className="mt-4">
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Production Lines</CardTitle>
<<<<<<< HEAD
              <Button className="gap-2 bg-gradient-primary"><Plus className="h-4 w-4" />Add line</Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {productionLines.map((l, i) => (
                <div key={l} className="rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{l}</div>
                    <Badge variant="outline" className="bg-success/15 text-success border-success/20">Active</Badge>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Capacity: {120 + i * 20} units/hr</div>
                  <div className="mt-2 text-xs text-muted-foreground">Shifts: 3 · Operators: {4 + i}</div>
                </div>
              ))}
=======
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
                productionLines.map((l: any, i: number) => (
                  <div key={l.id} className="rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{l.name}</div>
                      <Badge variant="outline" className="bg-success/15 text-success border-success/20">Active</Badge>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">Capacity: {l.capacity} units/hr</div>
                    <div className="mt-2 text-xs text-muted-foreground">Shifts: {l.shifts} · Operators: {l.operators}</div>
                  </div>
                ))
              )}
>>>>>>> origin/connection-database
            </CardContent>
          </Card>
        </TabsContent>

<<<<<<< HEAD
=======
        {/* PREFERENCES TAB */}
>>>>>>> origin/connection-database
        <TabsContent value="prefs" className="mt-4">
          <Card className="border-0 shadow-soft max-w-2xl">
            <CardHeader><CardTitle className="text-base">Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {[
                { l: "Real-time notifications", d: "Receive WebSocket alerts for FIFO violations and stock warnings.", on: true },
                { l: "Audit trail emails", d: "Daily summary of all supervisor actions.", on: false },
                { l: "Auto-print labels", d: "Print QR labels automatically after Part Input.", on: true },
                { l: "Compact density", d: "Reduce padding in tables and lists.", on: false },
              ].map((p) => (
                <div key={p.l} className="flex items-start justify-between gap-4">
                  <div>
                    <Label className="text-sm">{p.l}</Label>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.d}</p>
                  </div>
<<<<<<< HEAD
                  <Switch defaultChecked={p.on} />
=======
                  <Switch defaultChecked={p.on} onCheckedChange={() => toast.success("Preference updated.")} />
>>>>>>> origin/connection-database
                </div>
              ))}
              <div className="space-y-2 pt-2 border-t">
                <Label>Default shift</Label>
<<<<<<< HEAD
                <Input defaultValue="Shift 1 · 07:00 – 15:00" />
=======
                <Input defaultValue="Shift 1 · 07:00 – 15:00" onChange={() => {}} />
>>>>>>> origin/connection-database
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
