// VIEWS
var UserRepository = require('../../data/usersRepository');
var userRepository = new UserRepository();

exports.index = function(req, res){
	res.render('admin/users/index', { 
		layout: 'admin/shared/layout'
	});
};

// API
exports.ApiUsers = function(req, res){
	
	userRepository.find({}, function(results){
		res.json(results);
	});
}

exports.ApiGetUser = function(req, res){
	
	res.json(users[req.params.id]);
}

exports.ApiAddUser = function(req, res){
	
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

exports.ApiUpdateUser = function(req, res){
	
	// var user = users[req.params.id];

	// user.FullName = req.body.FullName,
	// user.Active = req.body.Active

	// res.status(200).send();
}

exports.ApiDeleteUser = function(req, res){
	
	userRepository.remove({ _id: req.params.id }, { multi: false }, function(){
		res.status(200).send();
	})
}