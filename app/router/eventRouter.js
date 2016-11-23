var express = require('express');
var AppEvent = require('../../app/model/event');

var Application = require('../../app/model/application');

// Router for events
var eventRouter = express.Router();

eventRouter
    .get('/', function(req, res) {
        AppEvent.find({}, function(err, data, next) {
            res.json(data);
        });
    })
    .get('/:id', function(req, res, next) {
        AppEvent.findOne({
            "_id": req.params.id
        }, function(err, event_) {
            if (err) next(err);
            res.json(event_);
        });
    })
    .post('/application/:id', function(req, res, next) {
        var event = new AppEvent(req.body);
        Application.findOne({"_id":req.params.id},function (err, app_) {
            if (err) return next(err);
            event.application = app_;
            event.version = app_.version;
            event.save(function(err, event_) {
                if (err) return next(err);
                Application.findByIdAndUpdate(app_._id, {$push:{"events":event_._id}}, function (err, app_){
                    if (err) next(err);
                    // maiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiis :)
                    res.json(app_);
                });
            });
        });
    })
    .delete('/:id', function(req, res, next) {
        AppEvent.remove({
            "_id": req.params.id
        }, function(err, successIndicator) {
            if (err) next(err);
            res.json(successIndicator);
        });
    });

module.exports = eventRouter;