var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Session = require('../../models/session');

var _ = require('lodash');

/* GET profiles resources. */
router.get('/', function(req, res, next) {
  var id = req.query.id;

  Session.findById(id, function(err, doc) {
    res.json(doc);
  });
});

/* POST profiles resources. */
router.post('/', function(req, res, next) {

  var sessionId = req.body.sessionId;
  var profileId = req.body.profileId;

  if (sessionId) {
    Session.findById(sessionId, function(err, doc) {
      if (err) throw err;

      doc.profileId = profileId;
      doc.save(function (err) {
        if (err) throw err;
        res.json(doc);
      });
    });
  } else {
    var session = new Session();
    session.save(function (err) {
      if (err) throw err;
      res.json(session);
    });
  }

});

module.exports = router;
