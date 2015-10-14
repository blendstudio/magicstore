(function() {
  var mongooseFinder = require('../../modules/mongoose-finder'),
            mongoose = require('mongoose'),
               model = require('../../models/Profile'),

             express = require('express'),
              router = express.Router(),

                   _ = require('lodash'),

              multer = require('multer'),
                  fs = require('fs'),
             storage = multer.diskStorage({
               destination: function (req, file, cb) {
                 cb(null, 'public/images/avatars');
               },
               filename: function (req, file, cb) {
                 cb(null, file.fieldname+'.png');
               }
             }),
              upload = multer({ storage: storage });

  /* GET profiles */
  router.get('/', function(req, res, next) {
    var query = JSON.parse(req.query.query);

    mongooseFinder.find(model, query, function(data, count) {
      res.json({ values: data, count: count });
    });
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

  /* POST profiles resources. */
  router.post('/edit-avatar', upload.single('avatar'), function(req, res, next) {
    fs.rename('public/images/avatars/avatar.png', 'public/images/avatars/'+req.body.email+'.png');
    res.status(204).end();
  });

  module.exports = router;
})();
