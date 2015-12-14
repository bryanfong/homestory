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

// design - search
router.post('/designs/search', function(req, res, next){
  var designParams = req.body;
  console.log(req.body);
  Design.find(designParams, function(err, designs){
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

// design - edit
router.put('/designs/:id', function(req, res, next){
  var designId = req.params.id;

  Design.findById(designId, function(err, design){
    var reqDesign = req.body.design;

    if (err) res.status(400).json({message : err});
    if (reqDesign.property_name)      design.property_name = reqDesign.property_name;
    if (reqDesign.apartment_size)     design.apartment_size = reqDesign.apartment_size;
    if (reqDesign.description)        design.description = reqDesign.description;
    if (reqDesign.budget)             design.budget = reqDesign.budget;
    if (reqDesign.image_url)             design.image_url = reqDesign.image_url;

    design.save(function(err){
      if (err) res.status(400).json({message: err});
      res.status(200).json({design : design});
    })
  })
});

// design - destroy
router.delete('/designs/:id', function(req, res, next){
  var designId = req.params.id;

  Design.findById(designId, function(err,design){
    if (err) res.status(400).json({message : err});
    design.remove(function(err){
      if (err) res.json({message: err})
      res.status(200).json({message: "Design has been removed"});
    });
  })
});
