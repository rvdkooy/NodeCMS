var assert = require("assert");
var ResponseObject = require("./mockedresponseobject");
var MenusController = require('../controllers/menuscontroller.js');
var sinon = require('sinon');
var fakelogger = { info: function(){}, warn: function(){} }

describe('Menus controller specs:', function(){
	
	describe('When requesting the index view,', function(){

		var responseObject = new ResponseObject();
		var controller = new MenusController();
		
		controller.index(null, responseObject);

		it('It should render the index with the standard layout', function(){
			assert.equal(responseObject.view, 'apps/content/server/views/menus/index');
			assert.equal(responseObject.options.layout, 'system/views/shared/layout');
		});
	});
});