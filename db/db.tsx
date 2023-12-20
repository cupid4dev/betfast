// db.ts
import sqlite3, { Database } from "sqlite3";

let db: Database;

export const connectDatabase = async () => {
  if (db) return db;

  db = new sqlite3.Database("db/database.db", (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    }
  });

  await db.run(
    `CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY NOT NULL, country TEXT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, birthday TEXT NOT NULL, address1 TEXT NOT NULL, address2 TEXT NOT NULL, city TEXT NOT NULL, postcode TEXT NOT NULL )`,
  );

  return db;
};

export const createUser = async (user, callback) => {
  const db = await connectDatabase();

  const result = await db.run(
    "INSERT INTO users (email, country, firstName, lastName, birthday, address1, address2, city, postcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      user.email,
      user.country,
      user.firstName,
      user.lastName,
      user.birthday,
      user.address1,
      user.address2,
      user.city,
      user.postcode,
    ],
    function (err) {
      if (err) {
        callback({
          success: false,
          error: err,
        });
      } else {
        callback({
          success: true,
        });
      }
    },
  );
  return result;
};

export const getUserByEmail = async (email, callback) => {
  const db = await connectDatabase();
  return db.all("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
    if (err) {
      callback({ success: false });
    } else {
      callback({ success: true, user: rows });
    }
  });
};
