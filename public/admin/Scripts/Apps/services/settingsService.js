cms = window.cms || {};
cms.services = window.cms.services || angular.module('services', []);

cms.services.factory('settingsService', ['$http', function ($http) {

    return {
        findByKeys: function (keys) {

            var keysData = '';

            for (var i = 0; i < keys.length; i++) {
                if (i === 0) {
                    keysData = '?keys=' + keys[i];
                } else {
                    keysData += '&keys=' + keys[i];
                }
            }

            return $http.get('/admin/api/settings/' + keysData);
        },
        saveSettings: function (keyValues) {

            var data = JSON.stringify(keyValues);

            return $http.post('/admin/api/settings', data);
        }
    };
}]);