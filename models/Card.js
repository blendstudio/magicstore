
var mongoose = require('mongoose');
var random = require('mongoose-random');

var Schema = mongoose.Schema;

var RulingSchema = new Schema({
  releasedAt:         Date,
  rule:               String,
});

var FormatSchema = new Schema({
  name:               String,
  legality:           String,
});

var StockSchema = new Schema({
  condition:          String,
  language:           String,
  observations:       [String],
  quantity:           Number,
  price:              Number,
  discount:           Number,
});

var CardSchema = new Schema({
  id:                 Number,
  relatedCardId:      Number,
  setNumber:          Number,
  name:               String,
  searchName:         String,
  description:        String,
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
  stock:              [StockSchema],
  releasedAt:         Date,
});

CardSchema.plugin(random, { path: 'random' });

module.exports = mongoose.model('Card', CardSchema);
