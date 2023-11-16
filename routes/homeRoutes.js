const express = require("express");
const router = express.Router();
const controller = require("../controllers/homeController");
const { uploadSingle } = require("../moddlewares/s3Middlware");

const { upload } = require("../moddlewares/icon-uploader");
const authenticate = require("../moddlewares/authMiddleware");

router.get("/", controller.getAllHomeCards);
router.post("/", authenticate, upload, controller.postHomeCard);
router.delete("/:id", authenticate, controller.deleteHomeCard);
router.put("/:id", authenticate, upload, controller.putHomeCard);
// Export the router
module.exports = router;
