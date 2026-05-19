const mysql = require('mysql2');
const dotenv = require('dotenv');

// Memuat variabel dari file .env
dotenv.config();

// Membuat connection pool untuk efisiensi koneksi simultan
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'prima_db', // Mengarah ke skema prima_db kamu
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Mengubah pool menjadi format Promise agar mendukung async/await
const db = pool.promise();

module.exports = db;