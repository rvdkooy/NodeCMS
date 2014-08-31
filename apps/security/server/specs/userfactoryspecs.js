var assert = require('assert');
var factory = require('../lib/userfactory');

describe('User factory specs:', function(){
	
	describe('When creating a user,', function(){

		var newUser = factory.create('admin', 'password', 'Ronald', true);

		it('It should be valid', function(){
			assert.equal(newUser.username, 'admin');
			assert.notEqual(newUser.password, 'password');
			assert.equal(newUser.fullname, 'Ronald');
			assert.equal(newUser.active, true);
		});
	});

	describe('When hashing a password,', function(){

		var password = "password";
		var hashedPassword = factory.hashPassword(password);

		it('It should be hashed', function(){
			assert.notEqual(hashedPassword, null);
			assert.notEqual(password, hashedPassword);
		});
	});
});