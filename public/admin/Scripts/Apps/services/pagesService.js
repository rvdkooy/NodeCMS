cms = window.cms || {};
cms.services = window.cms.services || angular.module('services', []);

cms.services.factory('pagesService', ['$resource', function ($resource) {
    return $resource('/admin/api/pages/:pageid', { pageid: '@Id' },
        {
            update: { method: 'PUT' },
            //clearCache: { method: 'POST', params: { clearcache: 'true' } },
            //clearCacheForPage: { method: 'POST', params: { 'clearCacheForPage': '@Id' } }
        });
}]);