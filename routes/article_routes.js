const express = require("express");
const router = express.Router();
const Articles = require("../models/Articles_models");
const createError = require("http-errors");
const { validateArticles } = require("../middlewares/newArticle_valid");
const { articleTumbnailUpload } = require("../utils/multer-settings");

// get myArticlespage
router.get("/myArticlespage", async (req, res, next) => {
  if (!req.session.user) return res.redirect("/users/login");
  const userArticles = await Articles.find({ user: req.session.user._id });
  res.render("Articles/myArticlespage.ejs", { data: userArticles });
});

// creat new articles
router.post(
  "/createNewArticle",
  articleTumbnailUpload.fields([{ name: "thumbnail" }, { name: "images" }]),
  validateArticles,
  async (req, res, next) => {
    try {
      const thumbnailA = req.files["thumbnail"][0].filename;
      const imagesA = req.files["images"][0].filename;

      const newArticle = new Articles({
        title: req.body.title,
        description: req.body.description,
        thumbnail: "/images/thumbnailPic/" + thumbnailA,
        images: "/images/imageArticle/" + imagesA,
        content: req.body.content,
        author: req.body.author,
        user: req.session.user._id,
      });

      if (!req.session.user) return res.redirect("/users/login");

      const creatArticle = await newArticle.save();
      req.session.Articles = creatArticle;

      res.redirect("/article/myArticlespage");
    } catch (error) {
      console.log(error);
      next(createError(500, "creat article errooooooooore!!!!!!!"));
    }
  }
);

// read article
router.get("/readArticle/:articleId", async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/users/login");

    const readArticle = await Articles.findById(req.params.articleId);

    res.render("Articles/oneArticle", { Article: readArticle });
  } catch (error) {
    console.log(error.message);
    next(createError(500, "read article errooooooooore!!!!!!!"));
  }
});

// updating article
router.post(
  "/updateArticle/:articleId",
  articleTumbnailUpload.fields([{ name: "thumbnail" }, { name: "images" }]),
  async (req, res, next) => {
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
  }
);

router.get("/deleting/:articleId", async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/users/login");

    const deleting = await Articles.findByIdAndDelete(req.params.articleId);

    res.redirect("/article/myArticlespage");
  } catch (error) {
    console.log(error.message);
    next(createError(500, "Update article errooooooooore!!!!!!!"));
  }
});

// router.get("/getAllArticle", async (req, res, next) => {
//   try {
//     const getAllArticle = await Articles.find({});
//     res.json(getAllArticle);
//   } catch (error) {
//     next(createError(500, "get article errooooooooore!!!!!!!"));
//   }
// });

module.exports = router;
