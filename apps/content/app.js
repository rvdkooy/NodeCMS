var q = require('q');
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

var getContentStats = function(){
	
	var deferred = q.defer();

	var stats = [];

	var repo = ioc.resolve('contentpagesrepository');
	
	repo.find({}, function(results){
		
		stats.push({ count: results.length, resourcekey: 'ADMIN_DASHBOARD_LABEL_CONTENTPAGESSTATS', url: '/admin/contentpages'});
		deferred.resolve(stats);
	});

	return deferred.promise;
};

exports.config = {
	adminMenu: [ { key: 'CONTENT', url: '#', css: 'fa-sitemap', menuItems: [ { key: 'PAGES', url: '/admin/contentpages', css: 'fa-file-text-o' } ] } ],
	adminWidgets: { file: '/assets/content/scripts/contentpages/widgets.js', moduleName: 'contentwidgets', widgets: ['latestupdates' ] },
	adminStats: getContentStats
};

