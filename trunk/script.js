(function($) {
	
	Table = Backbone.Model.extend({
		defaults: {
		name: null,
		reserved: false,
		orders: []}
	});
	
	Tables = Backbone.Collection.extend({
		
		initialize: function(){
		},
		
		localStorage: new Backbone.LocalStorage('tables-backbone'),
		
		freeTable: function(table) {
			return table.reserved;
		},
		
		free: function() {
			//return this.without.apply(this, this.freeTable);
			
			return this.where({reserved: false});
		},
		
		find: function(name) {
			return this.where({name: name});
		}
	});
	
	KlantView = Backbone.View.extend({
		el: $('#klant-view'),
		
		initialize: function(){
			this.model = new Tables(null, {view: this});
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.render);
			this.listenTo(this.model, 'add', this.render);
			this.model.add(new Table({name: "tafel 1"}));
			this.model.add(new Table({name: "tafel 2"}));
			this.model.add(new Table({name: "tafel 3"}));
			console.log(this.model);
		},
		template: _.template($('#klant-view-template').html()),
		events: {
			"click #submit-booking": "submitBooking"
		},
		submitBooking: function(data)
		{
			var options = $('#tables-book-list option');
			var name;
			options.each(function(key, item) {
				if(item.selected)
				{
					name = $(item).text();
					
				
				}
			});
			var item = this.model.find(name);
			item = item[0];
			console.log(item);
			item.set({reserved: true});

			$('#klant-view-message').text("You booked " + item.get('name') + "!");
		}
		,
		render: function() {
			/*for(var i = 0; i < this.model.length; i++)
			{
				var option = $('<option>');
				option.text(this.model[i].get('name'));
				$('#tables-book-list').append(option);
				console.log('<option>' + this.model.i.get('name') + '</option>');
			}*/
			//$('#tables-book-list').html('');
			
			/*$(this.model.free()).each(function(key,item) {
				var option = $('<option>');
				option.text(item.get('name'));
				option.addClass('dropdown-item');
				option.val(item.cid);
				$('#tables-book-list').append(option);
			});*/
			
			$(this.model.free()).each(function(key,item) {
				var view = new OptionRowView({model: item});
				$('#tables-book-list').append(view.$el);
			});
			
			return this;
		}
		
	});
	
	OptionRowView = Backbone.View.extend({
		_template: _.template($('#klant-view-dropdown-template').html()),
		
		initialize: function() {this.render();},
		
		render: function() {
			this.$el.html(this._template(this.model.toJSON()));
			return this;
		}
	});
	
	MedewerkerView = Backbone.View.extend({
		
	});
	
	var appview;
	
	Router = Backbone.Router.extend({
		routes: {
			"medewerker": "medewerker",
			"klant": "klant",
			"": "klant"
		},
		
		medewerker: function() {
			/*$('#medewerker-view').show();
			$('#klant-view').hide();*/
			appview = new MedewerkerView;
		},
		klant: function() {
			/*$('#medewerker-view').hide();
			$('#klant-view').show();*/
			appview = new KlantView;
		},
	});
	
	var router = new Router();
	Backbone.history.start();
	
	//var appview = new KlantView;
	
})(jQuery);
