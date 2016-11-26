var express = require('express');
var deepPopulate = require('mongoose-deep-populate');
var User = require('../../app/model/user');

var Application = require('../../app/model/application');
var AppEvent = require('../../app/model/event');

// Router for users
var userRouter = express.Router();

userRouter
    .get('/', function(req, res) {
        User.find({}, function(err, data, next) {
            res.json(data);
        });
    })
    .get('/:id', function(req, res, next) {
        User.findOne({
            "_id": req.params.id
        }).populate('registratedApps')
          .populate('followedApps')
          .exec(function(err, user_) {
            if (err) next(err);
            res.json(user_);
        });
    }) // Listing all events for user with user id
    .get('/:id/events', function(req, res, next) {
        User.findOne({"_id": req.params.id}).
            populate('registratedApps.events').
            exec(function(err, user_) {
                if (err) next(err);
                console.log(user_.registratedApps)
            });
    }) // Adding new user
    .post('/', function(req, res, next) {
        var user = new User(req.body);
        user.save(function(err, user_) {
            if (err) next(err);
            res.json(user_);
        });
    });

module.exports = userRouter;