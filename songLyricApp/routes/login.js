var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');

async function localAuthUser(email, password, done) {
  try {
    const aUser = await User.findOne({email: email});
    if (!aUser) {
      return done(null, false);
    }
    const isMatch = await aUser.matchPassword(password);
    if (!isMatch) {
      return done(null, false);
    }
    return done(null, aUser);
  } catch (error) {
    console.log(error);
    return done(error, false);
  }
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, localAuthUser));



/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});


/* GET signup form. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

/* POST logout. */
router.post('/logout', function(req, res, next) {
  req.logout(function(error) {
    if (error) { return next(error); }
    res.redirect('/login');
  });
});

/* POST Signup form. */
router.post('/signup', async function(req, res, next) {
  try {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    let savedDoc = await newUser.save();
    req.login(savedDoc, function(err){
      if (err) { return next(err); }
      return res.redirect('/users');
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/login',
  failureFlash: true
}));
module.exports = router;
