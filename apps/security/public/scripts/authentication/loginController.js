cms.loginApp.controller('loginController', ['$scope', 'authenticationService', 'notificationService', '$window',
    function ($scope, authenticationService, notificationService, $window) {

        setLanguageBasedOnCookie();
        $scope.username = '';
        $scope.password = '';
        $scope.unauthorizedLogin = false;

        $scope.login = function() {
            $scope.unauthorizedLogin = false;
            authenticationService.authenticate($scope.username, $scope.password, $scope.language)
                .then(onSuccessLogin, onErrorLogin);
        };

        function onSuccessLogin() {
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

        function setLanguageBasedOnCookie() {
            var languageCookie = $.cookie("cmslanguage");

            if (!languageCookie) {
                languageCookie = 'en';
            }

            $scope.language = languageCookie;
        }
    }]);


