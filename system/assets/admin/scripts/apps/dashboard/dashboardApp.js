(function(cms, angular){

    cms.home.init = function(widgetModules){

        var modules = ['sharedmodule', 'services', 'filters'].concat(widgetModules);

        angular.module('dashboardApp', modules)
            .controller('dashboardController', function($scope, logsService){
                $scope.showLogMessagesLoader = true;
                
                logsService.query({ limit: 5 }).$promise.then(function(data){
                    $scope.latestLogMessages = data;
                    $scope.showLogMessagesLoader = false;
                });
            })
            .directive('contentStats', function(){
                return {
                  restrict: 'E',
                  controller: function($scope, $http){
                    
                    $scope.showBusyIndicator = true;

                    $http.get('/admin/api/dashboard/getcontentstats').then(function(result){
                        $scope.showBusyIndicator = false;
                        $scope.contentstats = result.data;
                    });
                  },
                  template: '<div class="busy" ng-show="showBusyIndicator"></div>' +
                            '<div class="contentstats">' +
                                '<h5 ng-repeat="stat in contentstats"><span class="label label-primary">{{ stat.count }}</span>' +
                                '<a href="{{ stat.url }}">{{ stat.resourcekey | __  }}</a></h5>' +
                            '</div>'      
                };
            });
    };

})(window.cms = window.cms || {}, window.angular)


