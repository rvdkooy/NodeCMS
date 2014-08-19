var fs = require('fs');
var path = require('path');

exports.loadApps = function(mainApp){

	loopTroughApps('init', mainApp);
	loopTroughApps('registerRoutes', mainApp);
};

function loopTroughApps(method, mainApp){
	var appDirectories = fs.readdirSync(path.join(__ROOTDIR, 'apps'));
	
	appDirectories.forEach(function(dir){
		
		var subApp = path.join(__ROOTDIR, 'apps', dir, 'app.js');
		if(fs.existsSync(subApp)) {
	  		var subApp = require(subApp);

	  		if(method === 'init' && subApp.init){
	  			console.log('init the ' + dir + ' app');
	  			subApp.init(mainApp);
	  		}
	  		if(method === 'registerRoutes' && subApp.registerRoutes){
	  			console.log('registering the routes for the ' + dir + ' app');
	  			subApp.registerRoutes(mainApp);
	  		}
		}
	});
}