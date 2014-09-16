describe('Content pages repository specs:', function(){

	var assert = require('assert');
	var path = require('path'); 
	global.__ROOTDIR = path.dirname( path.join( __dirname, '../../../') );
	var ContentPagesRepository = require('../lib/contentpagesrepository');
	var contentpagesRepository = new ContentPagesRepository(true);
		
	describe('When finding a page by its url,', function(){

		it('It should find it', function(done){

			contentpagesRepository.add( { name:'name', url: '/' } , function(result) {
				
				contentpagesRepository.findByUrl( '/', function(item) {
	    			assert.notEqual(item, null);
	    			assert.equal(item.name, 'name');
	    			assert.equal(item.url, '/');
	    			done();
  				});
		  	});
		});
	});
});