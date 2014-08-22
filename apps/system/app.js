var express = require('express');
var path = require('path');
var resourceController = require('./controllers/resourcesController');
var HomeController = require('./controllers/admin/homecontroller');

exports.register = function(mainApp) {

function initAdminArea(app){
	
	app.use('/assets/admin', express.static(path.join(__dirname, 'assets/admin')));	
	
	// default admin route
	var homeController = new HomeController();
	
	app.get('/admin', function(req, res){ res.redirect('/admin/home'); });
	app.get('/admin/home', homeController.index);
	
	// Client side resource provider
	mainApp.get('/js/globalresources.js', resourceController.getResources);
};

exports.config = {
	adminMenu: [ { key: 'DASHBOARD' , url: '/admin'} ]
};
