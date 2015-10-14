(function() {
  var mongooseFinder = require('../../modules/mongoose-finder'),
            mongoose = require('mongoose'),
               model = require('../../models/Session'),

             express = require('express'),
              router = express.Router(),

                   _ = require('lodash');

  /* GET profiles resources. */
  router.get('/', function(req, res, next) {
    var query = JSON.parse(req.query.query);

    mongooseFinder.find(model, query, function(data, count) {
      res.json({ values: data, count: count });
    });
  });

  /* POST profiles resources. */
  // TODO: refactor
  router.post('/', function(req, res, next) {
    // retrieve parameters from request's body
    var sessionId = req.body.sessionId;
    var profileId = req.body.profileId;

    if (sessionId) {
      // search session by id
      model.findById(sessionId, function(err, doc) {
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
      var session = new model();
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
})();
