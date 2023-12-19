// db.ts
import sqlite from "sqlite-async";

let db: sqlite.Database;

export const connectDatabase = async (): Promise<sqlite.Database> => {
  if (db) return db;

  db = await sqlite.open({
    filename: "./database.db",
    driver: sqlite.Database,
  });

  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);

  return db;
};

export const createUser = async (
  email: string,
  password: string,
): Promise<number> => {
  const db = await connectDatabase();
  const result = await db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
  );
  return result.lastID;
};

export const getUserByEmail = async (email: string): Promise<any | null> => {
  const db = await connectDatabase();
  return db.get("SELECT * FROM users WHERE email = ?", [email]);
};
