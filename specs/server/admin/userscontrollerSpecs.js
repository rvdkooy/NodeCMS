var assert = require("assert");
var ResponseObject = require("../mocks/mockedResponseObject");

describe('User controller specs:', function(){
	
	describe('When requesting the index,', function(){

		var UsersController = require('../../../controllers/admin/userscontroller.js');
		var responseObject = new ResponseObject();
		var controller = new UsersController();
		
		controller.index(null, responseObject);

		it('It should render the index with the standard layout', function(){
			assert.equal(responseObject.view, 'admin/users/index');
			assert.equal(responseObject.options.layout, 'admin/shared/layout');
		});
	});
});