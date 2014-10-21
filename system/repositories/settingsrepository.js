var baseRepo = new require(__ROOTDIR + '/system/repos/repository');

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
};

settingsRepo.prototype = new baseRepo();
settingsRepo.constructor = settingsRepo

module.exports = settingsRepo;