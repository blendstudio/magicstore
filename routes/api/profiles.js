var express = require('express');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/avatars');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname+'.png');
  }
});
var upload  = multer({ storage: storage });
var fs = require('fs');
var router  = express.Router();

var mongoose = require('mongoose');
var Model = Profile = require('../../models/Profile');

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
