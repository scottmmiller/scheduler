"use strict";

var BodyParser = require("body-parser");
var Express = require("express");
var Session = require("express-session");
var Moment = require("moment");
var Mongoose = require("mongoose");
var Passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

var port = 9999;
var MongoUri = "mongodb://localhost:27017/scheduler";

var app = Express();


//CONTROLLERS********************
var UserCtrlr = require("./lib/server.controllers/server.UserCtrlr");



//MIDDLEWARE*********************
app.use(BodyParser.json());
app.use(Express.static(__dirname + "/public"));
app.use(Session({ secret: "schedulerSIKRIT" }));  //MUST be used prior to Passport.Session;
app.use(Passport.Session());
app.use(Passport.initialize());


//SERIALIZATIONS / DESERIALIZATIONS
Passport.serializeUser(function(user, done) {
	done(null, user);
});

Passport.deserializeUser(function(obj, done) {
	done(null, obj);
});


//STRATEGIES
Passport.use(new GoogleStrategy({
    clientID: "889269205616-h159qj74s29tekdu5kjtad84v4145b94.apps.googleusercontent.com",
    clientSecret: "2X8L2ym2gZMhlUzS97Egrz8_",
    callbackURL: "http://localhost:9999/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    UserCtrlr.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));


//AUTHENTICATION REQUESTS********
app.get('/auth/google',	passport.authenticate('google', { 
	scope: 'https://www.googleapis.com/auth/plus.login'
	})
);

app.get('/auth/google/callback', passport.authenticate('google', { 
  	successRedirect: "/auth/user" + req.user.username,
  	failureRedirect: '/home'
	})
 );



//ENDPOINTS**********************



//CONNECTIONS********************
Mongoose.connect(MongoUri);

Mongoose.connection.once("open", function() {
	console.log("Connected to DB at " + MongoUri);
});

app.listen(port, function() {
	console.log("Listening on port " + port);
});