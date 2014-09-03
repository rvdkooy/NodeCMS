describe('User Repository specs:', function(){

	var assert = require('assert');
	var path = require('path'); 
	global.__ROOTDIR = path.dirname( path.join( __dirname, '../../../') );
	var UsersRepository = require('../lib/usersrepository');
	var usersRepository = new UsersRepository(true);
		
	describe('When finding a user by its usename,', function(){

		it('It should find it', function(done){

			usersRepository.add( { username:'Ronald' } , function(result) {
				
				usersRepository.findByUsername( 'Ronald', function(item) {
	    			assert.notEqual(item, null);
	    			assert.equal(item.username, 'Ronald');
	    			done();
  				});
		  	});
		});
	});
});