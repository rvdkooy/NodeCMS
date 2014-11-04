var assert = require("assert");
var ResponseObject = require("../mocks/mockedresponseobject");
var LogsController = require('../../../controllers/logscontroller.js');

describe('Logs controller specs:', function(){

	describe('When requesting the index,', function(){
		var responseObject = new ResponseObject();
		var controller = new LogsController();
		controller.index(null, responseObject);
		
		it('It should render the index with the standard layout', function(){
			assert.equal(responseObject.view, 'system/server/views/logs/index');
			assert.equal(responseObject.options.layout, 'system/server/views/shared/layout');
		});
	});

	describe('When requesting the latest logmessages from the api,', function(){
		
		var results = [{ level: 'info', timestamp: 'sometime', message: 'message' }];
		var responseObject = new ResponseObject();
		var requestObject = { query : { limit: 10 } };
		
		var loggingrepository = {
			findLatest: function(limit, callback){
				callback(results);
			}
		};
		var controller = new LogsController(loggingrepository);
		
		controller.apiGetLogs(requestObject, responseObject);
		
		it('It should return the latest ones', function(){
			assert.equal(responseObject.jsonData[0].message, results[0].message);
			assert.equal(responseObject.jsonData[0].timestamp, results[0].timestamp);
			assert.equal(responseObject.jsonData[0].level, results[0].level);
			assert.notEqual(responseObject.jsonData[0].icontext, null);
			assert.notEqual(responseObject.jsonData[0].iconclass, null);
		});
	});
});