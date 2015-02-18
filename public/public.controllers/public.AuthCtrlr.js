var app = angular.module("scheduler");

app.controller("AuthCtrlr", function($scope, authService, $location) {

	$scope.test = "AuthCtrlr Test";

	$scope.googleLogin = function() {
		redirectTo: $location.path("/auth/google")
	};
});