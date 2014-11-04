var q = require('q');
var _ = require('underscore');

module.exports = function(mainApp){
	
	this.index = function(req, res){
		res.render('system/server/views/home/index', { 
			layout: 'system/server/views/shared/layout' });
	};

	this.getcontentstats = function(req, res){

		var adminStats = mainApp.get('NODECMS_CONFIG').adminStats;

		var allPromises = q.all(_.map(adminStats, function(stat){ return stat(); }) )
		
		allPromises.then(function(resolvedPromises){
			
			var result = [];
			
			resolvedPromises.forEach(function(resolvedPromise){
				
				result=result.concat(resolvedPromise);
			});
			
			res.json(result);
		})
	};
};