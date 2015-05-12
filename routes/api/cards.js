var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Cards = require('../../models/Card');

var _ = require('lodash');

/* GET cards resources. */
router.get('/', function(req, res, next) {
  
  var random = req.query.random;
  
  var cards = {};
  var count = 0;
  
  var query = {};
  
  var limit = req.query.limit;
  var skip = req.query.skip;
  
  var search = req.query.search;
    
  if (!search) {
    search = '(.*?)';
  } else {
    random = false;
  }
  
  var chain = [
    
    // get count
    function() {
      query = Cards.count({ name : new RegExp(search, 'i') });
      query.exec(chain.shift()); 
    },
    
    // search cards
    function(err, data) {
      count = data;

      if (random === 'true') {
        query = Cards.findRandom({});
      } else {
        query = Cards.find({ name : new RegExp(search, 'i') });
      }
      
      query = query.skip(skip)
                  .limit(limit);
      query.exec(chain.shift());
    },
    
    function(err, data) {
      cards = data;
      
      res.json({ cards: cards, count: count });
    },
  ];

  chain.shift()();
    
});

module.exports = router;
