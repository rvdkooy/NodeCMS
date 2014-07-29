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

	describe('When requesting the users through the api,', function(){

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

	describe('When requesting a user through the api,', function(){

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
});