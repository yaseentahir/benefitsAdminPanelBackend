const express = require("express");
const router = express.Router();

const controller = require("../controllers/claimsController");
const authenticate = require("../moddlewares/authMiddleware");

// Route handler for the home page
router.get("/", controller.getAllClaims);
router.get("/:id", controller.getClaim);
router.post("/", authenticate, controller.postClaim);
router.put("/:id", authenticate, controller.putClaim);
router.delete("/:id", authenticate, controller.deleteClaim);
// Export the router
module.exports = router;
