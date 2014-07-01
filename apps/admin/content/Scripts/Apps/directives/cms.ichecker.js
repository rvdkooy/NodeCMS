
angular.module('cms.ichecker', [])
    //
    // This directive is needed to make the icheck plugin work in angularjs enabled forms
    //
    .directive('uiIchecker', function() {
        return {
            restrict: 'A',
            scope: {
                isSelected: '@selectedproperty',
                localModel: '=ngModel'
            },
            link: function (scope, elm) {

                setTimeout(function () {
                    var originalCheckbox = $(elm);

                    if (scope.isSelected === "true") {
                        originalCheckbox.attr('checked', 'checked');
                    }

                    originalCheckbox.iCheck({
                        checkboxClass: 'icheckbox_flat-aero',
                        radioClass: 'iradio_flat-aero'
                    });

                    originalCheckbox.on('ifChecked', function() {

                        scope.$apply(function () {
                            scope.localModel = true;
                        });
                    });

                    originalCheckbox.on('ifUnchecked', function() {

                        scope.$apply(function () {
                            scope.localModel = false;
                        });
                    });
                });
            }
        };
    });