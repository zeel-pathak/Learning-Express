"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const { nextTick } = require('process');
const { Console } = require('console');


app.set('views', path.join(__dirname, '../frontend'));
app.set('view engine','pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Shh,  its a secret"}));

var Users = [];
var flag = false;
app.get('/signup',function(req,res){
    res.render('signup');
});

app.post('/signup',function(req,res){
    if(!req.body.id || !req.body.password){
        res.status("400");
        res.send("Invalid details");
    }
    else{
        Users.filter(function (user){
            if(user.id === req.body.id){
                res.render('signup',{
                    message: "User Already Exists! Login or choose another user id"
                });
                flag = true;
            
                
            }            
        });
        if(flag === false){
            var newUser = {id: req.body.id, password: req.body.password};
            Users.push(newUser);
            req.session.user = newUser;
            res.redirect('/protected_page');
            }
            else{
                flag = false;
            }
        
    }

});

function checkSignIn(req,res,next){
    if(req.session.user){
        next();
    }
    else{
        var err = new Error("Not logged in");
        console.log(req.session.user);
        
        next(err);
    }
}   

app.get('/protected_page',checkSignIn, function(req,res){
    res.render('protected_page',{id:req.session.user.id});
});

app.get('/login',function(req,res){
    console.log("in login route")
    res.render('login');
});

app.post('/login',function(req,res){
    console.log(Users);
    if(!req.body.id || !req.body.password){
        res.render('login', {message: "Please enter both id and password"});

    } else{
        Users.filter(function(user){
            if(user.id === req.body.id && user.password === req.body.password){
                req.session.user = user;
                flag = true;
                res.redirect('/protected_page');
              
            }
            
        });
        if(flag === false){
        res.render('login', {message: "Invalid credentials"});
        }
        else{
            flag = false;
        }
    }
});

app.get('/logout',function(req,res){
    req.session.destroy(function(){
        console.log("user logged out")
    });
    res.redirect('/login');
});

app.use('/protected_page', function(err,req,res,next){
    // console.log(err);

    res.redirect('/login');
});

app.get('/',function(req,res){
    res.render('home',{
        user:{
            name:"Zeel",
            age:"20"
        }
    });
});

app.get('/cookies',function(req,res){
    // console.log(req.cookies);
    res.cookie('name','express');
});

app.get('/form',function(req,res) {

    res.render('form');
});

app.get('/session',function(req,res){
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You Visited this page " + req.session.page_views + " times");
    }
    else{
        req.session.page_views = 1;
        res.send("Welcome to the page for the first time!");
    }
});

app.post('/form',function(req,res) {
    console.log(req.body);
    res.send("recieved your request!");
});

app.get('/componenets',function(req,res){
    res.render('content');
});

app.listen(3000);