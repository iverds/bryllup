var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Kine og Iver' });
});

router.get('/background', function(req, res) {
  res.render('background', { title: 'Kine og Iver', user: req.user });
});

router.get('/background-blur', function(req, res) {
  res.render('background-blur', { title: 'Kine og Iver' });
});

router.get('/background-opacity', function(req, res) {
  res.render('background-opacity', { title: 'Kine og Iver' });
});



module.exports = router;
