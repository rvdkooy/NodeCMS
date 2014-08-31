
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var AuthController = require('./server/controllers/authenticationcontroller');
var UsersController = require('./server/controllers/userscontroller');
var UsersRepository = require('./server/lib/usersrepository');
var express = require('express');
var path = require('path');

exports.init = function(mainApp){
	
	passport.use(new localStrategy(function(username, password, done) {
        
  		if(username == 'admin' && password == 'password'){
      		return done(null, { username: username, password: password } );
		}
  		else{
      		return done(null, false, { message: 'Invalid username password combination' });
  		}
  	}));

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});

	mainApp.use(passport.initialize());
	mainApp.use(passport.session());

  	mainApp.all('/admin/*', function(req, res, next){
  		if (req.isAuthenticated() || req.url === '/admin/login') { 
			return next(); 
		}
  		
  		res.redirect('/admin/login');
	});
}

exports.register = function(mainApp) {
	
	mainApp.use('/assets/security', express.static(path.join(__dirname, 'public')));	

	// Loginroutes
	var authcontroller = new AuthController();
	mainApp.get('/admin/login', authcontroller.index);
	mainApp.post('/public/api/login', passport.authenticate('local'), authcontroller.apiLogin);
	mainApp.post('/admin/api/logout', authcontroller.apiLogout);

	// Users App
	var userscontroller = new UsersController(new UsersRepository());
	mainApp.get('/admin/users', userscontroller.index);
	mainApp.get('/admin/api/users', userscontroller.ApiUsers);
	mainApp.get('/admin/api/users/:id', userscontroller.ApiGetUser);
	mainApp.post('/admin/api/users', userscontroller.ApiAddUser);
	mainApp.put('/admin/api/users/:id', userscontroller.ApiUpdateUser);
	mainApp.delete('/admin/api/users/:id', userscontroller.ApiDeleteUser);	
};

exports.config = {
	//adminMenu: [ { key: 'SECURITY', url: '#' } ]
	adminMenu: [ { key: 'SECURITY', url: '#', css: 'fa-user', menuItems: [ { key: 'USERS', url: '/admin/users' } ] } ]
};