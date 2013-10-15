(function($) {
	
	Table = Backbone.Model.extend({
		name: null,
		reserved: false,
		orders: []
	});
	
	Tables = Backbone.Collection.extend({
		
		initialize: function(models, options){
			this.bind("add", options.view.addTable);
		},
		
		localStorage: new Backbone.LocalStorage('tables-backbone'),
		
		freeTable: function(table) {
			return table.reserved;
		},
		
		freeTables: function() {
			//return this.without.apply(this, this.freeTable);
			
			return this.filter(function(table) {return table.reserved});
		}
	});
	
	AppView = Backbone.View.extend({
		el: $('body'),
		initialize: function(){
			this.tables = new Tables(null, {view: this});
		},
		events: {
			"click #submit": "submitTable", 
		},
		submitTable: function(){
			var table = $('#table-name').val();
			var table_model = new Table({name: table});
			this.tables.add(table_model);
			console.log(this.tables);
		},	
		addTable: function(model){
			$('#tables').append("<li>" + model.get('name') + "</li>");
		}
	});
	
	KlantView = Backbone.View.extend({
		el: $('#tables-book-list'),
		
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
		template: _.template($('#klant-view-dropdown-template').html()),
		events: {
		},
		render: function() {
			/*for(var i = 0; i < this.model.length; i++)
			{
				var option = $('<option>');
				option.text(this.model[i].get('name'));
				$('#tables-book-list').append(option);
				console.log('<option>' + this.model.i.get('name') + '</option>');
			}*/
			$('#tables-book-list').html('');
			console.log(this.model.get);
			this.model.get('freeTables').each(function(item) {
				var option = $('<option>');
				option.text(item.get('name'));
				$('#tables-book-list').append(option);
			});
			
			return this;
		}
		
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
			appview = new KlantView;
		},
		klant: function() {
			/*$('#medewerker-view').hide();
			$('#klant-view').show();*/
			appview = new KlantView;
			console.log('Klant!');
		},
	});
	
	var router = new Router();
	Backbone.history.start();
	
	//var appview = new KlantView;
	
})(jQuery);
