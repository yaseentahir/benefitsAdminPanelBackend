const express = require("express");
const router = express.Router();

const controller = require("../controllers/contactFormController");

// Route handler for the home page
router.post("/", controller.postData);
router.get("/", controller.getAllContacts);
router.delete("/:id", controller.deleteContact);
// Export the router
module.exports = router;
