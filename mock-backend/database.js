import sqlite3 from "sqlite3";
import * as path from "path";

import { fileURLToPath } from "url";

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, "database.db");

// Create a new SQLite3 database or open the existing one
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Initialize the users table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        clients TEXT NOT NULL,
        userType TEXT NOT NULL,
        lastLogin DATE, -- Allow NULL values
        lastPasswordChange DATE, -- Allow NULL values
        active BOOLEAN NOT NULL
    )`);
});

export default db;
