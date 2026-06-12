import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Search, Filter, Download, Plus, MoreHorizontal, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductionRecords, getActiveLines, updateProductionRecord, deleteProductionRecord } from "@/lib/api/db.functions";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { useUser } from "@/lib/auth";

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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = useUser();
  const canCreateEntry = user?.role === "operator_in";

  const [q, setQ] = useState("");
  const [line, setLine] = useState("all");
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Dialog and form states
  const [showDateRangeDialog, setShowDateRangeDialog] = useState(false);
  const [viewRecord, setViewRecord] = useState<any>(null);
  const [editRecord, setEditRecord] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [editForm, setEditForm] = useState({
    quantity: "",
    line: "",
    operator: "",
    status: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["productionRecords", q, line, status, startDate, endDate, page],
    queryFn: () => getProductionRecords({ data: { q, line, status, startDate, endDate, page, perPage } }),
  });

  const records = data?.records ?? [];
  const total = data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / perPage));

  // Load active production lines from master database
  const { data: dbLines } = useQuery({
    queryKey: ["activeLines"],
    queryFn: () => getActiveLines(),
  });

  const lines = dbLines && dbLines.length > 0
    ? dbLines.map((l: any) => l.name)
    : ["SC-1", "SC-2", "SC-3", "SS-1", "SS-2"];

  const startEdit = (r: any) => {
    setEditRecord(r);
    setEditForm({
      quantity: String(r.quantity),
      line: r.line,
      operator: r.operator,
      status: r.status,
    });
  };

  const handleSaveEdit = async () => {
    if (!editRecord) return;
    try {
      const res = await updateProductionRecord({
        data: {
          id: editRecord.id,
          quantity: Number(editForm.quantity),
          line: editForm.line,
          operator: editForm.operator,
          status: editForm.status,
        }
      });
      if (res.success) {
        toast.success(`Record ${editRecord.id} updated successfully.`);
        setEditRecord(null);
        queryClient.invalidateQueries({ queryKey: ["productionRecords"] });
      } else {
        toast.error("Failed to update record.");
      }
    } catch {
      toast.error("Failed to save updates.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await deleteProductionRecord({ data: { id: deleteId } });
      if (res.success) {
        toast.success(`Record ${deleteId} deleted.`);
        setDeleteId(null);
        queryClient.invalidateQueries({ queryKey: ["productionRecords"] });
      } else {
        toast.error("Failed to delete record.");
      }
    } catch {
      toast.error("Failed to complete deletion.");
    }
  };

  const handleExportExcel = async () => {
    try {
      const res = await getProductionRecords({
        data: { q, line, status, startDate, endDate, page: 1, perPage: 10000 }
      });
      const allRecords = res?.records ?? [];
      if (allRecords.length === 0) {
        toast.warning("No records to export.");
        return;
      }

      // Format data for sheet
      const dataRows = [
        ["Production ID", "Date", "Part Number", "Product Name", "Qty", "Line", "Operator", "Status"],
        ...allRecords.map((r: any) => [
          r.id,
          r.date,
          r.partNumber,
          r.productName,
          Number(r.quantity),
          r.line,
          r.operator,
          r.status,
        ]),
      ];

      // Create Worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(dataRows);

      // Set column widths to make it neat (rapih)
      worksheet["!cols"] = [
        { wch: 18 }, // Production ID
        { wch: 14 }, // Date
        { wch: 16 }, // Part Number
        { wch: 32 }, // Product Name
        { wch: 10 }, // Qty
        { wch: 10 }, // Line
        { wch: 22 }, // Operator
        { wch: 15 }, // Status
      ];

      // Create Workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Production Data");

      // Write workbook and download as .xlsx file
      const fileName = `production_records_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(workbook, fileName);

      toast.success("Production records exported to Excel successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export records to Excel.");
    }
  };

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
                  {lines.map((l: any) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
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
              <Button variant="outline" className="gap-2" onClick={() => setShowDateRangeDialog(true)}>
                <Filter className="h-4 w-4" />
                {startDate || endDate ? "Date range (Active)" : "Date range"}
              </Button>
              <Button variant="outline" className="gap-2" onClick={handleExportExcel}>
                <Download className="h-4 w-4" />Export
              </Button>
              {canCreateEntry && (
                <Button className="gap-2 bg-gradient-primary" onClick={() => navigate({ to: "/part-input" })}>
                  <Plus className="h-4 w-4" />New Entry
                </Button>
              )}
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
                  records.map((r: any) => (
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
                            <DropdownMenuItem onClick={() => setViewRecord(r)}><Eye className="h-4 w-4 mr-2" />View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => startEdit(r)}><Pencil className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => setDeleteId(r.id)}><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
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

      {/* Date Range Selector Dialog */}
      <Dialog open={showDateRangeDialog} onOpenChange={setShowDateRangeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter by Date Range</DialogTitle>
            <DialogDescription>
              Select start and end dates to filter production records.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="start">Start Date</Label>
                <Input
                  id="start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end">End Date</Label>
                <Input
                  id="end"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setShowDateRangeDialog(false);
                }}
              >
                Clear Filters
              </Button>
              <Button type="button" className="bg-gradient-primary text-white" onClick={() => setShowDateRangeDialog(false)}>
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={!!viewRecord} onOpenChange={(open) => !open && setViewRecord(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Production Entry Details</DialogTitle>
            <DialogDescription>
              Detailed view of transaction record {viewRecord?.id}.
            </DialogDescription>
          </DialogHeader>
          {viewRecord && (
            <div className="space-y-3 py-2 text-sm">
              <div className="grid grid-cols-3 py-1.5 border-b border-border">
                <span className="text-muted-foreground font-medium">Production ID</span>
                <span className="col-span-2 font-mono text-primary font-semibold">{viewRecord.id}</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 border-b border-border">
                <span className="text-muted-foreground font-medium">Date</span>
                <span className="col-span-2 font-mono">{viewRecord.date}</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 border-b border-border">
                <span className="text-muted-foreground font-medium">Part Number</span>
                <span className="col-span-2 font-mono font-semibold">{viewRecord.partNumber}</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 border-b border-border">
                <span className="text-muted-foreground font-medium">Product Name</span>
                <span className="col-span-2">{viewRecord.productName}</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 border-b border-border">
                <span className="text-muted-foreground font-medium">Quantity</span>
                <span className="col-span-2 font-semibold text-foreground">{viewRecord.quantity} pcs</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 border-b border-border">
                <span className="text-muted-foreground font-medium">Production Line</span>
                <span className="col-span-2"><Badge variant="outline">{viewRecord.line}</Badge></span>
              </div>
              <div className="grid grid-cols-3 py-1.5 border-b border-border">
                <span className="text-muted-foreground font-medium">Operator</span>
                <span className="col-span-2">{viewRecord.operator}</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 border-b border-border">
                <span className="text-muted-foreground font-medium">Status</span>
                <span className="col-span-2"><Badge variant="outline" className={statusBadge(viewRecord.status)}>{viewRecord.status}</Badge></span>
              </div>
              <div className="flex justify-end pt-3">
                <Button className="w-full bg-gradient-primary" onClick={() => setViewRecord(null)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editRecord} onOpenChange={(open) => !open && setEditRecord(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Production Record</DialogTitle>
            <DialogDescription>
              Modify transaction details for {editRecord?.id}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-qty">Quantity</Label>
                <Input
                  id="edit-qty"
                  type="number"
                  value={editForm.quantity}
                  onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                  className="h-11"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-line">Production Line</Label>
                <Select value={editForm.line} onValueChange={(v) => setEditForm({ ...editForm, line: v })}>
                  <SelectTrigger id="edit-line" className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {lines.map((l: any) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={editForm.status} onValueChange={(v) => setEditForm({ ...editForm, status: v })}>
                  <SelectTrigger id="edit-status" className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-op">Operator Name</Label>
                <Input
                  id="edit-op"
                  value={editForm.operator}
                  onChange={(e) => setEditForm({ ...editForm, operator: e.target.value })}
                  className="h-11"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" type="button" onClick={() => setEditRecord(null)}>Cancel</Button>
              <Button type="button" className="bg-gradient-primary text-white" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              <span>Confirm Delete</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete production record {deleteId}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end py-2">
            <Button variant="outline" type="button" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button type="button" variant="destructive" onClick={handleConfirmDelete}>
              Delete Record
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
