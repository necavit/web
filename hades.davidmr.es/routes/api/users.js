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

//TODO router.param('userId')

router.route('/:userId')
  .get(function(req, res) {
    //TODO send requested user
  });

router.route('/:userId/lastPosition')
  /* Updates the user's last position property and stores it
   *  in the database.
   */
  .post(function(req, res) {
    //TODO
  });

router.route('/:userId/attacks')
  /* Performs validation of the attack request, calculates the
   *  result and sends it back to the user. The recipient user
   *  (the user being attacked) is modified accordingly and
   *  (TODO) is notified via push notification.
   */
  .post(function(req, res) {
    //TODO
    //validate request
    //
  });

router.route('/:userId/withinRange')
  /* Retrieve all the users within the visible range of the user.
   *  (TODO) If the density of players around the user is too low,
   *  the system randomly creates bot players to give the user a
   *  higher chance to play.
   */
  .get(function(req, res) {
    //TODO
  });


module.exports = router;
