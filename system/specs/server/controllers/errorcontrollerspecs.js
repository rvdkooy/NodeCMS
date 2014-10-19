var assert = require("assert");
var ResponseObject = require("../mocks/mockedresponseobject");
var ErrorController = require('../../../controllers/errorcontroller.js');

describe('Error controller specs running in production mode:', function(){

	describe('When a 404 happens,', function(){
		
		var mainApp = { get: function(){ return "production"; } };
		var responseObject = new ResponseObject();
		var controller = new ErrorController(mainApp);
		var error = { status: 404 }

		controller.handle(error, null, responseObject);
		
		it('It should render the 4xx page', function(){
			assert.equal(responseObject.view, 'apps/frontend/server/views/4xx');
			assert.equal(responseObject.options.layout, false);
			assert.equal(responseObject.currentStatus, 404);
		});
	});

	describe('When any other error occured,', function(){
		
		var mainApp = { get: function(){ return "production"; } };
		var responseObject = new ResponseObject();
		var controller = new ErrorController(mainApp);
		var error = { message: 'oh no!' }

		controller.handle(error, null, responseObject);
		
		it('It should render the 5xx page', function(){
			assert.equal(responseObject.view, 'apps/frontend/server/views/5xx');
			assert.equal(responseObject.options.layout, false);
			assert.equal(responseObject.currentStatus, 500);
		});

		it('It should NOT expose the error to the user', function(){
			assert.equal(responseObject.options.error, '');
		});
	});
});

describe('Error controller specs running in development mode:', function(){

	describe('When a 404 happens,', function(){
		
		var mainApp = { get: function(){ return "development"; } };
		var responseObject = new ResponseObject();
		var controller = new ErrorController(mainApp);
		var error = { status: 404 }

		controller.handle(error, null, responseObject);
		
		it('It should render the 4xx page', function(){
			assert.equal(responseObject.view, 'apps/frontend/server/views/4xx');
			assert.equal(responseObject.options.layout, false);
			assert.equal(responseObject.currentStatus, 404);
		});
	});

	describe('When any other error occured,', function(){
		
		var mainApp = { get: function(){ return "development"; } };
		var responseObject = new ResponseObject();
		var controller = new ErrorController(mainApp);
		var error = { message: 'oh no!' }

		controller.handle(error, null, responseObject);
		
		it('It should render the 5xx page', function(){
			assert.equal(responseObject.view, 'apps/frontend/server/views/5xx');
			assert.equal(responseObject.options.layout, false);
			assert.equal(responseObject.currentStatus, 500);
		});

		it('It should expose the error to the user', function(){
			assert.equal(responseObject.options.error, 'oh no!');
		});
	});
});