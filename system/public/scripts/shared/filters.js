angular.module('filters', [])
	.filter('__', function() {
        return function(input, args) {
            return cms.adminResources.get(input, args);
        }
    });