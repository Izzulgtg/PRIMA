const express = require("express");
const router = express.Router();
const controller = require("../controllers/consultation-controller");
const verifyToken = require("../middlewares/auth-middleware");

router.use(verifyToken);

router.get("/queue",controller.getQueue);
router.get("/:id",controller.getSessionDetail);
router.get("/:id/messages",controller.getMessages);
router.post("/:id/messages",controller.sendMessage);

module.exports = router;