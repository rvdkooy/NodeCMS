var homecontroller = require('./homecontroller');
var userscontroller = require('./userscontroller');
var logincontroller = require('./logincontroller');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

module.exports = function(app){
	
	initAuthentication(app);

	// default admin route
	app.get('/admin', function(req, res){ res.redirect('/admin/home'); });
	app.get('/admin/home', homecontroller.index);
	
	// Loginroutes
	app.get('/admin/login', logincontroller.index);

	// Users Routes
	app.get('/admin/users', userscontroller.index);
	app.get('/admin/api/users', userscontroller.ApiUsers);
	app.get('/admin/api/users/:id', userscontroller.ApiGetUser);
	app.post('/admin/api/users', userscontroller.ApiAddUser);
	app.put('/admin/api/users/:id', userscontroller.ApiUpdateUser);
	app.delete('/admin/api/users/:id', userscontroller.ApiDeleteUser);
};

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