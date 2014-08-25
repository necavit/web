var express = require('express');
var router = express.Router();

var layout = {
  layout: 'doc/doc',
  partials: {header: 'doc/header'}
};

router.use(function(req, res, next) {
  //log each documentation request
  console.log('request for documentation URL: ' + req.url);

  //forward to next handler
  next();
});

router.use(function(req, res, next) {
  var authenticated = req.session.isLogged;
  if (authenticated) {
    next();
  }
  else {
    //res.
    res.redirect('/login');
  }
});

/* Documentation index page */
router.get('/', function(req,res) {
  res.locals = {title: 'Hades docs'};
  res.render('doc/index', layout);
});

/* API documentation */
router.get('/api', function(req, res) {
  res.locals = {title: 'API reference - Hades'};
  res.render('doc/api/hades-api', layout);
});

router.get('/api/schemas', function(req, res) {
  res.locals = {title: 'JSON Schemas - Hades'};
  res.render('doc/api/schemas', layout);
});

/* Mongodb documentation */
router.get('/mongo', function(req, res) {
  res.locals = {title: 'mongodb - Hades'};
  res.render('doc/mongo', layout);
});

module.exports = router;
