var baseRepo = new require('../lib/repository');

var settingsRepo = function(inMemoryStore){
	
	this.init('SETTINGS', __ROOTDIR + '/data/' );

	this.findByKey = function(key, resultCallback){
	
		this.db.findOne( { key: key }, function(err, result){
			
			if(err){
				console.log(err);
				throw err;
			}	
			
			if(resultCallback) {
				resultCallback(result);
			}
		});
	};

	this.findByKeys = function(keys, resultCallback){
		
		var filter = [];

		for (var i = 0; i < keys.length; i++) {
			filter.push({ key: '' + keys[i] + '' });
		};

		this.db.find({ $or: filter }, function (err, results) {
		  if(err){
				console.log(err);
				throw err;
			}	
			
			if(resultCallback) {
				resultCallback(results);
			}
		});
	};
};

settingsRepo.prototype = new baseRepo();
settingsRepo.constructor = settingsRepo

module.exports = settingsRepo;