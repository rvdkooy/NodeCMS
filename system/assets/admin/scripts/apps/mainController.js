function mainController($scope, $http, $window) {
    $scope.logout = function () {
        
    	$http({ method: 'POST',
                url: '/admin/api/logout'
            })
    		.then(function() {
            	$window.location.href = '/admin';
        	});
    }
}