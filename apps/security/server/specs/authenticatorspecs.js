var assert = require('assert');
var Authenticator = require('../lib/Authenticator');
var sinon = require('sinon');
var MockedResponseObject = require('./MockedResponseObject');
var userManager = require('../lib/usermanager');

describe('Authenticator specs:', function(){
	
	var fakeApp = {
		use: function(){}
	}

	describe('When successfully authenticated,', function(){

		var usersRepo = {
			findByUsername: function(username, callback){
				if(username === 'admin'){
					callback({username: 'admin', password: userManager.hashPassword('password')});
				}
			}
		}

		var request = {
			body: { username: 'admin', password: 'password' }
		};
		
		var response = new MockedResponseObject();

		var next = sinon.spy();

		var authenticator = new Authenticator(fakeApp, usersRepo);
		authenticator.configure();
		authenticator.authenticate(request, response, next);

		it('It should not return a 401 response code', function(){
			assert.notEqual(response.statusCode, 401);
		});

		it('It move to the next middleware component', function(){
			assert(next.called)
		});
	});
});