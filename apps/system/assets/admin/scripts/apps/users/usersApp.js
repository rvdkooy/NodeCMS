cms = window.cms || {};

cms.usersApp = angular.module('usersApp', ['cms.growlers', 'cms.ichecker', 'cmsframework', 'ngResource', 'services']).
    config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
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

        $httpProvider.responseInterceptors.push('httpInterceptor');
    }]);