var baseRepo = new require(__ROOTDIR + '/system/server/lib/repository');

var usersRepo = function(inMemoryStore){
	
	if(!inMemoryStore){
		this.init('USERS', __ROOTDIR + '/data/' );
	}
	else{
		this.init(inMemoryStore);
	}
	
	this.findByUsername = function(username, resultCallback){
	
		this.db.findOne( { username: username }, function(err, result){
			
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

usersRepo.prototype = new baseRepo();
usersRepo.constructor = usersRepo

module.exports = usersRepo;