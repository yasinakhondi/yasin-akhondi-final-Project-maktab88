const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Articles = require("../models/Articles_models");
const Comment = require("../models/comment_models");
const {
  readComment,
  updatingComment,
  deletingComment,
} = require("../controllers/comment_controller");

// creat comments
router.post("/creatCm/:articleId", readComment);

// updating comments
router.post("/updateCm/:commentId", updatingComment);

// deleting comment
router.get("/:commentId", deletingComment);

module.exports = router;
