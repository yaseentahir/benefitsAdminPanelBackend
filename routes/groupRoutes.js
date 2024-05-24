const express = require("express");
const router = express.Router();

const controller = require("../controllers/groupController");
const authenticate = require("../middlewares/authMiddleware");

// Route handler for the home page
router.get("/", controller.getAllGroups);
router.get("/:id", controller.getGroup);
router.post("/", authenticate, controller.postGroup);
router.put("/:id", authenticate, controller.putGroup);
router.delete("/:id", authenticate, controller.deleteGroup);
// Export the router
module.exports = router;
