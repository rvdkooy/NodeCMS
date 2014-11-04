var assert = require('assert');
var proxyquire = require('proxyquire').noCallThru();;
var path = require('path');

describe('Install specs:', function(){
	
	describe('When installing without a user database,', function(){

		var usersAdded = [];
		
		var fsStub = { existsSync: function(){ return false; } };
		
		var userRepositoryStub = function(){
			this.find = function(query, callback){
				return callback([]);
			},
			this.add = function(user, callback){
				usersAdded.push(user);
				callback(user);
			}
		};
		
		var install = proxyquire('../../install', { 
			'fs': fsStub,
			'./server/lib/usersrepository': userRepositoryStub }
		);

		install.start();
		proxyquire.callThru();

		it('It should create a new database with a default admin', function(){
			assert.equal(usersAdded.length, 1);
			assert.equal(usersAdded[0].username, 'admin')
		});
	});
});