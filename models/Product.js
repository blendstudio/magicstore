
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var random = require('mongoose-random');

var Schema = mongoose.Schema;

var StockSchema = new Schema({
  condition:          String,
  language:           String,
  observations:       [String],
  quantity:           Number,
  price:              Number,
  discount:           Number,
});

var ProductSchema = new Schema({
  name:               String,
  description:        String,
  stock:              [StockSchema],
});

ProductSchema.plugin(random, { path: 'random' });

module.exports = mongoose.model('Product', ProductSchema);
