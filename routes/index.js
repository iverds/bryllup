var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Kine og Iver' });
});

router.get('/background', function(req, res) {
  res.render('background', { title: 'Kine og Iver' });
});

module.exports = router;
