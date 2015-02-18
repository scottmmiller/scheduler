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
		.when("/auth/user", {
			templateUrl: "public.templates/user.html",
			controller: "UserCtrlr",
			resolve: {

			}
		})
		.when("/auth/calendar", {
			templateUrl: "public.templates/calendar.html",
			controller: "CalendarCtrlr",
			resolve: {

			}
		})
		.otherwise("/");

});