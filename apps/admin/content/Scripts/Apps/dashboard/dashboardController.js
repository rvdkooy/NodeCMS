dashboardController.$inject = ["$scope", "dashboardService"];
function dashboardController($scope, dashboardService) {

    $scope.showLogMessagesLoader = true;
    $scope.showContentStatisticsLoader = true;
    $scope.showLatestChangedContentPagesLoader = true;
    
    dashboardService.getLatestLogMessages().success(function(data) {
        $scope.showLogMessagesLoader = false;
        $scope.latestLogMessages = data;
    });
    
    dashboardService.getContentStatistics().success(function (data) {
        $scope.showContentStatisticsLoader = false;
        $scope.contentStatistics = data;
    });
    
    dashboardService.getLatestChangedContentPages().success(function (data) {
        $scope.showLatestChangedContentPagesLoader = false;
        $scope.LatestChangedContentPages = data;
    });
}