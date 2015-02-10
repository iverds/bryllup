var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Kine og Iver' });
});

/* GET home page. */
router.get('/invitation', function(req, res) {
  res.render('invitation', { title: 'Kine og Iver' });
});

module.exports = router;
