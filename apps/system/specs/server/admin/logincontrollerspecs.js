var assert = require("assert");
var ResponseObject = require("../mocks/mockedResponseObject");

describe('Login controller specs:', function(){

	var controlller = require('../../../controllers/admin/logincontroller.js');
	var responseObject = new ResponseObject();
	
	describe('When requesting the index,', function(){
		
		beforeEach(function(){
			controlller.index(null, responseObject);
		});

		it('It should render the index without a layout', function(){
			assert.equal(responseObject.view, 'system/views/admin/login/index');
			assert.equal(responseObject.options.layout, false);
		});
	});
});