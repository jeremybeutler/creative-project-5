const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");
const users = require("./users.js");
const User = users.model;
const tweets = require("./tweets.js");
const Tweet = tweets.model;

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    tweet: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tweet'
    },
    contents: String,
    created: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model('Comment', commentSchema);

// add comment
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
    const comment = new Comment({
        user: req.user,
        tweet: req.body.tweet,
        contents: req.body.contents,
    });
    try {
        await comment.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get all comments
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    try {
        let comments = await Comment.find().sort({
            created: -1
        }).populate('user').populate('tweet');
        return res.send(comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Comment,
    routes: router,
}