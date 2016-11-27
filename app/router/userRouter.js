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
        getEventsByIDUser(req.params.id, res, returnEvents)
    }) // Adding new user
    .post('/', function(req, res, next) {
        var user = new User(req.body);
        user.save(function(err, user_) {
            if (err) next(err);
            res.json(user_);
        });
    });

function returnEvents(res, events) {
    res.json(events);
}

function getEventsByIDUser(id, res, callback) {
    var events = [];
    var itemsProcessed = 0;
    User.findOne({"_id": id})
        .populate({
            path: 'registratedApps'
        })
        .exec(function(err, apps_) {
            var options = {
                path: 'registratedApps.events',
                model: 'AppEvent',
            };
            if (err) next(err);
            User.populate(apps_, options, function (err, user_) {
                if (user_.registratedApps.length === 0) {
                    callback(res, []);
                } else {
                    user_.registratedApps.forEach(function(value){
                        events.push(value.events);
                        itemsProcessed++;
                        if (itemsProcessed === user_.registratedApps.length) {
                            callback(res, events);
                        }                      
                    });
                }
            });
        });
 }

module.exports = userRouter;