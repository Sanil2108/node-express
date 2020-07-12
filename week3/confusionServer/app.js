var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dishRouter = require('./routes/dish-router');
const leaderRouter = require('./routes/leader-router');
const promoRouter = require('./routes/promo-router');

const passport = require('passport');
const authenticate = require('./authenticate');

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/confusionServer';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected to the db');
}, (err) => console.log(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('1234567'));
app.use(session({
    name: 'session-id',
    secret: '34567',
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);

// This is the auth middleware
function auth(req, res, next) {
    if (!req.user) {
        const err = new Error('You are not authenticated');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
    else {
        next();
    }
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
    console.log(err)
    // set locals, only providing error in development
    // res.end(err.message);
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).end(err.message);
    // res.render('error');
});

module.exports = app;
