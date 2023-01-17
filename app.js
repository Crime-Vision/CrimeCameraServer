// require basic
const mongoose = require('mongoose');
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const express = require('express');

var nodes = require('./models/nodes');
var heartbeats = require('./models/heartbeats');

const AdminJSMongoose = require('@adminjs/mongoose')

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

var app = express();

const adminOptions = {
  resources: [nodes, heartbeats],
}

app.admin = new AdminJS(adminOptions)

var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var logger = require('morgan');
var path = require('path');

// require routers
var nodesRouter = require('./routes/nodes');
var heartbeatsRouter = require('./routes/heartbeats');

// require environment
require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 100;

// disable cors
const cors = require('cors');
app.use(cors());

if(process.env.MONGO_CONNECTION_STRING) {
  // establish database connection
  mongoose.connect(
    process.env.MONGO_CONNECTION_STRING,
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'crimevision'
    },
    function (err) {
      if (err) throw err;
    }
  );
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/nodes', nodesRouter);
const adminRouter = AdminJSExpress.buildRouter(app.admin)
app.use(app.admin.options.rootPath, adminRouter)
app.use('/api/heartbeats', heartbeatsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
