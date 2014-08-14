var assert = require("assert");
var ResponseObject = require("../mocks/mockedResponseObject");

describe('Admin home controller specs:', function(){

	var controller = require('../../../controllers/admin/homecontroller.js');
	var responseObject = new ResponseObject();
	
	describe('When requesting the index,', function(){
		
		beforeEach(function(){
			controller.index(null, responseObject);
		});

		it('It should render the index with the standard layout', function(){
			assert.equal(responseObject.view, 'system/views/admin/home/index');
			assert.equal(responseObject.options.layout, 'system/views/admin/shared/layout');
		});
	});
});