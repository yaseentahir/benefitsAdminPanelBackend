const express = require("express");
const router = express.Router();

const controller = require("../controllers/companyLinksController");
const { upload } = require("../middlewares/icon-uploader");
const authenticate = require("../middlewares/authMiddleware");

// Route handler for the home page
router.get("/", controller.getAllLinks);
router.get("/internal", controller.getAllInternalLinks);
router.get("/:id", controller.getLink);
router.post("/", authenticate, upload, controller.postLink);
router.put("/:id", authenticate, upload, controller.putLink);
router.delete("/:id", authenticate, controller.deleteLink);

module.exports = router;
