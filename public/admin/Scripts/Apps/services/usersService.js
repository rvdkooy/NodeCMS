﻿cms = window.cms || {};
cms.services = window.cms.services || angular.module('services', []);

cms.services.factory('usersService', ['$resource', function ($resource) {
    return $resource('/admin/api/users/:id', { id: '@_id' },
        {
            update: { method: 'PUT' },
        });
}]);