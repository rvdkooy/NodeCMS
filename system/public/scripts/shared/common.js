function showGrowl(type, message) {

    if(message === undefined) {
        message = "an error occured!";
    }

    if (type === 'success') {
        $.growl.notice({
            title: cms.adminResources.get('ADMIN_GROWL_TITLE_SUCCESS'),
            message: message
        });
    }

    if (type === 'error') {
        $.growl.error({
            title: cms.adminResources.get('ADMIN_GROWL_TITLE_ERROR'),
            message: message
        });
    }
}

