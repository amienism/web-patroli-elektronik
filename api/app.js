var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const jwtAuth = require('./middleware/jwtAuth');
const cors = require('cors')

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var locationRouter = require('./routes/locations');
var patrolRouter = require('./routes/patrols')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwtAuth.authenticateJWT)
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/locations', locationRouter);
app.use('/api/patrol', patrolRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
