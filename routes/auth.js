const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const User = require('../models/user');
const flash = require('connect-flash');
const ensureLogin = require("connect-ensure-login");

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'viniciusadamy',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});


// ========================================= GET ROUTES =======================================
router.get('/signup', (req, res, next) => {
  res.render('auth/signup', { title: 'Signup' });
});

router.get('/feed', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('feed');
});

router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render('auth/profile', { user, currentUser: req.user });
});

router.get('/profile/newProject', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render('auth/newProject', user);
});

router.get('/profile/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const id = req.params.id;
  console.log(id);

  User.findById(id)
    .then(user => {
      res.render('auth/profile', { user, currentUser: req.user });
    })
    .catch(err => { throw new Error(err) });
});

router.get('/protected', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('auth/protected');
});

// ========================================= POST ROUTES ======================================
router.post('/signup', (req, res, next) => {
  let { username, password, password_check } = req.body;
  console.log(username, password);

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (password === password_check) {
    User.create({ // Precisa fazer o login automaticamente
      username,
      password: hashPass
      }).then(data => {
        console.log(`User created: ${data}`);
        passport.authenticate('local')(req, res, function () {
          res.redirect('/feed');
      });
    }).catch(err => { throw new Error(err)} );
  } else {
    res.render('auth/signup', { message: `Password doesn't match.` });
  }
});

router.post('/', passport.authenticate("local", {
  successRedirect: "/feed",
  failureRedirect: "/",
  passReqToCallback: true
}));

// Updating About
router.post('/profile-edit-about', (req, res, next) => {
  const { about } = req.body;

  console.log(req.user);

  User.findOneAndUpdate({ _id: req.user._id}, {
    about
  })
    .then(data => res.redirect('/profile'))
    .catch(err => {throw new Error(err)});
});

// Updating profile image
router.post('/profile-edit-image', (req, res, next) => {

});

module.exports = router;