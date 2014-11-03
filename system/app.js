var express = require('express');
var path = require('path');
var resourceController = require('./controllers/resourcesController');
var DashboardController = require('./controllers/dashboardcontroller');
var LogsController = require('./controllers/logscontroller');
var SettingsController = require('./controllers/settingscontroller');
var ioc = require('tiny-ioc');

exports.register = function(mainApp) {

	mainApp.use('/assets/admin', express.static(path.join(__dirname, 'assets/admin')));	
	
	// default admin route
	var dashboardcontroller = new DashboardController(mainApp);
	var logsController = ioc.resolve(LogsController);
	var settingsController = ioc.resolve(SettingsController);

	mainApp.get('/admin', function(req, res){ res.redirect('/admin/dashboard'); });
	mainApp.get('/admin/dashboard', dashboardcontroller.index);
	mainApp.get('/admin/api/dashboard/getcontentstats', dashboardcontroller.getcontentstats);
	mainApp.get('/admin/logs', logsController.index);
	mainApp.get('/admin/api/logs', logsController.apiGetLogs);

	mainApp.get('/admin/api/settings', settingsController.getSettings);
	mainApp.post('/admin/api/settings', settingsController.saveSettings);

	// Client side resource provider
	mainApp.get('/js/globalresources.js', resourceController.getResources);
};

exports.config = {
	adminMenu: [ { key: 'DASHBOARD' , css: 'fa-dashboard', url: '/admin', order: 10},
				{ key: 'LOGS' , css: 'fa-bell', url: '/admin/logs', order: 90},
				{ key: 'SETTINGS', url: '#', css: 'fa-cogs', order: 80, menuItems: [
		 			{ key: 'MAINSETTINGS', url: '/admin/mainsettings', css:'fa-th-list' }] } ]
};