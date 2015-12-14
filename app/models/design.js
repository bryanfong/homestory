var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DesignSchema = new Schema({
  property_name: { type: String },
  apartment_size: { type: String },
  description: { type: String },
  budget: { type: String },
  image_url: { type: String } //,
  // createdBy:   { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Design', DesignSchema);