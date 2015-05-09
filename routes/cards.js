var express = require('express');
var router = express.Router();

var _ = require('lodash');

var cards = require('../data/cards.json');

/* GET cards page. */
router.get('/', function(req, res, next) {
  
  res.render('cards', { title: 'MagicStore' });
});

module.exports = router;