(function() {
  var mongooseFinder = require('../../modules/mongoose-finder'),
            mongoose = require('mongoose'),
               model = require('../../models/Account'),

             express = require('express'),
              router = express.Router(),

                   _ = require('lodash');

  /* GET accounts */
  router.get('/', function(req, res, next) {
    var query = JSON.parse(req.query.query);

    mongooseFinder.find(model, query, function(data, count) {
      res.json({ values: data, count: count });
    });
  });

  /* POST accounts resources. */
  // TODO: refactor
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
})();
