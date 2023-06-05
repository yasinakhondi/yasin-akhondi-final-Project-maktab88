const express = require("express");
const router = express.Router();
const {
  getAdminPanel,
  deletingBlooger,
} = require("../controllers/Admin_controller");

// get admin panel
router.get("/ADMIN", getAdminPanel);

// deleting blogger
router.get("/DeleteBlogger/:bloggerId", deletingBlooger);

module.exports = router;
