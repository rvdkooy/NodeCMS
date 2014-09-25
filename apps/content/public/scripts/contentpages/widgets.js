var widgetsModule = angular.module('contentwidgets', []);

widgetsModule.directive('latestupdates', function(){
	return {
      restrict: 'E',
      controller: function($scope, $http){
      	$scope.latestContentPages = [];

      	$http.get('/admin/api/contentpages/latestchanged/5').then(function(result){
      		$scope.latestContentPages = result.data;
      	});
      },
      template: '<div class="panel-heading">' +
                    'Latest Changed Pages' +
                '</div>' +
                '<div class="panel-body">' +
                    '<div ng-repeat="page in latestContentPages">{{ page.name }}</div>' +
                '</div>'      
    };
});