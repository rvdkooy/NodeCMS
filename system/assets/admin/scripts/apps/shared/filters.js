angular.module('filters', [])
	.filter('__', function() {
        return function(input) {
            return cms.adminResources.get(input);
        }
    });