angular.module('mainSettingsApp', ['services', 'cms.growlers', 
	'ngResource', 'sharedmodule', 'httpRequestInterceptors'])

    .value('settingKeys', ['website_mainurl', 'website_title', 'email_address', 'mainaddress']);