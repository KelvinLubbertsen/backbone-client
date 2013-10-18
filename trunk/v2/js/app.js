var app = app || {};
var ENTER_KEY = 13;

$(function () {
	'use strict';
	
	$('.view').hide();
	switch(app.OpenedView) {
		case 'medewerker': 
			//app.AppView = app.MedewerkerView;
			$('#medewerker-view').show(); 
			break;
		case 'klant': //app.AppView = app.KlantView;
			$('#klant-view').show();
			break;
	}
	//new app.AppView;
	
});