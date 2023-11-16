const express = require("express");
const router = express.Router();

// Route handler for the home page
router.get("/", (req, res) => {
  res.send("Search");
});

// Export the router
module.exports = router;
