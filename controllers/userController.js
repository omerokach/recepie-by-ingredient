require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/UserSchema");
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`App Connected to DB!`);
  })
  .catch((error) => {
    console.log(error.message);
  });

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};
const createRefreshToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};

module.exports.signup_post = async (req, res) => {
  let { email, firstName, lastName, password } = req.body;
  try {
    const ifExist = await User.find({ email: email });
    console.log(ifExist);
    if (ifExist.length !== 0) {
      return res.status(409).send("User already exist");
    } else {
      if (password.length < 6) {
        return res.status(403).send("Password must be minimun 6 length");
      }
      const newUser = new User({ email, firstName, lastName, password });
      const error = newUser.validateSync();
      console.log(error);
      const saveRes = await newUser.save();
      const token = createToken(newUser);
      const refreshToken = createRefreshToken(newUser);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ newUser });
    }
  } catch (error) {
    if (error.name == "ValidationError") {
      for (field in error.errors) {
        return res.status(403).json(error.errors[field].message);
      }
    } else {
      return res.status(500).json(error);
    }
  }
};
