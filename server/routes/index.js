var express = require('express');
var router = express.Router();

var html_dir = './public/html/';

/* GET home page. */
router.get('/', function(req, res) {
  res.sendfile(html_dir + 'index.html');
});

module.exports = router;
