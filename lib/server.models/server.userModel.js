"use strict";

var Mongoose = require("mongoose");
var Bcrypt = require("bcrypt-nodejs");
var q = require("q");
var Moment = require("moment");

var schema = Mongoose.Schema({
	googleId: { type: String, unique: true, required: true },		//googleID
	display_name: { type: String, required: true},
	name: [{
		given_name: { type: String, required: true },
		family_name: { type: String, required: true}
	}],
	dob: { type: Date },
	gender: { type: String, uppercase: true, required: true },
	plusLink: String,
	picture: String,
	accessToken: {type: String, required: true},
	active: { type: Boolean, default: true }
});


module.exports = Mongoose.model("User", schema);