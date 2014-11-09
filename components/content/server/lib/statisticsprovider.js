var q = require('q');
var ioc = require('tiny-ioc');

exports.getContentStats = function(){
	var deferred = q.defer();

	var stats = [];

	var contentpagesRepository = ioc.resolve('contentpagesrepository');
	var menusRepository = ioc.resolve('menusrepository');
	
	contentpagesRepository.find({}, function(pages){
		
		menusRepository.find({}, function(menus){

			var pagesStats = { count: pages.length, 
							resourcekey: 'ADMIN_DASHBOARD_LABEL_CONTENTPAGESSTATS', 
							url: '#/contentpages'}

			var menusStats = { count: menus.length, 
								resourcekey: 'ADMIN_DASHBOARD_LABEL_MENUSSTATS', 
								url: '/admin/menus'}

			stats.push(pagesStats);
			stats.push(menusStats);
			deferred.resolve(stats);
		})
	});

	return deferred.promise;
};