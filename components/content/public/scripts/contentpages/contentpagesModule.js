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

var app = angular.module('contentPagesModule', ['services', 'contentServices', 'ui.tinymce', 'ui.bootstrap', 'cms.ichecker'
    , 'sharedmodule', 'ngResource', 'ngRoute', 'httpRequestInterceptors']).
    config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/contentpages', { 
                templateUrl: '/admin/contentpages/listcontentpages', 
                controller: 'pagesController' })
            .when('/addcontentpage', { 
                templateUrl: '/admin/contentpages/addcontentpage', 
                controller: 'addPageController' })
            .when('/editcontentpage/:pageId', {
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
            });
    }]);

app.controller('pagesController', function ($scope, pagesService, notificationService, $http, $modal) {
    
        loadPages();

        $scope.deletePage = function (index) {

            var page = $scope.pages[index];


            var modalInstance = $modal.open({
                templateUrl : 'confirmdeletecontentpage.html',
                resolve : {
                    pageToDelete : function (){ return page.name; }
                },
                controller : deleteContentPageController
            });

            modalInstance.result.then(function () {
                page.$delete(function () {

                    notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_PAGES_NOTIFY_PAGEDELETED', page.name));

                    loadPages();
                });
            });
        };

        function loadPages() {
            $scope.pages = pagesService.query();
        }
});

var deleteContentPageController = function ($scope, $modalInstance, pageToDelete){
    $scope.pageToDelete = pageToDelete;
    $scope.ok = function (){
        $modalInstance.close('ok');
    };

    $scope.cancel = function (){
        $modalInstance.dismiss('cancel');
    };
};

app.controller('addPageController', function ($scope, pagesService, $location, notificationService) {

        $scope.page = {};

        $scope.defaultTinyMceConfig = tinyMceConfig;

        $scope.saveAndCloseButtonClicked = function () {

            pagesService.save($scope.page, function () {

                notificationService.addSuccessMessage(cms.adminResources.get('ADMIN_PAGES_NOTIFY_PAGEADDED', $scope.page.name));

                $location.path('/contentpages');
            });
        };
    });

app.controller('editPageController', function ($scope, page, $location, notificationService, pagesService, $http) {

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
                    $location.path('/contentpages');
                }
            });
        }
    })
    .directive('latestupdates', function(){
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
                            '<a href="#/editcontentpage/{{ page._id }}">{{ page.name }}</a>' +
                            '<span class="pull-right">{{ page.changed }}</span>' +
                            '</li>' +
                        '</ul>' +
                    '</div>'      
        };
    });