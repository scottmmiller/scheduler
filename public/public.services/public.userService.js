var app = angular.module("scheduler");

app.service("userService", function($http, $q, $location) {

		var user = {};

		this.getUser = function() {
			// var deferred = $q.defer();
			return $http({
				method: "GET",
				url: "/api/user"
			}).then(function(results) {
				var user = results.data;
					console.log(results)
					return user;
			}, function(error) {
				if(error.status === 403) {
					return $location.path("/");
				}
			});

		};



});