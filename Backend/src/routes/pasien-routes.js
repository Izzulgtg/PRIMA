const express = require('express');
const router = express.Router();
const pasienController = require('../controllers/pasien-controller');
const verifyToken = require('../middlewares/auth-middleware');
const requireRole = require('../middlewares/role-middleware');

// Seluruh rute pasien wajib melampirkan Token dan memiliki role 'pasien'
router.use(verifyToken, requireRole('pasien'));

// Rute pendaftaran dan riwayat
router.post('/daftar', pasienController.buatPendaftaran);
router.get('/riwayat/:pasien_id', pasienController.getRiwayatMedisPasien);

module.exports = router;