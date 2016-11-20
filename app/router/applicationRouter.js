var express = require('express');
var Application = require('../../app/model/application');

var User = require('../../app/model/user');

// Router for applications
var applicationRouter = express.Router();

applicationRouter
    .get('/', function(req, res) {
        Application.find({}, function(err, data, next) {
            res.json(data);
        });
    })
    .get('/:id', function(req, res, next) {
        Application.findOne({
            "_id": req.params.id
        }).populate('followers')
          .populate('events')
          .exec(function(err, app_) {
            if (err) next(err);
            res.json(app_);
        });
    })
    .post('/user/:id', function(req, res, next) {
        var application = new Application(req.body);
        User.findOne({"_id":req.params.id},function (err, user_) {
            if (err) next(err);
            application.creator = user_;
            application.save(function(err, application) {
                if (err) next(err);
                User.findByIdAndUpdate(user_._id, {$push:{"registratedApps":application._id}}, function (err, user_){
                    if (err) next(err);
                    res.json(user_);
                });
            });
        });
    })
    .delete('/:id', function(req, res, next) {
        Application.remove({
            "_id": req.params.id
        }, function(err, successIndicator) {
            if (err) next(err);
            res.json(successIndicator);
        });
    });

module.exports = applicationRouter;