
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  email: String,
  password: String,
  created: { type: Date, default: Date.now },
  lastSignedIn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Account', AccountSchema);
