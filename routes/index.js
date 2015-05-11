var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Account = require('../models/Account');

/* GET home page. */
router.get('/', function(req, res, next) {
  //var account = {};
  
  //account = new Account({ email : 'breno.ec@gmail.com', password : 'mtgrules' });
  //account.save(function(err) {
  //  if (err) throw err;
  //});
  
  res.render('index', { title: 'MagicStore' });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'MagicStore' });
});

module.exports = router;
