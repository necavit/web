var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/doc');
});

/* GET API documentation */
router.get('/doc', function(req, res) {
  res.sendfile('./doc/hades-api.html');
});

module.exports = router;
