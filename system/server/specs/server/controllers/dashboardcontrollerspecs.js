var q = require('q');
var assert = require("assert");
var ResponseObject = require("../mocks/mockedresponseobject");
var DashboardController = require('../../../controllers/dashboardcontroller.js');

describe('Dashboard controller specs:', function(){

	describe('When requesting the default layout,', function(){
		
		var responseObject = new ResponseObject();
		var controller = new DashboardController();
		controller.index(null, responseObject);
		
		it('It should render the shared layout', function(){
			assert.equal(responseObject.view, 'system/server/views/shared/layout');
		});
	});

	describe('When requesting the dashboard,', function(){
		var responseObject = new ResponseObject();
		var controller = new DashboardController();
		controller.dashboard(null, responseObject);
		
		it('It should render the dashboard', function(){
			assert.equal(responseObject.view, 'system/server/views/dashboard/index');
		});
	});

	describe('When getting content statistics,', function(){
		var responseObject = new ResponseObject();
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