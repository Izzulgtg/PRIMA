const db = require("../config/db");

// ======================================================
// DASHBOARD PASIEN
// ======================================================
exports.getDashboard = async (
  req,
  res
) => {
  try {
    const pasien_id = req.user.id;

    const [[totalPendaftaran]] =
      await db.query(
        `
        SELECT COUNT(*) AS total
        FROM pendaftaran
        WHERE pasien_id = ?
      `,
        [pasien_id]
      );

    const [[totalRekamMedis]] =
      await db.query(
        `
        SELECT COUNT(*) AS total
        FROM rekam_medis
        WHERE pasien_id = ?
      `,
        [pasien_id]
      );

    const [[pendaftaranTerakhir]] =
      await db.query(
        `
        SELECT
          nomor_antrian,
          status,
          tanggal_periksa
        FROM pendaftaran
        WHERE pasien_id = ?
        ORDER BY created_at DESC
        LIMIT 1
      `,
        [pasien_id]
      );

    return res.status(200).json({
      success: true,
      data: {
        total_pendaftaran:
          totalPendaftaran.total,
        total_rekam_medis:
          totalRekamMedis.total,
        pendaftaran_terakhir:
          pendaftaranTerakhir || null,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Gagal mengambil data dashboard",
    });
  }
};

// ======================================================
// PROFILE PASIEN
// ======================================================
exports.getProfilePasien = async (
  req,
  res
) => {
  try {
    const pasien_id = req.user.id;

    const [result] =
      await db.query(
        `
        SELECT
          id,
          nama_lengkap,
          email,
          nomor_hp,
          nik,
          jenis_kelamin,
          tanggal_lahir,
          role,
          created_at
        FROM users
        WHERE id = ?
      `,
        [pasien_id]
      );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Data pasien tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Gagal mengambil profile pasien",
    });
  }
};

// ======================================================
// PENDAFTARAN BEROBAT
// ======================================================
exports.buatPendaftaran = async (
  req,
  res
) => {
  try {
    const pasien_id = req.user.id;

    const {
      dokter_id,
      keluhan,
      tanggal_periksa,
    } = req.body;

    if (
      !dokter_id ||
      !tanggal_periksa
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Dokter dan tanggal periksa wajib diisi",
      });
    }

    const [antreanResult] =
      await db.query(
        `
        SELECT COUNT(*) AS total_antrean
        FROM pendaftaran
        WHERE dokter_id = ?
        AND DATE(tanggal_periksa)
            = DATE(?)
      `,
        [
          dokter_id,
          tanggal_periksa,
        ]
      );

    const nomorAntreanBaru =
      antreanResult[0]
        .total_antrean + 1;

    const [insertResult] =
      await db.query(
        `
        INSERT INTO pendaftaran (
          pasien_id,
          dokter_id,
          nomor_antrian,
          status,
          keluhan,
          tanggal_periksa,
          created_at,
          updated_at
        )
        VALUES (
          ?,
          ?,
          ?,
          'Mengantre',
          ?,
          ?,
          NOW(),
          NOW()
        )
      `,
        [
          pasien_id,
          dokter_id,
          nomorAntreanBaru,
          keluhan || null,
          tanggal_periksa,
        ]
      );

    return res.status(201).json({
      success: true,
      message:
        "Pendaftaran berhasil",
      data: {
        pendaftaran_id:
          insertResult.insertId,
        nomor_antrean:
          nomorAntreanBaru,
        status: "Mengantre",
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Terjadi kesalahan server",
    });
  }
};

// ======================================================
// RIWAYAT PENDAFTARAN PASIEN
// ======================================================
exports.getPendaftaranSaya =
  async (req, res) => {
    try {
      const pasien_id =
        req.user.id;

      const [results] =
        await db.query(
          `
        SELECT
          p.id,
          p.nomor_antrean,
          p.status,
          p.keluhan,
          p.tanggal_periksa,
          u.nama_lengkap
            AS nama_dokter
        FROM pendaftaran p

        JOIN users u
          ON p.dokter_id = u.id

        WHERE p.pasien_id = ?

        ORDER BY
          p.tanggal_periksa DESC
      `,
          [pasien_id]
        );

      return res.status(200).json({
        success: true,
        count: results.length,
        data: results,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Gagal mengambil riwayat pendaftaran",
      });
    }
  };

// ======================================================
// RIWAYAT REKAM MEDIS PASIEN
// ======================================================
exports.getRiwayatMedisPasien =
  async (req, res) => {
    try {
      const pasien_id =
        req.user.id;

      const [results] =
        await db.query(
          `
        SELECT
          rm.id
            AS rekam_medis_id,
          rm.keluhan,
          rm.diagnosis,
          rm.tindakan,
          rm.created_at
            AS tanggal_periksa,

          ud.nama_lengkap
            AS nama_dokter,

          pd.spesialisasi,

          r.id
            AS resep_id,

          r.catatan
            AS catatan_resep,

          r.status
            AS status_resep,

          GROUP_CONCAT(
            CONCAT(
              o.nama,
              ' (',
              rd.dosis,
              ', ',
              rd.aturan_pakai,
              ')'
            )
            SEPARATOR '|'
          ) AS daftar_obat

        FROM rekam_medis rm

        JOIN users ud
          ON rm.dokter_id = ud.id

        LEFT JOIN profil_dokter pd
          ON ud.id = pd.user_id

        LEFT JOIN resep r
          ON rm.id =
             r.rekam_medis_id

        LEFT JOIN resep_detail rd
          ON r.id =
             rd.resep_id

        LEFT JOIN obat o
          ON rd.obat_id =
             o.id

        WHERE rm.pasien_id = ?

        GROUP BY
          rm.id,
          rm.keluhan,
          rm.diagnosis,
          rm.tindakan,
          rm.created_at,
          ud.nama_lengkap,
          pd.spesialisasi,
          r.id,
          r.catatan,
          r.status

        ORDER BY
          rm.created_at DESC
      `,
          [pasien_id]
        );

      return res.status(200).json({
        success: true,
        count: results.length,
        data: results,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Gagal mengambil riwayat medis",
      });
    }
  };