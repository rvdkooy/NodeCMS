
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
		
		userRepository.remove({ _id: req.params.id }, { multi: false }, function(){
			res.status(200).send();
		})
	}
};