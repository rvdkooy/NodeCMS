var assert = require("assert");

describe('Default home controller specs:', function(){

	var controller = require('../../../controllers/default/homecontroller.js');
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
			assert.equal(responseObject.view, 'default/home/index');
			assert.equal(responseObject.options.layout, 'default/layout.ejs');
			assert.equal(responseObject.options.title, 'Express');
		});
	});
});