angular.module('sharedmodule', [])
.controller("maincontroller", function($scope, $http, $window){
	$scope.logout = function () {
        
    	$http({ method: 'POST',
                url: '/admin/api/logout'
            })
    		.then(function() {
            	$window.location.href = '/admin';
        	});
    }
});
