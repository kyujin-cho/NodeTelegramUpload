var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
// global.jQuery = require('jquery');
// require('bootstrap');

var index = require('./routes/index');
var file = require('./routes/file');
var upload = require('./routes/upload');

var db_name = 'test'
var app = express();


var db = mongoose.connection
db.on('error', console.error)
db.once('open', function() {
  console.log('Connected to database');
})

mongoose.connect('mongodb://localhost/' + db_name)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload({
	limits: {
		fileSize: 1024 * 1024 * 100
	}
}))

app.use('/', index);
app.use('/files', file)
app.use('/upload', upload)

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

module.exports = app;
