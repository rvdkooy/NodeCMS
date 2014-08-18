var assert = require("assert");
var ResponseObject = require("../mocks/mockedResponseObject");
var LoginControlller = require('../../../controllers/admin/logincontroller.js');

describe('Login controller specs:', function(){

	
	var responseObject = new ResponseObject();
	
	describe('When requesting the index,', function(){
		
		var responseObject = new ResponseObject();
		var controller = new LoginControlller();

		controller.index(null, responseObject);

		it('It should render the index without a layout', function(){
			assert.equal(responseObject.view, 'system/views/admin/login/index');
			assert.equal(responseObject.options.layout, false);
		});
	});

	describe('When a successfull login is done,', function(){

		var requestObject = { 
			session: { cookie: {} }
		};
		var responseObject = new ResponseObject();
		var controller = new LoginControlller();

		controller.apiLogin(requestObject, responseObject);

		it('It return a successfull result', function(){

			assert(responseObject.jsonData.success);
		});

		it('It should set the session object', function(){

			assert.notEqual(requestObject.session.cookie.maxAge, undefined);
		});
	});
});