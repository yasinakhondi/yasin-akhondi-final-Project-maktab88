const createError = require("http-errors");
const Articles = require("../models/Articles_models");
const Comment = require("../models/comment_models");

// creat comments
const readComment = async (req, res, next) => {
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
    next(createError(500, "newComment errooooooooore!!!!!!!"));
  }
};

// updating comments
const updatingComment = async (req, res, next) => {
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
};

// deleting comment
const deletingComment = async (req, res, next) => {
  try {
    const deleting = await Comment.findByIdAndDelete(req.params.commentId);

    res.redirect(`http://localhost:3050/comment/readCm/${deleting.article}`);
  } catch (error) {
    console.log(error);
    next(createError(500, "deleting Comment errooooooooore!!!!!!!"));
  }
};

module.exports = { readComment, updatingComment, deletingComment };
