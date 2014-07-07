cms = window.cms || {};
cms.services = window.cms.services || angular.module('services', []);

cms.services.factory('dashboardService', ["$http", function ($http) {
    return {
        getLatestLogMessages: function() {
                return {
                    success: function(f){
                        f( [ { Message: 'Message One', IconText: 'WARN', IconClass: 'label-warning' },
                        { Message: 'Message Two', IconText: 'WARN', IconClass: 'label-warning' },
                        { Message: 'Message Three', IconText: 'WARN', IconClass: 'label-warning' } ] );
                    }
                }
          
        },
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
        // getLatestLogMessages: function() {
        //     return $http({
        //         method: 'GET',
        //         url: '/admin/dashboard/getlatestlogmessages',
        //         params: { number: 3 }
        //     });
        // },
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
}]);