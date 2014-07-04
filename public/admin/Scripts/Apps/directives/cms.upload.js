/**
 * creates a jquery fileupload
 */
angular.module('ui.upload', [])
    .directive('uiUpload', [function () {
        var generatedIds = 0;
        return {

            link: function(scope, elm, attr) {
                var options;

                if (attr.uiUpload) {
                    options = scope.$eval(attr.uiUpload);
                } else {
                    options = {};
                }

                if (!attr.id) {
                    attr.$set('id', 'uiUpload' + generatedIds++);
                }

                $('#fileupload').fileupload(options);
            }
        };
    }]);