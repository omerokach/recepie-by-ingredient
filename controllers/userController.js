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
    const ifExist = await User.find({email: email});
    console.log(ifExist);
    if(ifExist){
        return res.status(409).send("User already exist");
    }else{
        password = hashSync(password, genSaltSync(10));
        console.log({ email, firstName, lastName, password });
        const newUser = new User({ email, firstName, lastName, password });
        const saveRes = await newUser.save();
        const token = createToken(newUser);
        const refreshToken = createRefreshToken(newUser);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ newUser });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
