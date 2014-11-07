angular.module('logsApp', ['services', 'ngResource', 'sharedmodule'])

.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/logs', { 
                templateUrl: '/admin/logs', 
                controller: 'logsController' });
    }])

.controller('logsController', ['$scope', 'logsService',
    function ($scope, logsService) {

        $scope.logs = logsService.query({ limit: 75 });
    }]);