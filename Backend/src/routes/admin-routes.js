const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');
const verifyToken = require('../middlewares/auth-middleware');
const requireRole = require('../middlewares/role-middleware');

router.use(verifyToken, requireRole('admin'));

// Route CRUD Dokter
router.post('/dokter', adminController.createDokter);
router.get('/dokter', adminController.getAllDokter);
router.put('/dokter/:id', adminController.updateDokter);
router.delete('/dokter/:id', adminController.softDeleteDokter);

module.exports = router;