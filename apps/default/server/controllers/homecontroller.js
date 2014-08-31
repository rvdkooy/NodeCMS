exports.index = function(req, res) {
	res.render('apps/default/server/views/home/index', { 
		layout: 'apps/default/server/views/layout.ejs', title: 'Express' }); 
	};
