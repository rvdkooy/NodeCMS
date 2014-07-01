cms.usersApp.controller('usersController', ['$scope', 'usersService', 'notificationService',
    function ($scope, userService, notificationService) {
    
        loadUsers();

        $scope.deleteUser = function (index) {

            var user = $scope.users[index];

            var userName = user.UserName;
            if (confirm(cms.adminResources.get("USERS_NOTIFY_DELETEUSER", userName))) {
                user.$delete(function () {

                    notificationService.addSuccessMessage(cms.adminResources.get("USERS_NOTIFY_USERDELETED", userName));

                    loadUsers();
                });
            }
        };

        function loadUsers() {
            $scope.users = userService.query();
        }
}]);

cms.usersApp.controller('addUserController', ['$scope', 'usersService', '$location', 'notificationService',
    function ($scope, usersService, $location, notificationService) {

        $scope.user = {};

        $scope.saveAndCloseButtonClicked = function () {

            usersService.save($scope.user, function () {

                notificationService.addSuccessMessage(cms.adminResources.get("USERS_NOTIFY_USERADDED", $scope.user.UserName));
                $location.path('#/users');
            });
        };
    }]);

cms.usersApp.controller('editUserController', ['$scope', 'user', '$location', 'notificationService',
    function ($scope, user, $location, notificationService) {

        $scope.user = user;

        $scope.saveButtonClicked = function () {
            updateUser(false);
        };

        $scope.saveAndCloseButtonClicked = function () {
            updateUser(true);
        };

        function updateUser(closePage) {
            $scope.user.$update(function () {

                notificationService.addSuccessMessage(cms.adminResources.get("USERS_NOTIFY_USERUPDATED", $scope.user.UserName));
                if (closePage) {
                    $location.path('#/users');
                }
            });
        }
    }]);