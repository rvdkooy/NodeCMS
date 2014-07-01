cms = window.cms || {};
cms.services = window.cms.services || angular.module('services', []);

cms.services.factory('menusService', ['$resource', function ($resource) {
    return $resource('/admin/api/menus/:id', { id: '@Id' },
        {
            update: { method: 'PUT' },
            rebuildMenu: { method: 'PUT' },
        });
}]);