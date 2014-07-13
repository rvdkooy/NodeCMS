var path = require('path'); 
var Datastore = require('nedb');

var repository = function(collectionName, path){
	this.db = new Datastore( { 
		filename: path + '/' + collectionName + '.db', 
		autoload: true 
	});
};;

module.exports = repository;

repository.prototype.add =  function(item, resultCallback){
	this.db.insert(item, function(err, result) {
		if(err)	throw err;

		if(resultCallback){
			resultCallback(result);
		}	 
  	});
};

repository.prototype.findOne = function(query, resultCallback){
	// this.db.findOne( query, function(err, items) {
 //    	if(err)	throw err;

 //    	resultCallback(items);
 //    });
};

repository.prototype.find = function(query, resultCallback){
	// this.collection.find( query, function(na, tcursor){
		
	// tcursor.toArray(function(err, results){
	// 	if(resultCallback){
	// 			resultCallback(results);
	// 		}
	// 	});
	// } );
};

repository.prototype.remove = function(query, options, resultCallback){
	this.db.remove( query, options, function(result) {

    	if(resultCallback){
    		resultCallback(result)
    	}
    });
};

repository.prototype.update = function(query, update, resultCallback){
	// this.collection.update( query, update, { upsert: true } , function(result){
		
	// 	if(resultCallback){
	// 		resultCallback(result);
	// 	}
	// });
};