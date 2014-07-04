cms = window.cms || {};

cms.pagesApp = angular.module('pagesApp', ['ui.tinymce', 'cms.growlers', 'cms.ichecker', 'cmsframework', 'ngResource', 'services']).
    config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/pages', { templateUrl: '/admin/pages/listpages', controller: 'pagesController' })
            .when('/addpage', { templateUrl: '/admin/pages/addpage', controller: 'addPageController' })
            .when('/editpage/:pageId', {
                templateUrl: '/admin/pages/editpage',
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
            .otherwise({ redirectTo: '/pages' });

        $httpProvider.responseInterceptors.push('httpInterceptor');
    }]);

cms.pagesApp.tinyMceConfig = {
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