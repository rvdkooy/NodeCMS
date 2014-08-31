var baseRepo = new require(__ROOTDIR + '/system/repos/repository');
var usersRepo = function(){
	
};

usersRepo.prototype = new baseRepo('USERS', __ROOTDIR + '/data/' );
usersRepo.constructor = usersRepo

module.exports = usersRepo;