(function() {
  var mongooseFinder = require('../../../modules/mongoose-finder'),
            mongoose = require('mongoose'),
               model = require('../../../models/Product'),

             express = require('express'),
              router = express.Router(),

                   _ = require('lodash');

  /* GET products */
  router.get('/', function(req, res, next) {
    var query = JSON.parse(req.query.query);

    mongooseFinder.find(model, query, function(data, count) {
      res.json({ values: data, count: count });
    });
  });

  module.exports = router;
})();
