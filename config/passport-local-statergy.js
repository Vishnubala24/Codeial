const passport = require('passport');

const LocalStatergy = require('passport-local').Strategy;
const User = require('../models/users');

// Auth using passport
passport.use(new LocalStatergy({
        usernameField: 'uname',
        passwordField:'upass'
    },
    function(uname, upass, done){

        console.log('Inside LS ')
        // Find user & establish identity
        User.findOne({email: uname})
        .then(function(user){

            if(!user && user.password !== upass){
                console.log('Invalid username/password');
                return done(null, false);
            }
            console.log(user);
            return done(null, user);
        })
        .catch(function(err){
            console.log('Error while finding user', err);
            return done(err);
        })
    }
))

// Serialise the user to decide which key to be kept in cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//  De-serialise the user from key in the cookie
passport.deserializeUser(function(id, done){
    User.findById(id)
    .then(function(user){
        return done(null, user);
    })
    .catch(function(err){
        return done(err);
    })
});

passport.checkAuthentication = function(req, res, next){

    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
