const express = require("express");
const router = express.Router();

const controller = require("../controllers/protectionFormController");

// Route handler for the home page
router.post("/", controller.postData);
router.get("/", controller.getAllProtectionForms);
router.delete("/:id", controller.deleteProtectionForm);
// Export the router
module.exports = router;
