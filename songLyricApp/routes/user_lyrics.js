const express = require('express');
const router = express.Router();
const Lyric = require('../models/Lyric');
const User = require('../models/User');



// Display all lyrics for user
router.get('/', async (req, res) => {
    try {
      let query = {};
      
      // Check if user ID query parameter is present
      if (req.query.user) {
        query.user = req.query.user;
      }
  
      const lyrics = await Lyric.find(query).populate('artist').exec();
      res.render('lyrics', { lyrics, user: req.user }); 
    } catch (err) {
      res.status(500).send('Error fetching lyrics');
    }
  });

  module.exports = router;