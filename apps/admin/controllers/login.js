module.exports = function(app){

	app.get('/admin/login', function(req, res){
		res.render('admin/views/login/index', { layout: false });
	})
};