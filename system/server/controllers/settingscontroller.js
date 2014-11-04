module.exports = function(settingsrepository){
	
	this.getSettings = function(req, res){

		settingsrepository.findByKeys(req.query.keys, function(results){
			
			res.json(results);
		})
	};

	this.saveSettings = function(req, res){
		
		for (var i = 0; i < req.body.length; i++) {
			
			(function(setting){

				settingsrepository.findByKey(setting.key, function(result){
			
					if(result){
						result.value = setting.value;
						settingsrepository.update(
							{ key: result.key },
							{ $set: { value: setting.value } });
					}
					else{
						settingsrepository.add({ key: setting.key, value: setting.value });
					}
				})

			})(req.body[i]);
		};

		res.status(200).send();
	};

	this.mainSettings = function(req, res){
		res.render('system/server/views/mainsettings/index', {
			layout: 'system/server/views/shared/layout'
		});
	};
};