angular.module('dashboardApp', ['sharedmodule', 'services', 'contentwidgets'])
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
});