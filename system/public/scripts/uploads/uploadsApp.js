cms = window.cms || {};

cms.uploadsApp = angular.module('uploadsApp', ['ui.upload', 'services']).
    config(['$httpProvider', function($httpProvider) {

        $httpProvider.responseInterceptors.push('httpInterceptor');
    }]);