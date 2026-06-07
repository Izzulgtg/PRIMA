const db = require("../config/db");

// ======================================================
// DASHBOARD PASIEN
// ======================================================
exports.getDashboard =
  async (req, res) => {
    try {
      const pasienId =
        req.user.id;

      const [appointments] =
        await db.query(
          `
        SELECT COUNT(*) total
        FROM pendaftaran
        WHERE pasien_id = ?
      `,
          [pasienId]
        );

      const [records] =
        await db.query(
          `
        SELECT COUNT(*) total
        FROM rekam_medis
        WHERE pasien_id = ?
      `,
          [pasienId]
        );

      const [upcoming] =
        await db.query(
          `
        SELECT
          p.nomor_antrian,
          js.tanggal,
          js.jam_mulai,
          u.nama_lengkap
            AS nama_dokter

        FROM pendaftaran p

        JOIN jadwal_slots js
          ON p.slot_id = js.id

        JOIN users u
          ON p.dokter_id = u.id

        WHERE p.pasien_id = ?
          AND (
            js.tanggal > CURDATE()
            OR (
              js.tanggal = CURDATE()
              AND js.jam_mulai >= CURTIME()
            )
          )

        ORDER BY js.tanggal ASC
        LIMIT 1
      `,
          [pasienId]
        );

      return res.status(200).json({
        success: true,
        data: {
          total_pendaftaran:
            appointments[0].total,

          total_rekam_medis:
            records[0].total,

          upcoming:
            upcoming[0] || null,
        },
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
      });
    }
  };

// ======================================================
// PROFILE PASIEN
// ======================================================
exports.getProfilePasien = async (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
      SELECT
        u.id,
        u.nama_lengkap,
        u.email,
        u.nomor_hp,
        u.role,
        u.last_login_at,

        p.nik,
        p.tanggal_lahir,
        p.jenis_kelamin,
        p.golongan_darah,
        p.alamat,
        p.nomor_bpjs,
        p.faskes_bpjs,
        p.kelas_bpjs,
        p.tinggi_badan,
        p.berat_badan,
        p.tekanan_darah,
        p.riwayat_alergi,
        p.riwayat_penyakit,
        p.obat_rutin

      FROM users u
      LEFT JOIN profil_pasien p
        ON u.id = p.user_id

      WHERE u.id = ?
        AND u.deleted_at IS NULL
    `;

    const [rows] = await db.query(
      query,
      [userId]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Profil tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil profil",
    });
  }
};
// ======================================================
// UPDATE PROFILE PASIEN
// ======================================================
exports.updateProfilePasien =
  async (req, res) => {
    try {
      const userId =
        req.user.id;

      const {
        nama_lengkap,
        nomor_hp,

        nik,
        tanggal_lahir,
        jenis_kelamin,

        golongan_darah,
        alamat,

        nomor_bpjs,
        faskes_bpjs,
        kelas_bpjs,

        tinggi_badan,
        berat_badan,
        tekanan_darah,

        riwayat_alergi,
        riwayat_penyakit,
        obat_rutin,
      } = req.body;

      await db.query(
        `
        UPDATE users
        SET
          nama_lengkap = ?,
          nomor_hp = ?
        WHERE id = ?
      `,
        [
          nama_lengkap,
          nomor_hp,
          userId,
        ]
      );

      await db.query(
        `
        UPDATE profil_pasien
        SET
          nik = ?,
          tanggal_lahir = ?,
          jenis_kelamin = ?,

          golongan_darah = ?,
          alamat = ?,

          nomor_bpjs = ?,
          faskes_bpjs = ?,
          kelas_bpjs = ?,

          tinggi_badan = ?,
          berat_badan = ?,
          tekanan_darah = ?,

          riwayat_alergi = ?,
          riwayat_penyakit = ?,
          obat_rutin = ?

        WHERE user_id = ?
      `,
        [
          nik,
          tanggal_lahir,
          jenis_kelamin,

          golongan_darah,
          alamat,

          nomor_bpjs,
          faskes_bpjs,
          kelas_bpjs,

          tinggi_badan,
          berat_badan,
          tekanan_darah,

          riwayat_alergi,
          riwayat_penyakit,
          obat_rutin,

          userId,
        ]
      );

      return res.status(200).json({
        success: true,
        message:
          "Profil berhasil diperbarui",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
      });
    }
  };

// ======================================================
// PENDAFTARAN BEROBAT
// ======================================================
exports.buatPendaftaran = async (req, res) => {
  const {
    dokter_id,
    slot_id,
    jenis_kunjungan,
    keluhan_utama,
    durasi_keluhan,
    metode_bayar,
  } = req.body;

  const pasien_id = req.user.id;

  if (
    !dokter_id ||
    !slot_id ||
    !jenis_kunjungan
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Dokter, slot dan jenis kunjungan wajib dipilih",
    });
  }

  try {
    const [slot] = await db.query(
      `
      SELECT *
      FROM jadwal_slots
      WHERE id = ?
      AND status = 'buka'
      `,
      [slot_id]
    );

    if (!slot.length) {
      return res.status(404).json({
        success: false,
        message:
          "Slot jadwal tidak ditemukan",
      });
    }

    const [queue] =
      await db.query(
        `
        SELECT COUNT(*) total
        FROM pendaftaran
        WHERE slot_id = ?
          AND status != 'Dibatalkan'
      `,
        [slot_id]
      );

    if (
      queue[0].total >=
      slot[0].kuota
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Kuota slot sudah penuh",
      });
    }

    const nomorAntrean =
      `A-${queue[0].total + 1}`;

    const [result] = await db.query(
      `
      INSERT INTO pendaftaran
      (
        pasien_id,
        dokter_id,
        slot_id,
        nomor_antrian,
        jenis_kunjungan,
        keluhan_utama,
        durasi_keluhan,
        metode_bayar
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        pasien_id,
        dokter_id,
        slot_id,
        nomorAntrean,
        jenis_kunjungan,
        keluhan_utama || null,
        durasi_keluhan || null,
        metode_bayar || "umum",
      ]
    );

    return res.status(201).json({
      success: true,
      message:
        "Pendaftaran berhasil",
      data: {
        pendaftaran_id:
          result.insertId,
        nomor_antrian:
          nomorAntrean,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Gagal melakukan pendaftaran",
    });
  }
};

