var app = app || {};

(function () {
	'use strict';
	
	app.Table = Backbone.Model.extend({
		defaults: {
		name: '',
		reserved: false,
		orders: [],
		capacity: 0
		}
	});
})();

 // Made by Kelvin Lubbertsen s1046292, Roland Bakker s1049882, Marien Pflaum s1049310