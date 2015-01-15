var express = require('express');
var router = express.Router();

/* Home page */
router.get('/', function(req, res) {
  res.render('home', {});
});

/* Blog route. It is not the actual route of the blog
 *  engine location, so a redirection is performed.
 */
router.route('/blog')
.all(function(req, res) {
  res.redirect('http://blog.davidmr.es');
});


/* Any non-matching route redirects the user to the
 *  home page. Perhaps a 404-nicely-formatted page
 *  would be more appropriate, but is ok for now.
 */
router.route('*')
.all(function(req, res) {
  res.render('home', {});
});

module.exports = router;
