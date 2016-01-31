var express         = require('express');
var session         = require('express-session')
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var mysql           = require('mysql');

/* Routes Controller */
var routes          = require('./routes/index');
var users           = require('./routes/users');

var app = express();

// Set App Listen In Port What U Want
//app.listen(7000); => Its change to integrate socket.id
var io = require('socket.io').listen(app.listen(7000));
console.log(cookieParser);
/* Socket IO Start Over Here */
io.sockets.on('connection', function (socket) {
    socket.emit('message', { member: 'Welcome', message: 'welcome to the chat' });
    //socket.emit('message');
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

/* database integration */
var connection = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : 'tubokarto1904',
    database  : 'nodejs',
    port      : 3306,
});

/* database Access To All Routers */
app.use(function(req,res,next){
    req.connection = connection;
    next();
});


/* START ::: Session Management */
var sessionConfig = {
  name: 'prakasa1904',
  secret: 'prakasa1904',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/', 
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 3600000),
    maxAge: 3600000,
  }
}
app.use(session(sessionConfig));
/* END OF ::: Session Management */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Routing */
app.use('/', routes);
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
