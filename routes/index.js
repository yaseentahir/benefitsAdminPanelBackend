const express = require("express");
const router = express.Router();

// Import individual route files
const userRoutes = require("./userRoutes");
const homeRoutes = require("./homeRoutes");
const companyCardRoutes = require("./companyCardsRoutes");
const companyLinksRoutes = require("./companyLinksRoutes");
const searchRoutes = require("./searchRoutes");
const faqRoutes = require("./faqRoutes");
const claimRoutes = require("./claimRoutes");
const groupRoutes = require("./groupRoutes");
const categoryRoutes = require("./categoryRoutes");
const protectionFormRoutes = require("./protectionFormRoutes");
const contactFormRoutes = require("./contactFormRoutes");
const mailRoutes = require("./mailerRoutes");
const authenticate = require("../middlewares/authMiddleware");
const errorHandler = require("../middlewares/errorMiddleware");
// Add more route files as needed

// Register routes
router.get("/", (req, res) => {
  res.status(200).send("You Have Reached the backend");
});

router.get("/session", authenticate, (req, res) => {
  res.status(200).send({
    error: false,
    data: "session is active",
  });
});

router.use("/", userRoutes);
router.use("/home", homeRoutes);
router.use("/company", companyCardRoutes);
router.use("/links", companyLinksRoutes);
router.use("/search", searchRoutes);
router.use("/faqs", faqRoutes);
router.use("/claims", claimRoutes);
router.use("/groups", groupRoutes);
router.use("/categories", categoryRoutes);
router.use("/protection", protectionFormRoutes);
router.use("/contact", contactFormRoutes);
router.use("/sendMail", mailRoutes);
// Register more routes as needed

router.use((req, res) => {
  res.status(404).send("404 Page Not Found");
});

// Export the router
module.exports = router;
