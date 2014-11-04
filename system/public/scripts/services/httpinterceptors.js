angular.module("httpRequestInterceptors", [])

.config(['$httpProvider', function ($httpProvider) {
    
    $httpProvider.interceptors.push(function($q, notificationService){
        
        return {
                'responseError': function (response) {

                    if (response.data.UnhandledExceptionMessage) {
                        notificationService.addErrorMessage(response.data.UnhandledExceptionMessage);
                    }

                    if (response.data.RuleViolationExceptions) {

                        for (var i = 0; i < response.data.RuleViolationExceptions.length; i++) {
                            notificationService.addErrorMessage(response.data.RuleViolationExceptions[i]);
                        }
                    }

                    return $q.reject(response);
                }
            };
    });
 }]);