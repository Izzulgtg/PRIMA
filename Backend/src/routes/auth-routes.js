const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");

const verifyToken = require("../middlewares/auth-middleware");
const requireRole = require("../middlewares/role-middleware");

// Public Routes
router.post("/register-pasien",authController.registerPasien);
router.post("/login",authController.login);
// Profile Routes
router.get("/me",verifyToken,authController.getProfilSaya);
router.put("/me",verifyToken,authController.updateProfilSaya);
// Admin Only
router.delete("/users/:id",verifyToken,requireRole("admin"),authController.softDeleteUser);

module.exports = router;