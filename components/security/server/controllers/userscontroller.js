var userManager = require('../lib/usermanager');

// This is the users controller responsible for all http user actions like
// returning views and doing api calls
module.exports = function(usersrepository, logger){

	// VIEWS
	this.index = function(req, res){
		res.render('components/security/server/views/users/index', {
			layout: 'system/server/views/shared/layout'
		});
	};

	// API
	this.ApiUsers = function(req, res){

		usersrepository.find({}, function(results){
			res.json(results);
		});
	}

	this.ApiGetUser = function(req, res){

		usersrepository.findOne( req.params.id, function(result){
			res.json(result);
		});
	}

	this.ApiAddUser = function(req, res){

		usersrepository.find( { username: req.body.username }, function(result){

			if(result.length === 0){

				var user = userManager.create(req.body.username, 
									req.body.password, 
									req.body.fullname,
									req.body.active);

				logger.info('Adding a new user with username: %s', user.username);

				usersrepository.add(user, function(){
					res.status(200).send();
				}) ;
			}
			else{
				res.status(400)
					.json( {
						'RuleViolationExceptions': ['The username is already in use']
					})
					.send();
			}
		});
	}

	this.ApiUpdateUser = function(req, res){
		logger.info('Updating the user with id: %s', req.params.id);

		usersrepository.update(
			{ _id: req.params.id },
			{ $set: {
				Password: userManager.hashPassword(req.body.password),
				FullName: req.body.FullName,
				Active: req.body.Active
				}
			},
			function(){
				res.status(200).send();
			});
	}

	this.ApiDeleteUser = function(req, res){

		usersrepository.findOne(req.params.id, function(result){

			if(result && result.username.toLowerCase() === req.user.username.toLowerCase()){
				logger.warn('Cannot delete the currently loggin in user', req.params.id);
				res.status(400)
					.json( {
						'RuleViolationExceptions': ['Cannot delete the currently loggin in user']
					})
					.send();
			}
			else{
				
				logger.info('Removing the user with id: %s', req.params.id);
				usersrepository.remove({ _id: req.params.id }, { multi: false }, function(){
					res.status(200).send();
				})
			}
		});
	}
};
