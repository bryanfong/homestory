var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var Design = require('../../models/design');


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

router.get('/secret', authenticatedUser, function (req, res, next) {
  res.json({message: "secret"});
});

// design - index
router.get('/designs', function(req, res, next){
  Design.find({}, function(err, designs){
    if (err) res.json({message : err})
    res.json(designs);
  })
});

// design - show
router.get('/designs/:id', function(req, res, next){
  var designId = req.params.id;
  Design.findById(designId, function(err, design){
    if (err) res.json({message : err})
      res.json(design);
  })
});

// design - create

router.post('/designs', function(req, res, next){
  var designParams = req.body.design;

  Design.create(designParams, function(err, design){
    if (err) res.json({message: err})
      res.json({design : design})
  })
});
