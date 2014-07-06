module.exports = function(app){

	app.get('/admin', function(req, res){
		res.render('admin/home/index', { 
			layout: 'admin/shared/layout'
		});
	})
};