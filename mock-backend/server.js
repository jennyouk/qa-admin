import express from "express";
import cors from "cors";
import db from "./database.js";
import { createObjectCsvStringifier } from "csv-writer";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5001 // changed to for heroku hosting

// Serve static files from the 'dist' directory
app.use(express.static('dist'));

// Handle requests for the root path
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// Create a new user
app.post("/users", (req, res) => {
  const {
    email,
    username,
    firstName,
    lastName,
    clients,
    userType,
    lastLogin = null,
    lastPasswordChange = null,
    active = true,
  } = req.body;

  db.run(
    `INSERT INTO users (email, username, firstName, lastName, clients, userType, lastLogin, lastPasswordChange, active)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      email.toLowerCase(),
      username.toLowerCase(),
      firstName,
      lastName,
      JSON.stringify(clients),
      userType,
      lastLogin,
      lastPasswordChange,
      active,
    ],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: "User created", userId: this.lastID });
    }
  );
});

// search for user(s)
app.get("/users", (req, res) => {
  const { email, firstName, lastName, username } = req.query;

  // Build the query dynamically
  let query = "SELECT * FROM users WHERE 1=1";
  const params = [];

  if (email) {
    query += " AND email = ?";
    params.push(email);
  }

  if (firstName) {
    query += " AND LOWER(firstName) = LOWER(?)";
    params.push(firstName);
  }

  if (lastName) {
    query += " AND LOWER(lastName) = LOWER(?)";
    params.push(lastName);
  }

  if (username) {
    query += " AND username = ?";
    params.push(username);
  }
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

// Get a single user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row) {
      // Parse the clients string back to an array
      try {
        row.clients = JSON.parse(row.clients);
      } catch (error) {
        row.clients = [];
      }
    }
    res.json({ user: row });
  });
});

// Update a user by ID
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const {
    email,
    username,
    firstName,
    lastName,
    clients,
    userType,
    lastLogin,
    lastPasswordChange,
    active,
  } = req.body;
  db.run(
    `UPDATE users SET email = ?, username = ?, firstName = ?, lastName = ?, clients = ?, userType = ?, lastLogin = ?, lastPasswordChange = ?, active = ? WHERE id = ?`,
    [
      email.toLowerCase(),
      username.toLowerCase(),
      firstName,
      lastName,
      JSON.stringify(clients),
      userType,
      lastLogin,
      lastPasswordChange,
      active,
      id,
    ],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: "User updated", changes: this.changes });
    }
  );
});

// // Delete a user by ID
// app.delete('/users/:id', (req, res) => {
//     const { id } = req.params;
//     db.run('DELETE FROM users WHERE id = ?', id, function (err) {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({ message: 'User deleted', changes: this.changes });
//     });
// });

app.get("/export", (req, res) => {
  // Query to get column names from the 'users' table
  db.all("PRAGMA table_info(users)", (err, columns) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve column info" });
      return;
    }

    const headers = columns.map((col) => ({
      id: col.name,
      title: col.name,
    }));

    const csvStringifier = createObjectCsvStringifier({
      header: headers,
    });

    // Fetch the actual data rows
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Failed to retrieve data" });
        return;
      }

      const csvContent =
        csvStringifier.getHeaderString() +
        csvStringifier.stringifyRecords(rows);

      res.setHeader("Content-disposition", "attachment; filename=users.csv");
      res.set("Content-Type", "text/csv");
      res.status(200).send(csvContent);
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
