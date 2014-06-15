var express = require('express');
var router = express.Router();

var html_dir = './public/html/';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
