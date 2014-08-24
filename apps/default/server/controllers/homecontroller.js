exports.index = function(req, res) {
	res.render('default/server/views/home/index', { 
		layout: 'default/server/views/layout.ejs', title: 'Express' }); 
	};
