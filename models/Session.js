
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var Schema = mongoose.Schema;

var SessionSchema = new Schema({
  profile:      Schema.Types.ObjectId,
  cart:         Schema.Types.ObjectId,
  persistent:   Boolean,
});

module.exports = mongoose.model('Session', SessionSchema);
