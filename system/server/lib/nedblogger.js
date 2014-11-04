var util = require('util');
var winston = require('winston');
var ioc = require('tiny-ioc');
var loggingRepository = ioc.resolve('loggingrepository');

var NedbLogger = winston.transports.NedbLogger = function (options) {

  this.name = 'NedbLogger';
};

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//
util.inherits(NedbLogger, winston.Transport);

NedbLogger.prototype.log = function (level, msg, meta, callback) {
  
  var currentuser = 'dummyuser'; 

  var message = { 
    level: level, 
    timestamp: new Date().toISOString(), 
    message: msg, 
    user: currentuser,
    agent: '' };

  loggingRepository.add(message, function(){
    callback(null, true);
  });
};