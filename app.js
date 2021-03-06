var express = require('express');
var path = require('path');

// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const cors = require('cors');
const scheduler = require('./helper/cronjob')





var todos = require('./routes/todos');
var users = require('./routes/users');
var login = require('./routes/login');

var app = express();
var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(`mongodb://angga:${process.env.PASSWORD}@ds135926.mlab.com:35926/library`);

//db connection status

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MLABS Connected');
});


scheduler.start()



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

app.use('/todos', todos);
app.use('/users', users);
app.use('/login', login);

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
  res.render(err);
});

module.exports = app;
