var baseRepo = new require(__ROOTDIR + '/system/repos/repository');

var contentPagesRepo = function(inMemoryStore){
	
	if(!inMemoryStore){
		this.init('PAGES', __ROOTDIR + '/data/' );
	}
	else{
		this.init(inMemoryStore);
	}

	this.findByUrl = function(url, resultCallback){
	
		this.db.findOne( { url: url }, function(err, result){
			
			if(err){
				console.log(err);
				throw err;
			}	
			
			if(resultCallback) {
				resultCallback(result);
			}
		});
	};

	this.findLatestChanged = function(limit, resultCallback){

		this.db.find({ }).sort({ changed: -1 }).limit(limit).exec(function(err, result){
			
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

contentPagesRepo.prototype = new baseRepo();
contentPagesRepo.constructor = contentPagesRepo

module.exports = contentPagesRepo;