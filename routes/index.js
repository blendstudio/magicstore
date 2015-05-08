var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MagicStore' });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  res.render('index', { title: 'MagicStore' });
});

module.exports = router;
