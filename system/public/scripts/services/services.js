var toastr = require('toastr');
toastr.options.positionClass = "toast-top-right";
toastr.options.showMethod = 'fadeIn';
toastr.options.hideMethod = 'fadeOut';
toastr.options.closeButton = true;

angular.module('services', ['ngResource'])

	.factory('logsService', ['$resource', function ($resource) {
	    return $resource('/admin/api/logs');
	}])

	.factory('settingsService', ['$http', function ($http) {

	    return {
	        findByKeys: function (keys) {

	            var keysData = '';

	            for (var i = 0; i < keys.length; i++) {
	                if (i === 0) {
	                    keysData = '?keys=' + keys[i];
	                } else {
	                    keysData += '&keys=' + keys[i];
	                }
	            }

	            return $http.get('/admin/api/settings/' + keysData);
	        },
	        saveSettings: function (keyValues) {

	            var data = JSON.stringify(keyValues);

	            return $http.post('/admin/api/settings', data);
	        }
	    };
	}])

	.factory('uploadsService', ["$http", function ($http) {
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
	}])
	
	.factory('notificationService', ['$rootScope', function($rootScope) {

	    return {
	        addErrorMessage: function(message) {
	            toastr.error(message);
	        },
	        addSuccessMessage: function(message) {
	            toastr.success(message);
	        }
	    };
	}]);