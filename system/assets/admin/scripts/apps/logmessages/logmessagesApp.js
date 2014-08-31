cms = window.cms || {};

cms.logmessagesApp = angular.module('logmessagesApp', ['services', 'ngResource']);

cms.logmessagesApp.controller('logmessagesController', ['$scope', 'logmessagesService',
    function ($scope, logmessagesService) {

        $scope.logMessages = logmessagesService.query();
    }]);