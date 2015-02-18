"use strict";

var Mongoose = require("mongoose");
var Bcrypt = require("bcrypt-nodejs");
var q = require("q");
var Moment = require("moment");

var schema = Mongoose.Schema({
	_id: { type: String, unique: true, required: true },		//username
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	dob: { type: Date },
	// gender: { type: String, max: 1, enum: ["M", "F"], required: true },
	active: { type: Boolean, default: true }
});


//PASSWORD HASH*************************
schema.pre("save", function(next) {
	var user = this;
	if (!user.isModified("password")) {
		return next();
	}
	Bcrypt.genSalt(14, function(error, salt) {
		if (error) {
			return next(error);
		}
		Bcrypt.hash(user.password, salt, function(error, hash) {
			user.password = hash;
			return next();
		});
	});
});

schema.methods.comparePassword = function(providedPassword) {
	var deferred = q.defer();
	Bcrypt.compare(providedPassword, this.password, function(error, isMatch) {
		if (error) {
			deferred.reject(error);
		}
		else {
			deferred.resolve(isMatch);
		}
	});
	return deferred.promise;
};


module.exports = Mongoose.model("newUser", schema);