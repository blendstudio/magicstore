var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Account = require('../models/Account');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MagicStore' });
});

module.exports = router;
