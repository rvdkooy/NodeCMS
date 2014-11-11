var express = require('express');
var path = require('path');
var Authenticator = require('./server/lib/authenticator');
var AuthController = require('./server/controllers/authenticationcontroller');
var UsersController = require('./server/controllers/userscontroller');
var UsersRepository = require('./server/lib/usersrepository');
var passportConfig;
var ioc = require('tiny-ioc');

exports.init = function(mainApp){
	
	ioc.registerAsSingleton('usersrepository', UsersRepository, { ignoreSubDependencies: true });

	authenticator = new Authenticator(mainApp, ioc.resolve('usersrepository'), 
		ioc.resolve('logger'));
	authenticator.configure();

  	mainApp.all('/admin/*', checkAuthentication);
  	mainApp.all('/admin', checkAuthentication);
}

function checkAuthentication(req, res, next){
	if (req.isAuthenticated() || req.url === '/admin/login') { 
		return next(); 
	}
	
	if(req.url === '/admin'){
		res.redirect('/admin/login');
	}
	else{
		res.send(403);
	}
}

exports.register = function(mainApp) {
	
	mainApp.use('/assets/security', express.static(path.join(__dirname, 'public')));	

	// Loginroutes
	var authcontroller = ioc.resolve(AuthController);
	mainApp.get('/admin/login', authcontroller.index);
	mainApp.post('/public/api/login', authenticator.authenticate , authcontroller.apiLogin);
	mainApp.post('/admin/api/logout', authcontroller.apiLogout);

	// Users App
	var userscontroller = ioc.resolve(UsersController);
	mainApp.get('/admin/users', userscontroller.index);
	mainApp.get('/admin/api/users', userscontroller.ApiUsers);
	mainApp.get('/admin/api/users/:id', userscontroller.ApiGetUser);
	mainApp.post('/admin/api/users', userscontroller.ApiAddUser);
	mainApp.put('/admin/api/users/:id', userscontroller.ApiUpdateUser);
	mainApp.delete('/admin/api/users/:id', userscontroller.ApiDeleteUser);	
};

exports.config = {
	adminMenu: [ { key: 'SECURITY', url: '#', css: 'fa-lock', menuItems: [ { key: 'USERS', url: '/admin/users', css: 'fa-user' } ] } ]
};