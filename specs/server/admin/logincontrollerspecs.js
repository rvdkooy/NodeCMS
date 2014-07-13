var assert = require("assert");

describe('Login controller specs:', function(){

	var controlller = require('../../../controllers/admin/logincontroller.js');
	var responseObject = {
		render: function(view, options){
			this.view = view;
			this.options = options;
		}
	};
	
	describe('When requesting the index,', function(){
		
		beforeEach(function(){
			controlller.index(null, responseObject);
		});

		it('It should render the index without a layout', function(){
			assert.equal(responseObject.view, 'admin/login/index');
			assert.equal(responseObject.options.layout, false);
		});
	});
});