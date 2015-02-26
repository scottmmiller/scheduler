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
					// console.log(results)
					return user;
			}, function(error) {
				if(error.status === 403) {
					return $location.path("/");
				}
			});

		};

		this.getCalendar = function() {
			return $http({
				method: "GET",
				url: "/api/calendar"
			}).then(function(results) {
				results.data = JSON.parse(results.data)
				var calendar = results.data.items;
					console.log("userService results: ", results.data);
					return calendar;
			})
		};

		this.deleteEvent = function(eventId) {
			console.log("userServ: ", eventId)
			return $http({
	        	method: "DELETE",
	        	url: "/api/calendar?eventId=" + eventId
	        }).then(function(results) {
	        	console.log(results)
	        }, function(error) {
	        	return error;
	        })
		};



});

// eventId = https://www.google.com/calendar/event?eid=cWNsamIzdXBudHB0bDloN2JzM2UwajRkb2dfMjAxNTAyMjVUMjAwMDAwWiBoMWYyYTUybmhxbm1tNDdyZDZjYmN0bGVlMEBn