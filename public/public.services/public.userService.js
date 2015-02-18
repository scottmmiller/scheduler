var app = angular.module("scheduler");

app.service("userService", function($http, $q) {

		var user = {};

		this.updateUser = function() {
			return $http({
				method: "GET",
				url: "/api/user"
			}).then(function(results) {
				user = res.data;
				console.log("User updated: ", user);
				return user;
			});
		};

		this.getUser = function() {
		return user;
	};


});