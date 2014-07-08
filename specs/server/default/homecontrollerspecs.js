var assert = require("assert");

describe('default home controller specs', function(){

	var controller = require('../../../controllers/default/homecontroller.js');
	var responseObject = {
		render: function(view, options){
			this.view = view;
			this.options = options;
		}
	};
	
	describe('when requesting the index', function(){
		
		beforeEach(function(){
			controller.index(null, responseObject);
		});

		it('should render the index with the standard layout', function(){
			assert.equal(responseObject.view, 'default/home/index');
			assert.equal(responseObject.options.layout, 'default/layout.ejs');
			assert.equal(responseObject.options.title, 'Express');
		});
	});
});