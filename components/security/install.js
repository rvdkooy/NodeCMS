var path = require('path');
var chalk = require('chalk');
global.__ROOTDIR = path.dirname( path.join(require.main.filename, '../'));

var userManager = require('./server/lib/usermanager');

exports.start = function(){
	var UserRepository = require('./server/lib/usersrepository');
	var usersRepository = new UserRepository();

	usersRepository.find({}, function(results){
		if(!results.length){
			console.log(chalk.green('Creating a user database with a default admin'));

			var defaultAdmin = userManager.create('admin', 'admin', 'Administrator', true);
			
			usersRepository.add(defaultAdmin, function(){
				console.log(chalk.green('Done creating a default admin (you can now login with admin/admin)'));
			})
		}
	});
};
