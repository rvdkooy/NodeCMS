angular.module('contentServices', ['ngResource'])
	.factory('pagesService', ['$resource', function ($resource) {
	    return $resource('/admin/api/contentpages/:pageid', { pageid: '@_id' },
	        {
	            update: { method: 'PUT' },
	            //clearCache: { method: 'POST', params: { clearcache: 'true' } },
	            //clearCacheForPage: { method: 'POST', params: { 'clearCacheForPage': '@Id' } }
	        });
	}]);
