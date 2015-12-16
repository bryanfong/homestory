var mongoose = require('mongoose');
var User = require('./user');
var Design = require('./design');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  comment: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  design_id: { type: Schema.Types.ObjectId, ref: 'Design' }
});

module.exports = mongoose.model('Comment', CommentSchema);