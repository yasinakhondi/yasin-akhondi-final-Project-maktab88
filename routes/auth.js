const express = require("express");
const router = express.Router();
const validationSignUp = require("../middlewares/users_validation");
const validationLogin = require("../middlewares/login_valid");
const {
  getLogin,
  postLogin,
  getSignUp,
  postSignUp,
  getProfile,
  logOut,
  updateProfile,
  deleteAccount,
  uploadAvatar,
  bulkUpload,
} = require("../controllers/auth_controller");

const updateValid = require("../middlewares/update_valid");
// signUp user
router.get("/signUp", getSignUp);

router.post("/signUp", validationSignUp, postSignUp);

// login user
router.get("/login", getLogin);

router.post("/login", validationLogin, postLogin);

// profile user
router.get("/profile", getProfile);

// logout
router.get("/logout", logOut);

// update profile
router.post("/updating", updateValid, updateProfile);

// delete Account
router.get("/deleteAcc", deleteAccount);

// multer
router.post("/uploadAvatar", uploadAvatar);

module.exports = router;
