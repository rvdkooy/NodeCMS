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
};

function initAuthentication(app){
	
	passport.use(new localStrategy(function(username, password, done) {
        
        console.log('authenticating with username: ' + username);

  		if(username == 'admin' && password == 'password'){
      		console.log('authenticated!');
      		return done({ username: username, password: password });
		}
  		else{
      		return done(null, false, { message: 'Invalid username password combination' });
  		}
  	}));

  	app.all('/admin/*', function(req, res, next){
		
  		if (req.isAuthenticated() || req.url === '/admin/login') { 
			return next(); 
		}
  		
  		res.redirect('/admin/login');
	});

	app.post('admin/api/login', passport.authenticate('local'), function(req, res){
		res.json({ success: false });
	});
}