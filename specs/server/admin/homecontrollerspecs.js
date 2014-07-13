var assert = require("assert");

describe('Admin home controller specs:', function(){

	var controller = require('../../../controllers/admin/homecontroller.js');
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
			assert.equal(responseObject.view, 'admin/home/index');
			assert.equal(responseObject.options.layout, 'admin/shared/layout');
		});
	});
});