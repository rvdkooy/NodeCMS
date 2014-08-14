angular.module('cms.loginshaker', [])
    //
    // Directive shakes the login box when a invalid 
    //username password combination is used
    //
    .directive('loginShaker', [function () {
    	return {
    		restrict: 'A',
    		link: function (scope, elm) {
    			
    		    scope.$watch("unauthorizedLogin", function (newValue) {
    		        if (newValue === true) {
    		            $(elm).shake(3, 6, 180);
		            }
    		    });
    		}
    	};
    }])