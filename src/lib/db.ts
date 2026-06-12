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
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL DEFAULT '123456',
        active TINYINT(1) NOT NULL DEFAULT 1
      )
    `);

    // Ensure username column exists on existing users table (migration)
    try {
      await p.query("ALTER TABLE users ADD COLUMN username VARCHAR(255) NULL");
      console.log("MySQL: Added username column to users table.");
      
      // Update existing users
      await p.query("UPDATE users SET username = 'operator' WHERE email = 'operator@ins.co.id' AND username IS NULL");
      await p.query("UPDATE users SET username = 'bayu' WHERE email = 'bayu@ins.co.id' AND username IS NULL");
      await p.query("UPDATE users SET username = 'supervisor' WHERE email = 'supervisor@ins.co.id' AND username IS NULL");
      await p.query("UPDATE users SET username = 'manager' WHERE email = 'manager@ins.co.id' AND username IS NULL");
      await p.query("UPDATE users SET username = 'dimas' WHERE email = 'dimas@ins.co.id' AND username IS NULL");
      
      // Fallback for any other user to use prefix of email
      await p.query("UPDATE users SET username = SUBSTRING_INDEX(email, '@', 1) WHERE username IS NULL");
      
      // Enforce not null and unique now that they are populated
      await p.query("ALTER TABLE users MODIFY COLUMN username VARCHAR(255) NOT NULL");
      await p.query("ALTER TABLE users ADD UNIQUE INDEX IF NOT EXISTS uq_username (username)");
      console.log("MySQL: Configured username column with constraints.");
    } catch (err: any) {
      if (err.errno !== 1060) {
        console.error("MySQL: Error running ALTER TABLE for users (username):", err);
      }
    }

    // Ensure password column exists on existing users table (migration)
    try {
      await p.query("ALTER TABLE users ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT '123456'");
      console.log("MySQL: Verified or added password column to users table.");
    } catch (err: any) {
      if (err.errno !== 1060) {
        console.error("MySQL: Error running ALTER TABLE for users (password):", err);
      }
    }

    // Ensure active column exists on existing users table (migration)
    try {
      await p.query("ALTER TABLE users ADD COLUMN active TINYINT(1) NOT NULL DEFAULT 1");
      console.log("MySQL: Verified or added active column to users table.");
    } catch (err: any) {
      if (err.errno !== 1060) {
        console.error("MySQL: Error running ALTER TABLE for users (active):", err);
      }
    }

    // Migrate: rename generic role-based names to natural full names
    await p.query(
      "UPDATE users SET name = 'Sari Handayani' WHERE email = 'supervisor@ins.co.id' AND name = 'Sari Supervisor'"
    );
    await p.query(
      "UPDATE users SET name = 'Andi Firmansyah' WHERE email = 'manager@ins.co.id' AND name = 'Andi Manager'"
    );

    // Migrate: split operator role into operator_in and operator_out
    await p.query("UPDATE users SET role = 'operator_in' WHERE role = 'operator' AND (username = 'operator' OR username = 'dimas' OR email = 'operator@ins.co.id')");
    await p.query("UPDATE users SET role = 'operator_out' WHERE role = 'operator' AND (username = 'bayu' OR username = 'operator_out' OR email = 'bayu@ins.co.id')");
    await p.query("UPDATE users SET role = 'operator_in' WHERE role = 'operator'");

    // Update usernames to match auth.ts so that login succeeds
    await p.query("UPDATE users SET username = 'operator_in' WHERE username = 'operator' OR email = 'operator@ins.co.id'");
    await p.query("UPDATE users SET username = 'operator_out' WHERE username = 'bayu' OR email = 'bayu@ins.co.id'");


    // 2. production_lines
    await p.query(`
      CREATE TABLE IF NOT EXISTS production_lines (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL DEFAULT 'in',
        active BOOLEAN DEFAULT TRUE,
        capacity INT NOT NULL,
        shifts INT NOT NULL,
        operators INT NOT NULL
      )
    `);

    // Ensure type column exists on production_lines (migration)
    try {
      await p.query("ALTER TABLE production_lines ADD COLUMN type VARCHAR(50) NOT NULL DEFAULT 'in'");
      console.log("MySQL: Added type column to production_lines table.");
    } catch (err: any) {
      if (err.errno !== 1060) {
        console.error("MySQL: Error running ALTER TABLE for production_lines (type):", err);
      }
    }

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
        quantity INT NOT NULL,
        original_quantity INT NOT NULL DEFAULT 0,
        origin_line VARCHAR(50) NULL,
        operator VARCHAR(255) NULL
      )
    `);

    try {
      await p.query("ALTER TABLE fifo_materials ADD COLUMN original_quantity INT NOT NULL DEFAULT 0");
      await p.query("ALTER TABLE fifo_materials ADD COLUMN origin_line VARCHAR(50) NULL");
      await p.query("ALTER TABLE fifo_materials ADD COLUMN operator VARCHAR(255) NULL");
      await p.query("UPDATE fifo_materials SET original_quantity = quantity WHERE original_quantity = 0");
      console.log("MySQL: Added origin info columns to fifo_materials table.");
    } catch (err: any) {
      if (err.errno !== 1060) {
        console.error("MySQL: Error running ALTER TABLE for fifo_materials:", err);
      }
    }

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

    // 7. parts master table
    await p.query(`
      CREATE TABLE IF NOT EXISTS parts (
        part_number VARCHAR(100) PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        threshold INT NOT NULL DEFAULT 100
      )
    `);

    // --- SEED DATA IF TABLES ARE EMPTY ---

    // Seed users
    const [userRows] = await p.query<any>("SELECT COUNT(*) as count FROM users");
    if (userRows[0].count === 0) {
      const demoUsers = [
        ["Afifi Rouf", "operator_in", "operator_in@ins.co.id", "operator_in", "123456"],
        ["Bayu Saputra", "operator_out", "operator_out@ins.co.id", "operator_out", "123456"],
        ["Sari Handayani", "supervisor", "supervisor@ins.co.id", "supervisor", "123456"],
        ["Andi Firmansyah", "manager", "manager@ins.co.id", "manager", "123456"],
        ["Dimas Pratama", "dimas", "dimas@ins.co.id", "operator_in", "123456"],
      ];
      await p.query("INSERT INTO users (name, username, email, role, password) VALUES ?", [demoUsers]);
      console.log("MySQL: Seeded users table.");
    }

    // Seed production_lines
    const [lineRows] = await p.query<any>("SELECT COUNT(*) as count FROM production_lines");
    if (lineRows[0].count === 0) {
      const lines = productionLines.map((l, i) => [
        l,
        l,
        l.startsWith("SS") ? "out" : "in",
        true,
        120 + i * 20,
        3,
        4 + i,
      ]);
      await p.query("INSERT INTO production_lines (id, name, type, active, capacity, shifts, operators) VALUES ?", [lines]);
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
        m.quantity,
        "SC-1",
        "Afifi Rouf",
      ]);
      await p.query("INSERT INTO fifo_materials (id, part_number, lot_number, incoming_date, position, status, quantity, original_quantity, origin_line, operator) VALUES ?", [fifos]);
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

    // Seed parts master
    const [partRows] = await p.query<any>("SELECT COUNT(*) as count FROM parts");
    if (partRows[0].count === 0) {
      const initialParts = [
        ["K18H", "SS COMP K18H Assy", 400],
        ["K84A", "SS COMP K84A Assy", 200],
        ["KRHW", "SS COMP KRHW Assy", 100],
        ["XD 831", "SS COMP XD 831 Assy", 30],
        ["1PA", "SS COMP 1PA Assy", 20],
        ["1WD", "SS COMP 1WD Assy", 10],
      ];
      await p.query("INSERT INTO parts (part_number, product_name, threshold) VALUES ?", [initialParts]);
      console.log("MySQL: Seeded parts table.");
    }

    console.log("MySQL Database setup and seeding completed successfully.");
  } catch (err) {
    console.error("MySQL: Table initialization error:", err);
  }
}
