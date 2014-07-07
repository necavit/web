var express = require('express');
var router = express.Router();

var users = [
  {
    "displayName" : "John Doe",
    "mail" : "john.doe@example.com",
    "lastPosition" : {
      "type" : "point",
      "coordinates" : [123.0, 234.0]
    },
    "type" : "human"
  }
];

/* GET users listing. */
router.get('/', function(req, res) {
  res.send(users);
});

router.post('/', function(req, res) {
  if (req.body) {
    users[users.length] = req.body;
    res.send(201, 'OK');
  }
  else {
    res.send(400, 'BAD REQUEST');
  }
});

module.exports = router;
