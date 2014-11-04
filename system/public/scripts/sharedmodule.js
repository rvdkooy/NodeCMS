angular.module('sharedmodule', [])
.controller("maincontroller", function($scope, $http, $window){
	$scope.logout = function () {
        
    	$http({ method: 'POST',
                url: '/admin/api/logout'
            })
    		.then(function() {
            	$window.location.href = '/admin';
        	});
    }
})
.controller('settingsController', function($scope, $parse, settingsService, 
       settingKeys, notificationService){

    function retrieveAndBindScopeVariables() {

        settingsService.findByKeys(settingKeys).then(function(result) {

            for (var i = 0; i < result.data.length; i++) {

                (function(keyValue) {

                    $parse('settings.' + keyValue.key).assign($scope, keyValue.value);

                })(result.data[i]);
            }
        });
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
            	 notificationService.addSuccessMessage(cms.adminResources.get("ADMIN_SETTINGS_NOTIFY_SETTINGSSAVED"));
            });
        };
});;
