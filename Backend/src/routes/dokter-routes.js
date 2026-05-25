const express = require('express');
const router = express.Router();
const dokterController = require('../controllers/dokter-controller');
const verifyToken = require('../middlewares/auth-middleware');
const requireRole = require('../middlewares/role-middleware');

// Seluruh rute di bawah ini wajib LOGIN dan wajib memiliki role DOKTER
router.use(verifyToken, requireRole('dokter'));

// Rute manajemen obat (Murni dikelola oleh Dokter)
router.post('/obat', dokterController.createObat);
router.get('/obat', dokterController.getAllObat);
router.put('/obat/:id', dokterController.updateObat);
router.delete('/obat/:id', dokterController.softDeleteObat);

// Rute Manajemen Rekam Medis (EHR)
router.post('/rekam-medis', dokterController.createRekamMedis);

// Rute Manajemen Antrean Poliklinik
router.get('/antrean/:dokter_id', dokterController.getAntreanDokter);
router.put('/antrean/:pendaftaran_id/status', dokterController.updateStatusAntrean);

module.exports = router;