const express = require("express");
const router = express.Router();

const pasienController = require("../controllers/pasien-controller");

const verifyToken = require("../middlewares/auth-middleware");
const requireRole = require("../middlewares/role-middleware");

// Semua endpoint pasien wajib login
router.use(verifyToken,requireRole("pasien"));

// Dashboard
router.get("/dashboard",pasienController.getDashboard);

// Profile
router.get("/profile",pasienController.getProfilePasien);

router.put("/profile",pasienController.updateProfilePasien);

router.put("/security/change-password",pasienController.changePassword);

// Appointment
router.post("/daftar",pasienController.buatPendaftaran);

router.get("/pendaftaran",pasienController.getPendaftaranSaya);

router.get("/pendaftaran/upcoming",pasienController.getUpcomingAppointment);

router.put("/pendaftaran/:id/cancel",pasienController.cancelAppointment);

// Rekam Medis
router.get("/riwayat",pasienController.getRiwayatMedisPasien);

// Dokter & Jadwal
router.get("/dokter",pasienController.getDokterList);

router.get("/dokter/:id/slots",pasienController.getDokterSlots);

module.exports = router;