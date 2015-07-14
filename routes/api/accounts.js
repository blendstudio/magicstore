var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Model = Account = require('../../models/Account');

var _ = require('lodash');

/* GET accounts resources. */
router.get('/', function(req, res, next) {
  // apply filters
  var count = 0;

  var query = {};

  var limit = req.query.limit;
  var skip = req.query.skip;

  var search = {};
  if (req.query.search) {
    search = JSON.parse(req.query.search);
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

      query = Model.find(search);
      query = query.skip(skip).
                limit(limit);
      query.exec(chain.shift());
    },

    // return response
    function(err, data) {
      res.json({ values: data, count: count });
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

  query = Account.find({ email : account.email });

  query.exec(function(err, data) {
    if (data.length) {
      res.status(409);
      res.json({ message: 'E-mail já cadastrado.' });

      return;
    }

    // Nesse momento devemos salvar um profile
    account = new Account(account);
    account.save(function(err) {
      if (err) throw err;

      res.status(201);
      res.json();
    });
  });

});

module.exports = router;
