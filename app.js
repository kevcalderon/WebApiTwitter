var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var service = require('./service/service.js');
var usuario = require('./routes/api/usuario.router');
var auth = require('./routes/auth.router');
var publicar = require('./routes/api/publicar.router');
var seguir =require('./routes/api/seguir.router');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var uri = '/api/v1/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  if(req.methods == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/', index);
app.use('/users', users);
app.use('/', auth);
app.use(uri, usuario);
app.use(uri, publicar);
app.use(uri, seguir);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on("connection", function(socket){
    socket.on("twitter_post", function(post){
        
            io.emit("twitter_post", post);
        });
});

server.listen(3001);
console.log('Express server started on port %s', server.address().port);

module.exports = app;
