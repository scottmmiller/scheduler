var app = angular.module("scheduler", ["ngRoute"]);

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
			templateUrl: "public.templates/calendar.html",
			controller: "UserCtrlr",
			resolve: {
				user: function(userService) {
					return userService.getUser();
				}
			}
		})
		.otherwise("/");

});