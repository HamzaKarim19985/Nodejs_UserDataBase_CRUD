const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../../validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //CHecking if email already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedPost = await user.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //CHecking if the users email doesnt exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email of user doesnt exist");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Password is incorrect");

  //Generates encoded token that contains user ID, which needs to be decoded, can send requests now w token verified
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  //TOken is now stored in res.header
  res.header("auth-token", token).send(token);

  //Sample of user already in database
  /*"name": "Username",
   "email": "hashedEmail@gmail.com" */
});
module.exports = router;
