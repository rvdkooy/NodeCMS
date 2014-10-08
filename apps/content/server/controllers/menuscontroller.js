module.exports = function(menusrepository, logger){

	this.index = function(req, res){
		res.render('apps/content/server/views/menus/index', 
			{ layout: 'system/views/shared/layout' });
	};

	this.ApiMenus = function(req, res){
		menusrepository.find({}, function(results){
			
			var data = [];

			results.forEach(function(item){
				data.push({ _id: item._id, name: item.name, numberOfItems: 0 });
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

				menusrepository.add({ name: req.body.name }, function(){
					res.status(200).send();
				}) ;
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

	this.ApiDeleteMenu = function(req, res){
		logger.info('Removing the menu with id: %s', req.params.id);
		menusrepository.remove({ _id: req.params.id }, { multi: false }, function(){
			res.status(200).send();
		});	
	};
};