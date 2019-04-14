const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;

const tweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  content: String,
  likeCount: Number,
  retweetCount: Number,
  created: {
    type: Date,
    default: Date.now
  },
});

const Tweet = mongoose.model('Tweet', tweetSchema);

// upload tweet
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  const tweet = new Tweet({
    user: req.user,
    content: req.body.content,
    likeCount: 0,
    retweetCount: 0,
  });
  try {
    await tweet.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my tweets
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  // return tweets
  try {
    let tweets = await Tweet.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send(tweets);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all tweets
router.get("/all", async (req, res) => {
    try {
      let tweets = await Photo.find().sort({
        created: -1
      }).populate('user');
      return res.send(tweets);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router.get("/single/:id", async (req, res) => {
  // return tweet
  try {
    let tweet = await Tweet.findOne({
      _id: req.params.id
    }).populate('tweet');
    return res.send(tweet);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Tweet,
  routes: router,
}