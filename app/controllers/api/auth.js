var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var User     = require('../models/user');
var passport = require('passport');

module.exports = function (app) {
  app.use('/api', router);
};

// SIGN-UP: Create a new User
router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/'
  });
});

// SIGN-IN: Authenticate the user
router.post("/signin", function (req, res, next) {
  passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/'
  });
});

router.get("/signout", function (req, res, next){
  req.logout();
  res.redirect("/");
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}));