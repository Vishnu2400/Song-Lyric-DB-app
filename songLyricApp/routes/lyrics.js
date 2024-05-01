const express = require('express');
const router = express.Router();
const Lyric = require('../models/Lyric');
const User = require('../models/User');


// Display all lyrics
router.get('/', async (req, res) => {
  try {
    const lyrics = await Lyric.find().populate('artist').exec();
    res.render('lyrics', { lyrics });
  } catch (err) {
    res.status(500).send('Error fetching lyrics');
  }
});


/// Get add lyric form
router.get('/new', (req, res) => {
  if (req.user) {
    res.render('add_lyric_form', { user: req.user });
  } else {
    // Redirect or handle unauthorized access
    res.redirect('/login'); // Redirect to login page or handle unauthorized access
  }
});



// POST add new lyric
router.post('/new', async (req, res) => {
  try {
    const { title, lyrics } = req.body;
    const artist = req.user.name; 
    const user = req.user._id; 

    const newLyric = await Lyric.addLyric(title, artist, lyrics, user);
    res.redirect('/lyrics');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding new lyric');
  }
});

// Get delete lyric form by ID
router.get('/:id/delete', async (req, res) => {
  try {
    const lyricId = req.params.id;
    const lyric = await Lyric.findById(lyricId);
    if (!lyric) {
      return res.status(404).send('Lyric not found');
    }
    res.render('delete_lyric_form', { lyric });
  } catch (err) {
    res.status(500).send('Error rendering delete lyric form');
  }
});

// Delete lyric by ID
router.post('/:id/delete', async (req, res) => {
  try {
    const lyricId = req.params.id;
    await Lyric.findByIdAndDelete(lyricId);
    res.redirect('/lyrics');
  } catch (err) {
    res.status(500).send('Error deleting lyric');
  }
});


// Edit lyric by ID
router.get('/:id/edit', async (req, res) => {
  try {
    const lyricId = req.params.id;
    const lyric = await Lyric.findById(lyricId).populate('user').exec();
    res.render('edit_lyric_form', { lyric });
  } catch (err) {
    res.status(500).send('Error editing lyric');
  }
});

// Update lyric by ID
router.post('/:id/edit', async (req, res) => {
  try {
    const lyricId = req.params.id;
    const { title, lyrics } = req.body;
    const user = req.user; // Assuming user is authenticated and available in req.user
    const updates = {
      title: title,
      lyrics: lyrics,
      artist: user.name,
      user: user._id
    };
    const updatedLyric = await Lyric.modifyLyric(lyricId, updates);
    res.redirect('/lyrics');
  } catch (err) {
    res.status(500).send('Error updating lyric');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const lyricId = req.params.id;
    const lyric = await Lyric.findById(lyricId);
    if (!lyric) {
      return res.status(404).send('Lyric not found');
    }
    res.render('lyric', { lyric });
  } catch (err) {
    res.status(500).send('Error viewing lyric');
  }
});

module.exports = router;
