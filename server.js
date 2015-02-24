"use strict";

var BodyParser = require("body-parser");
var Express = require("express");
var Session = require("express-session");
var Moment = require("moment");
var Mongoose = require("mongoose");
var Passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var Bcrypt = require("bcrypt-nodejs");
var Cors = require("cors");
var Firebase = require("firebase");



//PORTS
var port = 9999;
var MongoUri = "mongodb://localhost:27017/scheduler";

var app = Express();


//CONTROLLERS********************
var User = require("./lib/server.models/server.userModel");
var UserCtrlr = require("./lib/server.controllers/server.UserCtrlr");
var CalendarCtrlr = require("./lib/server.controllers/server.CalendarCtrlr");



//MIDDLEWARE*********************
app.use(Express.static(__dirname + "/public"));
app.use(BodyParser.json());
app.use(Cors());
app.use(Session({ 
	secret: "schedulerSIKRIT", 
	saveUninitialized: true,
    resave: true 
}));  //MUST be used prior to Passport.Session;
app.use(Passport.initialize());
app.use(Passport.session());


//SERIALIZATIONS / DESERIALIZATIONS
Passport.serializeUser(function(user, done) {
	done(null, user);
});

Passport.deserializeUser(function(obj, done) {
	done(null, obj);
});


//STRATEGIES
// Passport.use(new LocalStrategy({
// 	// usernameField: ,
// 	// passwordField: 
// 	}, function(username, password, done) {
// 		User.findOne({ username: username }, function(error, user) {
// 			if(!user) {
// 				return done(null, false, { message: "Incorrect Username" });
// 			}
// 			if(!user.validPassword(password)) {
// 				return done(null, false, { message: "Incorrect Password" });
// 			}
// 		});
// }));

Passport.use(new GoogleStrategy({
    clientID: "889269205616-h159qj74s29tekdu5kjtad84v4145b94.apps.googleusercontent.com",
    clientSecret: "2X8L2ym2gZMhlUzS97Egrz8_",
    callbackURL: "http://localhost:9999/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    UserCtrlr.updateOrCreate(profile).then(function(results) {
    	done(null, results);
    }, function(error) {
    	done(error, profile);
    });
  }
));


//AUTHENTICATION REQUESTS********
var isAuthed = function(req, res, next) {
	if(!req.isAuthenticated()) {
		return res.status(403).end();
	}
	else {
		console.log("IS AUTHED")
		return next();
	}
};


//***********************LOCAL************************
// app.post("/api/auth", Passport.authenticate('local', {
// 	successRedirect: '/auth/',
// 	failureRedirect: "/"
// }));

// app.post("/api/register", function(req, res) {
// 	var newUser = new User(req.body);
// 	newUser.save(function(error, user) {
// 		if(!error) {
// 			return res.json(user);
// 		}
// 		else {
// 			return res.status(500).json(error);
// 		}
// 	});
// });


//**********************GOOGLE***********************
app.get('/auth/google',	Passport.authenticate('google', { 
	scope: 'https://www.googleapis.com/auth/plus.login'
	// "https://www.googleapis.com/auth/calendar"
	})
);
app.get('/auth/google/callback', Passport.authenticate('google', { 
  	successRedirect: "/#/user",
  	failureRedirect: '/'
	})
 );



//********************FACEBOOK***********************
//********************INSTAGRAM***********************
//********************TWITTER************************
//********************GITHUB**************************





//ENDPOINTS**********************
app.get("/api/user", isAuthed, UserCtrlr.getUser);

app.post("/api/calendar", isAuthed, CalendarCtrlr.putCalendar);

//CONNECTIONS********************
Mongoose.connect(MongoUri);

Mongoose.connection.once("open", function() {
	console.log("Connected to DB at " + MongoUri);
});

app.listen(port, function() {
	console.log("Listening on port " + port);
});