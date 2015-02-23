var app = angular.module("scheduler");

app.controller("CalendarCtrlr", function($scope, $http, user) {

	$scope.user = user;

	$scope.uiConfig = {
		calendar: {
			// height: "auto",
			defaultTimedEventDuration: "01:00:00",
			allDayDefault: false,
			forceEventDuration: true,
			weekends: false,
			defaultView: "agendaWeek",
			minTime: "09:00:00",
			maxTime: "17:00:00",
			dayClick: function(date, jsEvent, view) {
		        $scope.events.push({title: "Filled", start: date, duration: "01:00:00"});
		    },
		    eventClick: function(event, jsEvent, view) {
		    	for(var i = 0; i < $scope.events.length; i++) {
		    		if(event.__uiCalId === $scope.events[i].__uiCalId) {
		    			$scope.events.splice(i, 1);
		    		}
		    	}
		    }
		}
	};

	$scope.eventSource =
		{
			googleCalendarApiKey: "AIzaSyDKC6LVrIBAGBoznTB5aJ7NKsI3C96UDz4",
			googleCalendarId: "h1f2a52nhqnmm47rd6cbctlee0@group.calendar.google.com",
			className: "googleCalendar-event"
		}

	$scope.events = [];

	$scope.eventSources = [$scope.eventSource, $scope.events];
});