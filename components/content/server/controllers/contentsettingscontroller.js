module.exports = function(logger){

	this.index = function(req, res){
		res.render('components/content/server/views/contentsettings/index', { layout: false });
	};
};