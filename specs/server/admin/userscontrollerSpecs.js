var assert = require("assert");
var ResponseObject = require("../mocks/mockedResponseObject");
var UsersController = require('../../../controllers/admin/userscontroller.js');

describe('User controller specs:', function(){
	
	describe('When requesting the index,', function(){

		var responseObject = new ResponseObject();
		var controller = new UsersController();
		
		controller.index(null, responseObject);

		it('It should render the index with the standard layout', function(){
			assert.equal(responseObject.view, 'admin/users/index');
			assert.equal(responseObject.options.layout, 'admin/shared/layout');
		});
	});

	describe('When getting users from the users api,', function(){

		var responseObject = new ResponseObject();
		
		var users = [ { id: 1, userName: 'ronald' } ];

		var repository = {
			find: function(query, callBack){
				callBack(users);
			}
		};

		var controller = new UsersController(repository);
		controller.ApiUsers(null, responseObject);

		it('It should return all the users', function(){

			assert.equal(responseObject.jsonData, users);
		});
	});

	describe('When getting a user from the users api,', function(){

		var responseObject = new ResponseObject();
		var requestObject = { params: { id: 1 } }
		var user = { id: 1, userName: 'ronald' };

		var repository = {
			findOne: function(id, callback){
				if(id === user.id){
					return callback(user);
				};
			}
		};

		var controller = new UsersController(repository);
		controller.ApiGetUser(requestObject, responseObject);

		it('It should return that user', function(){

			assert.equal(responseObject.jsonData, user);
		});
	});

	describe('When posting a user to the users api,', function(){

		var newUser = { 
			UserName: 'ronald',
			FullName: 'Ronald van der Kooij',
			LastLoginDateTime: 'N/A',
			Active: true 
		};

		var userAddedByRepository = {};

		var responseObject = new ResponseObject();
		var requestObject = { body: newUser }	

		var repository = {
			add: function(subject, callback){
				userAddedByRepository = subject;
				callback();
			}
		};

		var controller = new UsersController(repository);
		controller.ApiAddUser(requestObject, responseObject);

		it('It should add the user', function(){

			assert.deepEqual(userAddedByRepository, newUser);
		});

		it('It should return a success result', function(){

			assert.equal(responseObject.currentStatus, 200);
			assert.equal(responseObject.isSend, true);
		});
	});
});