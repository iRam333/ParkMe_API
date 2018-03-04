require('dotenv').config();

var config = require('./config.js').get(process.env.NODE_ENV);
var helmet = require('helmet');
  var session = require('cookie-session');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');

// Routes
var index = require('./routes/index');
var account = require('./routes/account');
var user = require('./routes/user');
var establishment = require('./routes/establishment');
var parkingLot = require('./routes/parkingLot');
var parkingBay = require('./routes/parkingBay');

var app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// App config
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'cdnjs.cloudflare.com', 'fonts.googleapis.com'],
      fontSrc:["'self'", 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'],
      scriptSrc:["'self'", 'cdnjs.cloudflare.com', 'code.jquery.com'],
      imgSrc:["'self'"]
    }
  },
  expectCt: true,
  noCache: true,
  referrerPolicy: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('parklang'));
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(function (req, res, next) {
  console.log(req._parsedUrl.pathname);
  if (req._parsedUrl.pathname == '/account/login' || req._parsedUrl.pathname == '/account/signUp' || req._parsedUrl.pathname == '/' || req._parsedUrl.pathname == '/parkingBay'){
    next();
  }
  else {
    if (req.headers && req.headers.authorization) {
      var token = req.headers.authorization.split(" ");
      jwt.verify(token[1], config.env.ejwt, function (err, decode) {
        if (err) {
          res.json({"errors":{
            "code":401,
            "message":"Invalid token."}
          });
          req.user = undefined;
        }
        else {
          req.user = decode;
          next();
        }
      });
    }
    else {
      req.user = undefined;
      res.render('error');
    }
  }
});*/

// Use routes
app.use('/', index);
app.use('/user', user);
app.use('/account', account);
app.use('/establishment', establishment);
app.use('/parkingLot', parkingLot);
app.use('/parkingBay', parkingBay);

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
