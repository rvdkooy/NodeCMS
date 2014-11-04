var assert = require('assert');
var Authenticator = require('../lib/authenticator');
var sinon = require('sinon');
var MockedResponseObject = require('./mockedresponseobject');
var userManager = require('../lib/usermanager');
var fakelogger = {info: function(){}}

describe('Authenticator specs:', function(){
	
	var fakeApp = {
		use: function(){}
	}

	describe('When successfully authenticated,', function(){

		var user = userManager.create('admin', 'password', '', true);
		var usersRepo = {
			findByUsername: function(username, callback){
				if(username === 'admin'){
					callback(user);
				}
			}
		}

		var request = {
			body: { username: 'admin', password: 'password' }
		};
		
		var response = new MockedResponseObject();

		var next = sinon.spy();

		var authenticator = new Authenticator(fakeApp, usersRepo, fakelogger);
		authenticator.configure();
		authenticator.authenticate(request, response, next);

		it('It should not return a 401 response code', function(){
			assert.notEqual(response.statusCode, 401);
		});

		it('It should move to the next middleware component', function(){
			assert(next.called)
		});
	});

	describe('When unsuccessfully authenticated,', function(){
		var updateStatement = {};
		var user = userManager.create('admin', 'password', '', true);
		var usersRepo = {
			findByUsername: function(username, callback){
				if(username === 'admin'){
					callback(user);
				}
			},
			update: function(query, _updateStatement, callback){
				updateStatement = _updateStatement;
				callback();
			}
		}

		var request = {
			body: { username: 'admin', password: 'wrongpassword' }
		};
		
		var response = new MockedResponseObject();

		var next = sinon.spy();

		var authenticator = new Authenticator(fakeApp, usersRepo, fakelogger);
		authenticator.configure();
		authenticator.authenticate(request, response, next);

		it('It should return a 401 response code', function(){
			assert.equal(response.statusCode, 401);
		});

		it('It should not move to the next middleware component', function(){
			assert(!next.called)
		});

		it('It should add another gracelogin to the user', function(){
			assert(updateStatement.$set.active);
			assert.equal(updateStatement.$set.gracelogins, 1)
		});
	});

	describe('When unsuccessfully authenticated for the fifth time in a row,', function(){
		var updateStatement = {};
		var user = userManager.create('admin', 'password', '', true);
		user.gracelogins = 4;
		var usersRepo = {
			findByUsername: function(username, callback){
				if(username === 'admin'){
					callback(user);
				}
			},
			update: function(query, _updateStatement, callback){
				updateStatement = _updateStatement
				callback();
			}
		}

		var request = {
			body: { username: 'admin', password: 'wrongpassword' }
		};
		
		var response = new MockedResponseObject();

		var next = sinon.spy();

		var authenticator = new Authenticator(fakeApp, usersRepo, fakelogger);
		authenticator.configure();
		authenticator.authenticate(request, response, next);

		it('It should return a 401 response code', function(){
			assert.equal(response.statusCode, 401);
		});

		it('It should not move to the next middleware component', function(){
			assert(!next.called)
		});

		it('It should disable the user', function(){
			assert(!updateStatement.$set.active);
			assert.equal(updateStatement.$set.gracelogins, 5)
		});
	});

	describe('When successfully authenticated but the user is not active,', function(){

		var user = userManager.create('admin', 'password', '', false);
		var usersRepo = {
			findByUsername: function(username, callback){
				if(username === 'admin'){
					callback(user);
				}
			}
		}

		var request = {
			body: { username: 'admin', password: 'password' }
		};
		
		var response = new MockedResponseObject();

		var next = sinon.spy();

		var authenticator = new Authenticator(fakeApp, usersRepo, fakelogger);
		authenticator.configure();
		authenticator.authenticate(request, response, next);

		it('It should return a 401 response code', function(){
			assert.equal(response.statusCode, 401);
		});

		it('It should not move to the next middleware component', function(){
			assert(!next.called)
		});
	});
});