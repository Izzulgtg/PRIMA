const db = require('../config/db');
const bcrypt = require('bcryptjs');

// =========================================================================
// 1. POST: ADMIN MENDAFTARKAN DOKTER BARU (Disesuaikan Kolom DB Asli)
// =========================================================================
exports.createDokter = async (req, res) => {
  const { 
    nama_lengkap, email, password, nomor_hp, 
    nik, tanggal_lahir, jenis_kelamin, spesialisasi, 
    nomor_sip, sip_expired_at, institusi, jam_praktik_default 
  } = req.body;

  // Validasi input wajib
  if (!nama_lengkap || !email || !password || !spesialisasi || !nomor_sip) {
    return res.status(400).json({ message: 'Nama, email, password, spesialisasi, dan nomor SIP wajib diisi!' });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Cek duplikasi email
    const [existingUser] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      await connection.rollback();
      return res.status(400).json({ message: 'Email sudah digunakan oleh akun lain!' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert ke tabel users
    const userQuery = `
      INSERT INTO users (nama_lengkap, email, password, role, nomor_hp, is_active) 
      VALUES (?, ?, ?, 'dokter', ?, 1)
    `;
    const [userResult] = await connection.query(userQuery, [nama_lengkap, email, hashedPassword, nomor_hp || null]);
    const newDokterId = userResult.insertId;

    // Insert ke tabel profil_dokter (SESUAI GAMBAR HEIDISQL)
    const dokterQuery = `
      INSERT INTO profil_dokter (
        user_id, nik, tanggal_lahir, jenis_kelamin, spesialisasi, 
        nomor_sip, sip_expired_at, institusi, jam_praktik_default
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await connection.query(dokterQuery, [
      newDokterId,
      nik || null,
      tanggal_lahir || null,
      jenis_kelamin || null,
      spesialisasi,
      nomor_sip,
      sip_expired_at || null,
      institusi || null,
      jam_praktik_default || null
    ]);

    await connection.commit();
    return res.status(201).json({
      success: true,
      message: 'Akun Dokter baru berhasil didaftarkan oleh Admin!',
      dokterId: newDokterId
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error saat tambah dokter:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat menambah data dokter.' });
  } finally {
    connection.release();
  }
};

// =========================================================================
// 2. GET: ADMIN MELIHAT DAFTAR DOKTER LENGKAP
// =========================================================================
exports.getAllDokter = async (req, res) => {
  try {
    const query = `
      SELECT u.id, u.nama_lengkap, u.email, u.nomor_hp, u.is_active,
             d.nik, d.tanggal_lahir, d.jenis_kelamin, d.spesialisasi, 
             d.nomor_sip, d.sip_expired_at, d.institusi, d.jam_praktik_default
      FROM users u
      JOIN profil_dokter d ON u.id = d.user_id
      WHERE u.role = 'dokter' AND u.deleted_at IS NULL
    `;
    const [results] = await db.query(query);
    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error('Error saat mengambil data dokter:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

// =========================================================================
// 3. PUT: ADMIN MENGUBAH DATA PROFIL DOKTER
// =========================================================================
exports.updateDokter = async (req, res) => {
  const { id } = req.params;
  const { 
    nama_lengkap, nomor_hp, is_active,
    nik, tanggal_lahir, jenis_kelamin, spesialisasi, 
    nomor_sip, sip_expired_at, institusi, jam_praktik_default 
  } = req.body;

  try {
    // Update tabel users
    await db.query(
      'UPDATE users SET nama_lengkap = ?, nomor_hp = ?, is_active = ? WHERE id = ? AND role = "dokter"',
      [nama_lengkap, nomor_hp, is_active, id]
    );

    // Update tabel profil_dokter
    const updateProfilQuery = `
      UPDATE profil_dokter SET 
        nik = ?, tanggal_lahir = ?, jenis_kelamin = ?, spesialisasi = ?, 
        nomor_sip = ?, sip_expired_at = ?, institusi = ?, jam_praktik_default = ?
      WHERE user_id = ?
    `;
    await db.query(updateProfilQuery, [
      nik, tanggal_lahir, jenis_kelamin, spesialisasi, 
      nomor_sip, sip_expired_at, institusi, jam_praktik_default, id
    ]);

    return res.status(200).json({ success: true, message: 'Data profil dokter berhasil diperbarui!' });
  } catch (error) {
    console.error('Error saat update dokter:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat memperbarui data dokter.' });
  }
};

// =========================================================================
// 4. DELETE: ADMIN MENGHAPUS AKUN DOKTER (Soft Delete)
// =========================================================================
exports.softDeleteDokter = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      'UPDATE users SET deleted_at = NOW(), is_active = 0 WHERE id = ? AND role = "dokter"',
      [id]
    );
    return res.status(200).json({ success: true, message: `Akun dokter dengan ID ${id} berhasil di-soft delete.` });
  } catch (error) {
    console.error('Error saat soft delete dokter:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

exports.createUser = async (req, res) => {

  const {
    nama_lengkap,
    email,
    password,
    nomor_hp,
    role,
  } = req.body;

  if (
    !nama_lengkap ||
    !email ||
    !password ||
    !role
  ) {
    return res.status(400).json({
      message: "Data wajib belum lengkap"
    });
  }

  if (
  !["admin", "pasien"].includes(role)
) {
  return res.status(400).json({
    message: "Role tidak valid"
  });
}

  const connection =
    await db.getConnection();

  try {

    await connection.beginTransaction();

    const [existingUser] =
      await connection.query(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );

    if (existingUser.length > 0) {

      await connection.rollback();

      return res.status(400).json({
        message: "Email sudah digunakan"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const [userResult] =
      await connection.query(
        `
        INSERT INTO users
        (
          nama_lengkap,
          email,
          password,
          role,
          nomor_hp,
          is_active
        )
        VALUES (?, ?, ?, ?, ?, 1)
        `,
        [
          nama_lengkap,
          email,
          hashedPassword,
          role,
          nomor_hp || null
        ]
      );

    const userId =
      userResult.insertId;

    // ADMIN
    if (role === "admin") {

      await connection.query(
        `
        INSERT INTO profil_admin
        (
          user_id
        )
        VALUES (?)
        `,
        [userId]
      );

    }

    // PASIEN
    if (role === "pasien") {

      await connection.query(
        `
        INSERT INTO profil_pasien
        (
          user_id
        )
        VALUES (?)
        `,
        [userId]
      );

    }

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "User berhasil dibuat"
    });

  } catch (error) {

    await connection.rollback();

    console.error(error);

    return res.status(500).json({
      message: "Server Error"
    });

  } finally {

    connection.release();

  }

};

exports.getDashboardStats = async (req, res) => {

  try {

    const [pasien] = await db.query(`
      SELECT COUNT(*) AS total
      FROM users
      WHERE role = 'pasien'
      AND deleted_at IS NULL
    `);

    const [konsultasi] = await db.query(`
      SELECT COUNT(*) AS total
      FROM konsultasi
    `);

    return res.status(200).json({
      totalPasien: pasien[0].total,
      totalKonsultasi: konsultasi[0].total
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server Error"
    });

  }

};

exports.getAllUsers = async (req, res) => {

  try {

    const [users] = await db.query(`
      SELECT
        id,
        nama_lengkap,
        role,
        is_active
      FROM users
      WHERE deleted_at IS NULL
      ORDER BY id DESC
    `);

    return res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server Error"
    });

  }

};

// =========================================================================
// RESET PASSWORD USER
// =========================================================================
exports.resetPasswordUser = async (req, res) => {

  const { id } = req.params;

  try {

    const defaultPassword = "123456";

    const hashedPassword =
      await bcrypt.hash(defaultPassword, 10);

    const [result] = await db.query(
      `
      UPDATE users
      SET password = ?
      WHERE id = ?
      `,
      [hashedPassword, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Password berhasil direset menjadi 123456"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server Error"
    });

  }

};