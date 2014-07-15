// VIEWS
var users = [
		{ Id: 0, UserName: 'Admin', FullName: 'Administrator', LastLoginDateTime: 'N/A', Active: true },
		{ Id: 1, UserName: 'Ronald', FullName: 'Ronald van der Kooij', LastLoginDateTime: 'N/A' },
		{ Id: 2, UserName: 'Laura', FullName: 'Laura Buren', LastLoginDateTime: 'N/A' }
	];

exports.index = function(req, res){
	res.render('admin/users/index', { 
		layout: 'admin/shared/layout'
	});
};

// API
exports.ApiUsers = function(req, res){
	res.json(users);
}

exports.ApiGetUser = function(req, res){
	
	res.json(users[req.params.id]);
}

exports.ApiAddUser = function(req, res){
	
		users.push(
		{
			Id: users.length,
			UserName: req.body.UserName,
			FullName: req.body.FullName,
			LastLoginDateTime: 'N/A',
			Active: req.body.Active
		});

	res.status(200).send();
}

exports.ApiUpdateUser = function(req, res){
	
	var user = users[req.params.id];

	user.FullName = req.body.FullName,
	user.Active = req.body.Active

	res.status(200).send();
}

exports.ApiDeleteUser = function(req, res){
	
	users.splice(users.indexOf(req.params.id));

	res.status(200).send();
}