describe('Repository specs:', function(){

	var Repository = require('../../../repos/repository');
	var should = require('should');
	var path = require('path'); 

	// create an inmemory repository that will be used by all the specs in this file
	var usersRepository = new Repository("REPOSITORYSPECS");
	usersRepository.init();	
	describe('When adding an object to the repository,', function(){

		it('It should persist', function(done){

			usersRepository.add( { name:'Ronald', age: 34} , function(result) {
				result._id.should.not.equal(undefined);
				done();
  			});
		});
	});

	describe('When removing an object from the repository,', function(){

		it('It should remove', function(done){

			usersRepository.add( { name:'Ronald' } , function(addResult) {
				usersRepository.remove({ _id: addResult._id }, { multi: false }, function(){
					usersRepository.findOne(addResult._id, function(findResult){
						(findResult === null).should.be.true;
						done();
					})
				});
  			});
		});
	});

	describe('When finding an object from repository,', function(){

		it('It should find it', function(done){

			usersRepository.add( { name:'Ronald' } , function(result) {
				
				usersRepository.findOne( result._id, function(item) {
	    			item.should.not.equal(null);
	    			item._id.should.equal(result._id);
	    			done();
  				});
		  	});
		});
	});
	
	describe('When finding objects from repository,', function(){

		beforeEach(function(done){
    		usersRepository.remove({}, {multi: true}, function(){
    			done();
    		});	
	  	})

		it('It should find them', function(done){

			usersRepository.add( [{ name:'Ronald' }, { name: 'Ronald' }] , function(result) {
				
				usersRepository.find( { name: 'Ronald' }, function(items) {
	    			items.length.should.equal(2);
	    			done();
  				});
		  	});
		});
	});

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
});