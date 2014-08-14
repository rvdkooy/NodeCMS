exports.index = function(req, res) {
	res.render('system/views/default/home/index', { 
		layout: 'system/views/default/layout.ejs', title: 'Express' }); 
	};
