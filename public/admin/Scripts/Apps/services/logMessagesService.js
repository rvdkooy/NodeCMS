cms = window.cms || {};
cms.services = window.cms.services || angular.module('services', []);

cms.services.factory('logmessagesService', ['$resource', function ($resource) {
    return $resource('/admin/api/logmessages');
}]);