exports.index = function(req, res){
	res.render('system/views/admin/home/index', { 
		layout: 'system/views/admin/shared/layout'
	});
};