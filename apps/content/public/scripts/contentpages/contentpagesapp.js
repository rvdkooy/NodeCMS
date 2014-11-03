// warning global variable
var tinyMceConfig = {
    resize: false,
    plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen", "image",
        "insertdatetime media table contextmenu paste"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    file_browser_callback: function (field_name, url, type, win) {

        if (type == 'image' || type == 'file') {
            var ed = tinyMCE.activeEditor;
            ed.windowManager.open({
                file: '/admin/uribrowser/index?runningFromTinyMce=true&type=' + type + '&inputId=none',
                title: cms.adminResources.get('PAGES_LABEL_URIBROWSERTITLE'),
                width: 500,
                height: 600,
                scrollbars: "yes",
                inline: "yes"
            }, {
                window: win,
                input: field_name,
                oninsert: function (passedurl) {
                    var field = win.document.getElementById(field_name);
                    field.value = passedurl;
                    tinyMCE.activeEditor.dom.fire(field, "change");
                }
            });
        }
        return false;
    },

    extended_valid_elements: "iframe[src|width|height|name|align|style]",
    relative_urls: false,
    convert_urls: false,
    language: $.cookie("cmslanguage")
};

var app = angular.module('contentPagesApp', ['services', 'contentServices', 'ui.tinymce', 'ui.bootstrap', 'cms.growlers', 'cms.ichecker'
    , 'sharedmodule', 'ngResource', 'ngRoute', 'httpRequestInterceptors']).
    config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/all', { templateUrl: '/admin/contentpages/listcontentpages', controller: 'pagesController' })
            .when('/add', { templateUrl: '/admin/contentpages/addcontentpage', controller: 'addPageController' })
            .when('/edit/:pageId', {
                templateUrl: '/admin/contentpages/editcontentpage',
                controller: 'editPageController',
                resolve: {
                    page: ["pagesService", "$route", "$q", function(pagesService, $route, $q) {
                        var deferred = $q.defer();

                        pagesService.get({ pageid: $route.current.params.pageId }, function (successData) {
                            deferred.resolve(successData);
                        }, function() {
                            deferred.reject();
                        });

                        return deferred.promise;
                    }]
                }
            })
            .otherwise({ redirectTo: '/all' });
    }]);

app.controller('pagesController', ['$scope', 'pagesService', 'notificationService', '$http',
    function ($scope, pagesService, notificationService, $http) {
    
        loadPages();

        $scope.deletePage = function (index) {

            var page = $scope.pages[index];

            var pageName = page.name;
            if (confirm(cms.adminResources.get("ADMIN_PAGES_NOTIFY_DELETEPAGE", pageName))) {
                page.$delete(function () {

                    notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_PAGES_NOTIFY_PAGEDELETED', pageName));

                    loadPages();
                });
            }
        };

        $scope.clearCache = function () {

            $http({
                method: 'POST',
                url: '/admin/api/pages/clearcache'
            }).success(function () {
                notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_PAGES_NOTIFY_ALLCACHECLEARED'));
            });
        };

        function loadPages() {
            $scope.pages = pagesService.query();
        }
}]);

app.controller('addPageController', ['$scope', 'pagesService', '$location', 'notificationService',
    function ($scope, pagesService, $location, notificationService) {

        $scope.page = {};

        $scope.defaultTinyMceConfig = tinyMceConfig;

        $scope.saveAndCloseButtonClicked = function () {

            pagesService.save($scope.page, function () {

                notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_PAGES_NOTIFY_PAGEADDED', $scope.page.name));

                $location.path('#/contentpages');
            });
        };
    }]);

app.controller('editPageController', ['$scope', 'page', '$location', 'notificationService', 'pagesService', '$http',
    function ($scope, page, $location, notificationService, pagesService, $http) {

        $scope.page = page;

        $scope.defaultTinyMceConfig = tinyMceConfig;

        $scope.saveButtonClicked = function () {
            updatePage(false);
        };

        $scope.saveAndCloseButtonClicked = function () {
            updatePage(true);
        };

        $scope.clearCacheButtonClicked = function () {

            $http({
                method: 'POST',
                url: '/admin/api/pages/clearcacheforpage/' + $scope.page._id
            }).success(function () {

                notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_PAGES_NOTIFY_PAGECACHECLEARED', $scope.page.name));
            });
        };

        function updatePage(closePage) {

            $scope.page.$update(function () {

                notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_PAGES_NOTIFY_PAGEUPDATED', $scope.page.name));

                if (closePage) {
                    $location.path('#/contentpages');
                }
            });
        }
    }]);