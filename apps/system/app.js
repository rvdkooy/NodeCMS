var express = require('express');
var path = require('path');
var resourceController = require('./controllers/resourcesController');

exports.register = function(mainApp) {

	mainApp.use('/assets/admin', express.static(path.join(__dirname, 'assets/admin')));	
	var homecontroller = require('./controllers/homecontroller');

	// default admin route
	mainApp.get('/admin', function(req, res){ res.redirect('/admin/home'); });
	mainApp.get('/admin/home', homecontroller.index);
	
	// Client side resource provider
	mainApp.get('/js/globalresources.js', resourceController.getResources);
};