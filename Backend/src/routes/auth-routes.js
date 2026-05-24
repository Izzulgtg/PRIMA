const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const verifyToken = require('../middlewares/auth-middleware'); 
const requireRole = require('../middlewares/role-middleware'); // <-- 1. Import Role Guard baru kita

// --- RUTE UMUM ---
router.post('/register-pasien', authController.registerPasien);
router.post('/login', authController.login);

// --- RUTE PROTEKSI (Semua yang login boleh masuk) ---
router.get('/me', verifyToken, (req, res) => {
  res.json({ success: true, user_sekarang: req.user });
});

// --- RUTE KHUSUS ADMIN (Hanya akun role 'admin' yang bisa lewat) ---
router.get('/admin-dashboard', verifyToken, requireRole('admin'), (req, res) => {
  res.json({ success: true, message: 'Selamat datang di area rahasia khusus ADMIN PRIMA!' });
});

// --- RUTE KHUSUS DOKTER atau ADMIN (Dokter dan Admin bisa lewat, Pasien diblokir) ---
router.get('/dokter-data', verifyToken, requireRole('dokter', 'admin'), (req, res) => {
  res.json({ success: true, message: 'Selamat datang di area rekam medis Dokter!' });
});

// --- RUTE MANAJEMEN PROFIL (Wajib Login) ---
// Mengambil profil user yang sedang login: GET http://localhost:5000/api/auth/profile
router.get('/profile', verifyToken, authController.getProfilSaya);

// Mengupdate profil user yang sedang login: PUT http://localhost:5000/api/auth/profile
router.put('/profile', verifyToken, authController.updateProfilSaya);

// Rute Soft Delete: DELETE http://localhost:5000/api/auth/users/[:id]
router.delete('/users/:id', verifyToken, requireRole('admin'), authController.softDeleteUser);

module.exports = router;