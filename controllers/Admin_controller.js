const createError = require("http-errors");
const User = require("../models/user_models");
const Comment = require("../models/comment_models");
const Articles = require("../models/Articles_models");

// get admin panel
const getAdminPanel = async (req, res, next) => {
  try {
    const Blogger = await User.find({ role: { $ne: "ADMIN" } });

    res.render("ADMIN/ADMIN_Panel", { Blogger });
  } catch (error) {
    console.log(error.message);
    next(createError(500, "ADMINPanel errooooooooore!!!!!!!"));
  }
};

// deleting blogger
const deletingBlooger = async (req, res, next) => {
  try {
    const deleting = await User.findByIdAndDelete(req.params.bloggerId);

    await Articles.deleteMany({
      user: req.params.bloggerId,
    });

    await Comment.deleteMany({
      author: req.params.bloggerId,
    });

    res.redirect("/ADMIN/ADMIN");
  } catch (error) {
    console.log(error.message);
    next(createError(500, "delet blogger admin errooooooooore!!!!!!!"));
  }
};

module.exports = { getAdminPanel, deletingBlooger };
