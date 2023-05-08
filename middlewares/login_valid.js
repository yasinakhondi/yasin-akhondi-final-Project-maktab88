const creatValid = async (req, res, next) => {
  try {
    // userName valid

    if (!req.body.userName)
      return res.render("login", {
        msg: "serName is required",
      });

    // password valid

    if (!req.body.password)
      return res.render("login", {
        msg: "password is required",
      });

    if (req.body.password.length <= 8)
      return res.render("login", {
        msg: "password must be 8 caracters",
      });

    if (!req.body.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/))
      return res.render("login", {
        msg: "password be 1 number&letters ",
      });

    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = creatValid;
