"use strict";

var User = require("./../server.models/server.userModel");
var q = require("q");

module.exports = {
	updateOrCreate: function(profile, accessToken) {
		var deferred = q.defer();
		var queryObj = { googleId: profile.id };
		var updateObj = {
					googleId: profile.id,
					display_name: profile.displayName,
					name: [{
						given_name: profile._json.given_name,
						family_name: profile._json.family_name
					}],
					plusLink: profile._json.link,
					picture: profile._json.picture,
					gender: profile._json.gender,
					accessToken: accessToken
					};
		var optionsObj = {upsert: true};

		User.findOneAndUpdate(queryObj, updateObj, optionsObj, function(error, response) {
			if(!error) {
				deferred.resolve(response);
			}
			else {
				deferred.reject(error);
			}
		});
		
		return deferred.promise;
	},
	// findOne: function(profile) {
	// 	var deferred = q.defer();
	// 	User.findOne({ googleId: profile.id }, function(error, response) {
	// 		if (!error) {
	// 			return deferred.resolve(response);
	// 		} else {
	// 			return deferred.reject("UserCtrl findOne ERROR" + error);
	// 		}
	// 	});
	// 	return deferred.promise;
	// },
	getUser: function(req, res) {
		res.status(200).json(req.user);
	}
};
