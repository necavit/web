var express = require('express');
var router = express.Router();

function authenticate(username, password) {
  var auth = [
    {
      username: 'necavit',
      password: 'finarfinfingon1692'
    },
    {
      username: 'guest',
      password: 'hadesguest1234'
    }
  ]
  for (i = 0; i < auth.length; ++i) {
    var user = auth[i];
    if (user.username === username && user.password === password) {
      return true;
    }
  }
  return false;
}

router.route('/')
  .all(function(req, res) {
    res.redirect('/doc');
  });

router.route('/login')
  /* GET login page, to provide
   *  authentication and proceed to inner pages.
   */
  .get(function(req, res) {
    res.locals = {
      title: 'Login - Hades'
    };
    res.render('login');
  })


  .post(function(req, res) {
    res.locals = {
      title: 'Login - Hades'
    }
    var authorized = authenticate(req.body.username, req.body.password);
    if (authorized) {
      req.session.isLogged = true;
      res.redirect('/');
    }
    else {
      res.locals.alertMessage = 'Wrong username or password.';
      res.render('login', {partials: {loginAlert: 'alerts/alert-error'}});
    }
  });


module.exports = router;
