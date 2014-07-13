exports.index = function(req, res){
	res.render('admin/users/index', { 
		layout: 'admin/shared/layout'
	});
};