angular.module('cms.focus', [])
    //
    // Directive that registers a focus on an element 
    //
    .directive('uiFocus', [function () {
    	return {
    		restrict: 'A',
    		link: function (scope, elm) {
    			elm.focus();
    		}
    	};
    }])