var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// display environment
console.log('\n\t Environment:\t' + app.get('env') + '\n');

// mongodb configuration
var mongoose = require('mongoose');
var mongo = '';

var credentials = {
  user: 'magicstore',
  password:  'magicstore'
};

if (app.get('env') === 'development') {
  mongo = 'mongodb://localhost/magicstore';
  mongoose.connect(mongo);
} else {
  mongo = 'mongodb://' + credentials.user + ':' + credentials.password + '@oceanic.mongohq.com:10004/app24606530';
  mongoose.connect(mongo);
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection'));
db.once('open', function callback () {
  console.log('mongoose connection [Opened: connected to [' + mongo + ']]');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// logger configuration
if (app.get('env') === 'development') {
  app.use(logger('dev'));
} else {
  app.use(logger('combined', {
    skip: function (req, res) { return res.statusCode < 400; }
  }));
}

// server configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
var routes = require('./routes/index');

// api routes
var apiProducts = require('./routes/api/products/products');
var apiCards    = require('./routes/api/products/cards');
var apiAccounts = require('./routes/api/accounts');
var apiProfiles = require('./routes/api/profiles');
var apiSessions = require('./routes/api/sessions');

// route to SPA
app.use('/', routes);

// states
app.use('/states', function (req, res) {
  res.render('./states' + req.path);
});

// api routes
app.use('/api/products', apiProducts);
app.use('/api/cards', apiCards);
app.use('/api/accounts', apiAccounts);
app.use('/api/profiles', apiProfiles);
app.use('/api/sessions', apiSessions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
