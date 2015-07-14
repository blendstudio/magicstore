var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Model = Card = require('../../../models/Card');

var _ = require('lodash');

/* GET products */
router.get('/', function(req, res, next) {
  var random = req.query.random;

  // apply filters
  var count = 0;

  var query = {};

  var limit = req.query.limit;
  var skip = req.query.skip;

  var search = JSON.parse(req.query.search);

  if (!search.name) {
    search.name = new RegExp('(.*?)', 'i');
  } else {
    search.name = new RegExp(search.name, 'i');
    random = false;
  }

  var chain = [
    // get count
    function() {
      query = Model.count(search);
      query.exec(chain.shift());
    },

    // search for models
    function(err, data) {
      count = data;

      if (random === 'true') {
        query = Model.findRandom(search);
      } else {
        query = Model.find(search);
      }

      query = query.skip(skip)
                  .limit(limit);
      query.exec(chain.shift());
    },

    // return response
    function(err, data) {
      res.json({ values: data, count: count });
    },
  ];

  chain.shift()();
});

module.exports = router;
