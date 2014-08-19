
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var LoginController = require('./server/controllers/logincontroller');


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

exports.registerRoutes = function(mainApp) {
	
	var logincontroller = new LoginController();
	
	// Loginroutes
	mainApp.get('/admin/login', logincontroller.index);
	mainApp.post('/public/api/authentication/authenticate', passport.authenticate('local'), logincontroller.apiLogin);
};