"use strict";

var app = angular.module("scheduler", ["ngRoute", "ui.calendar", "ui.bootstrap", "firebase"]);

app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "public.templates/auth.html",
			controller: "AuthCtrlr",
			resolve: {

			}
		})
		.when("/user", {
			templateUrl: "public.templates/user.html",
			controller: "UserCtrlr",
			resolve: {
				user: function(userService) {
					return userService.getUser();
				}
			}
		})
		.when("/default/calendar", {
			templateUrl: "public.templates/fullCalendar.html",
			controller: "CalendarCtrlr",
			resolve: {
				user: function(userService) {
					return userService.getUser();
				}, 
				calendar: function(userService) {
					return userService.getCalendar();
				}
				// deleteEvent: function(userService) {
				// 	return userService.deleteEvent();
				// }
			}
		})
		.otherwise("/");

});


