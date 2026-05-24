const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// =========================================================================
// 1. CONTROLLER REGISTRASI PASIEN
// =========================================================================
exports.registerPasien = async (req, res) => {
  // Ambil data yang dikirim oleh Frontend
  const { nama_lengkap, email, password, nomor_hp, nik, tanggal_lahir, jenis_kelamin } = req.body;

  // --- VALIDASI INPUT ---
  // Pengecekan input wajib dasar
  if (!nama_lengkap || !email || !password) {
    return res.status(400).json({ message: 'Nama, email, dan password wajib diisi!' });
  }

  // Pengecekan format NIK (Harus 16 digit angka jika diisi)
  if (nik && (nik.length !== 16 || isNaN(nik))) {
    return res.status(400).json({ message: 'NIK harus berjumlah 16 digit angka!' });
  }

  // Pengecekan format email standar
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Format email tidak valid!' });
  }

  // Pengecekan panjang password minimal 6 karakter
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password minimal harus 6 karakter!' });
  }

  // Dapatkan koneksi khusus dari pool untuk menjalankan Transaction
  const connection = await db.getConnection();

  try {
    // Mulai Database Transaction
    await connection.beginTransaction();

    // Cek apakah email sudah terdaftar di tabel users
    const [existingUser] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      await connection.rollback(); // Batalkan transaksi
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }

    // Enkripsi / Hashing password pasien demi keamanan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert data utama ke tabel `users`
    const userQuery = `
      INSERT INTO users (nama_lengkap, email, password, role, nomor_hp, is_active) 
      VALUES (?, ?, ?, 'pasien', ?, 1)
    `;
    const [userResult] = await connection.query(userQuery, [nama_lengkap, email, hashedPassword, nomor_hp || null]);
    
    // Ambil ID user yang baru saja terbuat
    const newUserId = userResult.insertId;

    // Insert data tambahan ke tabel `profil_pasien`
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

// =========================================================================
// 2. CONTROLLER LOGIN
// =========================================================================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validasi input dasar
  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi!' });
  }

  try {
    // Cari user berdasarkan email di database
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    // Jika user tidak ditemukan
    if (users.length === 0) {
      return res.status(401).json({ message: 'Email atau password salah!' });
    }

    const user = users[0];

    // Cek apakah akun pasien statusnya aktif (is_active = 1)
    if (user.is_active === 0) {
      return res.status(403).json({ message: 'Akun Anda dinonaktifkan. Silakan hubungi admin.' });
    }

    // Cocokkan password yang diinput dengan password terenkripsi di DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah!' });
    }

    // Buat JWT Token jika password cocok
    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role,
        nama: user.nama_lengkap 
      },
      process.env.JWT_SECRET, // Mengambil kunci rahasia dari file .env kamu
      { expiresIn: '1d' }
    );

    // Update kolom `last_login_at` di database sebagai catatan log
    await db.query('UPDATE users SET last_login_at = NOW() WHERE id = ?', [user.id]);

    // Kirim token beserta data user esensial ke Frontend
    return res.status(200).json({
      success: true,
      message: 'Login berhasil!',
      token: token,
      user: {
        id: user.id,
        nama_lengkap: user.nama_lengkap,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error saat login:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat login.' });
  }
};

// =========================================================================
// 3. CONTROLLER LOGOUT
// =========================================================================
exports.logout = async (req, res) => {
  try {
    // Pada arsitektur JWT, backend cukup mengirim respon sukses.
    // Sisi Frontend yang wajib menghapus token dari localStorage nanti.
    return res.status(200).json({
      success: true,
      message: 'Logout berhasil! Token silakan dihapus dari client.'
    });
  } catch (error) {
    console.error('Error saat logout:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat logout.' });
  }
};