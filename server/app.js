var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var baseRoute = require('./routes/base');
var auth = require('./routes/auth');
var find = require('./routes/find');
var users = require('./routes/users');

var app = express();

// mongodb connection pool setup
var MongoClient = require('mongodb').MongoClient;
var db;
// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/goalsfor", {
  ssl: false,
  maxPoolSize: 5,
  waitQueueTimeoutMS: 500
}, function(err, database) {
  if(err){
    console.log('DB Error!!: ',err);
    throw err;
  }

  db = database;
  app.set('db', db);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', baseRoute);
app.use('/auth', auth);
app.use('/find', find);
app.use('/users', users);

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
    res.send({
      message: err.message,
      status: err.status,
      error: err,
      stackTrace: err.stack
    });

  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


module.exports = app;
