var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Cards = require('../models/Card');

var _ = require('lodash');

/* GET cards page. */
router.get('/', function(req, res, next) {
  res.render('cards', { title: 'MagicStore' });
});

module.exports = router;