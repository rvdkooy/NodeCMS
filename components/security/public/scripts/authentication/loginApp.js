angular.module('loginApp', ['cms.focus', 'cms.loginshaker', 'services'])
	
	.factory('authenticationService', ["$http", function ($http) {
	    return {
	        authenticate: function(username, password, language) {
	            return $http({
	                method: 'POST',
	                url: '/public/api/login',
	                data: { username: username, password: password, language: language }
	            });
	        }
	    };
	}])
	.controller('loginController', ['$scope', 'authenticationService', 'notificationService', '$window',
    	function ($scope, authenticationService, notificationService, $window) {

        $scope.availableLanguages = ['en', 'nl'];
        $scope.username = '';
        $scope.password = '';
        $scope.unauthorizedLogin = false;
        setLanguageBasedOnCookieOrBrowser();

        $scope.login = function() {
            $scope.unauthorizedLogin = false;
            authenticationService.authenticate($scope.username, $scope.password, $scope.language)
                .then(onSuccessLogin, onErrorLogin);
        };

        function onSuccessLogin() {
            
            $.cookie("lang", $scope.language)
            $window.location.href = '/admin';
        }

        function onErrorLogin(data) {

            if (data.status === 401) {
                if (data.data) {
                    notificationService.addErrorMessage(data.data);
                }
                $scope.unauthorizedLogin = true;
                $scope.password = '';
            }
        }

        function setLanguageBasedOnCookieOrBrowser() {
            var langaugeToSet = $.cookie("lang");

            if (!langaugeToSet) {

                var browserLanguage = window.navigator.userLanguage || window.navigator.language;

                for (var i = 0; i < $scope.availableLanguages.length; i++) {
                    if($scope.availableLanguages[i] === browserLanguage){
                        langaugeToSet = browserLanguage;
                        break;
                    }
                };
                if(!langaugeToSet){
                    langaugeToSet = 'en';
                }
            }

            $scope.language = langaugeToSet;
        }
    }]);

