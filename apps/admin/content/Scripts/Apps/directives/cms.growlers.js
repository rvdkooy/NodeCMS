
angular.module('cms.growlers', [])
    //
    // Directive that shows a growl message when a error messaged is pushed to 
    //
    .directive('uiGrowler', ["notificationService", function(notificationService) {
        return {
            restrict: 'A',
            controller: function ($scope, $element, $attrs) {

                notificationService.addListener(showErrorMessages, 'error');

                notificationService.addListener(showSuccessMessages, 'success');

                function showSuccessMessages(message) {
                    showGrowl('success', message);
                }

                function showErrorMessages(message) {
                    showGrowl('error', message);
                }
            }
        };
    }])