var app = angular.module("scheduler");

app.controller("UserCtrlr", function($scope, user) {

	$scope.test = "UserCtrlr Test";

	$scope.user = user;



});