var fs = require('fs');
var path = require('path');
var extendify = require('extendify');
var _ = require('underscore');
_.extend = extendify({ arrays: 'concat' });
var ioc = require('tiny-ioc');

ioc.registerAsSingleton('loggingrepository', 
	require('../repositories/loggingrepository'), 
	{ ignoreSubDependencies: true });

ioc.registerAsSingleton('settingsrepository', 
	require('../repositories/settingsrepository'), 
	{ ignoreSubDependencies: true });

var Logger = require('./logger');
ioc.register('logger', Logger);
var logger = ioc.resolve('logger');

exports.load = function(mainApp, eventEmitter){

	ioc.register('appLocals', mainApp.locals);
	runThroughComponents('config', mainApp);
	runThroughComponents('init', mainApp, eventEmitter);
	runThroughComponents('register', mainApp);
	loadSystemApp(mainApp);

	var sortedAdminMenu = _.sortBy(mainApp.get('NODECMS_CONFIG').adminMenu, function(menuItem) { 
		return menuItem.order; 
	});

	mainApp.get('NODECMS_CONFIG').adminMenu = sortedAdminMenu;

	//console.log(mainApp.get('NODECMS_CONFIG'));
};

function loadSystemApp(mainApp){
	var system = require(path.join(__ROOTDIR, 'system/app.js'));
	extendConfig(system.config, mainApp);
	system.register(mainApp);
}

function runThroughComponents(method, mainApp, eventEmitter){
	var appDirectories = fs.readdirSync(path.join(__ROOTDIR, 'components'));
	
	appDirectories.forEach(function(dir){
		
		var subApp = path.join(__ROOTDIR, 'components', dir, 'app.js');
		if(fs.existsSync(subApp)) {
	  		var subApp = require(subApp);

	  		if(method === 'init' && subApp.init){
	  			
	  			logger.info('init the ' + dir + ' app');
	  			console.log('init the ' + dir + ' app');
	  			subApp.init(mainApp, eventEmitter);
	  		}
	  		
	  		if(method === 'register' && subApp.register){
	  			console.log('registering the ' + dir + ' app');
	  			logger.info('registering the ' + dir + ' app');
	  			subApp.register(mainApp);
	  		}
	  		
	  		if(method === 'config' && subApp.config){
	  			console.log('extending the config from the ' + dir + ' app');
	  			logger.info('extending the config from the ' + dir + ' app');
	  			extendConfig(subApp.config, mainApp);
	  		}
		}
	});
}

function extendConfig(config, mainApp){
	
	var defaultConfig = { adminMenu: [], adminWidgets: [], adminStats: [], ngModules: [] };
	var existingConfig = mainApp.get('NODECMS_CONFIG') || defaultConfig;
	
	if(config.adminMenu){
		
		for (var i = config.adminMenu.length - 1; i >= 0; i--) {
			
			if(!config.adminMenu[i].order){
				config.adminMenu[i].order = 50;
			}

			var rootMenu = _.find(existingConfig.adminMenu, function(item){
				return item.key === config.adminMenu[i].key;
			});

			if(rootMenu){
				rootMenu.menuItems = rootMenu.menuItems.concat(config.adminMenu[i].menuItems);
				
				if(config.adminMenu[i].order){
					rootMenu.order = config.adminMenu[i].order;
				}
			}
			else{
				existingConfig.adminMenu.push(config.adminMenu[i]);
			}
		};
	}
	if(config.adminWidgets){
		existingConfig.adminWidgets.push(config.adminWidgets);
	}
	if(config.adminStats){
		existingConfig.adminStats.push(config.adminStats); 
	}
	if(config.ngModules){
		existingConfig.ngModules = existingConfig.ngModules.concat(config.ngModules); 
	}
	mainApp.set('NODECMS_CONFIG', existingConfig);
}