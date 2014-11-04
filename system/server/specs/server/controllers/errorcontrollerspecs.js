var assert = require("assert");
var ResponseObject = require("../mocks/mockedresponseobject");
var ErrorController = require('../../../controllers/errorcontroller.js');

describe('Error controller specs running in production mode:', function(){

	describe('When a 404 happens,', function(){
		
		var mainApp = { get: function(name){ 
				if(name === 'env') return "production";
				if(name === '4xxviewpath') return "views/4xx"; 
				if(name === '5xxviewpath') return "views/5xx";
			}
		};
		var responseObject = new ResponseObject();
		var controller = new ErrorController(mainApp);
		var error = { status: 404 }

		controller.handle(error, null, responseObject);
		
		it('It should render the 4xx page', function(){
			assert.equal(responseObject.view, 'views/4xx');
			assert.equal(responseObject.options.layout, false);
			assert.equal(responseObject.currentStatus, 404);
		});
	});

	describe('When any other error occured,', function(){
		
		var mainApp = { get: function(name){ 
				if(name === 'env') return "production";
				if(name === '4xxviewpath') return "views/4xx"; 
				if(name === '5xxviewpath') return "views/5xx";
			}
		};
		var responseObject = new ResponseObject();
		var controller = new ErrorController(mainApp);
		var error = { message: 'oh no!' }

		controller.handle(error, null, responseObject);
		
		it('It should render the 5xx page', function(){
			assert.equal(responseObject.view, 'views/5xx');
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
		
		var mainApp = { get: function(name){ 
				if(name === 'env') return "development";
				if(name === '4xxviewpath') return "views/4xx"; 
				if(name === '5xxviewpath') return "views/5xx";
			} 
		};
		var responseObject = new ResponseObject();
		var controller = new ErrorController(mainApp);
		var error = { status: 404 }

		controller.handle(error, null, responseObject);
		
		it('It should render the 4xx page', function(){
			assert.equal(responseObject.view, 'views/4xx');
			assert.equal(responseObject.options.layout, false);
			assert.equal(responseObject.currentStatus, 404);
		});
	});

	describe('When any other error occured,', function(){
		
		var mainApp = { get: function(name){ 
				if(name === 'env') return "development";
				if(name === '4xxviewpath') return "views/4xx"; 
				if(name === '5xxviewpath') return "views/5xx"; 
			}
		};
		var responseObject = new ResponseObject();
		var controller = new ErrorController(mainApp);
		var error = { message: 'oh no!' }

		controller.handle(error, null, responseObject);
		
		it('It should render the 5xx page', function(){
			assert.equal(responseObject.view, 'views/5xx');
			assert.equal(responseObject.options.layout, false);
			assert.equal(responseObject.currentStatus, 500);
		});

		it('It should expose the error to the user', function(){
			assert.equal(responseObject.options.error, 'oh no!');
		});
	});
});