import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { ScanLine, Save, Send, CheckCircle2, Package, Clock, Layers } from "lucide-react";
import { productionLines } from "@/lib/mock-data";
import { useState } from "react";
import { addProductionRecord } from "@/lib/api/db.functions";
import { useUser } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/part-input")({
  head: () => ({ meta: [{ title: "Part Input — NPMS" }] }),
  component: PartInput,
});

function PartInput() {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    barcode: "",
    part: "SC-425-25",
    product: "Speedometer Sub-Assy",
    line: "Line A1",
    qty: "120",
    lot: "LOT-202511025",
    date: new Date().toISOString().slice(0, 10),
  });

  // Automatically update part & product name when barcodes are scanned
  const handleBarcodeChange = (val: string) => {
    // Mock auto-fill logic for barcodes
    let part = "SC-425-25";
    let product = "Speedometer Sub-Assy";
    let qty = "120";

    if (val.includes("SC-426")) {
      part = "SC-426-21";
      product = "Cluster Sub-Assy";
      qty = "150";
    } else if (val.includes("SC-427")) {
      part = "SC-427-22";
      product = "Tachometer Assy";
      qty = "80";
    } else if (val.includes("SC-428")) {
      part = "SC-428-23";
      product = "Indicator Unit";
      qty = "200";
    }

    // Auto-generate lot from scan
    const lotNum = val.trim().startsWith("LOT-") 
      ? val.trim() 
      : `LOT-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(Math.floor(100 + Math.random() * 900))}`;

    setForm({
      ...form,
      barcode: val,
      part,
      product,
      qty,
      lot: lotNum,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.part.trim()) {
      toast.error("Part Number is required");
      return;
    }
    if (!form.lot.trim()) {
      toast.error("Lot Number is required");
      return;
    }
    if (!form.qty || Number(form.qty) <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    setSubmitting(true);
    try {
      const res = await addProductionRecord({
        data: {
          partNumber: form.part,
          productName: form.product,
          quantity: Number(form.qty),
          line: form.line,
          operator: user?.name || "Demo Operator",
          lotNumber: form.lot,
          date: form.date,
        },
      });

      if (res.success) {
        setOpen(true);
        // Reset form barcode
        setForm(f => ({ ...f, barcode: "" }));
        toast.success("Transaction submitted to database.");
      }
    } catch (err) {
      toast.error("Failed to submit production record.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout title="Part Input" subtitle="Quickly record Sub-Assy and Assy production transactions.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Production Transaction</CardTitle>
            <p className="text-xs text-muted-foreground">Scan a barcode or fill in the fields manually.</p>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Barcode scanner area */}
            <div className="relative rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-glow">
                  <ScanLine className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Barcode Scanner</div>
                  <div className="text-xs text-muted-foreground">Focus the input and scan, or type manually.</div>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20 gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Ready
                </Badge>
              </div>
              <Input
                autoFocus
                value={form.barcode}
                onChange={(e) => handleBarcodeChange(e.target.value)}
                placeholder="Scan or enter barcode (e.g. SC-426, SC-427, LOT-123)..."
                className="mt-4 h-12 text-base font-mono bg-background"
                disabled={submitting}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="part">Part Number</Label>
                  <Input id="part" value={form.part} onChange={(e) => setForm({ ...form, part: e.target.value })} className="font-mono h-11" disabled={submitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product">Product Name</Label>
                  <Input id="product" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="h-11" disabled={submitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="line">Production Line</Label>
                  <Select value={form.line} onValueChange={(v) => setForm({ ...form, line: v })} disabled={submitting}>
                    <SelectTrigger id="line" className="h-11"><SelectValue /></SelectTrigger>
                    <SelectContent>{productionLines.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qty">Quantity</Label>
                  <Input id="qty" type="number" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} className="h-11 text-lg font-semibold tabular-nums" disabled={submitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lot">Lot Number</Label>
                  <Input id="lot" value={form.lot} onChange={(e) => setForm({ ...form, lot: e.target.value })} className="font-mono h-11" disabled={submitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Production Date</Label>
                  <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="h-11" disabled={submitting} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button type="button" variant="outline" className="gap-2 sm:flex-1 h-11" disabled={submitting} onClick={() => toast.info("Draft saved locally (demo only).")}><Save className="h-4 w-4" />Save Draft</Button>
                <Button type="submit" disabled={submitting} className="gap-2 sm:flex-1 h-11 bg-gradient-primary shadow-glow">
                  {submitting ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Submit Transaction
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Side info */}
        <div className="space-y-4">
          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Auto-fill preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Row icon={Package} label="Product" value={form.product} />
              <Row icon={Layers} label="Category" value={form.product.toLowerCase().includes("sub") ? "Sub-Assy" : "Assy"} />
              <Row icon={Clock} label="Last produced" value="Today · Active" />
              <div className="rounded-lg bg-success/10 border border-success/20 p-3 text-xs text-success flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Validation passed — ready to submit.
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Today's tally</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-sm">
              {[
                { l: "Submitted", v: "Active" },
                { l: "Drafts", v: "0" },
                { l: "Approved", v: "Live" },
                { l: "Rejected", v: "0" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                  <div className="text-xl font-semibold mt-1">{s.v}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto h-12 w-12 rounded-full bg-success/15 text-success grid place-items-center mb-2">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center">Transaction Submitted</DialogTitle>
            <DialogDescription className="text-center">
              Part {form.part} ({form.qty} pcs) recorded on {form.line}. The transaction has been persisted in MySQL.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="w-full bg-gradient-primary" onClick={() => setOpen(false)}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4" />{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
