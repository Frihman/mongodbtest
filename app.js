var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var urlencodedParser = bodyParser.urlencoded({ extended: false});

var connectDB = require('./DB/connection.js');
var User = require('./DB/usersSchema.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/query', (req, res) => {
  User.find(function (err, users) {
    if (err) return console.error(err);
    res.send(users);
  });

});

app.post('/add', urlencodedParser, (req, res) => {
  var item = req.body;

  console.log(item.firstName, item.lastName);
  
  var user = new User({firstName: item.firstName, lastName: item.lastName});

  user.save(function (err, user) {
    if (err) return console.error(err);
    console.log(user.firstName + user.lastName + ' saved to db');
  });
  
  res.render('index', { title: 'Customers' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
