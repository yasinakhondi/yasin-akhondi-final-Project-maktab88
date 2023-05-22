const user = require("../models/user_models");
const createError = require("http-errors");

const creatValid = async (req, res, next) => {
  // FirstName valid
  if (!req.body.FirstName)
    return res.render("signUp", {
      msg: "first name required!!",
    });

  if (req.body.FirstName.length >= 30 || req.body.FirstName.length < 3)
    return res.render("signUp", {
      msg: "FirstName length must be between 3 and 30!",
    });

  if (typeof req.body.FirstName !== "string")
    return res.render("signUp", {
      msg: "FirstName must be string",
    });

  // LastName valid

  if (!req.body.LastName)
    return res.render("signUp", {
      msg: "LastName is required",
    });

  if (req.body.LastName.length >= 30 || req.body.LastName.length < 3)
    return res.render("signUp", {
      msg: "LastName length must be between 3 and 30!",
    });

  if (typeof req.body.LastName !== "string")
    return res.render("signUp", {
      msg: "LastName must be string",
    });

  // username valid
  if (!req.body.userName)
    return res.render("signUp", {
      msg: "userName is required",
    });

  // gender valid
  if (!req.body.gender) req.body.gender = "not-set";

  if (!["male", "female", "not-set"].includes(req.body.gender))
    return res.render("signUp", {
      msg: "Your gender is invalid. gender must be female or male",
    });

  // password valid
  if (!req.body.password)
    return res.render("signUp", {
      msg: "password is required",
    });

  if (!req.body.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/))
    return res.render("signUp", {
      msg: "password be 1 number&letters ",
    });

  if (req.body.password.length <= 8)
    return res.render("signUp", {
      msg: "password must be 8 caracters",
    });

  // phoneNumber
  if (!req.body.phoneNumber)
    return res.render("signUp", {
      msg: "phoneNumber is required",
    });

  if (!req.body.phoneNumber.match(/^(\+98|0)?9\d{9}$/))
    return res.render("signUp", {
      msg: "phoneNumber is start with 0 or +98 & from iran",
    });

  const findeee = await user.findOne({
    phoneNumber: req.body.phoneNumber,
  });
  if (findeee)
    return res.render("signUp", {
      msg: " this phoneNumber exists!!!!",
    });

  next();
};

module.exports = creatValid;
