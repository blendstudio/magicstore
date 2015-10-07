var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Model = Card = require('../../../models/Card');

var _ = require('lodash');

/* GET products */
router.get('/', function(req, res, next) {
  // mongoose query object
  var q = {};
  // mongoose query
  var query = JSON.parse(req.query.query);

  // apply like operator
  var property = '';
  for (var i = 0; i < query['search-options'].like.length; i++) {
    property = query['search-options'].like[i];
    if (query.conditions[property]) {
      query.conditions[property] = new RegExp(query.conditions[property], 'i');
    }
  }

  var count = 0;
  var chain = [
    // get count
    function() {
      q = Model.count(query.conditions);
      q.exec(chain.shift());
    },

    // search for models
    function(err, data) {
      if (err) { throw err; }

      count = data;
      if (query['query-options'].random === true) {
        q = Model.findRandom(query.conditions, query.projection, query.options);
      } else {
        q = Model.find(query.conditions, query.projection, query.options);
      }

      q.exec(chain.shift());
    },

    // return response
    function(err, data) {
      if (err) { throw err; }
      res.json({ values: data, count: count });
    },
  ];

  chain.shift()();
});

module.exports = router;
