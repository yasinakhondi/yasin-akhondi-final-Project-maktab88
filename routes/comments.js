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

// read comment
router.get("/readCm/:articleId", async (req, res, next) => {
  try {
    const Article = await Articles.findById(req.params.articleId);

    const comments = await Comment.find({
      article: req.params.articleId,
    }).populate({ path: "author", select: "userName avatar " });

    const loggedInUserId = req.session.user ? req.session.user._id : null;
    const showUpdateDeleteButtons = Article.author._id.equals(loggedInUserId);

    const loggedInUserUserName = req.session.user.userName;

    const userIsAdmin = req.session.user.role === "ADMIN";

    res.render("Articles/oneArticle", {
      comments,
      Article,
      showUpdateDeleteButtons,
      loggedInUserUserName,
      userIsAdmin,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Read Comment errooooooooore!!!!!!!"));
  }
});

// creat comments
router.post("/creatCm/:articleId", readComment);

// updating comments
router.post("/updateCm/:commentId", updatingComment);

// deleting comment
router.get("/:commentId", deletingComment);

module.exports = router;
