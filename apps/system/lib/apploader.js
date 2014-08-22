var fs = require('fs');
var path = require('path');
var extendify = require('extendify');
var _ = require('underscore');
_.extend = extendify({ arrays: 'concat' });


exports.loadApps = function(mainApp){
	loopTroughApps('config', mainApp);
	loopTroughApps('init', mainApp);
	loopTroughApps('register', mainApp);	
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
	  		
	  		if(method === 'register' && subApp.register){
	  			console.log('registering the ' + dir + ' app');
	  			subApp.register(mainApp);
	  		}
	  		
	  		if(method === 'config' && subApp.config){
	  			console.log('extending the config from the ' + dir + ' app');

	  			var existingConfig = mainApp.get('NODECMS_CONFIG');
	  			if(!existingConfig){
	  				mainApp.set('NODECMS_CONFIG', subApp.config );
	  			}
	  			else{
	  				mainApp.set('NODECMS_CONFIG', _.extend( existingConfig, subApp.config  ));
	  			}
	  		}
		}
	});
}