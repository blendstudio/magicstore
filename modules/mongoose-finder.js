exports = module.exports = (function() {
  var mongoose = require('mongoose'),
            mf = {};

  mf.find = function(model, query, callback) {
    var q        = {},    // mongoose query object
        property = '',
        count    = 0;

    // apply like operator
    if (query['search-options']) {
      for (var i = 0; i < query['search-options'].like.length; i++) {
        property = query['search-options'].like[i];
        if (query.conditions[property]) {
          query.conditions[property] = new RegExp(query.conditions[property], 'i');
        }
      }
    }

    var chain = [
      // get count
      function() {
        q = model.count(query.conditions);
        q.exec(chain.shift());
      },

      // get models
      function(err, data) {
        if (err) { throw err; }

        count = data;
        if (query['search-options'] && query['search-options'].random === true) {
          q = model.findRandom(query.conditions, query.projection, query['query-options']);
        } else {
          q = model.find(query.conditions, query.projection, query['query-options']);
        }

        q.exec(chain.shift());
      },

      // return response
      function(err, data) {
        if (err) { throw err; }
        callback(data, count);
      }
    ];

    chain.shift()();
  }

  return mf;
})();
