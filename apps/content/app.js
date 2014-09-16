var express = require('express');
var path = require('path');
var ioc = require('tiny-ioc');
var PagesController = require('./server/controllers/contentpagescontroller');
var ContentPagesRepository = require('./server/lib/contentpagesrepository');

exports.register = function(mainApp) {
		
	ioc.registerAsSingleton('contentpagesrepository', ContentPagesRepository, { ignoreSubDependencies: true });

	mainApp.use('/assets/content', express.static(path.join(__dirname, 'public')));	

	// Contentpages App
	var pagescontroller = ioc.resolve(PagesController);
	mainApp.get('/admin/contentpages', pagescontroller.index);
	// mainApp.get('/admin/api/contentpages', pagescontroller.Apicontentpages);
	// mainApp.get('/admin/api/contentpages/:id', pagescontroller.ApiGetUser);
	// mainApp.post('/admin/api/contentpages', pagescontroller.ApiAddUser);
	// mainApp.put('/admin/api/contentpages/:id', pagescontroller.ApiUpdateUser);
	// mainApp.delete('/admin/api/contentpages/:id', pagescontroller.ApiDeleteUser);	
};

exports.config = {
	adminMenu: [ { key: 'CONTENT', url: '#', css: 'fa-lock', menuItems: [ { key: 'PAGES', url: '/admin/contentpages', css: 'fa-user' } ] } ]
};