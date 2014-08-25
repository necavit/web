var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var session = require('express-session')

//app creation
var app = express();

//enable reverse proxy support (nginx)
app.enable('trust proxy');

//enable some modules
app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

//all requests for '/public/*' are statically served
app.use('/public', express.static(__dirname + '/public'));

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

//mongodb connection
mongoose.connect('mongodb://localhost:50505/hades');

//mongodb schemas
fs.readdirSync(__dirname + '/model').forEach(function(filename) {
  if (~filename.indexOf('.js')) {
    require(__dirname + '/model/' + filename);
  }
});

//session enabling
app.use(session({
  name: 'hades.session',
  secret: 'hades summercat',
  saveUninitialized: true,
  resave: true
}));

//app authentication filters


//app routing
var index = require('./routes/index');
app.use('/', index);
var documentation = require('./routes/doc');
app.use('/doc', documentation);
var users = require('./routes/api/users');
app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(logger('dev'));
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
