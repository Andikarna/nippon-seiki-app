import mysql from "mysql2/promise";
import { productionLines, productionData, fifoMaterials, activities, alerts } from "./mock-data";

const host = import.meta.env.DB_HOST || process.env.DB_HOST || "localhost";
const port = Number(import.meta.env.DB_PORT || process.env.DB_PORT || "3306");
const user = import.meta.env.DB_USER || process.env.DB_USER || "root";
const password = import.meta.env.DB_PASSWORD || process.env.DB_PASSWORD || "";
const database = import.meta.env.DB_NAME || process.env.DB_NAME || "nippon-db";

let pool: mysql.Pool | null = null;
let initialized = false;

export async function getPool(): Promise<mysql.Pool> {
  if (!pool) {
    try {
      // Connect without db first to ensure database exists
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
      queueLimit: 0,
    });
  }

  if (!initialized) {
    initialized = true;
    await setupTables(pool);
  }

  return pool;
}

async function setupTables(p: mysql.Pool) {
  try {
    // 1. users
    await p.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL DEFAULT '123456'
      )
    `);

    // Ensure password column exists on existing users table (migration)
    try {
      await p.query("ALTER TABLE users ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT '123456'");
      console.log("MySQL: Verified or added password column to users table.");
    } catch (err: any) {
      // Ignore ER_DUP_FIELDNAME (1060) which means column already exists
      if (err.errno !== 1060) {
        console.error("MySQL: Error running ALTER TABLE for users:", err);
      }
    }

    // 2. production_lines
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

    // 3. production_records
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

    // 4. fifo_materials
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

    // 5. activities
    await p.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        time VARCHAR(50) NOT NULL,
        text VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 6. alerts
    await p.query(`
      CREATE TABLE IF NOT EXISTS alerts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        \`desc\` VARCHAR(255) NOT NULL,
        severity VARCHAR(50) NOT NULL
      )
    `);

    // --- SEED DATA IF TABLES ARE EMPTY ---
    
    // Seed users
    const [userRows] = await p.query<any>("SELECT COUNT(*) as count FROM users");
    if (userRows[0].count === 0) {
      const demoUsers = [
        ["Afifi Rouf", "operator@ins.co.id", "operator", "123456"],
        ["Bayu Saputra", "bayu@ins.co.id", "operator", "123456"],
        ["Sari Supervisor", "supervisor@ins.co.id", "supervisor", "123456"],
        ["Andi Manager", "manager@ins.co.id", "manager", "123456"],
        ["Dimas Pratama", "dimas@ins.co.id", "operator", "123456"],
      ];
      await p.query("INSERT INTO users (name, email, role, password) VALUES ?", [demoUsers]);
      console.log("MySQL: Seeded users table.");
    }

    // Seed production_lines
    const [lineRows] = await p.query<any>("SELECT COUNT(*) as count FROM production_lines");
    if (lineRows[0].count === 0) {
      const lines = productionLines.map((l, i) => [
        l,
        l,
        true,
        120 + i * 20,
        3,
        4 + i,
      ]);
      await p.query("INSERT INTO production_lines (id, name, active, capacity, shifts, operators) VALUES ?", [lines]);
      console.log("MySQL: Seeded production_lines table.");
    }

    // Seed production_records
    const [recordRows] = await p.query<any>("SELECT COUNT(*) as count FROM production_records");
    if (recordRows[0].count === 0) {
      const records = productionData.map((r) => [
        r.id,
        r.date,
        r.partNumber,
        r.productName,
        r.quantity,
        r.status,
        r.line,
        r.operator,
      ]);
      await p.query("INSERT INTO production_records (id, date, part_number, product_name, quantity, status, line, operator) VALUES ?", [records]);
      console.log("MySQL: Seeded production_records table.");
    }

    // Seed fifo_materials
    const [fifoRows] = await p.query<any>("SELECT COUNT(*) as count FROM fifo_materials");
    if (fifoRows[0].count === 0) {
      const fifos = fifoMaterials.map((m) => [
        m.id,
        m.partNumber,
        m.lotNumber,
        m.incomingDate,
        m.position,
        m.status,
        m.quantity,
      ]);
      await p.query("INSERT INTO fifo_materials (id, part_number, lot_number, incoming_date, position, status, quantity) VALUES ?", [fifos]);
      console.log("MySQL: Seeded fifo_materials table.");
    }

    // Seed activities
    const [actRows] = await p.query<any>("SELECT COUNT(*) as count FROM activities");
    if (actRows[0].count === 0) {
      const acts = activities.map((a) => [
        a.time,
        a.text,
        a.type,
      ]);
      await p.query("INSERT INTO activities (time, text, type) VALUES ?", [acts]);
      console.log("MySQL: Seeded activities table.");
    }

    // Seed alerts
    const [alertRows] = await p.query<any>("SELECT COUNT(*) as count FROM alerts");
    if (alertRows[0].count === 0) {
      const alts = alerts.map((a) => [
        a.title,
        a.desc,
        a.severity,
      ]);
      await p.query("INSERT INTO alerts (title, \`desc\`, severity) VALUES ?", [alts]);
      console.log("MySQL: Seeded alerts table.");
    }

    console.log("MySQL Database setup and seeding completed successfully.");
  } catch (err) {
    console.error("MySQL: Table initialization error:", err);
  }
}
