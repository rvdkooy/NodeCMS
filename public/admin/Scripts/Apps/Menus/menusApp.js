cms = window.cms || {};

cms.menusApp = angular.module('menusApp', ['cms.growlers', 'cms.sortableMenu', 'cmsframework', 'ngResource', 'ui.bootstrap', 'services']).
    config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/menus', { templateUrl: '/admin/menus/listmenus', controller: 'menusController' })
            .when('/addmenu', { templateUrl: '/admin/menus/addmenu', controller: 'addMenuController' })
            .when('/editmenu/:menuId', {
                templateUrl: '/admin/menus/editmenu',
                controller: 'editMenuController',
                resolve: {
                    menu: ["menusService", "$route", "$q", function(menusService, $route, $q) {
                        var deferred = $q.defer();

                        menusService.get({ id: $route.current.params.menuId }, function (successData) {
                            deferred.resolve(successData);
                        }, function() {
                            deferred.reject();
                        });

                        return deferred.promise;
                    }]
                }
            })
            .otherwise({ redirectTo: '/menus' });

        $httpProvider.responseInterceptors.push('httpInterceptor');
    }]);
