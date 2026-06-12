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
import { Save, Send, CheckCircle2, Package, Clock, Layers, Trash2, Printer as PrinterIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { addProductionRecord, getActiveLines, getNextLotNumber, getParts } from "@/lib/api/db.functions";
import { useUser } from "@/lib/auth";
import { getPref } from "@/lib/preferences";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/part-input")({
  head: () => ({ meta: [{ title: "Part In — NPMS" }] }),
  component: PartInput,
});

function PartInput() {
  const user = useUser();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load active production lines from master database
  const { data: dbLines } = useQuery({
    queryKey: ["activeLines"],
    queryFn: () => getActiveLines(),
  });

  const lines = dbLines && dbLines.length > 0
    ? dbLines.filter((l: any) => l.type === "in" || l.type === "both").map((l: any) => l.name)
    : ["SC-1", "SC-2", "SC-3"];

  // Load master parts list from database
  const { data: dbParts } = useQuery({
    queryKey: ["parts"],
    queryFn: () => getParts(),
  });

  const partsList = dbParts ?? [];

  // Manage drafts from localStorage
  const [drafts, setDrafts] = useState<any[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("npms_drafts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState({
    part: "",
    operator: "",
    line: "SC-1",
    qty: "400",
    lot: "",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (partsList.length > 0 && !form.part) {
      setForm((prev) => ({ ...prev, part: partsList[0].partNumber }));
    }
  }, [partsList, form.part]);

  useEffect(() => {
    if (user?.name) {
      setForm((prev) => ({ ...prev, operator: prev.operator || user.name }));
    }
  }, [user]);

  // Fetch next lot number automatically
  const { data: lotData } = useQuery({
    queryKey: ["nextLotNumber", form.line, form.date],
    queryFn: () => getNextLotNumber({ data: { line: form.line, date: form.date } }),
    enabled: !!form.line && !!form.date,
  });

  useEffect(() => {
    if (lotData?.lotNumber) {
      setForm((prev) => ({ ...prev, lot: lotData.lotNumber }));
    }
  }, [lotData]);

  const handleSaveDraft = () => {
    const newDraft = {
      id: `DFT-${Math.floor(1000 + Math.random() * 9000)}`,
      time: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }),
      data: { ...form },
    };
    const updated = [newDraft, ...drafts];
    setDrafts(updated);
    localStorage.setItem("npms_drafts", JSON.stringify(updated));
    toast.success("Draft berhasil disimpan.");
  };

  const handleLoadDraft = (d: any) => {
    setForm({ ...d.data });
    toast.info(`Draft ${d.id} dimuat.`);
  };

  const handleDeleteDraft = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = drafts.filter((d) => d.id !== id);
    setDrafts(updated);
    localStorage.setItem("npms_drafts", JSON.stringify(updated));
    toast.success("Draft dihapus.");
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.part.trim()) {
      toast.error("Nomor Part wajib diisi");
      return;
    }
    if (!form.operator.trim()) {
      toast.error("Nama Operator wajib diisi");
      return;
    }
    if (!form.lot.trim()) {
      toast.error("Nomor Lot wajib diisi");
      return;
    }
    if (!form.qty || Number(form.qty) <= 0) {
      toast.error("Jumlah harus lebih dari 0");
      return;
    }

    setSubmitting(true);
    try {
      const res = await addProductionRecord({
        data: {
          partNumber: form.part,
          productName: partsList.find((p: any) => p.partNumber === form.part)?.productName || `SS COMP ${form.part} Sub-Assy`,
          quantity: Number(form.qty),
          line: form.line,
          operator: form.operator,
          lotNumber: form.lot,
          date: form.date,
        },
      });

      if (res.success) {
        setOpen(true);
        toast.success("Transaksi berhasil dikirim ke database.");
        queryClient.invalidateQueries({ queryKey: ["nextLotNumber"] });

        // Auto-print labels if preference is ON
        if (getPref("autoPrintLabels")) {
          toast.info("Auto-print dipicu.", {
            description: `Mencetak label QR untuk ${form.part} (${form.qty} pcs) · ${form.lot}`,
            icon: <PrinterIcon className="h-4 w-4" />,
            duration: 4000,
          });
        }
      }
    } catch (err) {
      toast.error("Gagal mengirim data produksi.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <AppLayout title="Part In" subtitle="Catat transaksi produksi Sub-Assy dan Assy dengan cepat (Input Part).">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Transaksi Produksi</CardTitle>
            <p className="text-xs text-muted-foreground">Isi kolom di bawah ini untuk mencatat transaksi produksi.</p>
          </CardHeader>
          <CardContent className="space-y-5">

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="part">TYPE (Part Number)</Label>
                  <Select value={form.part} onValueChange={(v) => setForm({ ...form, part: v })} disabled={submitting}>
                    <SelectTrigger id="part" className="h-11 font-mono"><SelectValue placeholder="Pilih Part" /></SelectTrigger>
                    <SelectContent>
                      {partsList.map((p: any) => (
                        <SelectItem key={p.partNumber} value={p.partNumber} className="font-mono">
                          {p.partNumber}
                        </SelectItem>
                      ))}
                      {partsList.length === 0 && (
                        <SelectItem value="none" disabled>Tidak ada part terdaftar</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operator">Operator Name</Label>
                  <Input id="operator" value={form.operator} onChange={(e) => setForm({ ...form, operator: e.target.value })} className="h-11" disabled={submitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="line">LINE (Production Line)</Label>
                  <Select value={form.line} onValueChange={(v) => setForm({ ...form, line: v })} disabled={submitting}>
                    <SelectTrigger id="line" className="h-11"><SelectValue /></SelectTrigger>
                    <SelectContent>{lines.map((l: any) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qty">TOTAL QTY (Quantity)</Label>
                  <Input id="qty" type="number" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} className="h-11 text-lg font-semibold tabular-nums" disabled={submitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lot">KODE (Lot Number)</Label>
                  <Input id="lot" value={form.lot} className="font-mono h-11 bg-muted/40" disabled={true} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">TGL PROD (Production Date)</Label>
                  <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="h-11" disabled={submitting} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button type="button" variant="outline" className="gap-2 sm:flex-1 h-11" disabled={submitting} onClick={handleSaveDraft}><Save className="h-4 w-4" />Simpan Draft</Button>
                <Button type="submit" disabled={submitting} className="gap-2 sm:flex-1 h-11 bg-gradient-primary shadow-glow">
                  {submitting ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Kirim Transaksi
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Side info */}
        <div className="space-y-4">
          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Pratinjau auto-fill</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Row icon={Package} label="Product" value={partsList.find((p: any) => p.partNumber === form.part)?.productName || `SS COMP ${form.part} Sub-Assy`} />
              <Row icon={Layers} label="Category" value="Sub-Assy" />
              <Row icon={Clock} label="Shift default" value={getPref("defaultShift")} />
              <div className="rounded-lg bg-success/10 border border-success/20 p-3 text-xs text-success flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Validasi berhasil — siap untuk dikirim.
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Rekap hari ini</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-sm">
              {[
                { l: "Terkirim", v: "Aktif" },
                { l: "Draft", v: String(drafts.length) },
                { l: "Disetujui", v: "Live" },
                { l: "Ditolak", v: "0" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                  <div className="text-xl font-semibold mt-1">{s.v}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {drafts.length > 0 && (
            <Card className="border-0 shadow-soft bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Draft Tersimpan</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">{drafts.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                {drafts.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => handleLoadDraft(d)}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-xs font-semibold text-primary">{d.id}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {d.data.part} · {d.data.qty} pcs · {d.data.line}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground font-mono">{d.time}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => handleDeleteDraft(d.id, e)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto h-12 w-12 rounded-full bg-success/15 text-success grid place-items-center mb-2">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center">Transaksi Berhasil Dikirim</DialogTitle>
            <DialogDescription className="text-center">
              Part {form.part} ({form.qty} pcs) dicatat pada {form.line}. Transaksi telah tersimpan di MySQL.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="w-full bg-gradient-primary" onClick={() => setOpen(false)}>Lanjutkan</Button>
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
