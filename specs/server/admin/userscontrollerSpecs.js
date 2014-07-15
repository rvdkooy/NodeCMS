var assert = require("assert");

var ResponseObject = function(){
	this.render = function(view, options){
		this.view = view;
		this.options = options;
	};
}

describe('User controller specs:', function(){
	
	describe('When requesting the index,', function(){
		
		var controller = require('../../../controllers/admin/userscontroller.js');
		var responseObject = new ResponseObject();

		controller.index(null, responseObject);

		it('It should render the index with the standard layout', function(){
			assert.equal(responseObject.view, 'admin/users/index');
			assert.equal(responseObject.options.layout, 'admin/shared/layout');
		});
	});

	describe('When requesting the users list view,', function(){
		
		var controller = require('../../../controllers/admin/userscontroller.js');
		var responseObject = new ResponseObject();
		
		controller.listUsers(null, responseObject);

		it('It should render the list users view without a layout', function(){
			assert.equal(responseObject.view, 'admin/users/listusers');
			assert.equal(responseObject.options.layout, false);
		});
	});

	describe('When requesting the edit user view,', function(){
		
		var controller = require('../../../controllers/admin/userscontroller.js');
		var responseObject = new ResponseObject();
		
		controller.editUser(null, responseObject);

		it('It should render the edit user view without a layout', function(){
			assert.equal(responseObject.view, 'admin/users/edituser');
			assert.equal(responseObject.options.layout, false);
		});
	});
});