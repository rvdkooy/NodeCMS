angular.module('cmsframework', [])
.factory('notificationService', ['$rootScope', function($rootScope) {
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