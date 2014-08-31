var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
global.__ROOTDIR = path.dirname( path.join(require.main.filename, '../'));

var userFactory = require('./server/lib/userfactory');

exports.start = function(UserRepository){
	
	var usersDatabase = path.join('data/USERS.db');

	if(!fs.existsSync(usersDatabase)){

		console.log(chalk.green('Creating a user database with a default admin'));

		var UserRepository = require('./server/lib/usersrepository');

		var defaultAdmin = userFactory.create('admin', 'admin', 'Administrator', true);

		var usersRepository = new UserRepository();
		usersRepository.add(defaultAdmin, function(){
			console.log(chalk.green('Done creating a default admin (you can now login with admin/admin)'));
		})
	}
};
