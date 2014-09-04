var _ = require('underscore');

module.exports = function(loggingrepository){
	
	this.index = function(req, res){
		res.render('system/views/logs/index', { 
			layout: 'system/views/shared/layout'
		});
	};

	this.apiGetLogs = function(req, res){
		var limit = req.query.limit;
		loggingrepository.findLatest(limit, function(results){

			var model = _.map(results, function(item){ 
				
				var iconclass = 'label-success';
				var icontext = 'INFO';
				if(item.level === 'warn'){
					iconclass = 'label-warning';
					icontext = 'WARN';
				}
				if(item.level === 'error'){
					iconclass = 'label-danger';
					icontext = 'ERROR';
				}

				return { 
					level: item.level,
					timestamp: item.timestamp,
					message: item.message,
					iconclass: iconclass,
					icontext: icontext
				}; 
			});

			res.json(model);
		});
	};
};