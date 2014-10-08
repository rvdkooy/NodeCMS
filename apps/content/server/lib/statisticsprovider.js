var q = require('q');
var ioc = require('tiny-ioc');

exports.getContentStats = function(){
	var deferred = q.defer();

	var stats = [];

	var repo = ioc.resolve('contentpagesrepository');
	
	repo.find({}, function(results){
		
		stats.push({ count: results.length, resourcekey: 'ADMIN_DASHBOARD_LABEL_CONTENTPAGESSTATS', url: '/admin/contentpages'});
		deferred.resolve(stats);
	});

	return deferred.promise;
};