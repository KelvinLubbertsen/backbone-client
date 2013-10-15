(function($) {
	
	Table = Backbone.Model.extend({
		name: null
	});
	
	Tables = Backbone.Collection.extend({
		
		initialize: function(models, options){
			this.bind("add", options.view.addTable);
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
	
	
	
	Router = Backbone.Router.extend({
		routes: {
			"medewerker": "medewerker",
			"klant": "klant",
			"": "klant"
		},
		
		medewerker: function() {
			$('#medewerker-view').show();
			$('#klant-view').hide();
		},
		klant: function() {
			$('#medewerker-view').hide();
			$('#klant-view').show();
		},
	});
	
	var router = new Router();
	Backbone.history.start();
	
	var appview = new AppView;
	
})(jQuery);
