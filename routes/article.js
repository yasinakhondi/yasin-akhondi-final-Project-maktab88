const express = require("express");
const router = express.Router();
const { validateArticles } = require("../middlewares/newArticle_valid");
const { articleTumbnailUpload } = require("../utils/multer-settings");
const {
  getArticlePage,
  createNewArticle,
  readArticle,
  updateArticle,
  deleteArticle,
  getAllArticle,
  readArticleExplore,
  readComments,
} = require("../controllers/article_controller");

// get myArticlespage
router.get("/myArticlespage", getArticlePage);

// creat new articles
router.post(
  "/createNewArticle",
  articleTumbnailUpload.fields([{ name: "thumbnail" }, { name: "images" }]),
  validateArticles,
  createNewArticle
);

// read article
router.get("/readArticle/:articleId", readArticle);

// updating article
router.post(
  "/updateArticle/:articleId",
  articleTumbnailUpload.fields([{ name: "thumbnail" }, { name: "images" }]),
  updateArticle
);

// delet Article
router.get("/deleting/:articleId", deleteArticle);

// get all article in explorer
router.get("/getAllArticle", getAllArticle);

// read one article in explore
router.get("/readArticleExplore/:articleId", readArticleExplore);

// read comment
router.get("/readCm/:articleId", readComments);

module.exports = router;
