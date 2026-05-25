const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// =========================================================================
// 1. CONTROLLER REGISTRASI PASIEN
// =========================================================================
exports.registerPasien = async (req, res) => {
  // Ambil data yang dikirim oleh Frontend
  const { nama_lengkap, email, password, nomor_hp, nik, tanggal_lahir, jenis_kelamin } = req.body;
  if (!nama_lengkap || !email || !password) {
    return res.status(400).json({ message: 'Nama, email, dan password wajib diisi!' });
  }
  if (nik && (nik.length !== 16 || isNaN(nik))) {
    return res.status(400).json({ message: 'NIK harus berjumlah 16 digit angka!' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Format email tidak valid!' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password minimal harus 6 karakter!' });
  }
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    const [existingUser] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      await connection.rollback();
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userQuery = `
      INSERT INTO users (nama_lengkap, email, password, role, nomor_hp, is_active) 
      VALUES (?, ?, ?, 'pasien', ?, 1)
    `;
    const [userResult] = await connection.query(userQuery, [nama_lengkap, email, hashedPassword, nomor_hp || null]);

    const newUserId = userResult.insertId;

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

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: 'Registrasi akun Pasien PRIMA berhasil dilakukan!',
      userId: newUserId
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error saat register pasien:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat registrasi.' });
  } finally {
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
const [users] = await db.query('SELECT * FROM users WHERE email = ? AND deleted_at IS NULL', [email]);    
    // Jika user tidak ditemukan
    if (users.length === 0) {
      return res.status(401).json({ message: 'Email atau password salah!' });
    }

    const user = users[0];

    if (user.is_active === 0) {
      return res.status(403).json({ message: 'Akun Anda dinonaktifkan. Silakan hubungi admin.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah!' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role,
        nama: user.nama_lengkap 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    await db.query('UPDATE users SET last_login_at = NOW() WHERE id = ?', [user.id]);

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
    return res.status(200).json({
      success: true,
      message: 'Logout berhasil! Token silakan dihapus dari client.'
    });
  } catch (error) {
    console.error('Error saat logout:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat logout.' });
  }
};

// =========================================================================
// 4. GET PROFIL SAYA (Mengambil data user + profil sesuai token yang login)
// =========================================================================
exports.getProfilSaya = async (req, res) => {
  try {
    const userId = req.user.id;
    const query = `
      SELECT u.id, u.nama_lengkap, u.email, u.role, u.nomor_hp, u.last_login_at,
             p.nik, p.tanggal_lahir, p.jenis_kelamin
      FROM users u
      LEFT JOIN profil_pasien p ON u.id = p.user_id
      WHERE u.id = ? AND u.deleted_at IS NULL
    `;
    
    const [results] = await db.query(query, [userId]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Data pengguna tidak ditemukan atau sudah dihapus.' });
    }

    return res.status(200).json({
      success: true,
      data: results[0]
    });

  } catch (error) {
    console.error('Error saat mengambil profil:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat mengambil data profil.' });
  }
};

// =========================================================================
// 5. UPDATE PROFIL SAYA 
// =========================================================================
exports.updateProfilSaya = async (req, res) => {
  const { nama_lengkap, nomor_hp, nik, tanggal_lahir, jenis_kelamin } = req.body;
  const userId = req.user.id;

  if (nik && (nik.length !== 16 || isNaN(nik))) {
    return res.status(400).json({ message: 'NIK harus berjumlah 16 digit angka!' });
  }

  try {
    await db.query(
      'UPDATE users SET nama_lengkap = ?, nomor_hp = ? WHERE id = ?',
      [nama_lengkap, nomor_hp, userId]
    );
    await db.query(
      'UPDATE profil_pasien SET nik = ?, tanggal_lahir = ?, jenis_kelamin = ? WHERE user_id = ?',
      [nik, tanggal_lahir, jenis_kelamin, userId]
    );

    return res.status(200).json({
      success: true,
      message: 'Profil Anda berhasil diperbarui dengan sukses!'
    });

  } catch (error) {
    console.error('Error saat update profil:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat memperbarui profil.' });
  }
};

// =========================================================================
// 6. SOFT DELETE USER
// =========================================================================
exports.softDeleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'UPDATE users SET deleted_at = NOW(), is_active = 0 WHERE id = ? AND deleted_at IS NULL',
      [id]
    );


    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan atau sudah dihapus sebelumnya.' });
    }

    return res.status(200).json({
      success: true,
      message: `User dengan ID ${id} berhasil dihapus (Soft Delete) dari sistem.`
    });

  } catch (error) {
    console.error('Error saat soft delete user:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat menghapus user.' });
  }
};