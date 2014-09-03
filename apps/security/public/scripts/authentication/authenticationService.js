cms = window.cms || {};
cms.services = window.cms.services || angular.module('services', []);

cms.services.factory('authenticationService', ["$http", function ($http) {
    return {
        authenticate: function(username, password, language) {
            return $http({
                method: 'POST',
                url: '/public/api/login',
                data: { username: username, password: password, language: language }
            });
        }
    };
}]);

