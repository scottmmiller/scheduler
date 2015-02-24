var app = angular.module("scheduler", ["ngRoute", "ui.calendar", "ui.bootstrap"]);

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
				}
				// putCalendar: function(userService) {
				// 	return userService.putCalendar();
				// }
			}
		})
		.otherwise("/");

});


