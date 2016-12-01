var express=require("express");
var passport=require('passport');

var googleStrategy = require('passport-google-oauth').OAuth2Strategy;

var router=express.Router();
module.exports=router;

router.get('/auth/google',
    passport.authenticate('google', { scope: ['openid email profile'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    function(req, res) {
        // Authenticated successfully
        res.redirect('/user');
    });


router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
});