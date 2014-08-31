(function (cms, $) {
    'use strict';
    function initContentSettings() {
        $('#createSitemapLinkButton').click(function (event) {
            event.preventDefault();

            createSitemap();
        });
    }

    function createSitemap() {
        $.ajax({
            url: '/admin/contentsettings/createsitemap',
            timeout: 1000,
            type: 'POST',
            traditional: true,
            success: function (data) {
                if (data.success == true) {
                    alert('sitemap created');
                }
                else {
                    alert('error while creating sitemap');
                }
            },
            error: function (xhr) {
                alert('error while creating sitemap: ' + xhr);
            }
        });
    }

    cms.options = {
        initContentSettings: initContentSettings,
    };

} (window.cms = window.cms || {}, jQuery));   