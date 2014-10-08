var app = angular.module('menusApp', ['cms.growlers', 'cmsframework', 'sharedmodule', 'ngResource', 
    'ngRoute', 'httpRequestInterceptors']).
    config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/all', { templateUrl: '/admin/menus/list', controller: 'menusController' })
            .when('/add', { templateUrl: '/admin/menus/add', controller: 'addMenuController' })
            .when('/edit/:menuId', {
                templateUrl: '/admin/menus/edit',
                controller: 'editMenuController',
                resolve: {
                    menu: ["menusService", "$route", "$q", function(menusService, $route, $q) {
                        var deferred = $q.defer();

                        menusService.get({ menuid: $route.current.params.menuId }, function (successData) {
                            deferred.resolve(successData);
                        }, function() {
                            deferred.reject();
                        });

                        return deferred.promise;
                    }]
                }
            })
            .otherwise({ redirectTo: '/all' });
    }]);


app.factory('menusService', ['$resource', function ($resource) {
    return $resource('/admin/api/menus/:menuid', { menuid: '@_id' },
        {
            update: { method: 'PUT' },
        });
}]);

app.controller('menusController', ['$scope', 'menusService', 'notificationService', '$http',
     function ($scope, menusService, notificationService, $http) {
    
         loadMenus();

        $scope.deleteMenu = function (index) {

            var menu = $scope.menus[index];

            var menuName = menu.name;
            if (confirm(cms.adminResources.get("ADMIN_MENUS_NOTIFY_DELETEMENU", menuName))) {
                menu.$delete(function () {

                    notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_MENUS_NOTIFY_MENUDELETED', menuName));

                    loadMenus();
                });
            }
        };

        function loadMenus() {
            $scope.menus = menusService.query();
        }
}]);

app.controller('addMenuController', ['$scope', 'menusService', '$location', 'notificationService',
    function ($scope, menusService, $location, notificationService) {

        $scope.menu = {};

        $scope.saveAndCloseButtonClicked = function () {

            menusService.save($scope.menu, function () {

                notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_MENUS_NOTIFY_MENUADDED', $scope.menu.name));

                $location.path('#/all');
            });
        };
    }]);

app.controller('editMenuController', ['$scope', 'menu', '$location', 'notificationService', 'menusService', '$http',
    function ($scope, menu, $location, notificationService, menusService, $http) {

        $scope.menu = menu;

        $scope.saveButtonClicked = function () {
            updateMenu(false);
        };

        $scope.saveAndCloseButtonClicked = function () {
            updateMenu(true);
        };
        
        function updateMenu(close) {

            $scope.menu.$update(function () {

                notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_MENUS_NOTIFY_MENUUPDATED', $scope.menu.name));

                if (close) {
                    $location.path('#/all');
                }
            });
        }
    }]);