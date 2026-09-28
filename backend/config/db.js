// const mysql = require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// module.exports = pool.promise();








const fs = require("fs");
const mysql = require("mysql2");
require("dotenv").config();

// ---------------------------
// TiDB MySQL2 Pool Setup
// ---------------------------
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 4000, // TiDB ka port (Standard 4000)
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DB_SSL_CA
    ? { ca: fs.readFileSync(process.env.DB_SSL_CA) }
    : { minVersion: "TLSv1.2", rejectUnauthorized: true }
});

const db = pool.promise();

// Connection Test
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ TiDB (MySQL2 Pool) Connected Successfully!");
    connection.release();
  } catch (err) {
    console.error("❌ TiDB Connection Failed:");
    console.error(err.message);
  }
})();

module.exports = db;