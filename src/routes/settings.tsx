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
import { Plus, MoreHorizontal, ShieldCheck } from "lucide-react";
import { productionLines } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — NPMS" }] }),
  component: SettingsPage,
});

const users = [
  { name: "Afifi Rouf", email: "operator@ins.co.id", role: "Operator", line: "Line A1", active: true },
  { name: "Bayu Saputra", email: "bayu@ins.co.id", role: "Operator", line: "Line B1", active: true },
  { name: "Sari Supervisor", email: "supervisor@ins.co.id", role: "Supervisor", line: "All", active: true },
  { name: "Andi Manager", email: "manager@ins.co.id", role: "Manager", line: "All", active: true },
  { name: "Dimas Pratama", email: "dimas@ins.co.id", role: "Operator", line: "Line C1", active: false },
];

const roles = [
  { name: "Operator", perms: ["Input Production", "Part Out", "FIFO Check"], count: 24 },
  { name: "Supervisor", perms: ["Approve Transactions", "Review FIFO Violations", "Generate Reports"], count: 6 },
  { name: "Manager", perms: ["Access Analytics", "Access All Reports", "Manage Users"], count: 2 },
];

function SettingsPage() {
  return (
    <AppLayout title="Settings" subtitle="Manage users, roles, production lines, and preferences.">
      <Tabs defaultValue="users">
        <TabsList className="bg-muted/60">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="lines">Production Lines</TabsTrigger>
          <TabsTrigger value="prefs">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Users</CardTitle>
                <p className="text-xs text-muted-foreground">{users.length} active users in the system</p>
              </div>
              <Button className="gap-2 bg-gradient-primary"><Plus className="h-4 w-4" />Add user</Button>
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
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((r) => (
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
                  <Button variant="outline" size="sm" className="mt-3 w-full">Edit permissions</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lines" className="mt-4">
          <Card className="border-0 shadow-soft">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Production Lines</CardTitle>
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
            </CardContent>
          </Card>
        </TabsContent>

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
                  <Switch defaultChecked={p.on} />
                </div>
              ))}
              <div className="space-y-2 pt-2 border-t">
                <Label>Default shift</Label>
                <Input defaultValue="Shift 1 · 07:00 – 15:00" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
