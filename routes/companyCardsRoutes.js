const express = require("express");
const router = express.Router();

const controller = require("../controllers/companyCardsController");
const { upload } = require("../moddlewares/icon-uploader");
const authenticate = require("../moddlewares/authMiddleware");

// Route handler for the home page
router.get("/", controller.getAllCompanyCards);
router.get("/:id", controller.getCompanyCard);
router.post("/", authenticate, upload, controller.postCompanyCard);
router.put("/:id", authenticate, upload, controller.putCompanyCard);
router.delete("/:id", authenticate, controller.deleteCompanyCard);
// Export the router
module.exports = router;
