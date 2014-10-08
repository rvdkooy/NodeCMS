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
    function ($scope, menu, $location, notificationService, menusService, $http, $modal) {

        menu.children = menu.children || [];
        $scope.menu = menu;

        $scope.addMenuItem = function() {
            var modalInstance = $modal.open({
                templateUrl: 'newMenuItemTemplate.html',
                controller: 'AddMenuItemController'
            });

            modalInstance.result.then(function(data) {

                if (data) {
                    $scope.menu.children.push({ name: data.name, url: data.url });
                }
            });
        };

        $scope.saveButtonClicked = function () {
            updateMenu(false);
        };

        $scope.saveAndCloseButtonClicked = function () {
            updateMenu(true);
        };
        
        function updateMenu(close) {

            var hierarchy = $('#nestedMenu').nestedSortable('toHierarchy');
            
            var newMenu = {
                _id: $scope.menu._id,
                name: $scope.menu.name,
                children: hierarchy
            }

            for (var i = 0; i < newMenu.children.length; i++) {
                rebuildMenu(newMenu.children[i], $scope.menu.children);
            };

            menusService.update(newMenu, function(){
                notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_MENUS_NOTIFY_MENUUPDATED', $scope.menu.name));

                if (close) {
                    $location.path('#/all');
                }
            });
        }

        function rebuildMenu(hierarchyItem, originalMenu){
            
            var originalItem = findInOriginalMenu(originalMenu, hierarchyItem.id);
            if(originalItem){
                hierarchyItem.name = originalItem.name;
                hierarchyItem.url = originalItem.url;
            }
            if(hierarchyItem.children){
                for (var i = 0; i < hierarchyItem.children.length; i++) {
                    rebuildMenu(hierarchyItem.children[i], originalMenu);
                };
            }
        }
        function search(item, id){
                        
            if(item.id === id){
                return item;
            }   
            else{
                if(item.children){
                    for (var i = 0; i < item.children.length; i++) {
                        var searchResult = search(item.children[i], id);
                        if(searchResult){
                            return searchResult;
                        }
                    }
                }
            }
        }
        function findInOriginalMenu(children, id){
           for (var i = 0; i < children.length; i++) {
                
                var searchResult = search(children[i], id);
                if(searchResult){
                    return searchResult;
                }
            };
        }
    });

app.controller('AddMenuItemController', function($scope, $modalInstance) {

        $scope.saveAndClose = function (name, url) {
            $modalInstance.close({name: name, url: url});
        };

        $scope.closeModal = function() {
            $modalInstance.close();
        }
    }
);