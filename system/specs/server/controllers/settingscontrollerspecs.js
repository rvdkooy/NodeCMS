var assert = require("assert");
var ResponseObject = require("../mocks/mockedresponseobject");
var sinon = require('sinon');
var SettingsController = require('../../../controllers/settingscontroller.js');

describe('Settings controller specs:', function(){

	describe('When requesting the mainsettings view,', function(){

		var responseObject = new ResponseObject();
		var controller = new SettingsController();
		
		controller.mainSettings(null, responseObject);

		it('It should render the mainsettings view with the standard layout', function(){
			assert.equal(responseObject.view, 'system/views/mainsettings/index');
			assert.equal(responseObject.options.layout, 'system/views/shared/layout');
		});
	});

	describe('When requesting settings,', function(){
		
		var keys = [ { key: 'a', value: 'a' }, { key: 'b', value: 'b' } ];
		var responseObject = new ResponseObject();
		var requestObject = { query : { keys: keys } };
		
		var repository = {
			findByKeys: function(keys, callback){
				callback(keys);
			}
		};
		var controller = new SettingsController(repository);
		
		controller.getSettings(requestObject, responseObject);
		
		it('It should return those settings', function(){
			assert.equal(responseObject.jsonData[0].key, 'a');
			assert.equal(responseObject.jsonData[0].value, 'a');

			assert.equal(responseObject.jsonData[1].key, 'b');
			assert.equal(responseObject.jsonData[1].value, 'b');
		});
	});

	describe('When saving an existing setting,', function(){
		
		var keys = [ { key: 'a', value: 'a' }];
		var responseObject = new ResponseObject();
		var requestObject = { body : keys };
		
		var repository = {
			findByKey: function(key, callback){
				callback(keys[0]);
			},
			update: function(){ }
		};

		var repoUpdateMethod = sinon.spy(repository, 'update');

		var controller = new SettingsController(repository);
		
		controller.saveSettings(requestObject, responseObject);
		
		it('It should update that setting', function(){
			assert(repoUpdateMethod.called);
		});

		it('It should return a successfull response', function(){
			assert.equal(responseObject.currentStatus, 200);
		});
	});

	describe('When saving a non existing setting,', function(){
		
		var keys = [ { key: 'a', value: 'a' }];
		var responseObject = new ResponseObject();
		var requestObject = { body : keys };
		
		var repository = {
			findByKey: function(key, callback){
				callback(null);
			},
			add: function(){ }
		};

		var repoAddMethod = sinon.spy(repository, 'add');

		var controller = new SettingsController(repository);
		
		controller.saveSettings(requestObject, responseObject);
		
		it('It should add that setting', function(){
			assert(repoAddMethod.called);
		});

		it('It should return a successfull response', function(){
			assert.equal(responseObject.currentStatus, 200);
		});
	});
});