// Mock data for NPMS
export const productionLines = ["Line A1", "Line A2", "Line B1", "Line B2", "Line C1"];

export const productionData = Array.from({ length: 32 }).map((_, i) => {
  const lines = productionLines;
  const statuses = ["Completed", "In Progress", "Pending", "Completed", "Completed"];
  const ops = ["Afifi Rouf", "Bayu Saputra", "Citra Dewi", "Dimas Pratama", "Eka Putri"];
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(i / 3));
  return {
    id: `PRD-${(10240 + i).toString()}`,
    date: date.toISOString().slice(0, 10),
    partNumber: `SC-${425 + (i % 12)}-${20 + (i % 9)}`,
    productName: ["Speedometer Assy", "Cluster Sub-Assy", "Meter Panel", "Indicator Unit", "Tachometer Assy"][i % 5],
    quantity: 120 + ((i * 17) % 300),
    status: statuses[i % statuses.length],
    line: lines[i % lines.length],
    operator: ops[i % ops.length],
  };
});

export const fifoMaterials = Array.from({ length: 14 }).map((_, i) => {
  const statuses = ["Compliant", "Compliant", "Warning", "Compliant", "Violation", "Compliant"];
  const date = new Date();
  date.setDate(date.getDate() - i);
  return {
    id: `MAT-${(7720 + i).toString()}`,
    partNumber: `SC-${425 + (i % 8)}-${20 + (i % 6)}`,
    lotNumber: `LOT-${2025}${String(11).padStart(2, "0")}${String(i + 1).padStart(3, "0")}`,
    incomingDate: date.toISOString().slice(0, 10),
    position: `Rack ${String.fromCharCode(65 + (i % 5))}-${(i % 9) + 1}`,
    status: statuses[i % statuses.length] as "Compliant" | "Warning" | "Violation",
    quantity: 80 + ((i * 13) % 200),
  };
});

export const dailyTrend = [
  { day: "Mon", subAssy: 420, assy: 360 },
  { day: "Tue", subAssy: 510, assy: 470 },
  { day: "Wed", subAssy: 480, assy: 440 },
  { day: "Thu", subAssy: 560, assy: 520 },
  { day: "Fri", subAssy: 610, assy: 580 },
  { day: "Sat", subAssy: 380, assy: 340 },
  { day: "Sun", subAssy: 290, assy: 260 },
];

export const fifoPerformance = [
  { week: "W1", rate: 94 },
  { week: "W2", rate: 96 },
  { week: "W3", rate: 92 },
  { week: "W4", rate: 98 },
  { week: "W5", rate: 97 },
  { week: "W6", rate: 99 },
];

export const activities = [
  { id: 1, time: "08:42", text: "Operator Afifi submitted Part Input for SC-425-25", type: "info" },
  { id: 2, time: "08:36", text: "FIFO violation detected on LOT-202511007", type: "error" },
  { id: 3, time: "08:21", text: "Line B1 reached 120 units / hour", type: "success" },
  { id: 4, time: "07:58", text: "Supervisor approved transaction PRD-10248", type: "info" },
  { id: 5, time: "07:40", text: "Material warning: Rack A-3 below safety stock", type: "warning" },
];

export const alerts = [
  { id: 1, title: "FIFO Violation", desc: "LOT-202511007 used out of order", severity: "error" as const },
  { id: 2, title: "Low Stock", desc: "Rack A-3 below 20 units", severity: "warning" as const },
  { id: 3, title: "Line A2 idle", desc: "No transactions in last 12 minutes", severity: "warning" as const },
];
