var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var I18n = require('i18n-2');
var fs = require('fs');

global.__PROJECTDIR = __dirname + '/';

var app = express();
// view engine setup
//app.set('views', path.join(__dirname, 'apps/default/views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
I18n.expressBind(app, { locales: ['en', 'nl'] });
app.use(function(req, res, next) {
    req.i18n.setLocale('en');
    next();
});

//app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use('/default/assets',express.static(path.join(__dirname, 'public/default')));
app.use('/admin/assets', express.static(path.join(__dirname, 'public/admin')));

require('./controllers/admin/routes')(app);
require('./controllers/default/routes')(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});





/// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// 




module.exports = app;