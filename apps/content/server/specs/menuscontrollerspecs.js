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

	describe('When getting all the menus,', function(){

		var responseObject = new ResponseObject();
		
		var menus = [ { id: 1, name: 'topmenu' } ];

		var repository = {
			find: function(query, callBack){
				callBack(menus);
			}
		};

		var controller = new MenusController(repository, fakelogger);
		controller.ApiMenus(null, responseObject);

		it('It should return all the menus', function(){

			assert.equal(responseObject.jsonData.length, menus.length);
		});
	});

	describe('When getting a menu,', function(){

		var responseObject = new ResponseObject();
		var requestObject = { params: { id: 1 } }
		var menu = { id: 1, name: 'topmenu' };

		var repository = {
			findOne: function(id, callback){
				if(id === menu.id){
					return callback(menu);
				};
			}
		};

		var controller = new MenusController(repository, fakelogger);
		controller.ApiGetMenu(requestObject, responseObject);

		it('It should return that menu', function(){

			assert.equal(responseObject.jsonData, menu);
		});
	});

	describe('When posting a new menu,', function(){

		var newMenu = { 
			name: 'topmenu'
		};

		var responseObject = new ResponseObject();
		var requestObject = { body: newMenu }	

		var repository = {
			findByName: function(query, callback){
				callback();
			},
			add: function(subject, callback){
				callback();
			}
		};

		var repoAddMethod = sinon.spy(repository, 'add');

		var controller = new MenusController(repository, fakelogger);
		controller.ApiAddMenu(requestObject, responseObject);

		it('It should add the menu', function(){

			assert(repoAddMethod.called);
		});

		it('It should return a success result', function(){

			assert.equal(responseObject.currentStatus, 200);
			assert.equal(responseObject.isSend, true);
		});
	});

	describe('When posting a menu with a name that is in use,', function(){

		var newMenu = { 
			name: 'topmenu'
		};

		var responseObject = new ResponseObject();
		var requestObject = { body: newMenu }	

		var repository = {
			findByName: function(query, callback){
				
				callback( [{ name: 'topmenu' }] );	
			},
			add: function() {}
		};

		var spy = sinon.stub(repository, 'add');
		
		var controller = new MenusController(repository, fakelogger);
		controller.ApiAddMenu(requestObject, responseObject);

		it('It should not add the menu', function(){

			assert.equal(spy.callCount, 0);
		});

		it('It should return a bad request', function(){

			assert.equal(responseObject.currentStatus, 400);
		});
	});

	describe('When deleting a menu,', function(){

		var responseObject = new ResponseObject();
		var requestObject = { params: { id: 1 } } ;

		var repository = {
			remove: function(query, options, callback){
				callback();
			},
			findOne: function(id, callback){
				callback(undefined);
			}
		};

		var repoRemoveMethod = sinon.spy(repository, 'remove');
		var controller = new MenusController(repository, fakelogger);
		controller.ApiDeleteMenu(requestObject, responseObject);

		it('It should delete the menu', function(){

			assert(repoRemoveMethod.called);
		});

		it('It should return a success result', function(){

			assert.equal(responseObject.currentStatus, 200);
			assert.equal(responseObject.isSend, true);
		});
	});
});