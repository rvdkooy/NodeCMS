var q = require('q');
var assert = require("assert");
var ResponseObject = require("../mocks/mockedresponseobject");
var DashboardController = require('../../../controllers/dashboardcontroller.js');

describe('Dashboard controller specs:', function(){

	var responseObject = new ResponseObject();
	
	describe('When requesting the index,', function(){
		
		var controller = new DashboardController();
		controller.index(null, responseObject);
		
		it('It should render the index with the standard layout', function(){
			assert.equal(responseObject.view, 'system/views/home/index');
			assert.equal(responseObject.options.layout, 'system/views/shared/layout');
		});
	});

	describe('When getting content statistics,', function(){
		
		var statsResult = [{ name: 'item1' }, { name: 'item2' }];
		var arrayOfAdminStats = [ function(){
			var defered = q.defer();
			
			defered.resolve(statsResult);
			
			return defered.promise;
		} ];

		var mainApp = { get: function(){ return { adminStats: arrayOfAdminStats} } };
		var controller = new DashboardController(mainApp);
		controller.getcontentstats(null, responseObject);
		
		it('It should return the configured ones', function(){
			assert.equal(responseObject.jsonData[0].name, 'item1');
			assert.equal(responseObject.jsonData[1].name, 'item2');
		});
	});
});