const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");

const usersRouter = require("./routes/auth");
const articleRouter = require("./routes/article");
const commentsRouter = require("./routes/comments");
const adminRouter = require("./routes/ADMIN");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/Final-Project").then(() => {
  console.log("DB is connected..");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "thisismysecrctekeyForAuthProject",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use("/users", usersRouter);
app.use("/article", articleRouter);
app.use("/comment", commentsRouter);
app.use("/ADMIN", adminRouter);

// app.use("/admin", adminPanel);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  console.log(err.message);
});

module.exports = app;
