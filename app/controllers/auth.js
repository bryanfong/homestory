var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var User     = require('../models/user');
var passport = require('passport');

module.exports = function (app) {
  app.use('/', router);
};

// try to validate user and return user object
router.get('/validate', function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(404).json({message: "Please Login"});
  }
})

// SIGN-UP: Create a new User
router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', function (err, user, info) {
    console.log(err, user, info)
    if (err) { return next(err); }
    if (!user) { return res.status(404).json(info); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json(user);
    });
  })(req, res, next);
});

// SIGN-IN: Authenticate the user
router.post("/signin", function (req, res, next) {
  passport.authenticate('local-signin', function (err, user, info) {
    console.log(err, user, info)
    if (err) { return next(err); }
    if (!user) { return res.status(404).json(info); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json(user);
    });
  })(req, res, next);
})

router.delete("/signout", function (req, res, next){
  req.logout();
  res.status(200).json({message: "Succesfully Signout"});
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));

router.get('/auth/facebook/callback', function (req, res, next) {
  passport.authenticate('facebook', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.status(404).json(info); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json(user);
    });
  })(req, res, next);
})