var express = require('express');
var Event = require('../../app/model/event');

// Router for events
var eventRouter = express.Router();

eventRouter
    .get('/', function(req, res) {
        Event.find({}, function(err, data, next) {
            res.json(data);
        });
    })
    .get('/:id', function(req, res, next) {
        Event.findOne({
            "_id": req.params.id
        }, function(err, event_) {
            if (err) next(err);
            res.json(event_);
        });
    })
    .post('/', function(req, res, next) {
        var event = new Event(req.body);
        event.save(function(err, event_) {
            if (err) next(err);
            res.json(event_);
        });
    })
    .delete('/:id', function(req, res, next) {
        Event.remove({
            "_id": req.params.id
        }, function(err, successIndicator) {
            if (err) next(err);
            res.json(successIndicator);
        });
    });

module.exports = eventRouter;