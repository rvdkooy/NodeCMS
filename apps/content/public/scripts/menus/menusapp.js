var app = angular.module('menusApp', ['ui.bootstrap', 'cms.growlers', 'cmsframework', 'sharedmodule', 'ngResource', 
    'ngRoute', 'httpRequestInterceptors', 'cms.sortableMenu']).
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

app.controller('menusController',     function ($scope, menusService, notificationService, $http) {
    
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
});

app.controller('addMenuController', 
    function ($scope, menusService, $location, notificationService) {

        $scope.menu = {};

        $scope.saveAndCloseButtonClicked = function () {

            menusService.save($scope.menu, function () {

                notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_MENUS_NOTIFY_MENUADDED', $scope.menu.name));

                $location.path('#/all');
            });
        };
    });

app.controller('editMenuController', 
    function ($rootScope, $scope, menu, $location, notificationService, menusService, $http) {

        menu.children = menu.children || [];
        $scope.menu = menu;
        $scope.addMenuItem = function(){
            $rootScope.$broadcast('createNewMenuItem');
        };
        $scope.saveButtonClicked = function () {
            updateMenu(false);
        };

        $scope.saveAndCloseButtonClicked = function () {
            updateMenu(true);
        };
        
        function updateMenu(close) {

            menusService.update($scope.menu, function(){
                notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_MENUS_NOTIFY_MENUUPDATED', $scope.menu.name));

                if (close) {
                    $location.path('#/all');
                }
            });
        }
    });