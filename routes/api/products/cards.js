var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Model = Card = require('../../../models/Card');

var _ = require('lodash');

/* GET products */
router.get('/', function(req, res, next) {
  // apply filters
  var count = 0;

  var query = {};

  var skip = req.query.skip;
  var limit = req.query.limit;

  var filter = JSON.parse(req.query.filter);

  if (filter.name) {
    filter.name = new RegExp(filter.name, 'i');
  } else {
    filter.name = new RegExp('(.*?)', 'i');
  }

  var chain = [
    // get count
    function() {
      query = Model.count(filter);
      query.exec(chain.shift());
    },

    // search for models
    function(err, data) {
      count = data;

      if (req.query.random === 'true') {
        query = Model.findRandom(filter);
      } else {
        query = Model.find(filter);
      }

      query = query.skip(skip).limit(limit);

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
