import XLSX from 'xlsx';

const excelPath = "./public/KONTROL STOCK SS COMP GT-1 2026.xlsx";
const workbook = XLSX.readFile(excelPath);

const targetSheets = ['MASTER', 'TOTAL STOCK SS COMP', 'MATOME STOCK'];

for (const sheetName of targetSheets) {
  if (!workbook.Sheets[sheetName]) {
    console.log(`Sheet ${sheetName} not found.`);
    continue;
  }
  const sheet = workbook.Sheets[sheetName];
  const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
  console.log(`\n======================================================`);
  console.log(`Sheet: ${sheetName}`);
  console.log(`Total Rows: ${json.length}`);
  
  // Find first 15 non-empty rows
  const nonHeaders = json.filter(row => {
    return Object.values(row).some(v => v !== null && v !== "");
  });
  console.log(`Sample non-empty rows (first 15):`);
  nonHeaders.slice(0, 15).forEach((row, i) => {
    console.log(`${i}:`, JSON.stringify(row));
  });
}
