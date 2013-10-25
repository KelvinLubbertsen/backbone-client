var app = app || {};
var currentView = currentView || null;

(function () {
	'use strict';
	
	var TableRouter = Backbone.Router.extend({
		routes: {
		'medewerker': 'medewerker',
		'klant': 'klant',
		'': 'klant'
		},
		medewerker: function(){
			/*if(currentView != null)
				currentView.close();*/
			var view = new app.MedewerkerView;
			
			app.OpenedView = 'medewerker';
			$('.view').hide();
			$('#medewerker-view').show();
			view.update();
			
			currentView = view;
		},
		klant: function(){
			/*if(currentView != null)
				currentView.close();*/
			
			var view = new app.KlantView;
			
			app.OpenedView = 'klant';
			$('.view').hide();
			$('#klant-view').show();
			view.update();
			
			currentView = view;
		}
	});
	
	app.TableRouter = new TableRouter();
	Backbone.history.start();
})();
 // Made by Kelvin Lubbertsen s1046292, Roland Bakker s1049882, Marien Pflaum s1049310