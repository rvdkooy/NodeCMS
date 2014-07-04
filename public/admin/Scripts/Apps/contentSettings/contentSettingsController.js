cms.contentSettingsApp.controller('contentSettingsController', ['$scope', 'settingsService', 'pagesService',
    'notificationService', '$parse',
    function($scope, settingsService, pagesService, notificationService, $parse) {

        var settingKeys = ['website_title', 'website_description', 'website_keywords',
            'website_landingpage', 'twitter_account', 'facebook_account', 'mainaddress',
            'email_address', 'website_mainurl', 'google_ganr', 'google_apikey',
            'google_clientid', 'google_statshistory'];

        $scope.settings = {
            availablePages: pagesService.query()
        };

        $scope.saveAndCloseButtonClicked = function () {
            saveSettings(function() {
                notificationService.addSuccessMessage(cms.adminResources.get("SETTINGS_NOTIFY_SETTINGSSAVED"));
                window.location = '/admin';
            });
        };

        $scope.saveButtonClicked = function () {
            saveSettings();
            notificationService.addSuccessMessage(cms.adminResources.get("SETTINGS_NOTIFY_SETTINGSSAVED"));
        };

        retrieveAndBindScopeVariables();

        function retrieveAndBindScopeVariables() {

            settingsService.findByKeys(settingKeys).then(function(result) {

                for (var i = 0; i < result.data.length; i++) {

                    (function(keyValue) {

                        $parse('settings.' + keyValue.Key).assign($scope, keyValue.Value);

                    })(result.data[i]);
                }
            });
        }

        function saveSettings(callback) {

            var keyValues = [];

            for (var i = 0; i < settingKeys.length; i++) {
                
                var key = settingKeys[i];
                var value = $parse('settings.' + key)($scope);

                keyValues.push({ key: key, value: value });
            }

            settingsService.saveSettings(keyValues).then(callback);
        }
    }]);