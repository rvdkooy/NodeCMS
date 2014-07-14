describe('Repository specs:', function(){

	var repository = require('../../../data/repository');
	var should = require('should');
	var path = require('path'); 

	// create an inmemory repository that will be used by all the specs in this file
	var usersRepository = new repository("REPOSITORYSPECS");
	
	describe('When updating an object,', function(){

		it('Should persist', function(done){

			usersRepository.add( { name:'Ronald', age: 34 }, function(result){

				usersRepository.update( { _id: result._id }, { $set: { age: 35 } }, function(callback){
		  		
		  		usersRepository.find( { _id: result._id }, function(items) {
		    			items.length.should.equal(1);
		    			items[0].age.should.equal(35);
		    			done();
	  				});
			  	} );
			});
		});
	});

	describe('When adding an object to the repository,', function(){

		it('It should persist', function(done){

			usersRepository.add( { name:'Ronald', age: 34} , function(result) {
				result._id.should.not.equal(undefined);
				done();
  			});
		});
	});
});