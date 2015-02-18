var app = angular.module("scheduler");

app.controller("UserCtrlr", function($scope, updateUser, getUser) {

	$scope.test = "UserCtrlr Test";

	$scope.user = function(user) {
		if(!user) {
			return updateUser;
		} else {
			return getUser;
		}

	};

});