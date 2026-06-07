const express = require("express");
const router = express.Router();

const pasienController = require("../controllers/pasien-controller");

const verifyToken = require("../middlewares/auth-middleware");
const requireRole = require("../middlewares/role-middleware");

router.use(
  verifyToken,
  requireRole("pasien")
);

// Dashboard
router.get(
  "/dashboard",
  pasienController.getDashboard
);

// Pendaftaran Berobat
router.post(
  "/daftar",
  pasienController.buatPendaftaran
);

// Riwayat Pendaftaran
router.get(
  "/pendaftaran",
  pasienController.getPendaftaranSaya
);

// Riwayat Rekam Medis
router.get(
  "/riwayat",
  pasienController.getRiwayatMedisPasien
);

module.exports = router;