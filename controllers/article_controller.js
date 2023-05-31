const express = require("express");
const Articles = require("../models/Articles_models");
const createError = require("http-errors");

// getArticlePage
const getArticlePage = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/users/login");

    const userArticles = await Articles.find({
      user: req.session.user._id,
    }).populate({ path: "author", select: "userName" });

    res.render("Articles/myArticlespage.ejs", { data: userArticles });
  } catch (error) {
    console.log(error);
    next(createError(500, "creat article errooooooooore!!!!!!!"));
  }
};

// creat new articles
const createNewArticle = async (req, res, next) => {
  try {
    const thumbnailA = req.files["thumbnail"][0].filename;
    const imagesA = req.files["images"][0].filename;

    const newArticle = new Articles({
      title: req.body.title,
      description: req.body.description,
      thumbnail: "/images/thumbnailPic/" + thumbnailA,
      images: "/images/imageArticle/" + imagesA,
      content: req.body.content,
      author: req.session.user._id,
      user: req.session.user._id,
    });

    if (!req.session.user) return res.redirect("/users/login");

    const creatArticle = await newArticle.save();

    res.redirect("/article/myArticlespage");
  } catch (error) {
    console.log(error);
    next(createError(500, "creat article errooooooooore!!!!!!!"));
  }
};

// read article
const readArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/users/login");

    const readArticle = await Articles.findById(req.params.articleId);

    res.render("Articles/oneArticle", { Article: readArticle });
  } catch (error) {
    console.log(error.message);
    next(createError(500, "read article errooooooooore!!!!!!!"));
  }
};

// updating article
const updateArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/users/login");

    const ress = await Articles.findById(req.params.articleId);

    const fieldsss = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      author: req.body.author,

      thumbnail: req.files["thumbnail"]
        ? "/images/thumbnailPic/" + req.files["thumbnail"][0].filename
        : ress.thumbnail,

      images: req.files["images"]
        ? "/images/imageArticle/" + req.files["images"][0].filename
        : ress.images,
    };

    const updateArticle = await Articles.findByIdAndUpdate(
      req.params.articleId,
      fieldsss,
      {
        new: true,
      }
    );

    res.render("Articles/oneArticle", { Article: updateArticle });
  } catch (error) {
    console.log(error.message);
    next(createError(500, "Update article errooooooooore!!!!!!!"));
  }
};

// delet Article
const deleteArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/users/login");

    const deleting = await Articles.findByIdAndDelete(req.params.articleId);

    res.redirect("/article/myArticlespage");
  } catch (error) {
    console.log(error.message);
    next(createError(500, "Update article errooooooooore!!!!!!!"));
  }
};

const getAllArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/users/login");

    const getAllArticle = await Articles.find({}).populate({
      path: "author",
      select: "userName",
    });

    res.render("Articles/exploreArticle.ejs", { data: getAllArticle });
  } catch (error) {
    next(createError(500, "get article errooooooooore!!!!!!!"));
  }
};

// read article
const readArticleExplore = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/users/login");

    const readArticle = await Articles.findById(req.params.articleId).populate({
      path: "author",
      select: "userName",
    });

    res.render("Articles/oneArticleExplore", { Article: readArticle });
  } catch (error) {
    console.log(error.message);
    next(createError(500, "read article errooooooooore!!!!!!!"));
  }
};

module.exports = {
  getArticlePage,
  createNewArticle,
  readArticle,
  updateArticle,
  deleteArticle,
  getAllArticle,
  readArticleExplore,
};
