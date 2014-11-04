var assert = require("assert");
var ResponseObject = require("./mockedresponseobject");
var UsersController = require('../controllers/userscontroller.js');
var sinon = require('sinon');
var fakelogger = { info: function(){}, warn: function(){} }

describe('User controller specs:', function(){
	
	describe('When requesting the index view,', function(){

		var responseObject = new ResponseObject();
		var controller = new UsersController();
		
		controller.index(null, responseObject);

		it('It should render the index with the standard layout', function(){
			assert.equal(responseObject.view, 'components/security/server/views/users/index');
			assert.equal(responseObject.options.layout, 'system/server/views/shared/layout');
		});
	});

	describe('When getting users,', function(){

		var responseObject = new ResponseObject();
		
		var users = [ { id: 1, username: 'ronald' } ];

		var repository = {
			find: function(query, callBack){
				callBack(users);
			}
		};

		var controller = new UsersController(repository, fakelogger);
		controller.ApiUsers(null, responseObject);

		it('It should return all the users', function(){

			assert.equal(responseObject.jsonData, users);
		});
	});

	describe('When getting a user,', function(){

		var responseObject = new ResponseObject();
		var requestObject = { params: { id: 1 } }
		var user = { id: 1, username: 'ronald' };

		var repository = {
			findOne: function(id, callback){
				if(id === user.id){
					return callback(user);
				};
			}
		};

		var controller = new UsersController(repository, fakelogger);
		controller.ApiGetUser(requestObject, responseObject);

		it('It should return that user', function(){

			assert.equal(responseObject.jsonData, user);
		});
	});

	describe('When posting a new user,', function(){

		var newUser = { 
			UserName: 'ronald',
			FullName: 'Ronald van der Kooij',
			LastLoginDateTime: 'N/A',
			Password: 'password',
			Active: true 
		};

		var responseObject = new ResponseObject();
		var requestObject = { body: newUser }	

		var repository = {
			find: function(query, callback){
				callback([]);
			},
			add: function(subject, callback){
				callback();
			}
		};

		var repoAddMethod = sinon.spy(repository, 'add');

		var controller = new UsersController(repository, fakelogger);
		controller.ApiAddUser(requestObject, responseObject);

		it('It should add the user', function(){

			assert(repoAddMethod.called);
		});

		it('It should return a success result', function(){

			assert.equal(responseObject.currentStatus, 200);
			assert.equal(responseObject.isSend, true);
		});
	});

	describe('When posting a user with a username that is in use,', function(){

		var newUser = { 
			UserName: 'inuse'
		};

		var responseObject = new ResponseObject();
		var requestObject = { body: newUser }	

		var repository = {
			find: function(query, callback){
				
				callback( [{ UserName: 'inuse' }] );	
			},
			add: function() {}
		};

		var spy = sinon.stub(repository, 'add');
		
		var controller = new UsersController(repository, fakelogger);
		controller.ApiAddUser(requestObject, responseObject);

		it('It should not add the user', function(){

			assert.equal(spy.callCount, 0);
		});

		it('It should return a bad request', function(){

			assert.equal(responseObject.currentStatus, 400);
		});
	});
	
	describe('When updating an existing user,', function(){

		var existingUser = { 
			UserName: 'ronald',
			FullName: 'Ronald van der Kooij',
			LastLoginDateTime: 'N/A',
			Active: true 
		};	

		var responseObject = new ResponseObject();
		var requestObject = { 
			params: { id: 1 },
			body: { FullName: 'Ronald2', Password: 'password', Active: false } 
		}	

		var repository = {
			find: function(query, callback){
				callback([]);
			},
			update: function(query, options, callback){
				
				callback();
			}
		};

		var repoUpdateMethod = sinon.spy(repository, 'update');
		var controller = new UsersController(repository, fakelogger);
		controller.ApiUpdateUser(requestObject, responseObject);

		it('It should update the user', function(){

			assert(repoUpdateMethod.called);
		});

		it('It should return a success result', function(){

			assert.equal(responseObject.currentStatus, 200);
			assert.equal(responseObject.isSend, true);
		});
	});

	describe('When deleting an existing user,', function(){

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
		var controller = new UsersController(repository, fakelogger);
		controller.ApiDeleteUser(requestObject, responseObject);

		it('It should delete the user', function(){

			assert(repoRemoveMethod.called);
		});

		it('It should return a success result', function(){

			assert.equal(responseObject.currentStatus, 200);
			assert.equal(responseObject.isSend, true);
		});
	});

	describe('When deleting the currently logged in user,', function(){

		var responseObject = new ResponseObject();
		var requestObject = { 
			user: { username: 'admin' },
			params: { id: 1 } 
		} ;

		var repository = {
			remove: function(query, options, callback){ },
			findOne: function(id, callback){
				if(id === requestObject.params.id) {
					callback( { id: id, username: 'AdMiN' });
				}
			}
		};

		var repoRemoveMethod = sinon.spy(repository, 'remove');
		var controller = new UsersController(repository, fakelogger);
		controller.ApiDeleteUser(requestObject, responseObject);

		it('It should not delete the user', function(){

			assert(!repoRemoveMethod.Called);
		});

		it('It should return a bad request result', function(){

			assert.equal(responseObject.currentStatus, 400);
			assert.equal(responseObject.isSend, true);
		});
	});
});