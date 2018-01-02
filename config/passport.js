
var LocalStrategy   = require('passport-local').Strategy;

// var FacebookStrategy = require('passport-facebook').Strategy;

// var configAuth = require('./auth') ;

var User = require('../models/user');
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
            done(null, user);
        });
    passport.deserializeUser(function(user, done) {
            done(null, user);
        });
        

   passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    // passport.use(new FacebookStrategy({
    //             clientID : '364517680663204',
    //             clientSecret : 'da09656ab6f17ad446bf071f47be4356',
    //             callbackURL : 'http://localhost:3000/auth/facebook/callback',
    //             profileFields: ['id', 'displayName', 'photos', 'email']
    //         }, 
    //         function(token, refreshToken, profile, done){
    //             process.nextTick(function(){
    //                 User.findOne({ 'facebook.id' : profile.id }, function(err, user){
    //                     if(err){
    //                         return done(err);
    //                     }
    //                     if(user){
    //                         return done(null, user);
    //                         //User found
    //                     }else{
    //                         User.insert({}, )
    //                     }

    //                 })
    //             })
    //         }
    //     )),


    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }
            if(!User.validPassword(password, user)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password'));
            }
            return done(null, user);
            
            // if there are any errors, return the error before anything else
            // if (err)
            //     return done(err);

            // if no user is found, return the message
            // if (!user)
            //     return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            // User.validPassword(password);
            // if (!User.validPassword(password))
            //     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // // all is well, return successful user
            // return done(null, user);
        });

    }));

 

}