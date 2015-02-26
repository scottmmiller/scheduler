"use strict";

var User = require("./../server.models/server.userModel");
var q = require("q");
var Request = require("request");

module.exports = {
	getCalendar: function(req, res) {
		Request({
			method: "GET",
			url: "https://www.googleapis.com/calendar/v3/calendars/h1f2a52nhqnmm47rd6cbctlee0@group.calendar.google.com/events?key=AIzaSyDKC6LVrIBAGBoznTB5aJ7NKsI3C96UDz4"
			},
			function(error, response, body) {
				console.log(body)
				if(!error) {
					// console.log("server.CalendarCtrlr response ", JSON.parse(response))
					return res.json(body);
				} else {
					return res.json(error);
				}
			}
		)
	},

	deleteEvent: function(req, res) {
		console.log("servCalCtrlr: ", req.query)
		Request({
			method: "DELETE",
			url: "https://www.googleapis.com/calendar/v3/calendars/h1f2a52nhqnmm47rd6cbctlee0@group.calendar.google.com/events/" + req.query.eventId + "?key=AIzaSyDKC6LVrIBAGBoznTB5aJ7NKsI3C96UDz4"
		},
		function(error, response, body) {
			if(!error) {
				return res.json(body);
			} else {
				return res.json(error);
			}
		})

	}
};




	// updateOrCreate: function(profile) {
	// 	var deferred = q.defer();
	// 	var queryObj = { googleId: profile.id };
	// 	var updateObj = {
	// 				googleId: profile.id,
	// 				display_name: profile.displayName,
	// 				name: [{
	// 					given_name: profile._json.given_name,
	// 					family_name: profile._json.family_name
	// 				}],
	// 				plusLink: profile._json.link,
	// 				picture: profile._json.picture,
	// 				gender: profile._json.gender
	// 				};
	// 	var optionsObj = {upsert: true};

	// 	User.findOneAndUpdate(queryObj, updateObj, optionsObj, function(error, response) {
	// 		if(!error) {
	// 			deferred.resolve(response);
	// 		}
	// 		else {
	// 			deferred.reject(error);
	// 		}
	// 	});
		
	// 	return deferred.promise;
	// },
	// // findOne: function(profile) {
	// // 	var deferred = q.defer();
	// // 	User.findOne({ googleId: profile.id }, function(error, response) {
	// // 		if (!error) {
	// // 			return deferred.resolve(response);
	// // 		} else {
	// // 			return deferred.reject("UserCtrl findOne ERROR" + error);
	// // 		}
	// // 	});
	// // 	return deferred.promise;
	// // },
	// getUser: function(req, res) {
	// 	res.status(200).json(req.user);
	// }
