$(document).ready(function() {

// Page is now ready, initialize the calendar...
	$("#scheduler").fullCalendar({
		//options and callbacks go here...

		height: "auto",
		googleCalendarApiKey: "AIzaSyDKC6LVrIBAGBoznTB5aJ7NKsI3C96UDz4",
		defaultTimedEventDuration: "01:00:00",
		eventSources: [
			{
				events: {
					googleCalendarId: "h1f2a52nhqnmm47rd6cbctlee0@group.calendar.google.com"
				},
				events: [
				{
					title: "Out of Office",		//LUNCH
					start: "12:00:00"
				}]
			}
		],
		weekends: false,
		defaultView: "agendaWeek",
		views: {
			agendaWeek: {
				type: "agenda",
				minTime: "09:00:00",
				maxTime: "17:00:00"
			}
		},
		businessHours: {
			start: "09:00",
			end: "17:00"
		}
	});

});
