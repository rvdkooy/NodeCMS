var express = require('express');
var path = require('path');
var resourceController = require('./controllers/resourcesController');

function initDefaultArea(app){
	
	app.use('/assets/default', express.static(path.join(__dirname, 'assets/default')));
	var homecontroller = require('./controllers/default/homecontroller');
	app.get('/', homecontroller.index);
}

function initAdminArea(app){
	
	app.use('/assets/admin', express.static(path.join(__dirname, 'assets/admin')));	
	var homecontroller = require('./controllers/admin/homecontroller');

	// default admin route
	app.get('/admin', function(req, res){ res.redirect('/admin/home'); });
	app.get('/admin/home', homecontroller.index);
	
	// Client side resource provider
	app.get('/js/globalresources.js', resourceController.getResources);
}

exports.register = function(mainApp){

	initAdminArea(mainApp);
	initDefaultArea(mainApp);	
};