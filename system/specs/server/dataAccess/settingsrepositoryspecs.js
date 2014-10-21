describe('Settings Repository specs:', function(){

	var Repository = require('../../../repositories/settingsrepository');
	var assert = require('assert');
	var path = require('path'); 

	// create an inmemory repository that will be used by all the specs in this file
	var settingsRepository = new Repository("SETTINGSREPOSITORYSPECS");
	settingsRepository.init();	
	describe('When finding a setting by its key,', function(){

		it('It should return', function(done){

			var setting = { key: 'foo', value: 'bar' };

			settingsRepository.add( setting, function() {
				
				settingsRepository.findByKey('foo', function(result){

					assert.equal(result.value, 'bar');
					done();
				});
  			});
		});
	});
});