
module.exports = function(userRepository){
	
	// VIEWS
	this.index = function(req, res){
		res.render('admin/users/index', { 
			layout: 'admin/shared/layout'
		});
	};

	// API
	this.ApiUsers = function(req, res){
		
		userRepository.find({}, function(results){
			res.json(results);
		});
	}

	this.ApiGetUser = function(req, res){
		
		userRepository.findOne( req.params.id, function(result){
			res.json(result);
		});
	}

	this.ApiAddUser = function(req, res){

		userRepository.find( { UserName: req.body.UserName }, function(result){
			
			if(result.length === 0){
				
				userRepository.add(
				{
					UserName: req.body.UserName,
					FullName: req.body.FullName,
					LastLoginDateTime: 'N/A',
					Active: req.body.Active
				},
				function(){
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
		
		userRepository.update( 	
			{ _id: req.params.id }, 
			{ $set: { 
				FullName: req.body.FullName,
				Active: req.body.Active 
				}	 
			}, 
			function(){
				res.status(200).send();
			});
	}

	this.ApiDeleteUser = function(req, res){
		
		userRepository.findOne(req.params.id, function(result){
			
			console.log(result);
			if(result && result.UserName.toLowerCase() === req.user.username.toLowerCase()){
				res.status(400)
					.json( { 
						'RuleViolationExceptions': ['Cannot delete the currently loggin in user'] 
					})
					.send();
			}
			else{
				userRepository.remove({ _id: req.params.id }, { multi: false }, function(){
					res.status(200).send();
				})
			}
		});
	}
};