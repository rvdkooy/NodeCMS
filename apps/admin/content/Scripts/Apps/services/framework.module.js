cms = window.cms || {};

cms.cmsframework = angular.module('cmsframework', []);

cms.cmsframework.factory('notificationService', ['$rootScope', function($rootScope) {
    var listeners = [];

    $rootScope.$on("$routeChangeStart", function() {
        listeners = [];
    });

    return {
        addErrorMessage: function(message) {
            for (var i = 0; i < listeners.length; i++) {

                if (listeners[i].messageType === 'error') {
                    listeners[i].handler(message);
                }
            }
        },
        addSuccessMessage: function(message) {
            for (var i = 0; i < listeners.length; i++) {

                if (listeners[i].messageType === 'success') {
                    listeners[i].handler(message);
                }
            }
        },

        addListener: function(func, messageType) {
            listeners.push({ handler: func, messageType: messageType });
        }
    };
}]);

cms.cmsframework.factory('httpInterceptor', ['$q', 'notificationService', function($q, notificationService) {
    return function(promise) {
        
        return promise.then(function (response) {
            return response;
        },
        function(response) {

            if (response.data.UnhandledExceptionMessage) {

                notificationService.addErrorMessage(response.data.UnhandledExceptionMessage);
            }

            if (response.data.RuleViolationExceptions) {

                for (var i = 0; i < response.data.RuleViolationExceptions.length; i++) {
                    notificationService.addErrorMessage(response.data.RuleViolationExceptions[i]);
                }
            }
            return $q.reject(response);
        });
    };
}]);


