import mysql from "mysql2/promise";

// A single pool is reused across hot reloads in development.
const globalForDb = globalThis;

const db =
  globalForDb.dbPool ??
  mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.dbPool = db;
}

export default db;
