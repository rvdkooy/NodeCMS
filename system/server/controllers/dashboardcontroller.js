var q = require('q');
var _ = require('underscore');

module.exports = function(mainApp){
	
	this.dashboard = function(req, res){
		res.render('system/server/views/dashboard/index', { layout:false });
	};

	this.index = function(req, res){
		res.render('system/server/views/main/index', { layout:false });
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