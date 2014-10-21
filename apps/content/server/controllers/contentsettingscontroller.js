module.exports = function(logger){

	this.index = function(req, res){
		res.render('apps/content/server/views/contentsettings/index', 
			{ layout: 'system/views/shared/layout' });
	};
};