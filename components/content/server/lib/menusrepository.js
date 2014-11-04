var baseRepo = new require(__ROOTDIR + '/system/server/lib/repository');

var menusRepo = function(inMemoryStore){
	
	if(!inMemoryStore){
		this.init('MENUS', __ROOTDIR + '/data/' );
	}
	else{
		this.init(inMemoryStore);
	}

	this.findByName = function(name, resultCallback){
	
		this.db.findOne( { name: name }, function(err, result){
			
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

menusRepo.prototype = new baseRepo();
menusRepo.constructor = menusRepo

module.exports = menusRepo;