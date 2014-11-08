var express = require('express');
var path = require('path');
var ioc = require('tiny-ioc');
var ContentPagesRepository = require('./server/lib/contentpagesrepository');
var MenusRepository = require('./server/lib/menusrepository');

ioc.registerAsSingleton('contentpagesrepository', ContentPagesRepository, 
	{ ignoreSubDependencies: true });
ioc.registerAsSingleton('menusrepository', MenusRepository, 
	{ ignoreSubDependencies: true });
var PagesController = require('./server/controllers/contentpagescontroller');
var MenusController = require('./server/controllers/menuscontroller');
var ContentSettingsController = require('./server/controllers/contentsettingscontroller');
var pagescontroller = ioc.resolve(PagesController);
var menuscontroller = ioc.resolve(MenusController);
var contentSettingsController = ioc.resolve(ContentSettingsController);
var statsProvider = require('./server/lib/statisticsprovider');

exports.init = function(mainApp, eventEmitter){
	
	eventEmitter.on('unknownurlrequested', function(req, res, next){
		
		pagescontroller.findContentPage(req, res, next);
	})	
};

exports.register = function(mainApp) {

	mainApp.use('/assets/content', express.static(path.join(__dirname, 'public')));	

	// Contentpages
	mainApp.get('/admin/contentpages/listcontentpages', pagescontroller.listContentPages);
	mainApp.get('/admin/contentpages/addcontentpage', pagescontroller.addContentPage);
	mainApp.get('/admin/contentpages/editcontentpage', pagescontroller.editContentPage);

	mainApp.get('/admin/api/contentpages', pagescontroller.ApiContentPages);
	mainApp.get('/admin/api/contentpages/:id', pagescontroller.ApiGetContentPage);
	mainApp.post('/admin/api/contentpages', pagescontroller.ApiAddContentPage);
	mainApp.put('/admin/api/contentpages/:id', pagescontroller.ApiUpdateContentPage);
	mainApp.delete('/admin/api/contentpages/:id', pagescontroller.ApiDeleteContentPage);
	mainApp.get('/admin/api/contentpages/latestchanged/:number', pagescontroller.ApiLatestChanged);

	//Menus
	mainApp.get('/admin/menus', menuscontroller.index);
	mainApp.get('/admin/api/menus', menuscontroller.ApiMenus);
	mainApp.get('/admin/api/menus/:id', menuscontroller.ApiGetMenu);
	mainApp.post('/admin/api/menus', menuscontroller.ApiAddMenu);
	mainApp.put('/admin/api/menus/:id', menuscontroller.ApiUpdateMenu);
	mainApp.delete('/admin/api/menus/:id', menuscontroller.ApiDeleteMenu);
	mainApp.use(menuscontroller.cacheMenus);

	//ContentSettings
	mainApp.get('/admin/contentsettings', contentSettingsController.index);
};

exports.config = {
	adminMenu: [ 
		{ key: 'CONTENT', url: '#', css: 'fa-sitemap', menuItems: [ 
			{ key: 'PAGES', url: '/contentpages', css: 'fa-file-text-o' }, 
			{ key: 'MENUS', url: '/menus', css:'fa-th-list' }
		] }, 
	 	{ key: 'SETTINGS', url: '#', css: 'fa-cogs', menuItems: [
		 	{ key: 'CONTENTSETTINGS', url: '/contentsettings', css:'fa-th-list' }] }
	 	],
	adminWidgets: { file: '/assets/content/scripts/contentpages/widgets.js', moduleName: 'contentwidgets', widgets: ['latestupdates' ] },
	adminStats: statsProvider.getContentStats
};