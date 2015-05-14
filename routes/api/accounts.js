var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Accounts = require('../../models/Account');

var _ = require('lodash');

/* GET accounts resources. */
router.get('/', function(req, res, next) {
  
  var count = 0;
  
  var query = {};
  
  var limit = req.query.limit;
  var skip = req.query.skip;
  
  var search = JSON.parse(req.query.search);
  
  var chain = [
    
    // get count
    function() {
      query = Accounts.count(search);
      query.exec(chain.shift()); 
    },
    
    // search accounts
    function(err, data) {
      count = data;
      
      query = Accounts.find(search);
      query = query.skip(skip).
                limit(limit);
      query.exec(chain.shift());
    },
    
    function(err, data) {
      res.json({ accounts: data, count: count });
    },
  ];

  chain.shift()();
  
});

/* POST accounts resources. */
router.post('/', function(req, res, next) {
  
  //var action =  
  var account = {};
  
  account = req.body.account;
  
  var query = {};
  
  // check passwords
  if (account.password !== account.passwordConfirmation) {
    res.status(403);
    res.json({ message: 'A senha informada e sua confirmação de senha não são iguais.' });
    
    return;
  }
  
  query = Accounts.find({ email : account.email });
  
  query.exec(function(err, data) {
    if (data.length) {
      res.status(409);
      res.json({ message: 'E-mail já cadastrado.' });
      
      return;
    }
    
    account = new Accounts(account);
    account.save(function(err) {
      if (err) throw err;
      
      res.status(201);
      res.json();
    });
  });
  
});

module.exports = router;
