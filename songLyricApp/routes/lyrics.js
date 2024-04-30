const express = require('express');
const router = express.Router();
const Lyric = require('../models/Lyric');

// Assume req.user is the logged-in user
router.get('/user_lyrics', async (req, res, next) => {
    try {
        const userLyrics = await Lyric.find({ user: req.user._id }).populate('user');
        res.render('user_lyrics', { userLyrics: userLyrics });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
