var bcrypt = require('bcrypt-nodejs');

var User = function(_username_, _password_, _fullname_, _active_){
	
	this.username = _username_;
	this.password = _password_;
	this.fullname = _fullname_;
	this.Lastlogin = 'N/A';
	this.active = _active_;
	this.gracelogins = 0;
};

var hashPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

exports.hashPassword = hashPassword;

exports.comparePasswords = function(password, hashedPassword){
	return bcrypt.compareSync(password, hashedPassword);
}

exports.create = function(username, password, fullname, active){

	return new User(username, hashPassword(password), fullname, active);
};