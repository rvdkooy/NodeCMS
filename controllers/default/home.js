module.exports = function(app){

	app.get('/', function(req, res){
		res.render('default/home/index', { 
			layout: 'default/layout.ejs', title: 'Express' 
		});
	})
};