var express = require('express');
var router = express.Router();

var layout = {
  layout: 'doc/doc',
  partials: {header: 'doc/header'}
};

/* Documentation index page */
router.get('/', function(req,res) {
  res.render('doc/index', layout);
});

/* API documentation */
router.get('/api', function(req, res) {
  res.render('doc/api/hades-api', layout);
  //res.sendfile('./templates/doc/api/hades-api.html');
});

router.get('/api/schemas', function(req, res) {
  res.render('doc/api/schemas', layout);
});

/* Mongodb documentation */
router.get('/mongo', function(req, res) {
  res.render('doc/mongo', layout);
});

module.exports = router;
