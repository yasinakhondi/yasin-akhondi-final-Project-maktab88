const user = require("../models/user_models");
const createError = require("http-errors");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs/promises");
const Comment = require("../models/comment_models");
const Articles = require("../models/Articles_models");

const { userAvatarUpload } = require("../utils/multer-settings");

// signUp user

const getSignUp = async (req, res, next) => {
  try {
    if (req.session.user) return res.redirect("/users/profile");
    res.render("signUp", { msg: null });
  } catch (error) {
    res.render("error", { message: "Server Error creat" });
  }
};

const postSignUp = async (req, res, next) => {
  try {
    const findeee = await user.exists({
      userName: req.body.userName,
    });
    if (findeee)
      return res.render("signUp", {
        msg: " this username exists!!!!",
      });
    // console.log(findeee);

    const newuser = new user({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      userName: req.body.userName,
      password: req.body.password,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
    });

    const getUser = await newuser.save();
    res.redirect("/users/login");
  } catch (error) {
    next(createError(400, "server errore creat", error.message));
  }
};

// login user
const getLogin = async (req, res, next) => {
  try {
    if (req.session.user) return res.redirect("/users/profile");

    res.render("login", { msg: null });
  } catch (error) {
    res.render("error", { message: "Server Error loginPage!" });
  }
};

const postLogin = async (req, res, next) => {
  try {
    const { password } = req.body;

    const userData = await user.findOne({ userName: req.body.userName });
    if (!userData)
      return res.render("login", {
        msg: "cant finde userName!",
      });

    const isPasswordMatch = await userData.comparePassword(password);
    if (!isPasswordMatch)
      return res.render("login", {
        msg: "cant finde password!",
      });

    req.session.user = userData;

    res.redirect("/users/profile");
  } catch (error) {
    console.log(error.message);
    res.render("error", { message: "Server Error loginPage!" });
  }
};

// profile user
const getProfile = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/users/login");

    const isAdmin = req.session.user.role === "ADMIN";

    console.log("isAdmin: ", isAdmin);

    res.render("profile", { user: req.session.user, isAdmin });
  } catch (error) {
    console.log(error);
    res.render("error", { message: "Server Error profilePage!" });
  }
};

const logOut = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/users/login");

    req.session.destroy();
    res.redirect("/users/login");
  } catch (error) {
    res.render("error", { message: "Server Error logout!" });
  }
};

//updating

const updateProfile = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/users/login");

    const fields = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      userName: req.body.userName,
      password: req.body.password,
      gender: req.body.gender,
    };

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      fields.password = await bcrypt.hash(req.body.password, salt);
    } else {
      fields.password = req.session.user.password;
    }

    const updating = await user.findByIdAndUpdate(
      req.session.user._id,
      fields,
      {
        new: true,
      }
    );

    const isAdmin = req.session.user.role === "ADMIN";

    req.session.user = updating;

    res.render("profile", { user: req.session.user, isAdmin });
  } catch (error) {
    console.log(error);
    return next(createError(500, error.message));
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/users/login");

    const deletUser = await user.findByIdAndRemove(req.session.user._id);

    const deleteArticle = await Articles.deleteMany({
      user: req.session.user._id,
    });

    const deletComments = await Comment.deleteMany({
      author: req.session.user._id,
    });

    req.session.destroy();
    res.redirect("/users/signUp");
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// multr
const uploadAvatar = (req, res, next) => {
  const uploadUserAvatar = userAvatarUpload.single("avatar");
  if (!req.session.user) return res.redirect("/users/login");
  uploadUserAvatar(req, res, async (err) => {
    if (err) {
      //delete if save with error
      // if (req.file) await fs.unlink(path.join(__dirname, "../public", req.file.filename))
      if (err.message) return res.status(400).send(err.message);
      return res.status(500).send("server error!");
    }

    if (!req.file) return res.status(400).send("File not send!");

    try {
      // delete old avatar
      if (req.session.user.avatar) {
        // console.log(req.session.user);
        await fs.unlink(
          path.join(__dirname, "../public", req.session.user.avatar)
        );
      }

      const userss = await user.findByIdAndUpdate(
        req.session.user._id,
        {
          avatar: "/images/userAvatars/" + req.file.filename,
        },
        { new: true }
      );
      // console.log(req.session.user.avatar);
      req.session.user.avatar = userss.avatar;

      // return res.json(user);
      res.redirect("/users/profile");
    } catch (err) {
      return next(createError(500, "Server Error!"));
    }
  });
};

module.exports = {
  getLogin,
  postLogin,
  getSignUp,
  postSignUp,
  getProfile,
  logOut,
  updateProfile,
  deleteAccount,
  uploadAvatar,
};
