var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Model = Session = require('../../models/Session');

var _ = require('lodash');

/* GET profiles resources. */
router.get('/', function(req, res, next) {
  // apply filters
  var count = 0;

  var query = {};

  var limit = req.query.limit;
  var skip = req.query.skip;

  var search = JSON.parse(req.query.search);

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

/* POST profiles resources. */
router.post('/', function(req, res, next) {
  // retrieve parameters from request's body
  var sessionId = req.body.sessionId;
  var profileId = req.body.profileId;

  if (sessionId) {
    // search session by id
    Session.findById(sessionId, function(err, doc) {
      if (err) throw err;
      // link profile to session
      doc.profileId = profileId;

      // update session
      doc.save(function (err) {
        if (err) throw err;
        res.json(doc);
      });
    });
  } else {
    // create new session
    var session = new Session();
    // link profile to session
    session.profileId = profileId;

    // save session to database
    session.save(function (err) {
      if (err) throw err;
      res.json(session);
    });
  }
});

module.exports = router;
