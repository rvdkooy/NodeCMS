module.exports = function(settingsRepository){
	
	this.getSettings = function(req, res){
		
		settingsRepository.findBykeys(req.query.keys, function(results){
			res.json(results);
		})
	};

	this.saveSettings = function(req, res){
		
	};
};