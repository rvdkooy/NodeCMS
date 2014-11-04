(function (cms, $) {
    'use strict';

    var enableTinyMCe;

    function init(tinyMce) {

        enableTinyMCe = tinyMce;

        registerClickHandlersOnAnchors();
    }

    function registerClickHandlersOnAnchors() {
        $('#uriBrowserTree li a').click(function () {
            var type = $(this).data('type');
            var navigateUrl = $(this).data('navigateurl');
            var inputId = $(this).data('inputid');

            uriSelected(type, navigateUrl, inputId);
        });
    }

    function uriSelected(type, url, inputId) {

        if (type == 'image' || type == 'file') {

            if (enableTinyMCe) {
                
                top.tinymce.activeEditor.windowManager.getParams().oninsert(url);
                top.tinymce.activeEditor.windowManager.close();
                
            } else {

                $("#" + inputId + "", window.opener.document).val(url);
                top.tinymce.activeEditor.windowManager.close();
            }
            
        }
    }

    cms.uriBrowser =  {
        init: init
    };
}(window.cms = window.cms || {}, jQuery));