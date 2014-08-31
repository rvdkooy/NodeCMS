cms.menusApp.controller('menusController', [
    '$scope', 'menusService', 'notificationService',
    function($scope, menusService, notificationService) {

        loadMenus();

        $scope.deleteMenu = function(index) {

            var menu = $scope.menus[index];

            var menuName = menu.Name;

            if (confirm(cms.adminResources.get('MENUS_NOTIFY_DELETEMENU', menuName))) {
                menu.$delete(function() {
                    
                    notificationService.addSuccessMessage(cms.adminResources.get('MENUS_NOTIFY_MENUDELETED', menuName));

                    loadMenus();
                });
            }
        };

        function loadMenus() {
            $scope.menus = menusService.query();
        }

    }
]);

cms.menusApp.controller('addMenuController', [
    '$scope', 'menusService', '$location', 'notificationService',
    function($scope, menusService, $location, notificationService) {

        $scope.menu = {};

        $scope.saveAndCloseButtonClicked = function() {

            menusService.save($scope.menu, function() {
                
                notificationService.addSuccessMessage(cms.adminResources.get('MENUS_NOTIFY_MENUADDED', $scope.menu.Name));

                $location.path('#/menus');
            });
        };
    }
]);

cms.menusApp.controller('editMenuController', [
    '$scope', 'menu', '$location', 'notificationService', '$modal', '$http',
    function($scope, menu, $location, notificationService, $modal, $http) {

        $scope.menu = menu;

        $scope.openNewMenuItemDialog = function() {
            var modalInstance = $modal.open({
                templateUrl: 'newMenuItemTemplate.html',
                controller: 'AddMenuItemController'
            });

            modalInstance.result.then(function(data) {

                if (data) {
                    $scope.menu.Children.push({ Id: '', Name: data.name, Url: data.url });
                }
            });
        };
        
        $scope.saveAndCloseButtonClicked = function() {

            var nestedMenu = $('#nestedMenu');
            var order = nestedMenu.nestedSortable('serialize');

            $http({
                url: '/admin/api/menus/rebuildMenu/' + menu.Id,
                method: "POST",
                data: { id: menu.Id, inputs: $('#form').serialize(), order: order },
            }).success(function(data) {

                notificationService.addSuccessMessage(cms.adminResources.get('MENUS_NOTIFY_MENUUPDATED', $scope.menu.Name));

                $location.path('#/menus');
            });
        };
    }
]);

cms.menusApp.controller('AddMenuItemController', [
    '$scope', '$modalInstance', function($scope, $modalInstance) {

        $scope.saveAndClose = function (name, url) {
            $modalInstance.close({name: name, url: url});
        };

        $scope.closeModal = function() {
            $modalInstance.close();
        }
    }
]);