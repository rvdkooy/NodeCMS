module.exports = function(){
	
	this.index = function(req, res){
		res.render('system/views/home/index', { 
			layout: 'system/views/shared/layout' });
	};

	this.getcontentstats = function(req, res){

		var contentStats = [
			{ count: 5, text: 'number of contentpages' }
		];

		res.json(contentStats);
	};
};