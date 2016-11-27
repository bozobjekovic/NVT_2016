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
        getAllEventsForUser(req.params.id, res, returnEvents)
    }) // Listing all events for User with id idU and application with id idA
    .get('/:idU/events/app/:idA', function(req, res, next) {
        getAllEventsForApp(req.params.idU, req.params.idA, res, returnEvents)
    }) // Listing all events for User with id idU and application with id idA that matches given fragment
    .get('/:idU/events/app/:idA/fragment/:fragment', function(req, res, next) {
        getAllEventsByFragment(req.params.idU, req.params.idA, req.params.fragment, res, returnEvents)
    }) // Listing all events for User with id idU and application with id idA that matches given version
    .get('/:idU/events/app/:idA/version/:version', function(req, res, next) {
        getAllEventsByVersion(req.params.idU, req.params.idA, req.params.version, res, returnEvents)
    })// Adding new user
    .post('/', function(req, res, next) {
        var user = new User(req.body);
        user.save(function(err, user_) {
            if (err) next(err);
            res.json(user_);
        });
    });

function getAllEventsByVersion(idU, idA, version_, res, callback) {
    User.findOne({"_id": idU})
        .populate({
            path: 'registratedApps',
            match: { _id: idA},
        })
        .exec(function(err, apps_) {
            execute(err, apps_, res, {version: version_}, callback);
        });
 }

function getAllEventsByFragment(idU, idA, fragment_, res, callback) {
    User.findOne({"_id": idU})
        .populate({
            path: 'registratedApps',
            match: { _id: idA},
        })
        .exec(function(err, apps_) {
            execute(err, apps_, res, {fragment: fragment_}, callback);
        });
 }

function getAllEventsForApp(idU, idA, res, callback) {
    User.findOne({"_id": idU})
        .populate({
            path: 'registratedApps',
            match: { _id: idA},
        })
        .exec(function(err, apps_) {
            execute(err, apps_, res, "", callback);
        });
 }

function getAllEventsForUser(id, res, callback) {
    User.findOne({"_id": id})
        .populate({
            path: 'registratedApps'
        })
        .exec(function(err, apps_) {
            execute(err, apps_, res, "", callback);
        });
 }

 function execute(err, apps_, res, matchers, callback){
    var events = [];
    var itemsProcessed = 0;
    if(matchers == ""){
        var options = {
            path: 'registratedApps.events',
            model: 'AppEvent',
        };
    }
    else{
        var options = {
            path: 'registratedApps.events',
            model: 'AppEvent',
            match: matchers,
        };
    }
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
 }

 function returnEvents(res, events) {
    res.json(events);
}

module.exports = userRouter;