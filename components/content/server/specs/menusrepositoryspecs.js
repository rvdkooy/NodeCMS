describe('Menus repository specs:', function(){

	var assert = require('assert');
	var path = require('path'); 
	global.__ROOTDIR = path.dirname( path.join( __dirname, '../../../') );
	var MenusRepository = require('../lib/menusrepository');
	var menusRepository = new MenusRepository(true);
		
	describe('When finding a menu by its name,', function(){

		it('It should find it', function(done){

			menusRepository.add( { name:'name' } , function(result) {
				
				menusRepository.findByName( 'name', function(item) {
	    			assert.notEqual(item, null);
	    			assert.equal(item.name, 'name');
	    			done();
  				});
		  	});
		});
	});
});