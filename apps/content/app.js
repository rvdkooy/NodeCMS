var express = require('express');
var path = require('path');
var ioc = require('tiny-ioc');
var ContentPagesRepository = require('./server/lib/contentpagesrepository');
ioc.registerAsSingleton('contentpagesrepository', ContentPagesRepository, 
	{ ignoreSubDependencies: true });
var PagesController = require('./server/controllers/contentpagescontroller');
var pagescontroller = ioc.resolve(PagesController);


exports.init = function(mainApp, eventEmitter){
	
	eventEmitter.on('unknownurlrequested', function(req, res, next){
		
		pagescontroller.findContentPage(req, res, next);
	})	
};

exports.register = function(mainApp) {

	mainApp.use('/assets/content', express.static(path.join(__dirname, 'public')));	

	// Contentpages App
	mainApp.get('/admin/contentpages', pagescontroller.index);
	mainApp.get('/admin/api/contentpages', pagescontroller.ApiContentPages);
	mainApp.get('/admin/api/contentpages/:id', pagescontroller.ApiGetContentPage);
	mainApp.post('/admin/api/contentpages', pagescontroller.ApiAddContentPage);
	mainApp.put('/admin/api/contentpages/:id', pagescontroller.ApiUpdateContentPage);
	mainApp.delete('/admin/api/contentpages/:id', pagescontroller.ApiDeleteContentPage);
	mainApp.get('/admin/api/contentpages/latestchanged/:number', pagescontroller.ApiLatestChanged);
};

exports.config = {
	adminMenu: [ { key: 'CONTENT', url: '#', css: 'fa-lock', menuItems: [ { key: 'PAGES', url: '/admin/contentpages', css: 'fa-user' } ] } ],
	adminWidgets: { file: '/assets/content/scripts/contentpages/widgets.js', widgets: ['latestupdates' ] },
	adminStats: [ '/admin/api/contentpages/numberofpublishedcontentpages', 
					'/admin/api/contentpages/numberofnonpublishedcontentpages']
};