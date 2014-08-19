
module.exports = function(){
	
	this.index = function(req, res){
		res.render('security/server/views/login/index', { layout: false });
	};

	this.apiLogin = function(req, res){
		
		var hour = 3600000;
		req.session.cookie.maxAge = 14 * 24 * hour;

		res.json({ success: true });
	};
}