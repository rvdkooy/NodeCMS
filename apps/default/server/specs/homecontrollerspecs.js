var assert = require("assert");

describe('Default home controller specs:', function(){

	var controller = require('../controllers/homecontroller.js');
	var responseObject = {
		render: function(view, options){
			this.view = view;
			this.options = options;
		}
	};
	
	describe('When requesting the index,', function(){
		
		beforeEach(function(){
			controller.index(null, responseObject);
		});

		it('It should render the index with the standard layout', function(){
			assert.equal(responseObject.view, 'apps/default/server/views/home/index');
			assert.equal(responseObject.options.layout, 'apps/default/server/views/layout.ejs');
			assert.equal(responseObject.options.title, 'Express');
		});
	});
});