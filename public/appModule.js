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
				user: function(userService) {
					return userService.updateUser();
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