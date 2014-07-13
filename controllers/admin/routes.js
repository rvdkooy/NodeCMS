var homecontroller = require('./homecontroller');
var userscontroller = require('./userscontroller');
var logincontroller = require('./logincontroller');

module.exports = function(app){
	
	// default admin route
	app.get('/admin', homecontroller.index);
	
	// Loginroutes
	app.get('/admin/login', logincontroller.index);

	// Users Routes
	app.get('/admin/users', userscontroller.index);

};