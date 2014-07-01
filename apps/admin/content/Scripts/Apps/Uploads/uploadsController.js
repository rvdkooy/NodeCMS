cms.uploadsApp.controller('uploadsController', [
    '$scope', 'notificationService', '$http', 'uploadsService',
    function($scope, notificationService, $http, uploadsService) {

        $scope.folders = [];
        $scope.createFolderName = '';
        $scope.uploadConfig = {
            url: '/admin/api/uploadmanagement/uploadfiles',
            dataType: 'json',
            dropZone: $('#dropzone'),
            complete: function(xhr) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (xhr.status == 200) {
                        notificationService.addSuccessMessage(cms.adminResources.get("UPLOADS_NOTIFY_FILEUPLOADED"));
                        retrieveFolderContents();

                    } else {
                        notificationService.addErrorMessage(cms.adminResources.get("UPLOADS_NOTIFY_FILENOTUPLOADED"));
                    }
                }
            },
            start: function() {
                updateProgress(0);
            },
            progressall: function(e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                updateProgress(progress);
            },
            submit: function(e, data) {
                data.formData = { 'folders[]': JSON.stringify($scope.folders) };
            }
        };

        $scope.createFolder = function() {

            uploadsService.createFolder($scope.folders, $scope.createFolderName).success(function() {
                retrieveFolderContents();
                notificationService.addSuccessMessage(cms.adminResources.get("UPLOADS_NOTIFY_FOLDERCREATED", $scope.createFolderName));
                $scope.createFolderName = '';
            });

        };

        $scope.openFolder = function(folder) {
            $scope.folders.push(folder);
            retrieveFolderContents();

            return false;
        };

        $scope.deleteFolder = function(folderName) {

            if (confirm(cms.adminResources.get("UPLOADS_NOTIFY_DELETEFOLDER", folderName))) {
                uploadsService.deleteFolder($scope.folders, folderName).success(function() {
                    retrieveFolderContents();

                    notificationService.addSuccessMessage(cms.adminResources.get("UPLOADS_NOTIFY_FOLDERDELETED", folderName));
                });
            }
        };

        $scope.deleteFile = function(fileName) {

            if (confirm(cms.adminResources.get("UPLOADS_NOTIFY_DELETEFILE", fileName))) {
                uploadsService.deleteFile($scope.folders, fileName).success(function() {
                    retrieveFolderContents();
                    notificationService.addSuccessMessage(cms.adminResources.get("UPLOADS_NOTIFY_FILEDELETED", fileName));
                });
            }
        };

        $scope.gotoFolder = function(folder) {

            var index = $scope.folders.indexOf(folder);
            var length = $scope.folders.length - index;

            if (index !== -1) {
                $scope.folders.splice(index, length, folder);
            } else {
                $scope.folders = [];
            }

            retrieveFolderContents();
        };

        function updateProgress(percentage) {
            $scope.uploadProgress = percentage + '%';

            if (!$scope.$$phase) {
                $scope.$apply();
            }
            console.log('upload progress: ' + $scope.uploadProgress);
        }

        function retrieveFolderContents() {
            uploadsService.getFolderContents($scope.folders).success(function(data) {

                $scope.folderContent = data;
            });
        }

        retrieveFolderContents();

        updateProgress(0);
    }
]);