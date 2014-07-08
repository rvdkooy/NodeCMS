var homecontroller = require('./homecontroller');
var logincontroller = require('./logincontroller');

module.exports = function(app){
	app.get('/admin', homecontroller.index);
	app.get('/admin/login', logincontroller.index);
};