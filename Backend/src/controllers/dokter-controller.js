const db = require('../config/db');

// =========================================================================
// 1. POST: DOKTER MENAMBAH DATA OBAT
// =========================================================================
exports.createObat = async (req, res) => {
  const { nama_obat, kategori_obat_id, supplier_id, stok, harga, deskripsi } = req.body;

  if (!nama_obat || !harga) {
    return res.status(400).json({ message: 'Nama obat dan harga wajib diisi!' });
  }

  try {
    const query = `
      INSERT INTO obat (nama_obat, kategori_obat_id, supplier_id, stok, harga, deskripsi, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const [result] = await db.query(query, [
      nama_obat,
      kategori_obat_id || null,
      supplier_id || null,
      stok || 0,
      harga,
      deskripsi || null
    ]);

    return res.status(201).json({
      success: true,
      message: 'Data obat baru berhasil ditambahkan oleh Dokter!',
      obatId: result.insertId
    });
  } catch (error) {
    console.error('Error saat tambah obat:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat menambah data obat.' });
  }
};

// =========================================================================
// 2. GET: DOKTER / ADMIN MELIHAT DAFTAR OBAT
// =========================================================================
exports.getAllObat = async (req, res) => {
  try {
    const query = `
      SELECT o.*, k.nama_kategori, s.nama_supplier 
      FROM obat o
      LEFT JOIN kategori_obat k ON o.kategori_obat_id = k.id
      LEFT JOIN supplier s ON o.supplier_id = s.id
      WHERE o.deleted_at IS NULL
    `;
    const [results] = await db.query(query);
    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error('Error saat mengambil data obat:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

// =========================================================================
// 3. PUT: DOKTER MENGUBAH DATA OBAT
// =========================================================================
exports.updateObat = async (req, res) => {
  const { id } = req.params;
  const { nama_obat, kategori_obat_id, supplier_id, stok, harga, deskripsi } = req.body;

  try {
    const query = `
      UPDATE obat SET 
        nama_obat = ?, kategori_obat_id = ?, supplier_id = ?, 
        stok = ?, harga = ?, deskripsi = ?, updated_at = NOW()
      WHERE id = ?
    `;
    await db.query(query, [nama_obat, kategori_obat_id, supplier_id, stok, harga, deskripsi, id]);
    
    return res.status(200).json({ success: true, message: 'Data obat berhasil diperbarui oleh Dokter!' });
  } catch (error) {
    console.error('Error saat update obat:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
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