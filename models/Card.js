
var mongoose = require('mongoose');
var Product = require('./Product');

var Schema = mongoose.Schema;

var RulingSchema = new Schema({
  releasedAt:         Date,
  rule:               String,
});

var FormatSchema = new Schema({
  name:               String,
  legality:           String,
});

var CardSchema = Product.schema.extend({
  id:                 Number,
  relatedCardId:      Number,
  setNumber:          Number,
  searchName:         String,
  flavor:             String,
  colors:             [String],
  manacost:           String,
  convertedManaCost:  Number,
  cardSetName:        String,
  type:               String,
  subType:            String,
  power:              Number,
  toughness:          Number,
  loyalty:            Number,
  rarity:             String,
  artist:             String,
  cardSetId:          String,
  token:              Boolean,
  promo:              Boolean,
  rulings:            [RulingSchema],
  formats:            [FormatSchema],
  releasedAt:         Date,
});

module.exports = mongoose.model('Card', CardSchema);
