"use strict";

var app = angular.module("scheduler");
var gCalApiKey = "AIzaSyDKC6LVrIBAGBoznTB5aJ7NKsI3C96UDz4";
var gCalId = "h1f2a52nhqnmm47rd6cbctlee0@group.calendar.google.com";



app.controller("CalendarCtrlr", function($scope, $http, $firebase, userService, user, calendar) {

	var firebaseRef = new Firebase("https://schedulerapp.firebaseio.com/");

	$scope.user = user;

	$scope.uiConfig = {
		calendar: {
			// height: "auto",
			allDayDefault: false,
			forceEventDuration: true,
			weekends: false,
			defaultTimedEventDuration: "01:00:00",
			defaultView: "agendaWeek",
			minTime: "09:00:00",
			maxTime: "17:00:00",
			dayClick: function(date, jsEvent, view) {
				var dateObj = {};
				var date2 = new Date(date.getTime());
				var date3 = new Date(date.getTime() + 3600000);
				dateObj.title = "Time Slot Filled";
				dateObj.start =  date.toDateString() + " at " + date.getHours() + ":" + date.getMinutes();
				
				date.setHours(date.getHours()+1);
				dateObj.end = date.toDateString() + " at " + date.toLocaleTimeString();
				// console.log(date.toDateString() + " @ " + date.toLocaleTimeString())

				//****PUSH TO EVENTS ARRAY******
		        $scope.events.push({title: dateObj.title, start: date2, end: date3});
		        // console.log($scope.events)
		        // console.log(dateObj.title + " on " + dateObj.start)

		        //****PUSH TO FIREBASE**** AFTER CONFIRM & 
		        firebaseRef.push(dateObj);
		        	//REDIRECT TO /#/DEFAULT/CALENDAR
		    },
		    eventClick: function(event, jsEvent, view) {

		    	// console.log(event)

		    	//SUPPOSED TO...PREVENT OPENING EVENT IN TAB/NEW BROWSER
		    	for(var i = 0; i < $scope.events.length; i++) {
		    		if(event.__uiCalId === $scope.events[i].__uiCalId) {
	    				$scope.events.splice(i, 1);
			    	}
		    	};
		    	// console.log("pubCalCtrlr.$scope.events :", event)
		    	var eventId = event.id;
		    		// console.log(eventId)
		    	userService.deleteEvent(eventId);
		    	// console.log("pubCalCtlrl: ", calendar)
		    },
		    // eventMouseover: function(event, jsEvent, view) {
		    // 	// if(event.url) {
		    // 	// 	return event.url = false;
		    // 	// }
		    // 	console.log(event)
		    // }
		}
	};

	$scope.eventSource =
		{
			googleCalendarApiKey: gCalApiKey,
			googleCalendarId: gCalId,
			className: "googleCalendar-event"
		}

	$scope.events = [
		// {
		// 	title: calendar.event.title,
		// 	start: calendar.event.start_time,
		// 	end: calendar.event.end_time
		// }
	];

	$scope.eventSources = [$scope.eventSource, $scope.events];

	// $scope.putCalendar = putCalendar;




});

// https://www.google.com/calendar/event?eid=cWNsamIzdXBudHB0bDloN2JzM2UwajRkb2dfMjAxNTAyMjVUMjAwMDAwWiBoMWYyYTUybmhxbm1tNDdyZDZjYmN0bGVlMEBn
// https://www.google.com/calendar/event?eid=cWNsamIzdXBudHB0bDloN2JzM2UwajRkb2dfMjAxNTAyMjNUMjAwMDAwWiBoMWYyYTUybmhxbm1tNDdyZDZjYmN0bGVlMEBn
// https://www.google.com/calendar/event?eid=cWNsamIzdXBudHB0bDloN2JzM2UwajRkb2dfMjAxNTAyMjVUMjAwMDAwWiBoMWYyYTUybmhxbm1tNDdyZDZjYmN0bGVlMEBn
// https://www.google.com/calendar/event?eid=MnFnMWJram0xajFkMms0b2VtcThqOThkbzQgaDFmMmE1Mm5ocW5tbTQ3cmQ2Y2JjdGxlZTBAZw
// https://www.google.com/calendar/event?eid=MnFnMWJram0xajFkMms0b2VtcThqOThkbzQgaDFmMmE1Mm5ocW5tbTQ3cmQ2Y2JjdGxlZTBAZw