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
    }).populate({ path: "author", select: "userName avatar" });

    res.render("Articles/oneArticle", { comments, Article });
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

    res.render("Articles/oneArticle", { comments, Article });
  } catch (error) {
    console.log(error);
    next(createError(500, "newComment errooooooooore!!!!!!!"));
  }
});

module.exports = router;
