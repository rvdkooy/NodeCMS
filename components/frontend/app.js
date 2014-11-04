var express = require('express');
var path = require('path');
var EJS = require('ejs');

exports.register = function(mainApp) {
	mainApp.use('/assets/default', express.static(path.join(__dirname, 'public')));

	mainApp.set('4xxviewpath', 'components/frontend/server/views/4xx');
	mainApp.set('5xxviewpath', 'components/frontend/server/views/5xx');
};