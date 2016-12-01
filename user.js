var uuid=require("node-uuid");
var jsonfile = require('jsonfile');
var _=require("lodash");
var express=require("express");
var date = require('date-and-time');

var router=express.Router();
var file = './data/message.json';
module.exports=router;

var messages = require(file);


router.route("/")
    .get((req,res)=>{
        var userId=req.user.id;
        var Usermessages=messages.filter(m=>m.uid===userId);
        res.render('users',{
            title:"Profile",
            messages:Usermessages,
            user:req.user
        });
    }).post((req,res)=>{
        var now = new Date();

        var message={
            id:uuid.v4(),
            uid:req.user.id,
            message:req.body.message,
            date:date.format(now, 'YYYY/MM/DD HH:mm:ss')
        }
        messages.push(message);

        jsonfile.writeFile(file,messages,function(err){
            if(err){return console.log("error");}
            console.log("saved");
        });
        res.redirect(req.baseUrl+"/");
});

