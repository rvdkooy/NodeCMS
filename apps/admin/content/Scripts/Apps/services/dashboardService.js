cms = window.cms || {};
cms.services = window.cms.services || angular.module('services', []);

cms.services.factory('dashboardService', ["$http", function ($http) {
    return {
        getLatestLogMessages: function() {
            return $http({
                method: 'GET',
                url: '/admin/dashboard/getlatestlogmessages',
                params: { number: 3 }
            });
        },
        getContentStatistics: function() {
            return $http({
                method: 'GET',
                url: '/admin/dashboard/getcontentstatistics',
                params: { number: 3 }
            });
        },
        getLatestChangedContentPages: function() {
            return $http({
                method: 'GET',
                url: '/admin/dashboard/getlatestchangedcontentpages',
                params: { number: 3 }
            });
        }
    };
}]);