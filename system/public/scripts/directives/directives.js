var app = angular.module('mainDirectives', ['filters']);

app.directive('userSection', function(){
	return {
        controller: function($scope, $http, $window){
        	$scope.logout = function(){
        		$http({ method: 'POST',
	                url: '/admin/api/logout'
	            })
	    		.then(function() {
	            	$window.location.href = '/admin';
	        	});
        	};
        },
        template: '<ul class="nav navbar-top-links navbar-right">' +
                '<li class="dropdown">' +
                    '<a ng-click="logout()">' +
                                '<i class="fa fa-sign-out fa-fw"></i>' +
                                '<span >{{ "ADMIN_TOPMENU_LABEL_LOGOUT" | __ }}</span>' +
                            '</a>' +
                '</li>' +
            '</ul>'
	};
});

module.exports = app;