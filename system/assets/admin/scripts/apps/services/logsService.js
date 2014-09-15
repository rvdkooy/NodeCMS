acms = window.cms || {};
cms.services = window.cms.services || angular.module('services', ['ngResource']);

cms.services.factory('logsService', ['$resource', function ($resource) {
    return $resource('/admin/api/logs');
}]);