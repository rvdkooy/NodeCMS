module.exports = function(settingsrepository){
	
	this.getSettings = function(req, res){
		
		settingsrepository.findBykeys(req.query.keys, function(results){
			res.json(results);
		})
	};

	this.saveSettings = function(req, res){
		
	};
};