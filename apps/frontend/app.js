var express = require('express');
var path = require('path');
var EJS = require('ejs');

exports.register = function(mainApp) {
	mainApp.use('/assets/default', express.static(path.join(__dirname, 'public')));
};