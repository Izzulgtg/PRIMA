const db = require('../config/db');

// =========================================================================
// 1. POST: DOKTER MENAMBAH OBAT BARU
// =========================================================================
exports.createObat = async (req, res) => {
  const {
    nama,
    nama_generik,
    kategori_id,
    supplier_id,
    satuan,
    stok,
    batas_minimum,
    tanggal_kadaluarsa,
    harga_per_unit
  } = req.body;

  if (!nama || stok === undefined) {
    return res.status(400).json({ message: 'Nama obat dan Stok wajib diisi!' });
  }

  try {
    const query = `
      INSERT INTO obat 
      (nama, nama_generik, kategori_id, supplier_id, satuan, stok, batas_minimum, tanggal_kadaluarsa, harga_per_unit, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    await db.query(query, [
      nama,
      nama_generik || null,
      kategori_id || null,
      supplier_id || null,
      satuan || 'tablet',
      stok,
      batas_minimum || 0,
      tanggal_kadaluarsa || null,
      harga_per_unit || 0
    ]);

    return res.status(201).json({ success: true, message: 'Obat baru berhasil ditambahkan!' });
  } catch (error) {
    console.error('Error saat tambah obat:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat menyimpan obat.' });
  }
};

// =========================================================================
// 2. GET: DOKTER / ADMIN MELIHAT DAFTAR OBAT
// =========================================================================
exports.getAllObat = async (req, res) => {
  try {
    const query = `SELECT * FROM obat WHERE deleted_at IS NULL ORDER BY id ASC`;
    const [results] = await db.query(query);

    
    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error('Error saat mengambil data obat:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

// =========================================================================
// 3. PUT: DOKTER MENGUBAH DATA OBAT (STOK & KADALUARSA)
// =========================================================================
exports.updateObat = async (req, res) => {
  const { id } = req.params;
  const { stok, tanggal_kadaluarsa } = req.body;

  if (stok === undefined || stok === null) {
    return res.status(400).json({ message: 'Jumlah stok wajib diisi!' });
  }

  try {
    const query = `
      UPDATE obat 
      SET stok = ?, tanggal_kadaluarsa = ?, updated_at = NOW() 
      WHERE id = ?
    `;
    const [result] = await db.query(query, [stok, tanggal_kadaluarsa || null, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data obat tidak ditemukan.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Data obat berhasil diperbarui oleh Dokter!'
    });
  } catch (error) {
    console.error('Error saat update obat:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat memperbarui data obat.' });
  }
};

// =========================================================================
// 4. DELETE: DOKTER MENGHAPUS DATA OBAT (Soft Delete)
// =========================================================================
exports.softDeleteObat = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `UPDATE obat SET deleted_at = NOW() WHERE id = ?`;
    await db.query(query, [id]);
    return res.status(200).json({ success: true, message: `Data obat berhasil di-soft delete.` });
  } catch (error) {
    console.error('Error saat soft delete obat:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

// =========================================================================
// 5. POST: DOKTER MENGINPUT REKAM MEDIS & RESEP OBAT (TRANSAKSI MULTI-TABEL)
// =========================================================================
exports.createRekamMedis = async (req, res) => {
  const {
    pendaftaran_id, pasien_id, dokter_id,
    keluhan, diagnosis, tindakan, catatan_resep,
    item_obat
  } = req.body;

  if (!pendaftaran_id || !pasien_id || !dokter_id || !diagnosis) {
    return res.status(400).json({ message: 'Pendaftaran ID, Pasien ID, Dokter ID, dan Diagnosis wajib diisi!' });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const rmQuery = `
      INSERT INTO rekam_medis (pendaftaran_id, pasien_id, dokter_id, keluhan, diagnosis, tindakan, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const [rmResult] = await connection.query(rmQuery, [pendaftaran_id, pasien_id, dokter_id, keluhan, diagnosis, tindakan]);
    const rekamMedisId = rmResult.insertId;

    if (item_obat && item_obat.length > 0) {
      const resepQuery = `
        INSERT INTO resep (rekam_medis_id, catatan, created_at, updated_at)
        VALUES (?, ?, NOW(), NOW())
      `;
      const [resepResult] = await connection.query(resepQuery, [rekamMedisId, catatan_resep || null]);
      const resepId = resepResult.insertId;

      for (const item of item_obat) {
        const [obatCheck] = await connection.query('SELECT stok, nama FROM obat WHERE id = ?', [item.obat_id]);
        if (obatCheck.length === 0) {
          throw new Error(`Obat dengan ID ${item.obat_id} tidak ditemukan.`);
        }

        const stokSekarang = obatCheck[0].stok;
        if (stokSekarang < item.jumlah) {
          throw new Error(`Stok obat ${obatCheck[0].nama} tidak mencukupi! Sisa stok: ${stokSekarang}`);
        }

        const detailQuery = `
          INSERT INTO resep_detail (resep_id, obat_id, jumlah, aturan_pakai, created_at, updated_at)
          VALUES (?, ?, ?, ?, NOW(), NOW())
        `;
        await connection.query(detailQuery, [resepId, item.obat_id, item.jumlah, item.aturan_pakai || null]);

        const updateStokQuery = `UPDATE obat SET stok = stok - ? WHERE id = ?`;
        await connection.query(updateStokQuery, [item.jumlah, item.obat_id]);
      }
    }

    await connection.query('UPDATE pendaftaran SET status = "Selesai" WHERE id = ?', [pendaftaran_id]);

    await connection.commit();
    return res.status(201).json({
      success: true,
      message: 'Rekam medis dan resep obat berhasil disimpan, stok obat otomatis terpotong!',
      rekamMedisId: rekamMedisId
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error saat simpan rekam medis:', error.message);
    return res.status(500).json({ message: error.message || 'Terjadi kesalahan pada server saat menyimpan rekam medis.' });
  } finally {
    connection.release();
  }
};

// =========================================================================
// 6. GET: DOKTER MELIHAT DAFTAR ANTREAN PASIEN HARI INI
// =========================================================================
exports.getAntreanDokter = async (req, res) => {
  const { dokter_id } = req.params;

  try {
    const hariIni = new Date().toISOString().slice(0, 10);
    const query = `
      SELECT p.id AS pendaftaran_id, p.nomor_antrian AS nomor_antrean, p.status, p.keluhan, p.created_at,
             u.nama_lengkap AS nama_pasien, pp.jenis_kelamin, pp.tanggal_lahir
      FROM pendaftaran p
      JOIN users u ON p.pasien_id = u.id
      JOIN profil_pasien pp ON u.id = pp.user_id
      WHERE p.dokter_id = ? 
        AND DATE(p.tanggal_periksa) = ? 
        AND p.status IN ('Mengantre', 'Diperiksa')
      ORDER BY p.nomor_antrian ASC
    `;

    const [results] = await db.query(query, [dokter_id, hariIni]);

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Error saat mengambil antrean dokter:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat mengambil data antrean.' });
  }
};

// =========================================================================
// 7. PUT: DOKTER MENGUBAH STATUS ANTREAN (Mengantre -> Diperiksa)
// =========================================================================
exports.updateStatusAntrean = async (req, res) => {
  const { pendaftaran_id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status baru wajib dikirimkan!' });
  }

  try {
    const [check] = await db.query('SELECT id FROM pendaftaran WHERE id = ?', [pendaftaran_id]);
    if (check.length === 0) {
      return res.status(404).json({ message: 'Data pendaftaran tidak ditemukan.' });
    }

    await db.query(
      'UPDATE pendaftaran SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, pendaftaran_id]
    );

    return res.status(200).json({
      success: true,
      message: `Status antrean berhasil diperbarui menjadi '${status}'!`
    });
  } catch (error) {
    console.error('Error saat update status antrean:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat memperbarui status.' });
  }
};

// =========================================================================
// 8. GET: DOKTER MELIHAT DAFTAR SEMUA PASIEN
// =========================================================================
exports.getDaftarPasienForDokter = async (req, res) => {
  try {
    const query = `
      SELECT 
        u.id, 
        u.nama_lengkap AS nama, 
        pp.nik,
        pp.jenis_kelamin,
        TIMESTAMPDIFF(YEAR, pp.tanggal_lahir, CURDATE()) AS umur,
        COUNT(DISTINCT rm.id) AS visits,
        MAX(rm.created_at) AS lastVisit,
        (SELECT keluhan FROM rekam_medis WHERE pasien_id = u.id ORDER BY created_at DESC LIMIT 1) AS lastComplaint
      FROM users u
      LEFT JOIN profil_pasien pp ON u.id = pp.user_id
      LEFT JOIN rekam_medis rm ON u.id = rm.pasien_id
      WHERE u.role = 'pasien'
      GROUP BY u.id, u.nama_lengkap, pp.nik, pp.jenis_kelamin, pp.tanggal_lahir
    `;

    const [rows] = await db.query(query);
    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error('Error saat mengambil daftar pasien untuk dokter:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat mengambil daftar pasien.' });
  }
};

// =========================================================================
// 9. GET: DOKTER MELIHAT DETAIL REKAM MEDIS PASIEN BERDASARKAN ID
// =========================================================================
exports.getDetailPasienForDokter = async (req, res) => {
  const pasien_id = req.params.id;

  try {
    // A. Ambil Info Profil Dasar Pasien
    const [pasienResult] = await db.query(
      `
      SELECT 
        u.id, 
        u.nama_lengkap AS nama, 
        pp.nik,
        pp.jenis_kelamin, 
        TIMESTAMPDIFF(YEAR, pp.tanggal_lahir, CURDATE()) AS umur
      FROM users u
      LEFT JOIN profil_pasien pp ON u.id = pp.user_id
      WHERE u.id = ? AND u.role = 'pasien'
      `,
      [pasien_id]
    );

    if (pasienResult.length === 0) {
      return res.status(404).json({ message: "Data pasien tidak ditemukan." });
    }

    // B. Ambil Semua Riwayat Rekam Medis Pasien
    const [rekamMedisResult] = await db.query(
      `
      SELECT 
        rm.id AS rekam_medis_id,
        rm.keluhan,
        rm.diagnosis,
        rm.tindakan,
        rm.created_at AS tanggal_periksa,
        ud.nama_lengkap AS nama_dokter
      FROM rekam_medis rm
      JOIN users ud ON rm.dokter_id = ud.id
      WHERE rm.pasien_id = ?
      ORDER BY rm.created_at DESC
      `,
      [pasien_id]
    );

    // C. Ambil Riwayat Resep Obat Detail Pasien
    const [resepResult] = await db.query(
      `
      SELECT 
        r.id AS resep_id,
        rm.created_at AS tanggal_kunjungan,
        o.nama AS nama_obat,
        rd.jumlah,
        rd.aturan_pakai
      FROM resep r
      JOIN rekam_medis rm ON r.rekam_medis_id = rm.id
      JOIN resep_detail rd ON r.id = rd.resep_id
      JOIN obat o ON rd.obat_id = o.id
      WHERE rm.pasien_id = ?
      ORDER BY rm.created_at DESC
      `,
      [pasien_id]
    );

    return res.status(200).json({
      success: true,
      data: {
        profil: pasienResult[0],
        rekamMedis: rekamMedisResult,
        resepObat: resepResult,
      },
    });
  } catch (error) {
    console.error('Error saat mengambil detail pasien untuk dokter:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

// =========================================================================
// 10. GET: DOKTER MELIHAT PROFIL SAYA (Disinkronkan namanya ke Router)
// =========================================================================
exports.getProfilDokter = async (req, res) => {
  const dokter_id = req.params.id || (req.user ? req.user.id : null);
  if (!dokter_id) return res.status(400).json({ message: 'ID Dokter tidak ditemukan.' });
  try {
    const [results] = await db.query(`SELECT u.*, pd.* FROM users u JOIN profil_dokter pd ON u.id = pd.user_id WHERE u.id = ? AND u.role = 'dokter'`, [dokter_id]);
    if (results.length === 0) return res.status(404).json({ message: 'Profil tidak ditemukan' });
    return res.status(200).json({ success: true, data: results[0] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// =========================================================================
// 11. GET: MONITORING - REKAP PENGELUARAN OBAT & STOK
// =========================================================================
exports.getMonitoringObat = async (req, res) => {
  try {
    // 1. Ambil 10 obat paling banyak digunakan
    const topObatQuery = `
      SELECT o.id, o.nama, o.stok, SUM(rd.jumlah) as total_penggunaan
      FROM obat o
      LEFT JOIN resep_detail rd ON o.id = rd.obat_id
      GROUP BY o.id, o.nama, o.stok
      ORDER BY total_penggunaan DESC
      LIMIT 10
    `;
    const [topObat] = await db.query(topObatQuery);

    // 2. Cek obat yang akan kadaluarsa (dalam 30 hari) atau stok menipis
    const warningQuery = `
      SELECT nama, stok, tanggal_kadaluarsa 
      FROM obat 
      WHERE tanggal_kadaluarsa <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
         OR stok <= batas_minimum
    `;
    const [warnings] = await db.query(warningQuery);

    return res.status(200).json({
      success: true,
      data: {
        topObat,
        warnings
      }
    });
  } catch (error) {
    console.error('Error getMonitoringObat:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};

// =========================================================================
// 12. GET: MONITORING - LOG KUNJUNGAN PASIEN
// =========================================================================
exports.getLogKunjungan = async (req, res) => {
  // PENGAMAN: Fallback ke ID 2 (Dr. Dila) jika req.user (token) belum tersedia
  const dokter_id = req.user ? req.user.id : 2; 

  try {
    const query = `
      SELECT 
        rm.created_at AS tanggal,
        u.nama_lengkap AS nama_pasien,
        rm.keluhan,
        rm.diagnosis
      FROM rekam_medis rm
      JOIN users u ON rm.pasien_id = u.id
      WHERE rm.dokter_id = ?
      ORDER BY rm.created_at DESC
      LIMIT 50
    `;
    const [logs] = await db.query(query, [dokter_id]);

    return res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error('Error getLogKunjungan:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};

// =========================================================================
// 13. GET: MONITORING - STATISTIK RINGKASAN & TREN KONSULTASI
// =========================================================================
exports.getMonitoringSummary = async (req, res) => {
  // PENGAMAN: Fallback ke ID 2 (Dr. Dila) jika req.user (token) belum tersedia
  const dokter_id = req.user ? req.user.id : 2;

  try {
    // 1. Total Pasien Unik
    const [pasienCount] = await db.query(`SELECT COUNT(DISTINCT pasien_id) as total FROM rekam_medis WHERE dokter_id = ?`, [dokter_id]);
    
    // 2. Total Konsultasi Bulan Ini
    const [konsultasiBulanIni] = await db.query(`SELECT COUNT(id) as total FROM rekam_medis WHERE dokter_id = ? AND MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())`, [dokter_id]);
    
    // 3. Total Resep Dibuat
    const [resepCount] = await db.query(`SELECT COUNT(r.id) as total FROM resep r JOIN rekam_medis rm ON r.rekam_medis_id = rm.id WHERE rm.dokter_id = ?`, [dokter_id]);
    
    // 4. Tren Konsultasi (Grafik)
    const [trenKonsultasi] = await db.query(`
      SELECT DATE_FORMAT(created_at, '%b %Y') as bulan, COUNT(id) as jumlah 
      FROM rekam_medis 
      WHERE dokter_id = ? AND created_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY YEAR(created_at), MONTH(created_at), DATE_FORMAT(created_at, '%b %Y')
      ORDER BY YEAR(created_at) ASC, MONTH(created_at) ASC
    `, [dokter_id]);

    // 5. Demografi (Berdasarkan Kelamin)
    const [demografi] = await db.query(`
      SELECT pp.jenis_kelamin, COUNT(DISTINCT rm.pasien_id) as jumlah
      FROM rekam_medis rm
      JOIN profil_pasien pp ON rm.pasien_id = pp.user_id
      WHERE rm.dokter_id = ?
      GROUP BY pp.jenis_kelamin
    `, [dokter_id]);

    return res.status(200).json({
      success: true,
      data: {
        cards: {
          totalPasien: pasienCount[0].total,
          konsultasiBulanIni: konsultasiBulanIni[0].total,
          totalResep: resepCount[0].total,
        },
        tren: trenKonsultasi,
        demografi: demografi
      }
    });
  } catch (error) {
    console.error('Error getMonitoringSummary:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
};

// =========================================================================
// 14. GET: STATISTICS (Untuk Dashboard Utama)
// =========================================================================
exports.getStatistics = async (req, res) => {
  const dokter_id = req.user ? req.user.id : 2;
  
  try {
    const [tren] = await db.query(`SELECT DATE(created_at) tanggal, COUNT(*) total FROM rekam_medis WHERE dokter_id = ? GROUP BY DATE(created_at)`, [dokter_id]);
    const [total] = await db.query(`SELECT COUNT(*) AS total FROM rekam_medis WHERE dokter_id = ?`, [dokter_id]);
    
    return res.json({ 
      success: true, 
      data: { 
        cards: { totalKonsultasi: total[0].total }, 
        tren 
      } 
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};