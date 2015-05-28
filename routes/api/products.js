var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Cards = require('../../models/Card');

var _ = require('lodash');

/* GET products resources. */
router.get('/', function(req, res, next) {

  var random = req.query.random;

  var products = {};
  var count = 0;

  var query = {};

  var limit = req.query.limit;
  var skip = req.query.skip;

  var search = req.query.search;

  search = JSON.parse(search);

  if (!search.name) {
    search.name = new RegExp('(.*?)', 'i');
  } else {
    search.name = new RegExp(search.name, 'i');
    random = false;
  }

  var chain = [

    // get count
    function() {
      query = Cards.count(search);
      query.exec(chain.shift());
    },

    // search products
    function(err, data) {
      count = data;

      if (random === 'true') {
        query = Cards.findRandom(search);
      } else {
        query = Cards.find(search);
      }

      query = query.skip(skip)
                  .limit(limit);
      query.exec(chain.shift());
    },

    function(err, data) {
      res.json({ products: data, count: count });
    },
  ];

  chain.shift()();

});

module.exports = router;
