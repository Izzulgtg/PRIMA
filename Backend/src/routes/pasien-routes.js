const express = require("express");
const router = express.Router();

const pasienController = require("../controllers/pasien-controller");

const verifyToken = require("../middlewares/auth-middleware");
const requireRole = require("../middlewares/role-middleware");

router.use(
  verifyToken,
  requireRole("pasien")
);

router.get(
  "/dashboard",
  pasienController.getDashboard
);

router.get(
  "/profile",
  pasienController.getProfilePasien
);

router.post(
  "/daftar",
  pasienController.buatPendaftaran
);

router.get(
  "/pendaftaran",
  pasienController.getPendaftaranSaya
);

router.get(
  "/riwayat",
  pasienController.getRiwayatMedisPasien
);

module.exports = router;