var assert = require("assert");
var ResponseObject = require("./mockedresponseobject");
var ContentPagesController = require('../controllers/contentpagescontroller.js');
var sinon = require('sinon');
var fakelogger = { info: function(){}, warn: function(){} }

describe('Content pages controller specs:', function(){
	
	describe('When requesting the index view,', function(){

		var responseObject = new ResponseObject();
		var controller = new ContentPagesController();
		
		controller.index(null, responseObject);

		it('It should render the index with the standard layout', function(){
			assert.equal(responseObject.view, 'components/content/server/views/contentpages/index');
			assert.equal(responseObject.options.layout, 'system/server/views/shared/layout');
		});
	});

	describe('When requesting the root url (/),', function(){

		var responseObject = new ResponseObject();
		var requestObject = { url: '/' };
		
		var controller = new ContentPagesController({}, fakelogger);
		
		controller.findContentPage(requestObject, responseObject);

		it('It should for now render the default frontend home page', function(){

			assert.equal(responseObject.view, 'components/frontend/server/views/home/index');
		});
	});

	describe('When requesting an url that matches a content page,', function(){

		var responseObject = new ResponseObject();
		var requestObject = { url: '/requestedUrl' };
		var topmenuItems = [{ name: 'ronald', url: '/ronald' }];
		
		var pagesRepository = {
			findByUrl: function(query, callBack){
				callBack({ name: 'somepage', url: '/requestedUrl' });
			}
		};

		var controller = new ContentPagesController(pagesRepository, fakelogger);
		
		controller.findContentPage(requestObject, responseObject);

		it('It should render the content page', function(){

			assert.equal(responseObject.view, 'components/frontend/server/views/home/index');
		});
	});

	describe('When requesting an url that does not match a content page,', function(){

		var pagesRepository = {
			findByUrl: function(query, callBack){
				callBack(null);
			}
		};
		var next = sinon.spy();
		
		var controller = new ContentPagesController(pagesRepository, fakelogger);
		controller.findContentPage({ url: '/requestedUrl' }, null, next);

		it('It should call the next middleware component', function(){

			assert(next.called);
		});
	});

	describe('When getting contentpages,', function(){

		var responseObject = new ResponseObject();
		
		var pages = [ { id: 1, content: 'content' } ];

		var repository = {
			find: function(query, callBack){
				callBack(pages);
			}
		};

		var controller = new ContentPagesController(repository, fakelogger);
		controller.ApiContentPages(null, responseObject);

		it('It should return all the pages', function(){

			assert.equal(responseObject.jsonData, pages);
		});
	});

	describe('When getting a contentpage,', function(){

		var responseObject = new ResponseObject();
		var requestObject = { params: { id: 1 } }
		var page = { id: 1, content: 'content' };

		var repository = {
			findOne: function(id, callback){
				if(id === page.id){
					return callback(page);
				};
			}
		};

		var controller = new ContentPagesController(repository, fakelogger);
		controller.ApiGetContentPage(requestObject, responseObject);

		it('It should return that page', function(){

			assert.equal(responseObject.jsonData, page);
		});
	});

	describe('When posting a new content page,', function(){

		var newPage = { 
			content: 'content',
			url: '/'
		};

		var responseObject = new ResponseObject();
		var requestObject = { body: newPage }	

		var repository = {
			findByUrl: function(query, callback){
				callback();
			},
			add: function(subject, callback){
				callback();
			}
		};

		var repoAddMethod = sinon.spy(repository, 'add');

		var controller = new ContentPagesController(repository, fakelogger);
		controller.ApiAddContentPage(requestObject, responseObject);

		it('It should add the content page', function(){

			assert(repoAddMethod.called);
		});

		it('It should return a success result', function(){

			assert.equal(responseObject.currentStatus, 200);
			assert.equal(responseObject.isSend, true);
		});
	});

	describe('When posting a page with an url that is in use,', function(){

		var newPage = { 
			name: '/'
		};

		var responseObject = new ResponseObject();
		var requestObject = { body: newPage }	

		var repository = {
			findByUrl: function(query, callback){
				
				callback( [{ name: 'inuse', url: '/' }] );	
			},
			add: function() {}
		};

		var spy = sinon.stub(repository, 'add');
		
		var controller = new ContentPagesController(repository, fakelogger);
		controller.ApiAddContentPage(requestObject, responseObject);

		it('It should not add the page', function(){

			assert.equal(spy.callCount, 0);
		});

		it('It should return a bad request', function(){

			assert.equal(responseObject.currentStatus, 400);
		});
	});
	
	describe('When updating an existing page,', function(){

		var existingPage = { 
			name: 'page',
			url: '/page'
		};	

		var responseObject = new ResponseObject();
		var requestObject = { 
			params: { id: 1 },
			body: { name: 'page2', url: '/page2' } 
		}	

		var repository = {
			findByUrl: function(query, callback){
				callback();
			},
			update: function(query, options, callback){
				
				callback();
			}
		};

		var repoUpdateMethod = sinon.spy(repository, 'update');
		var controller = new ContentPagesController(repository, fakelogger);
		controller.ApiUpdateContentPage(requestObject, responseObject);

		it('It should update the page', function(){

			assert(repoUpdateMethod.called);
		});

		it('It should return a success result', function(){

			assert.equal(responseObject.currentStatus, 200);
			assert.equal(responseObject.isSend, true);
		});
	});

	describe('When updating a page with an existing url,', function(){

		var existingPage = { 
			name: 'page',
			url: '/'
		};	

		var responseObject = new ResponseObject();
		var requestObject = { 
			params: { id: 1 },
			body: { name: 'page', url: '/' } 
		}	

		var repository = {
			findByUrl: function(query, callback){
				callback(existingPage);
			},
			update: function(query, options, callback){
				callback();
			}
		};

		var repoUpdateMethod = sinon.spy(repository, 'update');
		var controller = new ContentPagesController(repository, fakelogger);
		controller.ApiUpdateContentPage(requestObject, responseObject);

		it('It should not update the page', function(){

			assert(!repoUpdateMethod.called);
		});

		it('It should return a bad request', function(){

			assert.equal(responseObject.currentStatus, 400);
		});
	});

	describe('When deleting a page,', function(){

		var responseObject = new ResponseObject();
		var requestObject = { params: { id: 1 } } ;

		var repository = {
			remove: function(query, options, callback){
				callback();
			},
			findOne: function(id, callback){
				callback(undefined);
			}
		};

		var repoRemoveMethod = sinon.spy(repository, 'remove');
		var controller = new ContentPagesController(repository, fakelogger);
		controller.ApiDeleteContentPage(requestObject, responseObject);

		it('It should delete the page', function(){

			assert(repoRemoveMethod.called);
		});

		it('It should return a success result', function(){

			assert.equal(responseObject.currentStatus, 200);
			assert.equal(responseObject.isSend, true);
		});
	});

	describe('When getting the latest 5 changed pages,', function(){

		var responseObject = new ResponseObject();
		var requestObject = { params: { id: 1 } } ;

		var repository = {
			findLatestChanged: function(limit, callback){
				var results = [];

				for (var i = 0; i < 5; i++) {
					results.push({ name: 'name' + i });	
				};

				callback(results);
			}
		};

		var controller = new ContentPagesController(repository, fakelogger);
		controller.ApiLatestChanged(requestObject, responseObject);

		it('It should return them', function(){

			assert.equal(responseObject.jsonData.length, 5);
		});
	});
});