const express = require('express');
const router = express.Router();
const dokterController = require('../controllers/dokter-controller');
const verifyToken = require('../middlewares/auth-middleware');
const requireRole = require('../middlewares/role-middleware');

router.use(verifyToken, requireRole('dokter'));

router.post('/obat', dokterController.createObat);
router.get('/obat', dokterController.getAllObat);
router.put('/obat/:id', dokterController.updateObat);
router.delete('/obat/:id', dokterController.softDeleteObat);

router.post('/rekam-medis', dokterController.createRekamMedis);

router.get('/antrean/:dokter_id', dokterController.getAntreanDokter);
router.put('/antrean/:pendaftaran_id/status', dokterController.updateStatusAntrean);

router.get('/pasien', dokterController.getDaftarPasienForDokter);
router.get('/pasien/:id', dokterController.getDetailPasienForDokter);
router.get('/profil/:id', dokterController.getProfilDokter);

module.exports = router;