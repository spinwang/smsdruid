var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require("firebase");

var routes = require('./routes/index');
var users = require('./routes/users');
var numbers = require('./routes/number');

var socketController = require('./sockets/socketController');
var app = express();


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDVAzFNruUePIDKWACy5Acbsok4Cklrx9A",
  authDomain: "smsdruid-590fa.firebaseapp.com",
  databaseURL: "https://smsdruid-590fa.firebaseio.com",
  storageBucket: "smsdruid-590fa.appspot.com",
  serviceAccount : "serviceAccount.json" // this service account has "editor" role

};
firebase.initializeApp(config);

var db = firebase.database();
var ref = db.ref('/numbers');
ref.once('value',function(numbers){
  console.log(numbers.val());
});
function logSMS(){

}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/numbers',numbers);


app.post('/sms',function(req,res,next){
  socketController.sendSMS(req.body); // send the sms to the frontend
  console.log(req.body);
  res.send('ok');
});

app.get('/test',function(req,res){
  console.log(req.query);
  res.send('ok');
})

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
    console.log(err);
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
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
