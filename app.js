var express=require("express");
var bodyParser=require("body-parser");
var passport=require('passport');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app=express();

require("./passport-init.js");

app.set("view engine","jade");
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({ extended:true}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.render('index',{title:"Index"});
});

var authRouter=require('./auth');
app.use(authRouter);

var userRouter=require('./user');
app.use("/user",ensureAuthenticated,userRouter);

app.listen(3000,'127.0.0.1',()=>{
   console.log("Server is running");
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}