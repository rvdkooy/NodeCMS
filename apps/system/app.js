var express = require('express');
var path = require('path');
var resourceController = require('./controllers/resourcesController');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

module.exports = function(mainApp){
	
	initAuthentication(mainApp);
	initAdminArea(mainApp);
	initDefaultArea(mainApp);
}

function initDefaultArea(app){
	
	var homecontroller = require('./controllers/default/homecontroller');

	app.use('/assets/default', express.static(path.join(__dirname, 'assets/default')));
	app.get('/', homecontroller.index);
}

function initAdminArea(app){
	
	console.log('registering the admin area');

	var homecontroller = require('./controllers/admin/homecontroller');
	var logincontroller = require('./controllers/admin/logincontroller');
	
	app.use('/assets/admin', express.static(path.join(__dirname, 'assets/admin')));
	
	// default admin route
	app.get('/admin', function(req, res){ res.redirect('/admin/home'); });
	app.get('/admin/home', homecontroller.index);
	
	// Loginroutes
	app.get('/admin/login', logincontroller.index);
	
	// Client side resource provider
	app.get('/js/globalresources.js', resourceController.getResources);

	// Users App
	var UsersController = require('./controllers/admin/userscontroller');
	var UsersRepository = require('./repos/usersRepository');
	var userscontroller = new UsersController(new UsersRepository());
	app.get('/admin/users', userscontroller.index);
	app.get('/admin/api/users', userscontroller.ApiUsers);
	app.get('/admin/api/users/:id', userscontroller.ApiGetUser);
	app.post('/admin/api/users', userscontroller.ApiAddUser);
	app.put('/admin/api/users/:id', userscontroller.ApiUpdateUser);
	app.delete('/admin/api/users/:id', userscontroller.ApiDeleteUser);
}

function initAuthentication(app){
	
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

	app.use(passport.initialize());
	app.use(passport.session());

  	app.all('/admin/*', function(req, res, next){
  		if (req.isAuthenticated() || req.url === '/admin/login') { 
			return next(); 
		}
  		
  		res.redirect('/admin/login');
	});

	app.post('/public/api/authentication/authenticate', passport.authenticate('local'), function(req, res){
		res.json({ success: false });
	});
}
