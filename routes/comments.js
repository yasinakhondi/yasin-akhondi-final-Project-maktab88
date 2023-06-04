const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Articles = require("../models/Articles_models");
const Comment = require("../models/comment_models");

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

    res.render("Articles/oneArticle", {
      comments,
      Article,
      showUpdateDeleteButtons,
      loggedInUserUserName,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Read Comment errooooooooore!!!!!!!"));
  }
});

// creat comments
router.post("/creatCm/:articleId", async (req, res, next) => {
  try {
    const newCm = new Comment({
      content: req.body.content,
      author: req.session.user._id,
      article: req.params.articleId,
    });

    const newComment = await newCm.save();

    const Article = await Articles.findById(req.params.articleId);

    const comments = await Comment.find({
      article: req.params.articleId,
    }).populate("author");

    const loggedInUserId = req.session.user ? req.session.user._id : null;
    const showUpdateDeleteButtons = Article.author._id.equals(loggedInUserId);

    const loggedInUserUserName = req.session.user.userName;

    res.render("Articles/oneArticle", {
      comments,
      Article,
      showUpdateDeleteButtons,
      loggedInUserUserName,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "newComment errooooooooore!!!!!!!"));
  }
});

// updating comments
router.post("/updateCm/:commentId", async (req, res, next) => {
  try {
    const fields = {
      content: req.body.content,
    };

    const updateCm = await Comment.findByIdAndUpdate(
      req.params.commentId,
      fields,
      { new: true }
    );

    // todoo
    res.redirect(`http://localhost:3050/comment/readCm/${updateCm.article}`);
  } catch (error) {
    console.log(error);
    next(createError(500, "Updating Comment errooooooooore!!!!!!!"));
  }
});

// deleting comment
router.get("/:commentId", async (req, res, next) => {
  try {
    const deleting = await Comment.findByIdAndDelete(req.params.commentId);

    res.redirect(`http://localhost:3050/comment/readCm/${deleting.article}`);
  } catch (error) {
    console.log(error);
    next(createError(500, "deleting Comment errooooooooore!!!!!!!"));
  }
});

module.exports = router;
