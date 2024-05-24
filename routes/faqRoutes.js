const express = require("express");
const router = express.Router();

const controller = require("../controllers/faqsController");
const authenticate = require("../middlewares/authMiddleware");

// Route handler for the home page
router.get("/", controller.getAllFaqs);
router.get("/:id", controller.getFaq);
router.post("/", authenticate, controller.postFaq);
router.put("/:id", authenticate, controller.putFaq);
router.delete("/:id", authenticate, controller.deleteFaq);
// Export the router
module.exports = router;
