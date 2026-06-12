import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-BUYfpcon.mjs";
import { m as mysql } from "../_libs/mysql2.mjs";
import { p as productionLines, a as productionData, f as fifoMaterials, b as activities, c as alerts } from "./mock-data-DRcJGsO9.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType, b as booleanType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "events";
import "process";
import "net";
import "tls";
import "timers";
import "zlib";
import "url";
import "../_libs/sql-escaper.mjs";
import "node:buffer";
import "../_libs/lru.min.mjs";
import "../_libs/denque.mjs";
import "buffer";
import "../_libs/long.mjs";
import "../_libs/iconv-lite.mjs";
import "string_decoder";
import "../_libs/safer-buffer.mjs";
import "../_libs/generate-function.mjs";
import "../_libs/is-property.mjs";
import "../_libs/aws-ssl-profiles.mjs";
import "../_libs/named-placeholders.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const host = process.env.DB_HOST || "localhost";
const port = Number(process.env.DB_PORT || "3306");
const user = process.env.DB_USER || "root";
const password = process.env.DB_PASSWORD || "";
const database = process.env.DB_NAME || "nippon-db";
let pool = null;
let initialized = false;
async function getPool() {
  if (!pool) {
    try {
      const conn = await mysql.createConnection({ host, port, user, password });
      await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
      await conn.end();
    } catch (e) {
      console.error("Database connection/creation error:", e);
    }
    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  if (!initialized) {
    initialized = true;
    await setupTables(pool);
  }
  return pool;
}
async function setupTables(p) {
  try {
    await p.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL DEFAULT '123456',
        active TINYINT(1) NOT NULL DEFAULT 1
      )
    `);
    try {
      await p.query("ALTER TABLE users ADD COLUMN username VARCHAR(255) NULL");
      console.log("MySQL: Added username column to users table.");
      await p.query("UPDATE users SET username = 'operator' WHERE email = 'operator@ins.co.id' AND username IS NULL");
      await p.query("UPDATE users SET username = 'bayu' WHERE email = 'bayu@ins.co.id' AND username IS NULL");
      await p.query("UPDATE users SET username = 'supervisor' WHERE email = 'supervisor@ins.co.id' AND username IS NULL");
      await p.query("UPDATE users SET username = 'manager' WHERE email = 'manager@ins.co.id' AND username IS NULL");
      await p.query("UPDATE users SET username = 'dimas' WHERE email = 'dimas@ins.co.id' AND username IS NULL");
      await p.query("UPDATE users SET username = SUBSTRING_INDEX(email, '@', 1) WHERE username IS NULL");
      await p.query("ALTER TABLE users MODIFY COLUMN username VARCHAR(255) NOT NULL");
      await p.query("ALTER TABLE users ADD UNIQUE INDEX IF NOT EXISTS uq_username (username)");
      console.log("MySQL: Configured username column with constraints.");
    } catch (err) {
      if (err.errno !== 1060) {
        console.error("MySQL: Error running ALTER TABLE for users (username):", err);
      }
    }
    try {
      await p.query("ALTER TABLE users ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT '123456'");
      console.log("MySQL: Verified or added password column to users table.");
    } catch (err) {
      if (err.errno !== 1060) {
        console.error("MySQL: Error running ALTER TABLE for users (password):", err);
      }
    }
    try {
      await p.query("ALTER TABLE users ADD COLUMN active TINYINT(1) NOT NULL DEFAULT 1");
      console.log("MySQL: Verified or added active column to users table.");
    } catch (err) {
      if (err.errno !== 1060) {
        console.error("MySQL: Error running ALTER TABLE for users (active):", err);
      }
    }
    await p.query(
      "UPDATE users SET name = 'Sari Handayani' WHERE email = 'supervisor@ins.co.id' AND name = 'Sari Supervisor'"
    );
    await p.query(
      "UPDATE users SET name = 'Andi Firmansyah' WHERE email = 'manager@ins.co.id' AND name = 'Andi Manager'"
    );
    await p.query(`
      CREATE TABLE IF NOT EXISTS production_lines (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT TRUE,
        capacity INT NOT NULL,
        shifts INT NOT NULL,
        operators INT NOT NULL
      )
    `);
    await p.query(`
      CREATE TABLE IF NOT EXISTS production_records (
        id VARCHAR(50) PRIMARY KEY,
        date DATE NOT NULL,
        part_number VARCHAR(100) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        status VARCHAR(50) NOT NULL,
        line VARCHAR(50) NOT NULL,
        operator VARCHAR(255) NOT NULL
      )
    `);
    await p.query(`
      CREATE TABLE IF NOT EXISTS fifo_materials (
        id VARCHAR(50) PRIMARY KEY,
        part_number VARCHAR(100) NOT NULL,
        lot_number VARCHAR(100) UNIQUE NOT NULL,
        incoming_date DATE NOT NULL,
        position VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        quantity INT NOT NULL
      )
    `);
    await p.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        time VARCHAR(50) NOT NULL,
        text VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await p.query(`
      CREATE TABLE IF NOT EXISTS alerts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        \`desc\` VARCHAR(255) NOT NULL,
        severity VARCHAR(50) NOT NULL
      )
    `);
    const [userRows] = await p.query("SELECT COUNT(*) as count FROM users");
    if (userRows[0].count === 0) {
      const demoUsers = [
        ["Afifi Rouf", "operator", "operator@ins.co.id", "operator", "123456"],
        ["Bayu Saputra", "bayu", "bayu@ins.co.id", "operator", "123456"],
        ["Sari Handayani", "supervisor", "supervisor@ins.co.id", "supervisor", "123456"],
        ["Andi Firmansyah", "manager", "manager@ins.co.id", "manager", "123456"],
        ["Dimas Pratama", "dimas", "dimas@ins.co.id", "operator", "123456"]
      ];
      await p.query("INSERT INTO users (name, username, email, role, password) VALUES ?", [demoUsers]);
      console.log("MySQL: Seeded users table.");
    }
    const [lineRows] = await p.query("SELECT COUNT(*) as count FROM production_lines");
    if (lineRows[0].count === 0) {
      const lines = productionLines.map((l, i) => [
        l,
        l,
        true,
        120 + i * 20,
        3,
        4 + i
      ]);
      await p.query("INSERT INTO production_lines (id, name, active, capacity, shifts, operators) VALUES ?", [lines]);
      console.log("MySQL: Seeded production_lines table.");
    }
    const [recordRows] = await p.query("SELECT COUNT(*) as count FROM production_records");
    if (recordRows[0].count === 0) {
      const records = productionData.map((r) => [
        r.id,
        r.date,
        r.partNumber,
        r.productName,
        r.quantity,
        r.status,
        r.line,
        r.operator
      ]);
      await p.query("INSERT INTO production_records (id, date, part_number, product_name, quantity, status, line, operator) VALUES ?", [records]);
      console.log("MySQL: Seeded production_records table.");
    }
    const [fifoRows] = await p.query("SELECT COUNT(*) as count FROM fifo_materials");
    if (fifoRows[0].count === 0) {
      const fifos = fifoMaterials.map((m) => [
        m.id,
        m.partNumber,
        m.lotNumber,
        m.incomingDate,
        m.position,
        m.status,
        m.quantity
      ]);
      await p.query("INSERT INTO fifo_materials (id, part_number, lot_number, incoming_date, position, status, quantity) VALUES ?", [fifos]);
      console.log("MySQL: Seeded fifo_materials table.");
    }
    const [actRows] = await p.query("SELECT COUNT(*) as count FROM activities");
    if (actRows[0].count === 0) {
      const acts = activities.map((a) => [
        a.time,
        a.text,
        a.type
      ]);
      await p.query("INSERT INTO activities (time, text, type) VALUES ?", [acts]);
      console.log("MySQL: Seeded activities table.");
    }
    const [alertRows] = await p.query("SELECT COUNT(*) as count FROM alerts");
    if (alertRows[0].count === 0) {
      const alts = alerts.map((a) => [
        a.title,
        a.desc,
        a.severity
      ]);
      await p.query("INSERT INTO alerts (title, `desc`, severity) VALUES ?", [alts]);
      console.log("MySQL: Seeded alerts table.");
    }
    console.log("MySQL Database setup and seeding completed successfully.");
  } catch (err) {
    console.error("MySQL: Table initialization error:", err);
  }
}
function formatDate(dateVal) {
  if (!dateVal) return "";
  const d = new Date(dateVal);
  return d.toISOString().split("T")[0];
}
const getDashboardData_createServerFn_handler = createServerRpc({
  id: "9e879fbcee41a161a551fcde6359bacb0351b88e4ae6dd706908f02a0f7fa2ce",
  name: "getDashboardData",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => getDashboardData.__executeServer(opts));
const getDashboardData = createServerFn({
  method: "GET"
}).handler(getDashboardData_createServerFn_handler, async () => {
  const p = await getPool();
  const [latestDateRow] = await p.query("SELECT MAX(date) as lastDate FROM production_records");
  const targetDate = latestDateRow[0]?.lastDate ? formatDate(latestDateRow[0].lastDate) : formatDate(/* @__PURE__ */ new Date());
  const [todayProd] = await p.query("SELECT SUM(quantity) as val FROM production_records WHERE date = ?", [targetDate]);
  const [todaySub] = await p.query("SELECT SUM(quantity) as val FROM production_records WHERE date = ? AND (product_name LIKE '%Sub-Assy%' OR product_name LIKE '%Sub%')", [targetDate]);
  const [todayAssy] = await p.query("SELECT SUM(quantity) as val FROM production_records WHERE date = ? AND (product_name NOT LIKE '%Sub-Assy%' AND product_name NOT LIKE '%Sub%')", [targetDate]);
  const [fifoComp] = await p.query("SELECT ROUND(100 * SUM(CASE WHEN status = 'Compliant' THEN 1 ELSE 0 END) / COUNT(*), 1) as val FROM fifo_materials");
  const kpis = {
    todayProduction: todayProd[0]?.val || 2847,
    totalPartsIn: todaySub[0]?.val || 1524,
    totalPartsOut: todayAssy[0]?.val || 1318,
    fifoCompliance: fifoComp[0]?.val !== null ? `${fifoComp[0].val}%` : "98.4%"
  };
  const [trendRows] = await p.query(`
      SELECT 
        DAYNAME(date) as day_name,
        SUM(CASE WHEN product_name LIKE '%Sub-Assy%' OR product_name LIKE '%Sub%' THEN quantity ELSE 0 END) as subAssy,
        SUM(CASE WHEN product_name NOT LIKE '%Sub-Assy%' AND product_name NOT LIKE '%Sub%' THEN quantity ELSE 0 END) as assy
      FROM production_records
      GROUP BY date, day_name
      ORDER BY date DESC
      LIMIT 7
    `);
  const dayMap = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun"
  };
  let dailyTrend = trendRows.map((t) => ({
    day: dayMap[t.day_name] || t.day_name.slice(0, 3),
    subAssy: Number(t.subAssy) || 0,
    assy: Number(t.assy) || 0
  })).reverse();
  if (dailyTrend.length === 0) {
    dailyTrend = [{
      day: "Mon",
      subAssy: 420,
      assy: 360
    }, {
      day: "Tue",
      subAssy: 510,
      assy: 470
    }, {
      day: "Wed",
      subAssy: 480,
      assy: 440
    }, {
      day: "Thu",
      subAssy: 560,
      assy: 520
    }, {
      day: "Fri",
      subAssy: 610,
      assy: 580
    }, {
      day: "Sat",
      subAssy: 380,
      assy: 340
    }, {
      day: "Sun",
      subAssy: 290,
      assy: 260
    }];
  }
  const [lineRows] = await p.query("SELECT id, name, active, capacity, shifts, operators FROM production_lines");
  const lines = lineRows.map((l, i) => {
    const pcts = [88, 0, 76, 92, 64];
    return {
      id: l.id,
      name: l.name,
      active: Boolean(l.active),
      capacity: l.capacity,
      operators: l.operators,
      percentage: pcts[i % pcts.length]
    };
  });
  const [actRows] = await p.query("SELECT id, time, text, type FROM activities ORDER BY id DESC LIMIT 5");
  const [alertRows] = await p.query("SELECT id, title, `desc`, severity FROM alerts ORDER BY id DESC LIMIT 5");
  return {
    kpis,
    dailyTrend,
    productionLines: lines,
    activities: actRows,
    alerts: alertRows
  };
});
const getProductionRecords_createServerFn_handler = createServerRpc({
  id: "f787eea0bdd5a5b8af32fe9c3693c4004114c0d287af0c7bfc94e48e535d7749",
  name: "getProductionRecords",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => getProductionRecords.__executeServer(opts));
const getProductionRecords = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  q: stringType().optional(),
  line: stringType().optional(),
  status: stringType().optional(),
  startDate: stringType().optional(),
  endDate: stringType().optional(),
  page: numberType().default(1),
  perPage: numberType().default(10)
})).handler(getProductionRecords_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  const {
    q,
    line,
    status,
    startDate,
    endDate,
    page,
    perPage
  } = data;
  const offset = (page - 1) * perPage;
  let whereClause = "WHERE 1=1";
  const params = [];
  if (line && line !== "all") {
    whereClause += " AND line = ?";
    params.push(line);
  }
  if (status && status !== "all") {
    whereClause += " AND status = ?";
    params.push(status);
  }
  if (startDate) {
    whereClause += " AND date >= ?";
    params.push(startDate);
  }
  if (endDate) {
    whereClause += " AND date <= ?";
    params.push(endDate);
  }
  if (q) {
    whereClause += " AND (part_number LIKE ? OR product_name LIKE ?)";
    params.push(`%${q}%`, `%${q}%`);
  }
  const [countRows] = await p.query(`SELECT COUNT(*) as count FROM production_records ${whereClause}`, params);
  const total = countRows[0].count;
  const limitParams = [...params, perPage, offset];
  const [rows] = await p.query(`SELECT id, DATE_FORMAT(date, '%Y-%m-%d') as date, part_number as partNumber, product_name as productName, quantity, status, line, operator 
       FROM production_records 
       ${whereClause} 
       ORDER BY date DESC, id DESC 
       LIMIT ? OFFSET ?`, limitParams);
  return {
    records: rows,
    total
  };
});
const getFifoMaterials_createServerFn_handler = createServerRpc({
  id: "75d80cc003bb9a7332af46efbab40c480fba32a3b17aa52ad4d0611a642e553d",
  name: "getFifoMaterials",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => getFifoMaterials.__executeServer(opts));
const getFifoMaterials = createServerFn({
  method: "GET"
}).handler(getFifoMaterials_createServerFn_handler, async () => {
  const p = await getPool();
  const [rows] = await p.query("SELECT id, part_number as partNumber, lot_number as lotNumber, DATE_FORMAT(incoming_date, '%Y-%m-%d') as incomingDate, position, status, quantity FROM fifo_materials ORDER BY incoming_date DESC");
  const counts = {
    compliant: rows.filter((m) => m.status === "Compliant").length,
    warning: rows.filter((m) => m.status === "Warning").length,
    violation: rows.filter((m) => m.status === "Violation").length
  };
  return {
    materials: rows,
    counts
  };
});
const checkFifoPosition_createServerFn_handler = createServerRpc({
  id: "06e8d08bc5ac38c8b0500b0076172b529c12875f4267fabc37900ea75ede46ac",
  name: "checkFifoPosition",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => checkFifoPosition.__executeServer(opts));
const checkFifoPosition = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  lotNumber: stringType().min(1)
})).handler(checkFifoPosition_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  const {
    lotNumber
  } = data;
  const [matRow] = await p.query("SELECT part_number, incoming_date FROM fifo_materials WHERE lot_number = ?", [lotNumber]);
  if (matRow.length === 0) {
    return {
      found: false,
      lotNumber
    };
  }
  const {
    part_number,
    incoming_date
  } = matRow[0];
  const [queueRow] = await p.query("SELECT COUNT(*) as olderCount FROM fifo_materials WHERE part_number = ? AND incoming_date < ?", [part_number, incoming_date]);
  const position = queueRow[0].olderCount + 1;
  const isNext = position === 1;
  const [timelineRows] = await p.query("SELECT lot_number as lot, DATE_FORMAT(incoming_date, '%b %d') as date, status FROM fifo_materials WHERE part_number = ? ORDER BY incoming_date ASC LIMIT 5", [part_number]);
  return {
    found: true,
    lotNumber,
    partNumber: part_number,
    position,
    isNext,
    timeline: timelineRows.map((t) => ({
      lot: t.lot.slice(0, 5) + "..." + t.lot.slice(-3),
      date: t.date,
      status: t.status === "Compliant" ? "queue" : t.status === "Violation" ? "violation" : "warning"
    }))
  };
});
const addProductionRecord_createServerFn_handler = createServerRpc({
  id: "6cc8fc63e1f8d50e1585cf9bb9ac8558c001882bee5c79c2d0cf3595569df14a",
  name: "addProductionRecord",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => addProductionRecord.__executeServer(opts));
const addProductionRecord = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  partNumber: stringType().min(1),
  productName: stringType().min(1),
  quantity: numberType(),
  line: stringType().min(1),
  operator: stringType().min(1),
  lotNumber: stringType().min(1),
  date: stringType().min(1)
})).handler(addProductionRecord_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  const {
    partNumber,
    productName,
    quantity,
    line,
    operator,
    lotNumber,
    date
  } = data;
  const recordId = `PRD-${Math.floor(1e4 + Math.random() * 9e4)}`;
  const materialId = `MAT-${Math.floor(7e3 + Math.random() * 900)}`;
  const letters = ["A", "B", "C", "D", "E"];
  const position = `Rack ${letters[Math.floor(Math.random() * letters.length)]}-${Math.floor(1 + Math.random() * 9)}`;
  await p.query(`INSERT INTO production_records (id, date, part_number, product_name, quantity, status, line, operator) 
       VALUES (?, ?, ?, ?, ?, 'Completed', ?, ?)`, [recordId, date, partNumber, productName, quantity, line, operator]);
  const [olderRows] = await p.query("SELECT COUNT(*) as olderCount FROM fifo_materials WHERE part_number = ? AND incoming_date < ?", [partNumber, date]);
  const status = olderRows[0].olderCount > 0 ? "Warning" : "Compliant";
  await p.query(`INSERT INTO fifo_materials (id, part_number, lot_number, incoming_date, position, status, quantity) 
       VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?`, [materialId, partNumber, lotNumber, date, position, status, quantity, quantity]);
  const nowTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit"
  });
  await p.query("INSERT INTO activities (time, text, type) VALUES (?, ?, 'info')", [nowTime, `Operator ${operator} submitted Part Input for ${partNumber} (LOT-${lotNumber.replace("LOT-", "")})`]);
  if (status === "Warning") {
    await p.query("INSERT INTO alerts (title, `desc`, severity) VALUES (?, ?, 'warning')", [`FIFO Warning: ${lotNumber}`, `LOT-${lotNumber.replace("LOT-", "")} entered after older inventory exists.`, "warning"]);
  }
  return {
    success: true,
    recordId
  };
});
const dispatchFifoMaterial_createServerFn_handler = createServerRpc({
  id: "5bf166b628442609013c87225af646a452f2666d09479b3de20864b3ed0651ec",
  name: "dispatchFifoMaterial",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => dispatchFifoMaterial.__executeServer(opts));
const dispatchFifoMaterial = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  partNumber: stringType().min(1),
  productName: stringType().min(1),
  quantity: numberType(),
  destinationLine: stringType().min(1),
  operator: stringType().min(1),
  lotNumber: stringType().min(1),
  date: stringType().min(1)
})).handler(dispatchFifoMaterial_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  const {
    partNumber,
    productName,
    quantity,
    destinationLine,
    operator,
    lotNumber,
    date
  } = data;
  const recordId = `PRD-${Math.floor(1e4 + Math.random() * 9e4)}`;
  const [matRow] = await p.query("SELECT incoming_date, quantity as stock_qty FROM fifo_materials WHERE lot_number = ?", [lotNumber]);
  let fifoStatus = "Compliant";
  if (matRow.length > 0) {
    const {
      incoming_date,
      stock_qty
    } = matRow[0];
    const [olderRow] = await p.query("SELECT COUNT(*) as olderCount FROM fifo_materials WHERE part_number = ? AND incoming_date < ?", [partNumber, incoming_date]);
    if (olderRow[0].olderCount > 0) {
      fifoStatus = "Violation";
    }
    if (stock_qty <= quantity) {
      await p.query("DELETE FROM fifo_materials WHERE lot_number = ?", [lotNumber]);
    } else {
      await p.query("UPDATE fifo_materials SET quantity = quantity - ? WHERE lot_number = ?", [quantity, lotNumber]);
    }
  }
  await p.query(`INSERT INTO production_records (id, date, part_number, product_name, quantity, status, line, operator) 
       VALUES (?, ?, ?, ?, ?, 'Completed', ?, ?)`, [recordId, date.split("T")[0], partNumber, productName, quantity, destinationLine, operator]);
  const nowTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit"
  });
  await p.query("INSERT INTO activities (time, text, type) VALUES (?, ?, ?)", [nowTime, `Dispatched ${quantity} units of ${partNumber} (LOT-${lotNumber.replace("LOT-", "")}) to ${destinationLine}.`, fifoStatus === "Violation" ? "error" : "success"]);
  if (fifoStatus === "Violation") {
    await p.query("INSERT INTO alerts (title, `desc`, severity) VALUES (?, ?, 'error')", [`FIFO Violation: ${lotNumber}`, `LOT-${lotNumber.replace("LOT-", "")} consumed out of sequence.`, "error"]);
  }
  return {
    success: true,
    recordId,
    fifoStatus
  };
});
const getSettingsData_createServerFn_handler = createServerRpc({
  id: "3bd82c7c4245a50f8cd3ea9c5e9b542b5aed0b5643c926b1f3924866e3b436a4",
  name: "getSettingsData",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => getSettingsData.__executeServer(opts));
const getSettingsData = createServerFn({
  method: "GET"
}).handler(getSettingsData_createServerFn_handler, async () => {
  const p = await getPool();
  const [users] = await p.query("SELECT name, username, email, role, active FROM users");
  const usersMapped = users.map((u) => ({
    name: u.name,
    username: u.username || u.email.split("@")[0],
    email: u.email,
    role: u.role.charAt(0).toUpperCase() + u.role.slice(1),
    line: u.email.includes("supervisor") || u.email.includes("manager") ? "All" : "Line A1",
    active: Boolean(u.active)
  }));
  const [lines] = await p.query("SELECT id, name, active, capacity, shifts, operators FROM production_lines");
  return {
    users: usersMapped,
    productionLines: lines.map((l) => ({
      id: l.id,
      name: l.name,
      active: Boolean(l.active),
      capacity: l.capacity,
      shifts: l.shifts,
      operators: l.operators
    }))
  };
});
const addSettingUser_createServerFn_handler = createServerRpc({
  id: "879fd574915bd709a878f537bbf120e4ffcbbe9d7868f74a89827a411f8d6695",
  name: "addSettingUser",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => addSettingUser.__executeServer(opts));
const addSettingUser = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  name: stringType().min(1),
  username: stringType().min(1),
  email: stringType().email(),
  role: stringType().min(1),
  password: stringType().optional()
})).handler(addSettingUser_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  const {
    name,
    username,
    email,
    role,
    password: password2
  } = data;
  const pwd = password2?.trim() || "123456";
  await p.query("INSERT INTO users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = ?, username = ?, role = ?, password = ?", [name, username, email, role.toLowerCase(), pwd, name, username, role.toLowerCase(), pwd]);
  return {
    success: true
  };
});
const addSettingLine_createServerFn_handler = createServerRpc({
  id: "a9ac0541fcd53d3cfcfb87497bead0384a2363dc3401849e0fe0ee652b25c7c4",
  name: "addSettingLine",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => addSettingLine.__executeServer(opts));
const addSettingLine = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1),
  name: stringType().min(1),
  capacity: numberType(),
  shifts: numberType(),
  operators: numberType()
})).handler(addSettingLine_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  const {
    id,
    name,
    capacity,
    shifts,
    operators
  } = data;
  await p.query("INSERT INTO production_lines (id, name, capacity, shifts, operators) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = ?, capacity = ?, shifts = ?, operators = ?", [id, name, capacity, shifts, operators, name, capacity, shifts, operators]);
  return {
    success: true
  };
});
const updateSettingUser_createServerFn_handler = createServerRpc({
  id: "df9c0c4b323b38353b7e5d5ca83a6065e67d05842484144df99fc04d79cd5b5a",
  name: "updateSettingUser",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => updateSettingUser.__executeServer(opts));
const updateSettingUser = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().email(),
  name: stringType().min(1),
  username: stringType().min(1),
  role: stringType().min(1),
  active: booleanType()
})).handler(updateSettingUser_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  const {
    email,
    name,
    username,
    role,
    active
  } = data;
  await p.query("UPDATE users SET name = ?, username = ?, role = ?, active = ? WHERE email = ?", [name, username, role.toLowerCase(), active ? 1 : 0, email]);
  return {
    success: true
  };
});
const deleteSettingUser_createServerFn_handler = createServerRpc({
  id: "2dde6c570981696a3e97582ee8c7e95dd5e531eefd92c12fff113054a796bed3",
  name: "deleteSettingUser",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => deleteSettingUser.__executeServer(opts));
const deleteSettingUser = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().email()
})).handler(deleteSettingUser_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  await p.query("DELETE FROM users WHERE email = ?", [data.email]);
  return {
    success: true
  };
});
const updateSettingLine_createServerFn_handler = createServerRpc({
  id: "d3c152e6ee8752aad8aec0f4018f38f041dbc977db7327a3d9f59b4e42c343e7",
  name: "updateSettingLine",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => updateSettingLine.__executeServer(opts));
const updateSettingLine = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1),
  name: stringType().min(1),
  capacity: numberType(),
  shifts: numberType(),
  operators: numberType()
})).handler(updateSettingLine_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  const {
    id,
    name,
    capacity,
    shifts,
    operators
  } = data;
  await p.query("UPDATE production_lines SET name = ?, capacity = ?, shifts = ?, operators = ? WHERE id = ?", [name, capacity, shifts, operators, id]);
  return {
    success: true
  };
});
const deleteSettingLine_createServerFn_handler = createServerRpc({
  id: "aa04548dace634d992e019a24d924709eb5ead8c531701e543ef74515eb90746",
  name: "deleteSettingLine",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => deleteSettingLine.__executeServer(opts));
const deleteSettingLine = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(deleteSettingLine_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  await p.query("DELETE FROM production_lines WHERE id = ?", [data.id]);
  return {
    success: true
  };
});
const getReportsData_createServerFn_handler = createServerRpc({
  id: "e999894cb4a27fc3360c9aceb38957bb70e8311dd8147508e7610eeed95c1545",
  name: "getReportsData",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => getReportsData.__executeServer(opts));
const getReportsData = createServerFn({
  method: "GET"
}).handler(getReportsData_createServerFn_handler, async () => {
  const p = await getPool();
  const [records] = await p.query("SELECT id, DATE_FORMAT(date, '%Y-%m-%d') as date, part_number as partNumber, product_name as productName, quantity, status, line, operator FROM production_records ORDER BY date DESC");
  const [fifos] = await p.query("SELECT id, part_number as partNumber, lot_number as lotNumber, DATE_FORMAT(incoming_date, '%Y-%m-%d') as incomingDate, position, status, quantity FROM fifo_materials ORDER BY incoming_date DESC");
  return {
    productionData: records,
    fifoMaterials: fifos
  };
});
const authenticateUser_createServerFn_handler = createServerRpc({
  id: "fefdc7caf229a0aabf53565a44911dd30246d633bdb733ab2fd179b003e638f9",
  name: "authenticateUser",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => authenticateUser.__executeServer(opts));
const authenticateUser = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  username: stringType().min(1),
  password: stringType().optional()
})).handler(authenticateUser_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  const {
    username,
    password: password2
  } = data;
  try {
    const [rows] = await p.query("SELECT name, username, email, role, password FROM users WHERE LOWER(username) = LOWER(?)", [username.trim()]);
    if (rows.length > 0) {
      const dbPassword = rows[0].password;
      if (password2 && dbPassword === password2) {
        return {
          success: true,
          user: {
            name: rows[0].name,
            username: rows[0].username,
            email: rows[0].email,
            role: rows[0].role
          }
        };
      }
    }
  } catch (e) {
    console.error("Database user query error:", e);
  }
  return {
    success: false
  };
});
const getAlerts_createServerFn_handler = createServerRpc({
  id: "862b2ed0ba1c16e03d536242f61de2d770937144cf43e97470ad771049d0c017",
  name: "getAlerts",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => getAlerts.__executeServer(opts));
const getAlerts = createServerFn({
  method: "GET"
}).handler(getAlerts_createServerFn_handler, async () => {
  const p = await getPool();
  try {
    const [alertRows] = await p.query("SELECT id, title, `desc`, severity FROM alerts ORDER BY id DESC LIMIT 5");
    return alertRows;
  } catch (e) {
    console.error("Database alerts query error:", e);
    return [];
  }
});
const getActiveLines_createServerFn_handler = createServerRpc({
  id: "75659a1ccdbcb516866b67fc0b52ac835b5f20faa590c420f52a8cc114afc799",
  name: "getActiveLines",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => getActiveLines.__executeServer(opts));
const getActiveLines = createServerFn({
  method: "GET"
}).handler(getActiveLines_createServerFn_handler, async () => {
  const p = await getPool();
  try {
    const [rows] = await p.query("SELECT id, name FROM production_lines WHERE active = 1");
    return rows;
  } catch (e) {
    console.error("Database active lines query error:", e);
    return [];
  }
});
const updateProductionRecord_createServerFn_handler = createServerRpc({
  id: "93583c2e29869933a9bec01db77f71133d41ac5d2be11ec528f6d93af52354c7",
  name: "updateProductionRecord",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => updateProductionRecord.__executeServer(opts));
const updateProductionRecord = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1),
  quantity: numberType(),
  line: stringType().min(1),
  operator: stringType().min(1),
  status: stringType().min(1)
})).handler(updateProductionRecord_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  const {
    id,
    quantity,
    line,
    operator,
    status
  } = data;
  try {
    await p.query("UPDATE production_records SET quantity = ?, line = ?, operator = ?, status = ? WHERE id = ?", [quantity, line, operator, status, id]);
    return {
      success: true
    };
  } catch (e) {
    console.error("Database update error:", e);
    return {
      success: false
    };
  }
});
const deleteProductionRecord_createServerFn_handler = createServerRpc({
  id: "e972f54971109f50ab053596eca4b6b21d84989e5231b521f17f163d5239687d",
  name: "deleteProductionRecord",
  filename: "src/lib/api/db.functions.ts"
}, (opts) => deleteProductionRecord.__executeServer(opts));
const deleteProductionRecord = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(deleteProductionRecord_createServerFn_handler, async ({
  data
}) => {
  const p = await getPool();
  const {
    id
  } = data;
  try {
    await p.query("DELETE FROM production_records WHERE id = ?", [id]);
    return {
      success: true
    };
  } catch (e) {
    console.error("Database delete error:", e);
    return {
      success: false
    };
  }
});
export {
  addProductionRecord_createServerFn_handler,
  addSettingLine_createServerFn_handler,
  addSettingUser_createServerFn_handler,
  authenticateUser_createServerFn_handler,
  checkFifoPosition_createServerFn_handler,
  deleteProductionRecord_createServerFn_handler,
  deleteSettingLine_createServerFn_handler,
  deleteSettingUser_createServerFn_handler,
  dispatchFifoMaterial_createServerFn_handler,
  getActiveLines_createServerFn_handler,
  getAlerts_createServerFn_handler,
  getDashboardData_createServerFn_handler,
  getFifoMaterials_createServerFn_handler,
  getProductionRecords_createServerFn_handler,
  getReportsData_createServerFn_handler,
  getSettingsData_createServerFn_handler,
  updateProductionRecord_createServerFn_handler,
  updateSettingLine_createServerFn_handler,
  updateSettingUser_createServerFn_handler
};
