var Menu = require('../lib/menu');

module.exports = function(menusrepository, logger, appLocals){

	this.index = function(req, res){
		res.render('components/content/server/views/menus/index', 
			{ layout: 'system/server/views/shared/layout' });
	};

	this.ApiMenus = function(req, res){
		menusrepository.find({}, function(results){
			
			var data = [];

			results.forEach(function(item){
				
				var menu = new Menu(item.name, item.children);
				var menuItem = { _id: item._id, name: item.name, numberOfItems: menu.numberOfItems() };
				data.push(menuItem);
			});

			res.json(data);
		});
	};

	this.ApiGetMenu = function(req, res){

		menusrepository.findOne( req.params.id, function(result){
			res.json(result);
		});
	}

	this.ApiAddMenu = function(req, res){

		menusrepository.findByName( req.body.name, function(result){

			if(!result){

				logger.info('Adding a new menu with name: %s', req.body.name);

				menusrepository.add( new Menu(req.body.name), function(){
					clearApplocalsCache();
					res.status(200).send();
				});
			
			}
			else{
				res.status(400)
					.json( {
						'RuleViolationExceptions': ['The name of the menu is already in use']
					})
					.send();
			}
		});
	};

	this.ApiUpdateMenu = function(req, res){
		
		logger.info('Updating the menu with name: %s', req.params.name);

		menusrepository.update(
			{ _id: req.params.id },
			{ 
				$set: { children: req.body.children }
			},
			function(){
				clearApplocalsCache();
				res.status(200).send();
			});
		
	}

	this.ApiDeleteMenu = function(req, res){
		logger.info('Removing the menu with id: %s', req.params.id);
		menusrepository.remove({ _id: req.params.id }, { multi: false }, function(){
			clearApplocalsCache();
			res.status(200).send();
		});	
	};

	this.cacheMenus = function(req, res, next){
		if(!appLocals.menus) {
			menusrepository.find({}, function(results){
				
				appLocals.menus = {};

				for (var i = 0; i < results.length; i++) {
					appLocals.menus[results[i].name] = results[i].children;
				};

				next();
			});
		}
		else{
			next();
		}
	};

	function clearApplocalsCache(){
		if(appLocals.menus){
			appLocals.menus = null;
		}
	}
};