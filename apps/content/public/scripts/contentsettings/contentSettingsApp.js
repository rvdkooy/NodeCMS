var app = angular.module('contentSettingsApp', ['cms.growlers', 'ui.bootstrap', 
	'cmsframework', 'ngResource', 'sharedmodule', 'httpRequestInterceptors']);

app.controller('contentSettingsController', function($scope, notificationService){
	
	var settingKeys = ['website_title', 'website_description', 'website_keywords', 'website_landingpage'];


	$scope.settings = {
        //availablePages: pagesService.query()
    };

    function retrieveAndBindScopeVariables() {

        // settingsService.findByKeys(settingKeys).then(function(result) {

        //     for (var i = 0; i < result.data.length; i++) {

        //         (function(keyValue) {

        //             $parse('settings.' + keyValue.Key).assign($scope, keyValue.Value);

        //         })(result.data[i]);
        //     }
        // });
    }

    retrieveAndBindScopeVariables();
    
	$scope.saveButtonClicked = function () {
            var keyValues = [];

            for (var i = 0; i < settingKeys.length; i++) {
                
                var key = settingKeys[i];
                var value = $parse('settings.' + key)($scope);

                keyValues.push({ key: key, value: value });
            }

            settingsService.saveSettings(keyValues).then(function(){
            	 notificationService.addSuccessMessage(cms.adminResources.get("SETTINGS_NOTIFY_SETTINGSSAVED"));
            });
        };
});