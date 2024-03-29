var app = app || {};
var selectedTable = selectedTable || "";

(function ($) {
	'use strict';
	
	app.MedewerkerView = Backbone.View.extend({
		el: '#medewerker-view',
		
		initialize: function(){
			this.model = app.tables;
			
			$(this.el).undelegate('#order-submit', 'click');
			$(this.el).undelegate('.tafel', 'click');
			
			app.tables.bind('change', this.update);
			app.tables.bind('add', this.update);
			
		},
		
		update: function(){
			this.model = app.tables;
			$('#tafels').html('');
			app.tables.each(function(value) {
				var tafel = $('<div>');
				tafel.addClass('tafel');
				if(value.get('reserved') == 'true')
					tafel.addClass('booked');
				
				if(value.get('name') == selectedTable)
					tafel.addClass('selected');
				
				tafel.attr('id', value.get('name'));
				var titel = $('<h2>');
				titel.text(value.get('name'));
				titel.appendTo(tafel);
				var orders = $('<ul>');
				for(var i = 0; i < value.get('orders').length; i++)
				{
					var li = $('<li>');
					li.text(value.get('orders')[i]);
					li.appendTo(orders);
				}
				
				orders.appendTo(tafel);
				tafel.appendTo($('#tafels'));
			});
		},
		
		events: {
			'click .tafel': 'tafelClick',
			'click #order-submit': 'addOrder'
		},
		
		tafelClick: function(data) {
			var temp = $(data.target).closest('.tafel') ;
			var name = $(temp).attr('id');
			var table = app.tables.getByName(name);
			selectedTable = table[0].get('name');
			this.update();
		},
		
		addOrder: function() {
			var newOrder = $('#order-line').val();
			if(selectedTable != "" && newOrder != "")
			{
				var table = app.tables.getByName(selectedTable);
				var orders = table[0].get('orders');
				orders[orders.length] = newOrder;
				table[0].set({orders: orders});
				this.update();
			}
		},
		close: function() {
			this.remove();
			this.unbind();
			this.unbind('change', this.update);
			this.unbind('add', this.update);
		}
		
		/*update: function(data) {
			app.tables.each(function(key, value) {
				var tafel = $('<div>');
				var titel = $('<h2>');
				title.text(value.name);
				title.appendTo(tafel);
				var orders = $('<ul>');
				for(var i = 0; i < value.orders.length; i++)
				{
					var li = $('<li>');
					li.text(value.orders[i]);
					li.appendTo(orders);
				}
				
				orders.appendTo(tafel);
				
				tafel.appendTo($('#tafels'));
			});
		}*/
		
	});
})(jQuery);
 // Made by Kelvin Lubbertsen s1046292, Roland Bakker s1049882, Marien Pflaum s1049310