const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const verifyToken = require('../middlewares/auth-middleware'); // 1. Import middleware satpam kita

// Rute umum (siapa saja boleh akses tanpa token)
router.post('/register-pasien', authController.registerPasien);
router.post('/login', authController.login);

// Rute RAHASIA (wajib menyertakan token JWT untuk bisa lewat)
// Perhatikan letak 'verifyToken' disisipkan di tengah-tengah sebelum response dijalankan
router.get('/me', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Kamu berhasil mengakses rute rahasia!',
    user_sekarang: req.user // Menampilkan data user yang didekripsi dari token JWT tadi
  });
});

// Taruh di bawah rute router.get('/me', verifyToken, ...)
router.post('/logout', verifyToken, authController.logout);

module.exports = router;