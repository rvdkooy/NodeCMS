var angular = require('_angular');
var angularResource = require('_angular-resource');
var angularRoute = require('_angular-route');

// needs some serious refactoring
require('bootstrap')
require('jquery.metisMenu')
require('sbadmin');
require('ui-bootstrap');

window.cms = window.cms || {}

window.cms.init = function (widgetModules){

    var modules = ['sharedmodule', 'services', 'filters', 'ngRoute', 'logsApp', 'contentPagesApp'].concat(widgetModules);

    angular.module('adminApp', modules)
    
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/dashboard', { 
                templateUrl: '/admin/dashboard', 
                controller: 'dashboardController' })
            .otherwise({ redirectTo: '/dashboard' });
    }])

    .controller('dashboardController', function($scope, logsService){
        $scope.showLogMessagesLoader = true;
        
        logsService.query({ limit: 5 }).$promise.then(function(data){
            $scope.latestLogMessages = data;
            $scope.showLogMessagesLoader = false;
        });
    })

    .directive('contentStats', function(){
        return {
          restrict: 'E',
          controller: function($scope, $http){
            
            $scope.showBusyIndicator = true;

            $http.get('/admin/api/dashboard/getcontentstats').then(function(result){
                $scope.showBusyIndicator = false;
                $scope.contentstats = result.data;
            });
          },
          template: '<div class="busy" ng-show="showBusyIndicator"></div>' +
                    '<div class="contentstats">' +
                        '<h5 ng-repeat="stat in contentstats"><span class="label label-primary">{{ stat.count }}</span>' +
                        '<a href="{{ stat.url }}">{{ stat.resourcekey | __  }}</a></h5>' +
                    '</div>'      
        };
    });
};    