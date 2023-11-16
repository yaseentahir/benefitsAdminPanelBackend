const express = require("express");
const router = express.Router();

const { upload } = require("../moddlewares/icon-uploader");

const controller = require("../controllers/mailerController");

// Route handler for the home page
router.post("/", upload, controller.sendMessage);
router.post("/contact", controller.sendContactForm);
router.post("/identity", controller.sendIdentityForm);

module.exports = router;
