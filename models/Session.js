
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var Schema = mongoose.Schema;

var SessionSchema = new Schema({
  profileId:      Schema.Types.ObjectId,
  cartId:         Schema.Types.ObjectId,
});

module.exports = mongoose.model('Session', SessionSchema);
