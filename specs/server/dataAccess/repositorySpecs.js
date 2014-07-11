describe('repository specs', function(){

	var repository = require('../../../data/repository');
	var assert = require('assert');
	var path = require('path'); 

	describe('When inserting data into a collection', function(){
		
		var usersRepository = new repository("USERS", path.join( __dirname, 'data'));

		beforeEach(function(){
			usersRepository.remove({}, function(result){

			});		
		});

		it('should persist', function(){

			usersRepository.add([ { name:'Ronald', age: 34} ], function(result) {

			  	usersRepository.findOne( { name:'Ronald' }, function(item) {
			    		assert.equal(34, item.age);
		  			});
	  			});
			});
	});

	describe('When updating data in a collection', function(){
		
		var usersRepository = new repository("USERS", path.join( __dirname, 'data'));

		beforeEach(function(){
			usersRepository.remove({});
			usersRepository.add([ { name:'Ronald', age: 34 } ]);
		});

		it('should persist', function(){

		  	usersRepository.update( { name:'Ronald' }, { $set: { age: 35 } }, function(bla){
		  		usersRepository.find( { name:'Ronald' }, function(items) {
	    			assert.equal(1, items.length);
	    			assert.equal(35, items[0].age);
  				});
		  	} );
		});
	});

});