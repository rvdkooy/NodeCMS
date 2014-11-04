var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var userManager = require('./usermanager');

module.exports = function(_mainApp, _usersRepository, _logger){
	
	var mainApp = _mainApp;
	var usersRepository = _usersRepository;
	var logger = _logger;

	this.configure=function(){
		passport.use(new localStrategy(function(username, password, done) {
        	
			_usersRepository.findByUsername(username, function(userResult){
				if(userResult){
					
					if(userManager.comparePasswords(password, userResult.password)){
						if(userResult.active){
							logger.info('User with username: "%s" successfully logged in', username);
							return done(null, { username: username, password: password } );
						}
						logger.info('User with username: "%s" can not log in: not active', username);
						return done(null, false, { message: 'User is not active' });
					}
					else{
						
						
						if(userResult.gracelogins >= 4){
							userResult.active = false;
						}

						_usersRepository.update(
							{ _id: userResult._id }, 
							{ $set: { 
								gracelogins: userResult.gracelogins+1, 
								active: userResult.active } 
							}, function(){
								
								logger.info('User with username: "%s" can not log in: password incorrect', username);
								return done(null, false, { message: 'Invalid username password combination' });
							})
					}
				}
				logger.info('User with username: "%s" can not log in: username does not exist', username);
				return done(null, false, { message: 'Invalid username password combination' });
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