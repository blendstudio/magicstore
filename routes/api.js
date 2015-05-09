var express = require('express');
var router = express.Router();

var _ = require('lodash');

var cards = require('../data/cards.json');

/* GET cards page. */
router.get('/cards', function(req, res, next) {
  res.send(cards);
});

module.exports = router;
