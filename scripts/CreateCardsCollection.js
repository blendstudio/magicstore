
var cards = require('../data/cards');

var mongoose = require('mongoose');
var mongo = {};

mongo = 'mongodb://localhost/magicstore';
mongoose.connect(mongo);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection'));
db.once('open', function callback () {
  console.log('mongoose connection [Opened: connected to [' + mongo + ']]');
});

var Cards = require('../models/Card');

var card = {};

for (var i = 16500; i < cards.length; i++){
  
  //console.log(cards[i].id);
  
  card = new Cards(cards[i]);
  card.save(function(err) {
      if (err) throw err;
    });
}

// this line needs to be tested
// mongoose.disconnect();
