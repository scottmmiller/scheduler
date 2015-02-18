"use strict";

var User = require("./../server.models/server.userModel");
var q = require("q");

module.exports = {
	updateOrCreate: function(profile) {
		var deferred = q.defer();
		// var id = User._id;
		User.findOne({ googleId: profile._id }, function(error, results) {
			if(error) {
				return deferred.reject("User.update1: " + error);
			} else if (results) {
				User.update({ _id: results._id }, {
					_id: results._id,
					display_name: profile.displayName,
					name: [{
						given_name: profile._json.given_name,
						family_name: profile._json.family_name
					}],
					plusLink: profile._json.link,
					picture: profile._json.picture,
					gender: profile._json.gender
				}, function(error, results) {
					if (error) { 
						return deferred.reject("User.update2: " + error);
					} else {
						return deferred.resolve(results);
					}
				});
			} else {
				User.create({
					_id: profile.id,
					display_name: profile.displayName,
					name: [{
						given_name: profile._json.given_name,
						family_name: profile._json.family_name
					}],
					plusLink: profile._json.link,
					picture: profile._json.picture,
					gender: profile._json.gender
				}, function(error, results) {
					if (error) {
						return deferred.reject("User.update3: " + error);
					} else {
						return deferred.resolve(results);
					}
				});
			}
		});
		return deferred.promise;
	},
	findOne: function(profile) {
		var deferred = q.defer();
		User.findOne({ googleId: profile.id }, function(error, response) {
			if (!error) {
				return deferred.resolve(response);
			} else {
				return deferred.reject(error, "UserCtrl findOne ERROR");
			}
		});
		return deferred.promise;
	},
	getUser: function(profile) {
		var deferred = q.defer();
		User.findOne({ googleId: profile.id }, function(error, results) {
			if(!error) {
				return deferred.resolve(results);
			} else {
				return deferred.reject(error);
			}
		});
		return deferred.promise;
	}



};
