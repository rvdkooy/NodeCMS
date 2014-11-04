angular.module('contentSettingsApp', ['contentServices', 'services', 'cms.growlers', 
	'ngResource', 'sharedmodule', 'httpRequestInterceptors'])

    .value('settingKeys', ['website_description', 'website_keywords', 'website_landingpage'])

    .directive('pagesSelector', function () {

        return {
        	restrict: 'A',
        	scope: {
        		selectedPage: '=pagesSelector'
        	},
            controller: function($scope, pagesService){
            	$scope.availablePages = pagesService.query();
            },
            templateUrl: '/assets/content/templates/contentsettings/pagesselector.html'
        };
    });