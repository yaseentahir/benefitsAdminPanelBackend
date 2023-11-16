const express = require("express");
const router = express.Router();

const controller = require("../controllers/claimCategoryController");

router.post("/", controller.postCategory);
router.get("/", controller.getAllCategories);
router.delete("/:id", controller.deleteCategory);

module.exports = router;
