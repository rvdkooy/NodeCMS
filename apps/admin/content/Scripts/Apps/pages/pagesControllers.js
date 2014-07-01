cms.pagesApp.controller('pagesController', ['$scope', 'pagesService', 'notificationService', '$http',
    function ($scope, pagesService, notificationService, $http) {
    
        loadPages();

        $scope.deletePage = function (index) {

            var page = $scope.pages[index];

            var pageName = page.Name;
            if (confirm(cms.adminResources.get("PAGES_NOTIFY_DELETEPAGE", pageName))) {
                page.$delete(function () {

                    notificationService.addSuccessMessage(cms.adminResources.get('PAGES_NOTIFY_PAGEDELETED', pageName));

                    loadPages();
                });
            }
        };

        $scope.clearCache = function () {

            $http({
                method: 'POST',
                url: '/admin/api/pages/clearcache'
            }).success(function () {
                notificationService.addSuccessMessage(cms.adminResources.get('PAGES_NOTIFY_ALLCACHECLEARED'));
            });
        };

        function loadPages() {
            $scope.pages = pagesService.query();
        }
}]);

cms.pagesApp.controller('addPageController', ['$scope', 'pagesService', '$location', 'notificationService',
    function ($scope, pagesService, $location, notificationService) {

        $scope.page = {};

        $scope.defaultTinyMceConfig = cms.pagesApp.tinyMceConfig;

        $scope.saveAndCloseButtonClicked = function () {

            pagesService.save($scope.page, function () {

                notificationService.addSuccessMessage(cms.adminResources.get('PAGES_NOTIFY_PAGEADDED', $scope.page.Name));

                $location.path('#/pages');
            });
        };
    }]);

cms.pagesApp.controller('editPageController', ['$scope', 'page', '$location', 'notificationService', 'pagesService', '$http',
    function ($scope, page, $location, notificationService, pagesService, $http) {

        $scope.page = page;

        $scope.defaultTinyMceConfig = cms.pagesApp.tinyMceConfig;

        $scope.saveButtonClicked = function () {
            updatePage(false);
        };

        $scope.saveAndCloseButtonClicked = function () {
            updatePage(true);
        };

        $scope.clearCacheButtonClicked = function () {

            $http({
                method: 'POST',
                url: '/admin/api/pages/clearcacheforpage/' + $scope.page.Id
            }).success(function () {

                notificationService.addSuccessMessage(cms.adminResources.get('PAGES_NOTIFY_PAGECACHECLEARED', $scope.page.Name));
            });
        };

        function updatePage(closePage) {

            $scope.page.$update(function () {

                notificationService.addSuccessMessage(cms.adminResources.get('PAGES_NOTIFY_PAGEUPDATED', $scope.page.Name));

                if (closePage) {
                    $location.path('#/pages');
                }
            });
        }
    }]);