module.exports = function(mainApp){
	this.handle = function(err, req, res, next) {
		
		var status = err.status || 500
		res.status(status);
		// production error handler
		// no stacktraces leaked to user
		if (mainApp.get('env') === 'production') {

			if(status >= 400 && status < 500){
				res.render('apps/frontend/server/views/4xx', { layout: false });
			}
			else{
				res.render('apps/frontend/server/views/5xx', { layout: false, error: '' });
			}	
		}
		// development error handler
		// will print stacktrace
		else{
			if(status >= 400 && status < 500){
				res.render('apps/frontend/server/views/4xx', { layout: false });
			}
			else{
				res.render('apps/frontend/server/views/5xx', { 
					layout: false,
					error: err.message 
				});
			}	
		}
	};
}
