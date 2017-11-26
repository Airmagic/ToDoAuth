/* authentication routes. Remember these routes are mounted at
/auth so all the paths are prefixed with /auth in the app.
so the authentication page is at /auth/
the login route is at /auth/login
etc.  */

var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET the authentication page. */
router.get('/', function(req, res, next){
  res.render('authentication');
});


/* POST to login */
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/auth',
  failureFlash: true
}));


/* POST to sign up */
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/auth',
  failureFlash: true
}))

/* GET logout */
router.get('/logout', function(req, res, next){
  req.logout();  // passport provides this
  res.redirect('/');
});

module.exports = router;