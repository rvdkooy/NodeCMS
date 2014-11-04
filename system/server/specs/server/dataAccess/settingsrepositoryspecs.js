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

	describe('When finding settings by keys,', function(){

		it('It should return', function(done){

			var settingOne = { key: '1', value: 'one' };
			var settingTwo = { key: '2', value: 'two' };
			var settingThree = { key: '3', value: 'three' };

			settingsRepository.add( [ settingOne, settingTwo, settingThree ], function() {
				
				settingsRepository.findByKeys([ settingOne.key, settingThree.key ], function(results){

					assert.equal(results.length, 2);
					
					done();
				});
  			});
		});
	});
});