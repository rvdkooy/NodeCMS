var assert = require("assert");
var ResponseObject = require("../mocks/mockedResponseObject");
var HomeController = require('../../../controllers/admin/homecontroller.js');

describe('Admin home controller specs:', function(){

	var responseObject = new ResponseObject();
	
	describe('When requesting the index,', function(){
		
		var controller = new HomeController();
		controller.index(null, responseObject);
		
		it('It should render the index with the standard layout', function(){
			assert.equal(responseObject.view, 'system/views/home/index');
			assert.equal(responseObject.options.layout, 'system/views/shared/layout');
		});
	});
});