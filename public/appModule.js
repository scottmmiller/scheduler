var app = angular.module("scheduler", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "templates/home.html",
			controller: "HomeCtrlr"
			resolve: {

			};
		})
		.otherwise("/");

});