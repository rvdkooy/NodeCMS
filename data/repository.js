var path = require('path'); 
var db = require('tingodb')().Db;

var repository = function(collectionName, path){

	var database = new db( path, {});
	this.collection = database.collection(collectionName);
};;

module.exports = repository;

repository.prototype.add =  function(items, resultCallback){
	this.collection.insert(items, {w:1}, function(err, result) {
		if(err)	throw err;

		if(resultCallback){
			resultCallback(result);
		}	 
  	});
};

repository.prototype.findOne = function(query, resultCallback){
	this.collection.findOne( query, function(err, items) {
    	if(err)	throw err;

    	resultCallback(items);
    });
};

repository.prototype.find = function(query, resultCallback){
	this.collection.find( query, function(na, tcursor){
		
	tcursor.toArray(function(err, results){
		if(resultCallback){
				resultCallback(results);
			}
		});
	} );
};

repository.prototype.remove = function(query, resultCallback){
	this.collection.remove( query, function(result) {

    	if(resultCallback){
    		resultCallback(result)
    	}
    });
};

repository.prototype.update = function(query, update, resultCallback){
	this.collection.update( query, update, { upsert: true } , function(result){
		
		if(resultCallback){
			resultCallback(result);
		}
	});
};