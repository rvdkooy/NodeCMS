var homecontroller = require('./homecontroller');

module.exports = function(app){
	app.get('/', homecontroller.index);
};