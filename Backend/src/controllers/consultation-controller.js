const db = require("../config/db");

// =========================================================================
// GET QUEUE PASIEN
// =========================================================================

exports.getQueue = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `
      SELECT
      k.id,
      k.status,

      p.nomor_antrian,

      u.nama_lengkap AS dokter_nama,

      js.tanggal,
      js.jam_mulai,
      js.jam_selesai
      FROM konsultasi k
      JOIN pendaftaran p
        ON p.id = k.pendaftaran_id

      JOIN jadwal_slots js
        ON js.id = p.slot_id

      JOIN users u
        ON u.id = k.dokter_id
      WHERE k.pasien_id = ?
      AND k.deleted_at IS NULL
      ORDER BY k.created_at DESC
      LIMIT 1
      `,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Konsultasi tidak ditemukan",
      });
    }

    return res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil antrean",
    });
  }
};

// =========================================================================
// GET QUEUE DOKTER
// =========================================================================

exports.getDoctorQueue =
  async (req, res) => {
    try {
      const doctorId =
        req.user.id;

      const [rows] =
        await db.query(
          `
          SELECT
            k.id,
            k.status,
            p.nomor_antrian,
            up.nama_lengkap
              AS pasien_nama
          FROM konsultasi k
          JOIN pendaftaran p
            ON p.id =
              k.pendaftaran_id
          JOIN users up
            ON up.id =
              k.pasien_id
          WHERE k.dokter_id = ?
          ORDER BY
            k.created_at ASC
          `,
          [doctorId]
        );

      return res.json({
        success: true,
        data: rows,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Gagal mengambil antrean dokter",
      });
    }
  };

// =========================================================================
// DETAIL KONSULTASI
// =========================================================================

exports.getSessionDetail = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT
      k.*,

      ud.nama_lengkap
        AS dokter_nama,

      up.nama_lengkap
        AS pasien_nama

    FROM konsultasi k

    JOIN users ud
      ON ud.id =
        k.dokter_id

    JOIN users up
      ON up.id =
        k.pasien_id

    WHERE k.id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Konsultasi tidak ditemukan",
      });
    }

    return res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Gagal mengambil detail konsultasi",
    });
  }
};

// =========================================================================
// GET MESSAGES
// =========================================================================

exports.getMessages = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        pk.id,
        pk.isi,
        pk.created_at,
        pk.pengirim_id,
        u.nama_lengkap
      FROM pesan_konsultasi pk
      JOIN users u
        ON u.id = pk.pengirim_id
      WHERE pk.konsultasi_id = ?
      ORDER BY pk.created_at ASC
      `,
      [id]
    );

    return res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Gagal mengambil pesan",
    });
  }
};

// =========================================================================
// SEND MESSAGE
// =========================================================================

exports.sendMessage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { message } = req.body;

    const senderId =
      req.user.id;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Pesan tidak boleh kosong",
      });
    }

    await db.query(
      `
      INSERT INTO pesan_konsultasi
      (
        konsultasi_id,
        pengirim_id,
        isi
      )
      VALUES
      (?, ?, ?)
      `,
      [
        id,
        senderId,
        message,
      ]
    );

    return res.json({
      success: true,
      message:
        "Pesan berhasil dikirim",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Gagal mengirim pesan",
    });
  }
};

// =========================================================================
// FINISH CONSULTATION
// =========================================================================

exports.finishConsultation =
  async (req, res) => {
    try {
      const { id } = req.params;

      await db.query(
        `
        UPDATE konsultasi
        SET
          status = 'selesai',
          selesai_at = NOW()
        WHERE id = ?
        `,
        [id]
      );

      return res.json({
        success: true,
        message:
          "Konsultasi berhasil diselesaikan",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Gagal menyelesaikan konsultasi",
      });
    }
  };

const saveMedicalRecord =
  async (req, res) => {
    try {

      const { id } =
        req.params;

      const {
        subjective,
        objective,
        assessment,
        plan,
      } = req.body;

      const consultation =
        await ConsultationService.getConsultationById(
          id
        );

      if (!consultation) {
        return res
          .status(404)
          .json({
            message:
              "Konsultasi tidak ditemukan",
          });
      }

      const medicalRecord =
        await ConsultationService.createMedicalRecord({
          consultationId: id,
          patientId:
            consultation.pasien_id,
          doctorId:
            consultation.dokter_id,
          subjective,
          objective,
          assessment,
          plan,
        });

      return res
        .status(201)
        .json({
          message:
            "Rekam medis berhasil disimpan",
          data:
            medicalRecord,
        });

    } catch (error) {

      console.error(error);

      return res
        .status(500)
        .json({
          message:
            "Terjadi kesalahan server",
        });

    }
  };

const getPatientHistory =
  async (req, res) => {

    try {

      const {
        patientId,
      } = req.params;

      const history =
        await ConsultationService.getPatientHistory(
          patientId
        );

      return res.json(
        history
      );

    } catch (error) {

      console.error(error);

      return res
        .status(500)
        .json({
          message:
            "Terjadi kesalahan server",
        });

    }

  };

const savePrescription =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        medicines,
      } = req.body;

      const prescription =
        await ConsultationService.createPrescription({
          consultationId: id,
          medicines,
        });

      return res
        .status(201)
        .json({
          message:
            "Resep berhasil disimpan",
          data:
            prescription,
        });

    } catch (error) {

      console.error(error);

      return res
        .status(500)
        .json({
          message:
            "Terjadi kesalahan server",
        });

    }

  };

exports.startConsultation =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      await db.query(
        `
        UPDATE konsultasi
        SET
          status = 'berlangsung',
          mulai_at = NOW()
        WHERE id = ?
        `,
        [id]
      );

      return res.json({
        success: true,
        message:
          "Konsultasi dimulai",
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Gagal memulai konsultasi",
      });

    }

  };