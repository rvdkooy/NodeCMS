var express = require('express');
var path = require('path');

exports.register = function(mainApp) {
	mainApp.use('/assets/default', express.static(path.join(__dirname, 'public')));
};