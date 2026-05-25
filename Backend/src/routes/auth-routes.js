const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const verifyToken = require('../middlewares/auth-middleware'); 
const requireRole = require('../middlewares/role-middleware');

router.post('/register-pasien', authController.registerPasien);
router.post('/login', authController.login);

router.get('/me', verifyToken, (req, res) => {
  res.json({ success: true, user_sekarang: req.user });
});

router.get('/admin-dashboard', verifyToken, requireRole('admin'), (req, res) => {
  res.json({ success: true, message: 'Selamat datang di area rahasia khusus ADMIN PRIMA!' });
});

router.get('/dokter-data', verifyToken, requireRole('dokter', 'admin'), (req, res) => {
  res.json({ success: true, message: 'Selamat datang di area rekam medis Dokter!' });
});

router.get('/profile', verifyToken, authController.getProfilSaya);
router.put('/profile', verifyToken, authController.updateProfilSaya);
router.delete('/users/:id', verifyToken, requireRole('admin'), authController.softDeleteUser);

module.exports = router;