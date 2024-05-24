const express = require("express");
const router = express.Router();
const controller = require("../controllers/homeController");
const { uploadSingle } = require("../middlewares/s3Middlware");

const { upload } = require("../middlewares/icon-uploader");
const authenticate = require("../middlewares/authMiddleware");

router.get("/", controller.getAllHomeCards);
router.post("/", authenticate, upload, controller.postHomeCard);
router.delete("/:id", authenticate, controller.deleteHomeCard);
router.put("/:id", authenticate, upload, controller.putHomeCard);
// Export the router
module.exports = router;
