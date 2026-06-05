import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Download, Plus, MoreHorizontal, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { productionLines } from "@/lib/mock-data";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductionRecords } from "@/lib/api/db.functions";

export const Route = createFileRoute("/production")({
  head: () => ({ meta: [{ title: "Production Data — NPMS" }] }),
  component: ProductionPage,
});

function statusBadge(status: string) {
  const map: Record<string, string> = {
    Completed: "bg-success/15 text-success border-success/20",
    "In Progress": "bg-info/15 text-info border-info/20",
    Pending: "bg-warning/15 text-warning border-warning/20",
  };
  return map[status] ?? "bg-muted text-muted-foreground";
}

function ProductionPage() {
  const [q, setQ] = useState("");
  const [line, setLine] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["productionRecords", q, line, status, page],
    queryFn: () => getProductionRecords({ data: { q, line, status, page, perPage } }),
  });

  const records = data?.records ?? [];
  const total = data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / perPage));

  return (
    <AppLayout title="Production Data" subtitle="Monitor every production transaction across all lines.">
      <Card className="border-0 shadow-soft">
        <CardContent className="p-4 md:p-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search part number or product name..." className="pl-9 bg-muted/40 border-0" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={line} onValueChange={(v) => { setLine(v); setPage(1); }}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All lines</SelectItem>
                  {productionLines.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" />Date range</Button>
              <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>
              <Button className="gap-2 bg-gradient-primary"><Plus className="h-4 w-4" />New Entry</Button>
            </div>
          </div>

          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-semibold">Production ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Part Number</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead>Line</TableHead>
                  <TableHead>Operator</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-10 text-muted-foreground text-sm">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" />
                      Loading production records...
                    </TableCell>
                  </TableRow>
                ) : records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-10 text-muted-foreground text-sm">
                      No matching records.
                    </TableCell>
                  </TableRow>
                ) : (
                  records.map((r) => (
                    <TableRow key={r.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs font-medium">{r.id}</TableCell>
                      <TableCell className="text-sm">{r.date}</TableCell>
                      <TableCell className="font-mono text-xs">{r.partNumber}</TableCell>
                      <TableCell>{r.productName}</TableCell>
                      <TableCell className="text-right font-medium tabular-nums">{r.quantity}</TableCell>
                      <TableCell><Badge variant="outline">{r.line}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.operator}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusBadge(r.status)}>{r.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View</DropdownMenuItem>
                            <DropdownMenuItem><Pencil className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{(page - 1) * perPage + 1}-{Math.min(page * perPage, total)}</span> of <span className="font-medium text-foreground">{total}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: pages }).map((_, i) => (
                <Button key={i} variant={page === i + 1 ? "default" : "outline"} size="sm" className={`h-8 w-8 p-0 ${page === i + 1 ? "bg-gradient-primary" : ""}`} onClick={() => setPage(i + 1)}>{i + 1}</Button>
              ))}
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === pages} onClick={() => setPage((p) => p + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
