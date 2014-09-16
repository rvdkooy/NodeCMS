var express = require('express');
var path = require('path');
var resourceController = require('./controllers/resourcesController');
var HomeController = require('./controllers/homecontroller');
var LogsController = require('./controllers/logscontroller');
var ioc = require('tiny-ioc');

exports.register = function(mainApp) {

	mainApp.use('/assets/admin', express.static(path.join(__dirname, 'assets/admin')));	
	
	// default admin route
	var homeController = new HomeController();
	var logsController = ioc.resolve(LogsController);

	mainApp.get('/admin', function(req, res){ res.redirect('/admin/home'); });
	mainApp.get('/admin/home', homeController.index);
	mainApp.get('/admin/logs', logsController.index);
	mainApp.get('/admin/api/logs', logsController.apiGetLogs);

	// Client side resource provider
	mainApp.get('/js/globalresources.js', resourceController.getResources);
};

exports.config = {
	adminMenu: [ { key: 'DASHBOARD' , css: 'fa-dashboard', url: '/admin', order: 10},
				{ key: 'LOGS' , css: 'fa-bell', url: '/admin/logs', order: 90} ]
};