// ======================================================
// RIWAYAT PENDAFTARAN PASIEN
// ======================================================
exports.getPendaftaranSaya =
  async (req, res) => {
    try {
      const pasienId =
        req.user.id;

      const query = `
      SELECT
        p.id,
        p.nomor_antrian,
        p.status,
        p.jenis_kunjungan,
        p.keluhan_utama,

        js.tanggal,
        js.jam_mulai,
        js.jam_selesai,

        u.nama_lengkap
          AS nama_dokter

      FROM pendaftaran p

      JOIN jadwal_slots js
        ON p.slot_id = js.id

      JOIN users u
        ON p.dokter_id = u.id

      WHERE p.pasien_id = ?

      ORDER BY js.tanggal DESC
      `;

      const [rows] =
        await db.query(
          query,
          [pasienId]
        );

      return res.status(200).json({
        success: true,
        data: rows,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Gagal mengambil data pendaftaran",
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

// ======================================================
// MENDAPATKAN APPOINTMENT YANG AKAN DATANG
// ======================================================
exports.getUpcomingAppointment =
  async (req, res) => {
    try {
      const pasienId =
        req.user.id;

      const query = `
        SELECT
          p.id,
          p.nomor_antrian,
          p.status,
          p.jenis_kunjungan,

          js.tanggal,
          js.jam_mulai,
          js.jam_selesai,

          u.nama_lengkap
            AS nama_dokter

        FROM pendaftaran p

        JOIN jadwal_slots js
          ON p.slot_id = js.id

        JOIN users u
          ON p.dokter_id = u.id

        WHERE p.pasien_id = ?
          AND (
            js.tanggal > CURDATE()
            OR (
              js.tanggal = CURDATE()
              AND js.jam_mulai >= CURTIME()
            )
          )
          AND p.status NOT IN
          ('Selesai','Dibatalkan')

        ORDER BY
          js.tanggal ASC,
          js.jam_mulai ASC

        LIMIT 1
      `;

      const [rows] =
        await db.query(
          query,
          [pasienId]
        );

      return res.json({
        success: true,
        data: rows[0] || null,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
      });
    }
  };

// ======================================================
// MEMBATALKAN APPOINTMENT
// ======================================================
exports.cancelAppointment =
  async (req, res) => {
    try {
      const { id } = req.params;

      const pasienId =
        req.user.id;

      const [result] =
        await db.query(
          `
          UPDATE pendaftaran
          SET status =
            'Dibatalkan'
          WHERE id = ?
            AND pasien_id = ?
            AND status NOT IN
            ('Selesai')
        `,
          [id, pasienId]
        );

      if (
        result.affectedRows === 0
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Appointment tidak ditemukan",
        });
      }

      return res.json({
        success: true,
        message:
          "Appointment berhasil dibatalkan",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
      });
    }
  };

// ======================================================
// LIST DOKTER
// ======================================================
exports.getDokterList = async (
  req,
  res
) => {
  try {
    const [rows] =
      await db.query(`
        SELECT
          u.id,
          u.nama_lengkap,
          pd.spesialisasi

        FROM users u

        JOIN profil_dokter pd
          ON u.id = pd.user_id

        WHERE u.role = 'dokter'
          AND u.is_active = 1
          AND u.deleted_at IS NULL

        ORDER BY
          u.nama_lengkap ASC
      `);

    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Gagal mengambil data dokter",
    });
  }
};

// ======================================================
// SLOTS DOKTER
// ======================================================
exports.getDokterSlots =
  async (req, res) => {
    try {
      const dokterId =
        req.params.id;

      const [rows] =
        await db.query(
          `
          SELECT
            id,
            tanggal,
            jam_mulai,
            jam_selesai,
            kuota,
            status

          FROM jadwal_slots

          WHERE dokter_id = ?
            AND tanggal >= CURDATE()
            AND status = 'buka'

          ORDER BY
            tanggal ASC,
            jam_mulai ASC
        `,
          [dokterId]
        );

      return res.status(200).json({
        success: true,
        data: rows,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Gagal mengambil slot dokter",
      });
    }
  };