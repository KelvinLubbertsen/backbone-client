var app = app || {};

(function ($) {
	'use strict';
	
	app.KlantView = Backbone.View.extend({
		el: '#klant-view',
		
		initialize: function(){
			app.tables.bind('add', this.update);
			app.tables.bind('change', this.update);
			$(this.el).undelegate('#book-submit', 'click');
			if(app.tables.length == 0)
			{
				//console.log('test');
				/*app.tables.add([{name:"tafel 1", reserved: false, orders: [], capacity: 2},
								{name:"tafel 2", reserved: false, orders: [], capacity: 4},
								{name:"tafel 3", reserved: false, orders: [], capacity: 4}]);*/
				
				app.tables.add([new app.Table({name:"tafel 1", reserved: false, orders: ["test", "test123"], capacity: 2}),
								new app.Table({name:"tafel 2", reserved: false, orders: ["abc", "def"], capacity: 4}),
								new app.Table({name:"tafel 3", reserved: false, orders: ["test123", "test12"], capacity: 4})]);
				
				$('#tafels-list').html('');
								
				$(app.tables.free()).each(function(key, value) {
					var option = $('<option>');
					option.text(value.get('name') + " met " + value.get('capacity') + " stoelen");
					option.attr('id', value.get('name'));
					$('#tafels-list').append(option);
				});
			}
			//this.model = app.tables;
			
			
			
			
		},
		events: {
			'click #book-submit': 'book'
		},
		
		book: function(data) {
			var options = $('#tafels-list option');
			var selectedTable;
			options.each(function(key, value){
				var option = $(value);
				//console.log(option[0].selected);
				
				if(option[0].selected == true)
				{
					selectedTable = option.attr('id');
					return;
				}
			});
			var table = app.tables.getByName(selectedTable);
			table[0].set({'reserved': 'true'});
		},
		update: function(data) {
			$('#tafels-list').html('');
			if(data != null)
				$('#book-message').text("You booked a table for " + data.get('capacity'));
			
			var available = app.tables.free().length;
			var total = app.tables.length;
			
			$('#book-info').text('There are ' + available + ' from ' + total + ' table available tonight!');
			
			$(app.tables.free()).each(function(key, value) {
				var option = $('<option>');
				option.text(value.get('name') + " met " + value.get('capacity') + " stoelen");
				option.attr('id', value.get('name'));
				$('#tafels-list').append(option);
			});
		},
		close: function() {
			this.remove();
			this.unbind();
			this.unbind('change', this.update);
			this.unbind('add', this.update);
		}
	});
})(jQuery);