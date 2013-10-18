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