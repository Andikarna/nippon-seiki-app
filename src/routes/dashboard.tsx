import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity, ArrowUpRight, ArrowDownRight, Boxes, PackagePlus, PackageMinus,
  TrendingUp, AlertTriangle, CheckCircle2, Info, XCircle,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
} from "recharts";
import { dailyTrend, fifoPerformance, activities, alerts, productionLines } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — NPMS" }] }),
  component: Dashboard,
});

const kpis = [
  { label: "Today's Production", value: "2,847", delta: "+12.4%", up: true, icon: Activity, hint: "vs yesterday" },
  { label: "Total Parts In", value: "1,524", delta: "+8.1%", up: true, icon: PackagePlus, hint: "Sub-Assy" },
  { label: "Total Parts Out", value: "1,318", delta: "-2.3%", up: false, icon: PackageMinus, hint: "Assy line" },
  { label: "FIFO Compliance", value: "98.4%", delta: "+1.2%", up: true, icon: Boxes, hint: "7-day avg" },
];

function Dashboard() {
  return (
    <AppLayout title="Dashboard" subtitle="Hey, Afifi Rouf — you have 3 production tasks today.">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className="border-0 shadow-soft hover:shadow-elevated transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-medium text-muted-foreground">{k.label}</div>
                  <div className="mt-2 text-3xl font-semibold tracking-tight">{k.value}</div>
                  <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${k.up ? "text-success" : "text-destructive"}`}>
                    {k.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {k.delta}
                    <span className="text-muted-foreground font-normal ml-1">{k.hint}</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-xl bg-gradient-primary/10 grid place-items-center text-primary">
                  <k.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader className="flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Production Trend</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Daily output across Sub-Assy and Assy</p>
            </div>
            <Badge variant="outline" className="gap-1"><TrendingUp className="h-3 w-3" />This week</Badge>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={dailyTrend} margin={{ left: -10, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.705 0.187 47.604)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="oklch(0.705 0.187 47.604)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.628 0.207 38.5)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="oklch(0.628 0.207 38.5)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="subAssy" stroke="oklch(0.705 0.187 47.604)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="assy" stroke="oklch(0.628 0.207 38.5)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-3 text-xs">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" />Sub-Assy</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[oklch(0.628_0.207_38.5)]" />Assy</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">FIFO Performance</CardTitle>
            <p className="text-xs text-muted-foreground">Weekly compliance rate</p>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-semibold tracking-tight">98.4%</div>
            <div className="text-xs text-success mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" /> +1.2% vs last week
            </div>
            <ResponsiveContainer width="100%" height={180} className="mt-3">
              <LineChart data={fifoPerformance} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis domain={[85, 100]} stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="rate" stroke="oklch(0.705 0.187 47.604)" strokeWidth={2.5} dot={{ r: 3, fill: "oklch(0.705 0.187 47.604)" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Comparison + lines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border-0 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Sub-Assy vs Assy</CardTitle>
            <p className="text-xs text-muted-foreground">Production volume comparison</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dailyTrend} margin={{ left: -10, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="subAssy" fill="oklch(0.705 0.187 47.604)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="assy" fill="oklch(0.628 0.207 38.5)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Production Lines</CardTitle>
            <p className="text-xs text-muted-foreground">Live status</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {productionLines.map((l, i) => {
              const status = i === 1 ? "idle" : i === 4 ? "warning" : "running";
              const pct = [88, 0, 76, 92, 64][i];
              return (
                <div key={l}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${status === "running" ? "bg-success animate-pulse" : status === "warning" ? "bg-warning" : "bg-muted-foreground"}`} />
                      <span className="font-medium">{l}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{pct}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${status === "running" ? "bg-gradient-primary" : status === "warning" ? "bg-warning" : "bg-muted-foreground/40"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Production Alerts</CardTitle>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </div>
            <Badge variant="secondary">{alerts.length}</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.map((a) => {
              const Icon = a.severity === "error" ? XCircle : a.severity === "warning" ? AlertTriangle : Info;
              const color = a.severity === "error" ? "text-destructive bg-destructive/10" : a.severity === "warning" ? "text-warning bg-warning/15" : "text-info bg-info/10";
              return (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/40 transition-colors">
                  <div className={`h-8 w-8 rounded-lg grid place-items-center shrink-0 ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{a.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{a.desc}</div>
                  </div>
                </div>
              );
            })}
            <Button variant="ghost" size="sm" className="w-full mt-2 text-primary">View all alerts</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-soft">
        <CardHeader className="pb-2 flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Recent Activities</CardTitle>
            <p className="text-xs text-muted-foreground">Live audit trail across the shop floor</p>
          </div>
          <Button variant="outline" size="sm">View full log</Button>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
            {activities.map((a) => {
              const Icon = a.type === "error" ? XCircle : a.type === "warning" ? AlertTriangle : a.type === "success" ? CheckCircle2 : Info;
              const color = a.type === "error" ? "bg-destructive" : a.type === "warning" ? "bg-warning" : a.type === "success" ? "bg-success" : "bg-info";
              return (
                <div key={a.id} className="relative pb-4 last:pb-0">
                  <div className={`absolute -left-[22px] top-1 h-3.5 w-3.5 rounded-full ${color} ring-4 ring-background grid place-items-center text-white`}>
                    <Icon className="h-2 w-2" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm">{a.text}</div>
                    <div className="text-xs text-muted-foreground shrink-0">{a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
