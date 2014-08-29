var express = require('express');
var path = require('path');
var resourceController = require('./controllers/resourcesController');
var HomeController = require('./controllers/homecontroller');

exports.register = function(mainApp) {

	mainApp.use('/assets/admin', express.static(path.join(__dirname, 'assets/admin')));	
	
	// default admin route
	var homeController = new HomeController();
	
	mainApp.get('/admin', function(req, res){ res.redirect('/admin/home'); });
	mainApp.get('/admin/home', homeController.index);
	
	// Client side resource provider
	mainApp.get('/js/globalresources.js', resourceController.getResources);
};

exports.config = {
	adminMenu: [ { key: 'DASHBOARD' , css: 'fa-dashboard', url: '/admin'} ]
};