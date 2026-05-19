const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.registerPasien = async (req, res) => {
  // Ambil data yang dikirim oleh Frontend
  const { nama_lengkap, email, password, nomor_hp, nik, tanggal_lahir, jenis_kelamin } = req.body;

  // 1. Validasi input dasar
  if (!nama_lengkap || !email || !password) {
    return res.status(400).json({ message: 'Nama, email, dan password wajib diisi!' });
  }

  // Dapatkan koneksi khusus dari pool untuk menjalankan Transaction
  const connection = await db.getConnection();

  try {
    // Mulai Database Transaction
    await connection.beginTransaction();

    // 2. Cek apakah email sudah terdaftar di tabel users
    const [existingUser] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      await connection.rollback(); // Batalkan transaksi
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }

    // 3. Enkripsi / Hashing password pasien demi keamanan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Insert data utama ke tabel `users`
    const userQuery = `
      INSERT INTO users (nama_lengkap, email, password, role, nomor_hp, is_active) 
      VALUES (?, ?, ?, 'pasien', ?, 1)
    `;
    const [userResult] = await connection.query(userQuery, [nama_lengkap, email, hashedPassword, nomor_hp || null]);
    
    // Ambil ID user yang baru saja terbuat
    const newUserId = userResult.insertId;

    // 5. Insert data rekam medis awal ke tabel `profil_pasien`
    const profilQuery = `
      INSERT INTO profil_pasien (user_id, nik, tanggal_lahir, jenis_kelamin) 
      VALUES (?, ?, ?, ?)
    `;
    await connection.query(profilQuery, [
      newUserId, 
      nik || null, 
      tanggal_lahir || null, 
      jenis_kelamin || null
    ]);

    // Jika kedua proses insert berhasil tanpa error, simpan permanen ke database
    await connection.commit();

    return res.status(201).json({
      success: true,
      message: 'Registrasi akun Pasien PRIMA berhasil dilakukan!',
      userId: newUserId
    });

  } catch (error) {
    // Jika ada salah satu proses yang error, batalkan semua perubahan data (Rollback)
    await connection.rollback();
    console.error('Error saat register pasien:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat registrasi.' });
  } finally {
    // Kembalikan koneksi ke pool
    connection.release();
  }
};