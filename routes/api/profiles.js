var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Profile = require('../../models/Profile');

var _ = require('lodash');

/* GET profiles resources. */
router.get('/', function(req, res, next) {

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
      query = Profile.count(search);
      query.exec(chain.shift());
    },

    // search profiles
    function(err, data) {
      count = data;

      query = Profile.find(search);
      query = query.skip(skip).
                limit(limit);
      query.exec(chain.shift());
    },

    function(err, data) {
      res.json({ profiles: data, count: count });
    },
  ];

  chain.shift()();

});

/* POST profiles resources. */
router.post('/', function(req, res, next) {

  var profile = {};
  
  profile = req.body.profile;

  var query = {};

  query = Profile.find({ email : profile.email });

  query.exec(function(err, data) {
    if (data.length) {
      res.status(409);
      res.json({ message: 'Perfil já cadastrado.' });

      return;
    }

    profile = new Profile(profile);
    profile.save(function(err) {
      if (err) throw err;

      res.status(201);
      res.json();
    });
  });

});

module.exports = router;
