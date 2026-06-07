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
router.post(
  "/users",
  adminController.createUser
);    
router.get(
  "/dashboard-stats",
  adminController.getDashboardStats
);
router.get(
  "/users",
  adminController.getAllUsers
);

module.exports = router;