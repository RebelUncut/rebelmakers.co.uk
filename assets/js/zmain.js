$("ul.nav").scrollToFixed({
	fixed: function() {
		var navBarHeight = $("ul.nav").outerHeight();
		$(".page").css({"margin-top": navBarHeight});
	},
	postFixed: function() {
		$(".page").css({"margin-top": 0});
	}
}); 

$("header").parallax({
	imageSrc: "/img/header.jpg"
});

$("#clubs .match").matchHeight();

var eventbriteToken = "4V67L4JUEJAOGLKE2VBT";

$("#clubs > ul > li").each(function() {
	var element = $(this);
	var organiserId = $(this).find(".id").html();
	$.getJSON("https://www.eventbriteapi.com/v3/events/search/?token=" + eventbriteToken + "&organizer.id=" + organiserId + "&expand=venue", function(data) {
		var eventsUpcoming = data.events.length;
		if(eventsUpcoming < 1) {
			element.find(".date").html("not planned yet.");
		} else {
			var dateOfNextEvent = data.events[0].start.local;
			var friendlyDate = new Date(dateOfNextEvent).toString("MMMM d yyyy");
			element.find(".date").html(friendlyDate);
		}
	});
});