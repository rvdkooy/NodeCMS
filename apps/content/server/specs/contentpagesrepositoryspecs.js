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

	describe('When finding the latest changed pages,', function(){

		it('It should order them by change date descending', function(done){

			var today = new Date();
 			var yesterday = new Date();
 			var lastyear = new Date();
 			yesterday.setDate(yesterday.getDate()-1);
 			lastyear.setDate(lastyear.getDate()-365);

			contentpagesRepository.add( { name:'today', changed: today });
			contentpagesRepository.add( { name:'lastyear', changed: lastyear });
			contentpagesRepository.add( { name:'yesterday', changed: yesterday });

			setTimeout(function(){
				contentpagesRepository.findLatestChanged( 2, function(items) {
	    			
	    			assert.equal(items.length, 2);
	    			assert.equal(items[0].name, 'today');
	    			assert.equal(items[1].name, 'yesterday');

	    			done();
  				});
			});
		  	
		});
	});
});