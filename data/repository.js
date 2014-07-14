var path = require('path'); 
var Datastore = require('nedb');

var repository = function(collectionName, path){
	this.db = new Datastore( { 
		filename: (path) ? + '/' + collectionName + '.db' : null, 
		autoload: true 
	}, function(err){
		if(err){
			console.log(err);
			throw err;
		}	
	});
};;

module.exports = repository;

repository.prototype.add =  function(item, resultCallback){
	this.db.insert(item, function(err, result) {
		if(err){
			console.log(err);
			throw err;
		}	

		if(resultCallback){
			resultCallback(result);
		}	 
  	});
};

repository.prototype.find = function(query, resultCallback){
	this.db.find( query, function(err, result){
		
		if(err){
			console.log(err);
			throw err;
		}	

		if(resultCallback) {
			resultCallback(result);
		}
	});
};

repository.prototype.remove = function(query, options, resultCallback){
	this.db.remove( query, options, function(result) {

    	if(resultCallback){
    		resultCallback(result)
    	}
    });
};

repository.prototype.update = function(query, update, resultCallback){
	this.db.update( query, update, { multi: true } , function(err, result){
		if(err){
			console.log(err);
			throw err;
		}	
		if(resultCallback){
			resultCallback(result);
		}
	});
};