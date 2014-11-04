module.exports = function(logger){
	
	this.index = function(req, res){
		res.render('components/security/server/views/login/index', { layout: false });
	};

	this.apiLogin = function(req, res){
		
		var hour = 3600000;
		req.session.cookie.maxAge = 14 * 24 * hour;

		res.json({ success: true });
	};

	this.apiLogout = function(req, res){
		logger.info('Logging out of the system');
		req.logout();
  		res.json({ success: true });
	};
}