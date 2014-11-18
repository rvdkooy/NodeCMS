var _ = require('underscore');

angular.module('contentSettingsModule', ['contentServices', 'services',
	'sharedmodule', 'httpRequestInterceptors'])
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/contentsettings', { 
                templateUrl: '/admin/contentsettings/index', 
                controller: 'settingsController' });
    }])
    .value('settingKeys', ['website_description', 'website_keywords', 'website_landingpage'])

    .directive('pagesSelector', function () {

        return {
        	restrict: 'A',
        	scope: {
                selectedPage: '=pagesSelector'
            },
            controller: function($scope, pagesService, $timeout){
                
                pagesService.query().$promise.then(function(results){
                    $scope.availablePages = _.map(results, function(page){
                        return page.name;
                    });
                    $scope.innerSelectedPage = $scope.selectedPage;
                });

                $scope.changed = function(){
                    $scope.selectedPage = $scope.innerSelectedPage;
                };
            },
            templateUrl: '/assets/content/templates/contentsettings/pagesselector.html'
        };
    });