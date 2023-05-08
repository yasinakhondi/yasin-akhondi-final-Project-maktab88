const updateValid = async (req, res, next) => {
  try {
    if (!req.body.FirstName) return res.send("khaaaaalie");
  } catch (error) {
    console.log("valid updatttttttttt");
  }

  // if (req.body.FirstName.length >= 30 || req.body.FirstName.length < 3)
  //   return res.render("profile", {
  //     msg: "FirstName length must be between 3 and 30!",
  //   });

  // if (typeof req.body.FirstName !== "string")
  //   return res.render("profile", {
  //     msg: "FirstName must be string",
  //   });

  // // LastName valid

  // if (!req.body.LastName)
  //   return res.render("profile", {
  //     msg: "LastName is required",
  //   });

  // if (req.body.LastName.length >= 30 || req.body.LastName.length < 3)
  //   return res.render("profile", {
  //     msg: "LastName length must be between 3 and 30!",
  //   });

  // if (typeof req.body.LastName !== "string")
  //   return res.render("profile", {
  //     msg: "LastName must be string",
  //   });

  // // username valid
  // if (!req.body.userName)
  //   return res.render("profile", {
  //     msg: "userName is required",
  //   });

  // // gender valid
  // if (!req.body.gender) req.body.gender = "not-set";

  // if (!["male", "female", "not-set"].includes(req.body.gender))
  //   return res.render("profile", {
  //     msg: "Your gender is invalid. gender must be female or male",
  //   });

  // // password valid
  // if (!req.body.password)
  //   return res.render("profile", {
  //     msg: "password is required",
  //   });

  // if (!req.body.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/))
  //   return res.render("profile", {
  //     msg: "password be 1 number&letters ",
  //   });

  // if (req.body.password.length <= 8)
  //   return res.render("profile", {
  //     msg: "password must be 8 caracters",
  //   });

  next();
};
module.exports = updateValid;
