global.__ROOTDIR = __dirname + '/';

var express = require('express');
var app = express();
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var I18n = require('i18n-2');
var fs = require('fs');
var session = require('express-session');
var NedbStore = require('connect-nedb-session')(session);
var config = require('./config/config.js').config;
var componentsLoader = require('./system/server/lib/componentsloader');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var ErrorController = require('./system/server/controllers/errorcontroller');

// Default express middleware
app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// use express session middleware and store this session in the embedded database
app.use(session(
  {
    secret: config.sessionsecret, 
    saveUninitialized: true, 
    resave: true,
    store: new NedbStore({ filename: './data/SESSIONS.db' })
  }));

// register middleware for localization
I18n.expressBind(app, { locales: ['en', 'nl'] });
app.use(function(req, res, next) {
    req.i18n.setLocaleFromCookie();
    next();
});

// set the nodecms config on the response locals so that it can be accessed from
// the controllers and views
app.use(function(req, res, next){
  res.locals.NODECMS_CONFIG = app.get('NODECMS_CONFIG');
  next();
});

// load all the individual apps from the app folder
componentsLoader.load(app, eventEmitter);

// request can not be served, maybe an app can handle this request
app.get('*', function(req, res, next){
  if(!eventEmitter.emit('unknownurlrequested', req, res, next)){
    next()
  }
});

// development test routes
if (app.get('env') === 'development') {
  app.get('/failme', function(req, res){
    throw new Error('controlled error');
  })
}

// 4xx and 5xx error handling
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// controller that handles all errors
app.use(new ErrorController(app).handle);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('NodeCMS up and running on port ' + server.address().port);
});