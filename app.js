const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { connectToMongo } = require('./database/db');

const apiRouter = require('./api/ticket-api');

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const ticketRouter = require('./routes/ticket');

const app = express();

// connexion à la DB
connectToMongo();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// Rend le name disponible dans tous les templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use('/api', apiRouter);

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/ticket', ticketRouter);

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
