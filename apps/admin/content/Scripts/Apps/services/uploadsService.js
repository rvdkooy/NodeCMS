cms = window.cms || {};
cms.services = window.cms.services || angular.module('services', []);

cms.services.factory('uploadsService', ["$http", function ($http) {
    return {
        getFolderContents: function(path) {

            return $http({
                method: 'GET',
                url: '/admin/api/uploadmanagement/getfoldercontents' + createQueryStringFromPath(path)
            });
        },
        deleteFile: function(path, fileName) {

            var pathQueryString = createQueryStringFromPath(path);

            return $http({
                method: 'DELETE',
                url: '/admin/api/uploadmanagement/deletefile{0}filename={1}'.format(pathQueryString, fileName)
            });
        },
        deleteFolder: function(path, folderName) {
            
            var pathQueryString = createQueryStringFromPath(path);
            
            return $http({
                method: 'DELETE',
                url: '/admin/api/uploadmanagement/deletefolder{0}foldername={1}'.format(pathQueryString, folderName)
            });
        },
        createFolder: function (path, folderName) {

            var pathQueryString = createQueryStringFromPath(path);

            return $http({
                method: 'POST',
                url: '/admin/api/uploadmanagement/createfolder{0}foldername={1}'.format(pathQueryString, folderName)
            });
        }
    };
    
    function createQueryStringFromPath(path) {
        var queryString = '?';

        for (var i = 0; i < path.length; i++) {
            if (i === 0) {
                queryString = '?folders=' + path[i] + '&';
            } else {
                queryString += 'folders=' + path[i] + '&';
            }
        }

        return queryString;
    }
}]);