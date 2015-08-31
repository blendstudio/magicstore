
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  email: String,
  username: String,
  avatar: String,
  types: String,
});

module.exports = mongoose.model('Profile', ProfileSchema);
