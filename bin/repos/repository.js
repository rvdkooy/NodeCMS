var path = require('path'); 
var Datastore = require('nedb');

var repository = function(collectionName, path){
	path = (path) ? path + collectionName + '.db' : null;
	console.log('Initializing collection: ' + collectionName);

	this.db = new Datastore( { 
		filename: path, 
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

repository.prototype.findOne = function(id, resultCallback){
	
	this.db.findOne( { _id: id }, function(err, result){
		
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
	this.db.update( query, update, { multi: false } , function(err, result){
		if(err){
			console.log(err);
			throw err;
		}	
		if(resultCallback){
			resultCallback(result);
		}
	});
};