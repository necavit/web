var express = require('express');
var router = express.Router();

var User = require('../../model/users.js');

/* Base route is /api/users */

router.route('/')
  .get(function(req, res) {
    User.find({}, function(err, users) {
      if (err) {
        console.log(err);
      }
      else {
        res.send(200, users);
      }
    });
  })

  .post(function(req, res) {
    if (req.body) {
      console.log(req.body);
      res.send(201, 'Created');
    }
    else {
      res.send(400, 'Bad request');
    }
  });

module.exports = router;
