const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv")
const app = express();
const PORT = process.env.PORT || 5000;
 

// Middleware
app.use(cors());
app.use(bodyParser.json());


dotenv.config();

// Create MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT  // ⭐ Add this
});

// Test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✅ MySQL Connected Successfully!");
    connection.release();
  }
});

// Create table if not exists
// const createTableQuery = `
// CREATE TABLE IF NOT EXISTS registrations (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     first_name VARCHAR(100) NOT NULL,
//     last_name VARCHAR(100) NOT NULL,
//     email VARCHAR(150) NOT NULL UNIQUE,
//     phone VARCHAR(20) NOT NULL,
//     role VARCHAR(50) NOT NULL,
//     linkedin_url VARCHAR(255),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )
// `;
// db.query(createTableQuery, (err, result) => {
//   if (err) console.error(err);
//   else console.log("Table ready");
// });

// // API to save registration
// app.post("/api/register", (req, res) => {
//   const { firstName, lastName, email, phone, role, linkedIn } = req.body;

//   const insertQuery = `
//     INSERT INTO registrations
//     (first_name, last_name, email, phone, role, linkedin_url)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   db.query(
//     insertQuery,
//     [firstName, lastName, email, phone, role, linkedIn || null],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Database error", error: err });
//       }
//       res.json({ message: "Registration successful", id: result.insertId });
//     }
//   );
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
