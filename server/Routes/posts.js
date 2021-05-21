const express = require("express");
const Blog = require("../Model/Post");
const User = require("../Model/User");
const router = require("express").Router();
const verified = require("./verifyToken");

//Has access to req.user set from verifyToken, verfied using req.header("auth-token") from verifyToken
router.get("/", verified, (req, res) => {
  const userID_object = req.user;
  const user = User.findOne({ _id: userID_object });
  console.log(user);
  //res.json(user);
});

//Get post with respective ID
router.get("/:postID", async (req, res) => {
  try {
    const posts = await Blog.findById(req.params.postID);
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});

//delete(mongo remove) post with respective ID, _id used because thats the variable mongoDB generates for objects in collection
router.delete("/:postID", async (req, res) => {
  try {
    const deletedPosts = await Blog.remove({ _id: req.params.postID });
    res.json(deletedPosts);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});

//Patch(router) and Put Update(put)
router.patch("/:postID", async (req, res) => {
  try {
    const updatedPosts = await Blog.updateOne(
      { _id: req.params.postID },
      { $set: { title: req.body.title } }
    );

    res.json(updatedPosts);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});

//Puts/Saves a post sent by user in req
router.post("/", async (req, res) => {
  const post = new Blog({
    title: req.body.title,
    snipet: req.body.snipet,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});

module.exports = router;
