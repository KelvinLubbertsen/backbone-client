/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var Tables = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Table,
		
		free: function() {
			return this.where({reserved:false});
		},
		getByName: function(name) {
			return this.where({name: name});
		}
	});
	
	// Create our global collection of **Todos**.
	app.tables = new Tables();
})();

 // Made by Kelvin Lubbertsen s1046292, Roland Bakker s1049882, Marien Pflaum s1049310