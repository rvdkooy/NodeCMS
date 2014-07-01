mainController.$inject = ["$scope", 'authenticationService', "$window"];
function mainController($scope, authenticationService, $window) {
    $scope.logout = function () {
        authenticationService.logout().then(function() {
            $window.location.href = '/admin';
        });
    }
}