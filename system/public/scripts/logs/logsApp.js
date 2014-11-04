angular.module('logsApp', ['services', 'ngResource', 'sharedmodule'])
.controller('logsController', ['$scope', 'logsService',
    function ($scope, logsService) {

        $scope.logs = logsService.query({ limit: 75 });
    }]);