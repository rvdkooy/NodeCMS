module.exports = function(){
	
	this.index = function(req, res){
		res.render('system/views/home/index', { 
			layout: 'system/views/shared/layout' });
	};
};