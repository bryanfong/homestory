var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var Design = require('../../models/design');
var Bookmark = require('../../models/bookmark');
var Comment = require('../../models/comment');

module.exports = function (app) {
  app.use('/api', router);
};

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  // Otherwise the request is always redirected to the home page
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(404).json({message: "Please Login"});
  }
}

router.get('/secret', authenticatedUser, function (req, res, next) {
  res.status(200).json({message: "secret"});
});

// design - index
router.get('/designs', function(req, res, next){
  Design.find({}, function(err, designs){
    if (err) return res.status(400).json({message : err})
    return res.status(200).json(designs);
  })
});

// design - search
router.post('/designs/search', function(req, res, next){
  var designParams = req.body;
  Design.find(designParams, function(err, designs){
    if (err) return res.status(400).json({message : err})
    return res.status(200).json(designs);
  })
});

// design - show
router.get('/designs/:id', function(req, res, next){
  var designId = req.params.id;
  Design.findById(designId, function(err, design){
    if (err) return res.status(400).json({message : err})
    return res.status(200).json(design);
  })
});

// design - create
router.post('/designs', function(req, res, next){
  var designParams = req.body.design;
  Design.create(designParams, function(err, design){
    if (err) return res.status(400).json({message: err})
    return res.status(200).json(design)
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
    if (reqDesign.image_url)          design.image_url = reqDesign.image_url;

    design.save(function(err){
      if (err) return res.status(400).json({message: err});
      return res.status(200).json(design);
    })
  })
});

// design - destroy
router.delete('/designs/:id', function(req, res, next){
  var designId = req.params.id;

  Design.findById(designId, function(err,design){
    if (err) return res.status(400).json({message : err});
    design.remove(function(err){
      if (err) res.status(400).json({message: err})
      return res.status(200).json({message: "Design has been removed"});
    });
  })
});

// Bookmark - index
router.get('/bookmarks', function(req, res){
  var currentUserId = req.user._id;
  Bookmark.find({user_id: currentUserId}, function(err, bookmarks){
    if (err) return res.status(400).json({message : err})
    return res.status(200).json(bookmarks)
  }).populate("design_id")
});

// Bookmark - post
router.post('/bookmarks', function(req, res){
  var currentUserId = req.user._id;
  var params = req.body.bookmark
  params.user_id = currentUserId

  Bookmark.findOne(params, function (err, bookmark){
    if (err) return res.status(400).json({message : err})
    if (bookmark){
      return res.status(400).json({message: "You already bookmark"});
    } else {
      Bookmark.create(params, function (err, bookmark){
        if (err) return res.status(400).json({message : err})
        return res.status(200).json(bookmark)
      })
    }
  })
});

// Bookmark - delete
router.delete('/bookmarks/:id', function(req, res, next){
  var bookmarkId = req.params.id;

  Bookmark.findById(bookmarkId, function(err,bookmark){
    if (err) return res.status(400).json({message : err});
    bookmark.remove(function(err){
      if (err) res.status(400).json({message: err})
      return res.status(200).json({message: "Bookmark has been removed"});
    });
  })
})

// Comment - index
router.get('/comments/', function(req, res){
  Comment.find({}, function(err, comments){
    if (err) return res.status(400).json({message : err})
    return res.status(200).json(comments)
  }).populate("design_id")
});

// Comment - show
router.get('/comments/:id', function(req, res){
  var designId = req.params.id;
  Comment.find({design_id: designId}, function(err, comments){
    if (err) return res.status(400).json({message : err})
    return res.status(200).json(comments)
  }).populate("design_id").populate("user_id")
});

// Comment - post
router.post('/comments', function(req, res){
  var currentUserId = req.user._id;
  var params = req.body.comment;
  params.user_id = currentUserId;
  Comment.create(params, function (err, comment){
      if (err) return res.status(400).json({message : err})
      return res.status(200).json(comment)
  })
});

// Comment - delete
router.delete('/comments/:id', function(req, res, next){
  var commentId = req.params.id;

  Comment.findById(commentId, function(err,comment){
    if (err) return res.status(400).json({message : err});
    comment.remove(function(err){
      if (err) res.status(400).json({message: err})
      return res.status(200).json({message: "Comment has been removed"});
    });
  })
})
