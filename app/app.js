var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Routers
var userRouter = require("../app/router/userRouter");
var applicationRouter = require("../app/router/applicationRouter");
var eventRouter = require("../app/router/eventRouter");

mongoose.connect('mongodb://localhost/errorTracking');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Port
var port = 8080;

// Adding Routers
app.use('/api/users', userRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/events', eventRouter);

// Error middleware
app.use(function(err, req, res, next) {
  var message = err.message;
  var error = err.error || err;
  var status = err.status || 500;

  res.status(status).json({
    message: message,
    error: error
  });
});

// Starting server
app.listen(port);

console.log('Server running on port: ' + port);