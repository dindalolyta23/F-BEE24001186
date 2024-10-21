const express = require('express');
const { PrismaClient } = require('@prisma/client');

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

// // Inisialisasi Express
// const app = express();
// const PORT = 3000;

// Middleware untuk parse JSON
// app.use(express.json());

// Fungsi untuk melakukan koneksi awal dengan database menggunakan Prisma
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Keluar dari aplikasi jika koneksi gagal
  }
};

// Memanggil fungsi connectDB ketika aplikasi diinisialisasi
connectDB();

// Endpoint untuk mendapatkan daftar pengguna
// app.get('/api/v1/users', async (req, res) => {
//   try {
//     const users = await prisma.user.findMany(); // Ganti dengan model Anda
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Menjalankan server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// Ekspor prisma agar dapat digunakan di bagian lain aplikasi
module.exports = {connectDB,prisma};