const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

// Endpoint untuk Register Pasien: POST http://localhost:5000/api/auth/register-pasien
router.post('/register-pasien', authController.registerPasien);

module.exports = router;