var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var userManager = require('./usermanager');

module.exports = function(_mainApp, _usersRepository){
	
	var mainApp = _mainApp;
	var usersRepository = _usersRepository;

	this.configure=function(){
		passport.use(new localStrategy(function(username, password, done) {
        	
			_usersRepository.findByUsername(username, function(result){
				if(result){
					console.log('user found with password: ' + result.password);
					console.log(password);
					if(userManager.comparePasswords(password, result.password)){
						return done(null, { username: username, password: password } );
					}
					else{
						return done(null, false, { message: 'Invalid username password combination' });
					}
				}
				else{
					return done(null, false, { message: 'Invalid username password combination' });
				}
			});
	  	}));

		passport.serializeUser(function(user, done) {
		  done(null, user);
		});

		passport.deserializeUser(function(user, done) {
		  done(null, user);
		});

		mainApp.use(passport.initialize());
		mainApp.use(passport.session());
	}

	this.authenticate = function(req, res, next){
		return passport.authenticate('local')(req, res, next);
	}
};