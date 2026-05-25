const db = require('../config/db');

// =========================================================================
// 1. POST: PASIEN MENDAFTAR BEROBAT (GENERATE NOMOR ANTREAN OTOMATIS)
// =========================================================================
exports.buatPendaftaran = async (req, res) => {
  const { pasien_id, dokter_id, keluhan, tanggal_periksa } = req.body;

  // Validasi input wajib
  if (!pasien_id || !dokter_id || !tanggal_periksa) {
    return res.status(400).json({ message: 'Pasien ID, Dokter ID, dan Tanggal Periksa wajib diisi!' });
  }

  try {
    // 1. Hitung jumlah antrean yang sudah ada untuk DOKTER tersebut di TANGGAL tersebut
    const checkAntreanQuery = `
      SELECT COUNT(*) AS total_antrean 
      FROM pendaftaran 
      WHERE dokter_id = ? AND DATE(tanggal_periksa) = DATE(?)
    `;
    const [antreanResult] = await db.query(checkAntreanQuery, [dokter_id, tanggal_periksa]);
    
    // Nomor antrean baru adalah total antrean saat ini ditambah 1
    const nomorAntreanBaru = antreanResult[0].total_antrean + 1;

    // 2. Insert data pendaftaran baru ke database dengan status awal 'Mengantre'
    const insertQuery = `
      INSERT INTO pendaftaran (pasien_id, dokter_id, nomor_antrean, status, keluhan, tanggal_periksa, created_at, updated_at)
      VALUES (?, ?, ?, 'Mengantre', ?, ?, NOW(), NOW())
    `;
    const [insertResult] = await db.query(insertQuery, [
      pasien_id,
      dokter_id,
      nomorAntreanBaru,
      keluhan || null,
      tanggal_periksa
    ]);

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran berobat berhasil! Nomor antrean Anda telah diterbitkan.',
      data: {
        pendaftaran_id: insertResult.insertId,
        nomor_antrean: nomorAntreanBaru,
        tanggal_periksa: tanggal_periksa,
        status: 'Mengantre'
      }
    });

  } catch (error) {
    console.error('Error saat pendaftaran pasien:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat memproses pendaftaran.' });
  }
};

// =========================================================================
// 2. GET: PASIEN MELIHAT RIWAYAT REKAM MEDIS MEREKA SENDIRI
// =========================================================================
exports.getRiwayatMedisPasien = async (req, res) => {
  const { pasien_id } = req.params; // Diambil dari ID user pasien yang sedang login

  try {
    // Ambil data rekam medis, nama dokter yang memeriksa, serta catatan resepnya
    const query = `
      SELECT rm.id AS rekam_medis_id, rm.keluhan, rm.diagnosis, rm.tindakan, rm.created_at AS tanggal_periksa,
             ud.nama_lengkap AS nama_dokter, pd.spesialisasi,
             r.id AS resep_id, r.catatan AS catatan_resep
      FROM rekam_medis rm
      JOIN users ud ON rm.dokter_id = ud.id
      JOIN profil_dokter pd ON ud.id = pd.user_id
      LEFT JOIN resep r ON rm.id = r.rekam_medis_id
      WHERE rm.pasien_id = ?
      ORDER BY rm.created_at DESC
    `;
    
    const [results] = await db.query(query, [pasien_id]);

    // Jika ingin menyertakan detail item obat di dalam resepnya, kita bisa mapping (opsional)
    // Namun query join di atas sudah cukup untuk menampilkan list riwayat di UI mobile/web pasien.

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Error saat mengambil riwayat medis pasien:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat mengambil data riwayat.' });
  }
};