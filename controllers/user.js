var express = require('express');
var router = express.Router();

var passport = require('passport');

require('../config/passport')(passport);


var user = require('../models/user');


router.get('/', function(req, res){
	res.render('login', { message : req.flash('loginMessage')});
});

router.get('/profile', isLoggedIn, function(req, res) {

        res.send("USER LOGGED IN - SUCCESS");
});

 router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
 });

// router.post('/', function(req, res){
// 	console.log(req.body);
// })
router.post('/', passport.authenticate('local-login', {

        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
    }));

// router.post('/facebook', passport.authenticate('facebook-login', {

//         successRedirect : '/profile', // redirect to the secure profile section
//         failureRedirect : '/', // redirect back to the login page if there is an error
//         failureFlash : true // allow flash messages
//     }));


router.get('/login/facebook', passport.authenticate('facebook', { 
        scope : 'email' 
    }
));
 
// handle the callback after facebook has authenticated the user
router.get('/login/facebook/callback',  passport.authenticate('facebook', {
    successRedirect : '/profile',
    failureRedirect : '/'
  })
);






 function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    console.log("comming");
    req.flash("loginMessage", "You are not logged in");
    res.redirect('/');
}


module.exports=router;








