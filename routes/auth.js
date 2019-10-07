const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const User = require('../models/user');
const flash = require('connect-flash');
const ensureLogin = require("connect-ensure-login");

// ========================================= GET ROUTES =======================================
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.get('/profile', (req, res, next) => {
  const user = req.user;
  res.render('auth/profile', { user });
})

router.get('/protected', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('auth/protected');
});

// ========================================= POST ROUTES ======================================
router.post('/signup', (req, res, next) => {
  let { username, password } = req.body;
  console.log(username, password);

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.create({ // Precisa fazer o login automaticamente
    username,
    password: hashPass
    }).then(data => {
      console.log(`User created: ${data}`);
      passport.authenticate('local')(req, res, function () {
        res.redirect('/feed');
    });
  }).catch(err => { throw new Error(err)} );
})

router.post('/login', passport.authenticate("local", {
  successRedirect: "/feed",
  failureRedirect: "/login",
  passReqToCallback: true
}));

module.exports = router;