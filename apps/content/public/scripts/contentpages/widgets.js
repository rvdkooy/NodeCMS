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
                    cms.adminResources.get('ADMIN_DASHBOARD_LABEL_LATESTCHANGEDPAGES') +
                '</div>' +
                '<div class="panel-body">' +
                    '<ul class="list-group">' +
                      '<li class="list-group-item" ng-repeat="page in latestContentPages">' +
                        '<i class="fa fa-file-text-o fa-fw"></i>' +
                        '<a href="/admin/contentpages#/edit/{{ page._id }}">{{ page.name }}</a>' +
                        '<span class="pull-right">{{ page.changed }}</span>' +
                        '</li>' +
                    '</ul>' +
                '</div>'      
    };
});