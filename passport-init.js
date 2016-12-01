var passport=require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var authConfig = require('./data/config');

passport.serializeUser(function(user, callback){
    console.log('serializing user.');
    callback(null, user);
});

passport.deserializeUser(function(user, callback){
    console.log('deserialize user.');
    callback(null, user);
});


passport.use(new GoogleStrategy(
    authConfig.google,
    function (accessToken, refreshToken, profile, done) {
        //console.log(profile); //profile contains all the personal data returned
        return done(null, profile);
    }
));

