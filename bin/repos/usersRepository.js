var baseRepo = new require('./repository');
var usersRepo = function(){
	
};

usersRepo.prototype = new baseRepo('USERS', __PROJECTDIR + '/data/' );
usersRepo.constructor = usersRepo

module.exports = usersRepo;