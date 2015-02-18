"use strict";

var Mongoose = require("mongoose");
var Bcrypt = require("bcrypt-nodejs");
var q = require("q");
var Moment = require("moment");

var schema = Mongoose.Schema({
	_id: { type: String, unique: true, required: true },		//googleID
	name: [{
		given_name: { type: String, required: true },
		family_name: { type: String, required: true}
	}],
	dob: { type: Date },
	gender: { type: String, uppercase: true, required: true },
	plusLink: String,
	picture: String,
	active: { type: Boolean, default: true }
});


module.exports = Mongoose.model("User", schema);