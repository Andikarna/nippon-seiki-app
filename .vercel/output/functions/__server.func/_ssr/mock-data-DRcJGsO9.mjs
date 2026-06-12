const productionLines = ["SC-1", "SC-2", "SC-3", "SS-1", "SS-2"];
const productionData = [
  {
    id: "PRD-10240",
    date: "2026-06-05",
    partNumber: "K18H",
    productName: "SS COMP K18H Sub-Assy",
    quantity: 683,
    status: "Completed",
    line: "SC-1",
    operator: "JA'I"
  },
  {
    id: "PRD-10241",
    date: "2026-06-05",
    partNumber: "K84A",
    productName: "SS COMP K84A Assy",
    quantity: 500,
    status: "Completed",
    line: "SS-2",
    operator: "RESTI"
  },
  {
    id: "PRD-10242",
    date: "2026-06-05",
    partNumber: "XD 831",
    productName: "SS COMP XD 831 Sub-Assy",
    quantity: 41,
    status: "Completed",
    line: "SC-2",
    operator: "RIZKI"
  },
  {
    id: "PRD-10243",
    date: "2026-06-05",
    partNumber: "1PA",
    productName: "SS COMP 1PA Sub-Assy",
    quantity: 19,
    status: "Completed",
    line: "SC-3",
    operator: "JA'I"
  },
  {
    id: "PRD-10244",
    date: "2026-06-04",
    partNumber: "K18H",
    productName: "SS COMP K18H Sub-Assy",
    quantity: 530,
    status: "Completed",
    line: "SC-1",
    operator: "JA'I"
  },
  {
    id: "PRD-10245",
    date: "2026-06-04",
    partNumber: "K84A",
    productName: "SS COMP K84A Sub-Assy",
    quantity: 512,
    status: "Completed",
    line: "SC-2",
    operator: "RIZKI"
  },
  {
    id: "PRD-10246",
    date: "2026-06-04",
    partNumber: "K18H",
    productName: "SS COMP K18H Sub-Assy",
    quantity: 399,
    status: "Completed",
    line: "SC-1",
    operator: "JA'I"
  },
  {
    id: "PRD-10247",
    date: "2026-06-03",
    partNumber: "K18H",
    productName: "SS COMP K18H Assy",
    quantity: 409,
    status: "Completed",
    line: "SS-2",
    operator: "RESTI"
  },
  {
    id: "PRD-10248",
    date: "2026-06-03",
    partNumber: "K18H",
    productName: "SS COMP K18H Assy",
    quantity: 499,
    status: "Completed",
    line: "SS-2",
    operator: "RESTI"
  },
  {
    id: "PRD-10249",
    date: "2026-06-02",
    partNumber: "K84A",
    productName: "SS COMP K84A Assy",
    quantity: 505,
    status: "Completed",
    line: "SS-2",
    operator: "RESTI"
  },
  {
    id: "PRD-10250",
    date: "2026-06-02",
    partNumber: "K84A",
    productName: "SS COMP K84A Sub-Assy",
    quantity: 420,
    status: "Completed",
    line: "SC-1",
    operator: "JA'I"
  },
  {
    id: "PRD-10251",
    date: "2026-06-01",
    partNumber: "K84A",
    productName: "SS COMP K84A Sub-Assy",
    quantity: 400,
    status: "Completed",
    line: "SC-1",
    operator: "JA'I"
  }
];
const fifoMaterials = [
  {
    id: "MAT-7720",
    partNumber: "K18H",
    lotNumber: "SC1 126-7",
    incomingDate: "2026-06-01",
    position: "Bucket B3",
    status: "Compliant",
    quantity: 399
  },
  {
    id: "MAT-7721",
    partNumber: "K18H",
    lotNumber: "SC1 126-8",
    incomingDate: "2026-06-02",
    position: "Bucket B1",
    status: "Compliant",
    quantity: 530
  },
  {
    id: "MAT-7722",
    partNumber: "K18H",
    lotNumber: "SC1 126-12",
    incomingDate: "2026-06-05",
    position: "Bucket A1",
    status: "Compliant",
    quantity: 683
  },
  {
    id: "MAT-7723",
    partNumber: "K84A",
    lotNumber: "SC1 126-10",
    incomingDate: "2026-06-04",
    position: "Bucket A2",
    status: "Compliant",
    quantity: 512
  },
  {
    id: "MAT-7724",
    partNumber: "XD 831",
    lotNumber: "SC1 126-13",
    incomingDate: "2026-06-05",
    position: "Bucket A4",
    status: "Compliant",
    quantity: 41
  },
  {
    id: "MAT-7725",
    partNumber: "1PA",
    lotNumber: "SC1 126-14",
    incomingDate: "2026-06-05",
    position: "Bucket A5",
    status: "Compliant",
    quantity: 19
  }
];
const fifoPerformance = [
  { week: "W1", rate: 98 },
  { week: "W2", rate: 99 },
  { week: "W3", rate: 97 },
  { week: "W4", rate: 100 },
  { week: "W5", rate: 98 },
  { week: "W6", rate: 99 }
];
const activities = [
  { id: 1, time: "08:42", text: "Operator JA'I submitted Part Input for K18H", type: "info" },
  { id: 2, time: "08:36", text: "FIFO violation detected on lot SC1 126-7", type: "error" },
  { id: 3, time: "08:21", text: "Line SC-1 reached 683 units / shift", type: "success" },
  { id: 4, time: "07:58", text: "Supervisor approved transaction PRD-10246", type: "info" },
  { id: 5, time: "07:40", text: "Material warning: Bucket A5 (1PA) below safety stock", type: "warning" }
];
const alerts = [
  { id: 1, title: "FIFO Violation", desc: "Lot SC1 126-7 used out of order", severity: "error" },
  { id: 2, title: "Low Stock Alert", desc: "Bucket A5 (1PA) contains only 19 units", severity: "warning" },
  { id: 3, title: "Low Stock Alert", desc: "Bucket A4 (XD 831) contains only 41 units", severity: "warning" }
];
export {
  productionData as a,
  activities as b,
  alerts as c,
  fifoPerformance as d,
  fifoMaterials as f,
  productionLines as p
};
