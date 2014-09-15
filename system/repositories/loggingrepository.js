var baseRepo = new require(__ROOTDIR + '/system/repos/repository');

var loggingRepo = function(inMemoryStore){
	
	this.init('LOGS', __ROOTDIR + '/data/' );

	this.findLatest = function(limit, resultCallback){
		this.db.find( {} ).limit(limit).sort({ timestamp: -1 }).exec(function(err, result){
		
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

loggingRepo.prototype = new baseRepo();
loggingRepo.constructor = loggingRepo

module.exports = loggingRepo;