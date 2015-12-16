var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var User = require('../../models/user')

module.exports = function (app) {
  app.use('/api', router);
};

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  // Otherwise the request is always redirected to the home page
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.json({message: "Please Login"});
  }
}

//INDEX
router.get('/users', function (req, res, next){
  User.find({}, function(err, users){
    if (err) res.json({message : err})
    res.json(users);
  })
});

//SHOW
router.get('/users/:id', function(req, res, next){
  var userId = req.params.id;
  User.findById(userId, function(err, user){
    if (err) res.json({message : err})
      res.json(user);
  })
});

// //POST
router.post('/users', function(req, res, next){
  var userParams = req.body.user;

  User.create(userParams, function(err, user){
    if (err) res.json({message: err})
      res.json({user : user})
  })
});

// //PUT
router.put('/users/:id', function (req, res){
  User.findByIdAndUpdate(req.params.id, req.body.user,function (err, users){
    if (err) {
      res.json({message: "There was an error with your GET request " + err});
    } else {
      res.json({message: "ok" });
    }
  });
})

// DELETE
router.delete('/users/:id', function(req, res, next){
  var userId = req.params.id;

  User.findById(userId, function(err,user){
    if (err) res.status(400).json({message : err});
    user.remove(function(err){
      if (err) res.json({message: err})
      res.status(200).json({message: "User has been removed"});
    });
  })
});