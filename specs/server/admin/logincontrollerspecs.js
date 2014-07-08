var assert = require("assert");

describe('login controller specs', function(){

	var controlller = require('../../../controllers/admin/logincontroller.js');
	var responseObject = {
		render: function(view, options){
			this.view = view;
			this.options = options;
		}
	};
	
	describe('when requesting the index', function(){
		
		beforeEach(function(){
			controlller.index(null, responseObject);
		});

		it('should render the index without a layout', function(){
			assert.equal(responseObject.view, 'admin/login/index');
			assert.equal(responseObject.options.layout, false);
		});
	});
});