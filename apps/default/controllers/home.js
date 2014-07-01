module.exports = function(app){

	app.get('/', function(req, res){
		res.render('default/views/home/index', { 
			layout: 'default/views/layout.ejs', title: 'Express' 
		});
	})
};