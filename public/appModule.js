var app = angular.module("scheduler", ["ngRoute"]);

app.config(function($routeProvider) {
	console.log("WHAT UP")
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
				updateUser: function(userService) {
					return userService.updateUser();
				},
				getUser: function(userService) {
					return userService.getUser();
				}
			}
		})
		.when("/calendar", {
			templateUrl: "public.templates/calendar.html",
			controller: "CalendarCtrlr",
			resolve: {

			}
		})
		.otherwise("/");

});