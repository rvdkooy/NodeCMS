var winston = require('winston');
var nedblogger = require('./nedblogger');

module.exports = function(){
	
	var transports = [
		new (winston.transports.File)({ 
	      	filename: 'logs.log',
	      	maxsize: 5242880,
	      	maxFiles: 14 }),
		new (winston.transports.NedbLogger)
	];

	if(false){
		transports.push(new (winston.transports.Console)());
	}

	var winstonLogger = new (winston.Logger)({
	    transports: transports
	  });

	this.info = function(message, context){
		log('info', message, context)
	};
	this.warn = function(message, context){
		log('warn', message, context)
	};
	this.error = function(message, context){
		log('error', message, context)
	};

	function log(level, message, context){
		if(context){
			winstonLogger.log(level, message, context);
		}
		else{
			winstonLogger.log(level, message);
		}

	}
};