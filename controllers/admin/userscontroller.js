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

exports.listUsers = function(req, res){
	res.render('admin/users/listusers', { layout: false	});
};

exports.addUser = function(req, res){
	res.render('admin/users/adduser', { layout: false	});
};

exports.editUser = function(req, res){
	res.render('admin/users/edituser', { layout: false	});
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

	res.json({ success: true });
}

exports.ApiUpdateUser = function(req, res){
	
	var user = users[req.params.id];

	user.FullName = req.body.FullName,
	user.Active = req.body.Active

	res.json({ success: true });
}