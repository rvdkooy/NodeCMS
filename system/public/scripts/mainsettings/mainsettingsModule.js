angular.module('mainSettingsModule', ['services', 'ngResource', 'sharedmodule', 'httpRequestInterceptors'])
    
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/mainsettings', { 
                templateUrl: '/admin/mainsettings/index', 
                controller: 'settingsController',
                resolve: {
                    settingKeys: function(){
                    	return ['website_mainurl', 'website_title', 'email_address', 'mainaddress'];
                    } 
            	}
            });
    }]);	