cms = window.cms || {};

cms.uploadsApp = angular.module('uploadsApp', ['cmsframework', 'cms.growlers', 'ui.upload', 'services']).
    config(['$httpProvider', function($httpProvider) {

        $httpProvider.responseInterceptors.push('httpInterceptor');
    }]);