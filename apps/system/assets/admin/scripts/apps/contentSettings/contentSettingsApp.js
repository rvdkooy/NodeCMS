cms = window.cms || {};

cms.contentSettingsApp = angular.module('contentSettingsApp', ['cms.growlers', 'cmsframework', 'ngResource', 'services']).
    config(['$httpProvider', function($httpProvider) {

        $httpProvider.responseInterceptors.push('httpInterceptor');
    }]);
