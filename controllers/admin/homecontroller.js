exports.index = function(req, res){
	res.render('admin/home/index', { 
		layout: 'admin/shared/layout'
	});
};