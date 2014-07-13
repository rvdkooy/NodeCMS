describe('Repository specs:', function(){

	var repository = require('../../../data/repository');
	var should = require('should');
	var path = require('path'); 

	describe('When adding an object to the repository,', function(){
		
		var usersRepository = new repository("USERS", path.join( __dirname, 'data'));

		beforeEach(function(done){
			usersRepository.remove({}, { multi: true }, function(result){
				done(); 
			});			
		});

		it('It should persist', function(done){

			usersRepository.add( { name:'Ronald', age: 34} , function(result) {
				result._id.should.not.equal(undefined);
				done();
  			});
		});
	});

	// describe('When updating data in a collection', function(done){
	// 	var id;
	// 	var usersRepository = new repository("USERS", path.join( __dirname, '../../../'));
	// 	beforeEach(function(){
	// 		usersRepository.remove({});
	// 		usersRepository.add([ { name:'Ronald', age: 34 } ], function(result){
	// 			id = result[0]._id;
	// 			console.log( 'id : ' + id);
	// 			done();
	// 		});
	// 	});

	// 	it('should persist', function(done){

	// 	  	usersRepository.update( { id:id }, { $set: { age: 35 } }, function(bla){
	// 	  		usersRepository.find( { id: id }, function(items) {
	    			
	//     			assert.equal(1, items.length);
	//     			assert.equal(35, items[0].age);
	//     			done();
 //  				});
	// 	  	} );
	// 	});
	// });

});