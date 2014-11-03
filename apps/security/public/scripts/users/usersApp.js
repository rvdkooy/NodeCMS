angular.module('usersApp', ['cms.growlers', 'cms.ichecker', 'services', 'ngRoute',
    'ngResource', 'sharedmodule', 'httpRequestInterceptors']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/users', { templateUrl: '/admin/users/listusers', controller: 'usersController' })
            .when('/adduser', { templateUrl: '/admin/users/adduser', controller: 'addUserController' })
            .when('/edituser/:userId', {
                templateUrl: '/admin/users/edituser',
                controller: 'editUserController',
                resolve: {
                    user: ["usersService", "$route", "$q", function(usersService, $route, $q) {
                        var deferred = $q.defer();

                        usersService.get({ id: $route.current.params.userId }, function(successData) {
                            deferred.resolve(successData);
                        }, function() {
                            deferred.reject();
                        });

                        return deferred.promise;
                    }]
                }
            })
            .otherwise({ redirectTo: '/users' });
    }])
.controller('usersController', ['$scope', 'usersService', 'notificationService',
    function ($scope, userService, notificationService) {
    
        loadUsers();

        $scope.deleteUser = function (index) {

            var user = $scope.users[index];

            var username = user.username;
            if (confirm(cms.adminResources.get("ADMIN_USERS_NOTIFY_DELETEUSER", username))) {
                user.$delete(function () {

                    notificationService.addSuccessMessage(cms.adminResources.get("ADMIN_USERS_NOTIFY_USERDELETED", username));

                    loadUsers();
                });
            }
        };

        function loadUsers() {
            $scope.users = userService.query();
        }
}])

.controller('addUserController', ['$scope', 'usersService', '$location', 'notificationService',
    function ($scope, usersService, $location, notificationService) {

        $scope.user = {};

        $scope.saveAndCloseButtonClicked = function () {

            usersService.save($scope.user, function () {

                notificationService.addSuccessMessage(cms.adminResources.get("ADMIN_USERS_NOTIFY_USERADDED", $scope.user.username));
                $location.path('#/users');
            });
        };
    }])

.controller('editUserController', ['$scope', 'user', '$location', 'notificationService',
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

                notificationService.addSuccessMessage(cms.adminResources.get("ADMIN_USERS_NOTIFY_USERUPDATED", $scope.user.username));
                if (closePage) {
                    $location.path('#/users');
                }
            });
        }
    }])
.factory('usersService', ['$resource', function ($resource) {
    return $resource('/admin/api/users/:id', { id: '@_id' },
        {
            update: { method: 'PUT' },
        });
}]);