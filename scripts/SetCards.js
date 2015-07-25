
// connect to mongo db
var mongoose = require('mongoose');
var mongo = 'mongodb://localhost/magicstore';
mongoose.connect(mongo);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection'));
db.once('open', function callback () {
  console.log('mongoose connection [Opened: connected to [' + mongo + ']]');
});

// get Card model
var Model = Card = require('../models/Card');

// retrieve cards from json file
var cards = require('../data/cards');

var save = function() {
  // get first card in array
  var card = cards.shift();

  // add stock information
  card.stock = [
    {
      "condition" : "NM",
      "observations" : [],
      "quantity" : 0,
      "price" : 0,
      "discount" : 0
    }
  ];

  // create model
  card = new Card(card);

  // save card
  card.save().then(function() {
    // when saved
    console.log(card.id);

    // more cards
    if (cards.length > 0) {
      save();
    }

    // no more cards
    else {
      console.log('done');
      mongoose.connection.close();
    }
  });
};

// save first call
save();
