(function(cms, angular){


    cms.home.init = function(widgetModules){

        var modules = ['sharedmodule', 'services'].concat(widgetModules);

        angular.module('dashboardApp', modules)
        .factory('dashboardService', function ($http) {
            return {
                
                getContentStatistics: function() {
                    return {
                            success: function(f){
                                f( {
                                    NumberOfContentPages: 10,
                                    NumberOfMenus: 11,
                                    NumberOfUsers: 12,
                                    NumberOfUploadedFiles: 13
                                } );
                            }
                        }
                   
                },
                getLatestChangedContentPages: function() {
                    return {
                            success: function(f){
                                f( [ { PageName: 'Page One', LastChanged: 'NVT' },
                                { PageName: 'Page Two', LastChanged: 'NVT' },
                                { PageName: 'Page Three', LastChanged: 'NVT' } ] );
                            }
                        }
                 
                }
                
                // getContentStatistics: function() {
                //     return $http({
                //         method: 'GET',
                //         url: '/admin/dashboard/getcontentstatistics',
                //         params: { number: 3 }
                //     });
                // },
                // getLatestChangedContentPages: function() {
                //     return $http({
                //         method: 'GET',
                //         url: '/admin/dashboard/getlatestchangedcontentpages',
                //         params: { number: 3 }
                //     });
                // }
            };
        })
        .controller('dashboardController', function($scope, dashboardService, logsService){
            $scope.showLogMessagesLoader = true;
            //$scope.showContentStatisticsLoader = true;
            //$scope.showLatestChangedContentPagesLoader = true;
            
            logsService.query({ limit: 5 }).$promise.then(function(data){
                $scope.latestLogMessages = data;
                $scope.showLogMessagesLoader = false;
            });
            
            
            // dashboardService.getContentStatistics().success(function (data) {
            //     $scope.showContentStatisticsLoader = false;
            //     $scope.contentStatistics = data;
            // });
            
            // dashboardService.getLatestChangedContentPages().success(function (data) {
            //     $scope.showLatestChangedContentPagesLoader = false;
            //     $scope.LatestChangedContentPages = data;
            // });
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
                        '<div>' +
                            '<h5 ng-repeat="stat in contentstats"><span class="label label-primary">{{ stat.count }}</span>' +
                            '{{ stat.text }}</h5>' +
                        '</div>'      
            };
        });
    };

})(window.cms = window.cms || {}, window.angular)


