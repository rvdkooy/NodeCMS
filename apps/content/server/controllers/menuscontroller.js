module.exports = function(contentpagesrepository, logger){

	this.index = function(req, res){
		res.render('apps/content/server/views/menus/index', 
			{ layout: 'system/views/shared/layout' });
	};
};