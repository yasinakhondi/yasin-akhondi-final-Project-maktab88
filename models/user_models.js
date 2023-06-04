const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  LastName: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 8,
    maxlength: 30,
    match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/,
  },
  gender: {
    type: String,
    trim: true,
    enum: ["male", "female", "not-set"],
  },
  role: {
    type: String,
    enum: ["ADMIN", "BLOGGER"],
    required: true,
    default: "BLOGGER",
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
    match: /^(\+98|0)?9\d{9}$/,
    minlength: [11, "phoneNumber length must be 11characters"],
    // maxlength: [11, "phoneNumber length must be 11 characters"],
    validate: {
      validator: function (v) {
        return /^(\+98|0)?9\d{9}$/.test(v);
      },
      message: "شماره موبایل وارد شده صحیح نیست.",
    },
    set: function (v) {
      if (/^0/.test(v)) {
        return "+98" + v.slice(1);
      } else {
        return v;
      }
    },
  },
  avatar: {
    type: String,
  },
});

// hashing password

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

UserSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("user", UserSchema);
