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
    }) // Creating new application, setting it's creator and adding it to users registrated apps
    .post('/creator/:id', function(req, res, next) {
        var application = new Application(req.body);
        User.findOne({"_id":req.params.id},function (err, user_) {
            if (err) return next(err);
            application.creator = user_;
            application.save(function(err, application) {
                if (err) return next(err);
                User.findByIdAndUpdate(user_._id, {$push:{"registratedApps":application._id}}, function (err, user_){
                    if (err) next(err);
                    res.json(user_);
                });
            });
        });
    }) // Adding access to user with idU, for appplication with id idA
    .post('/:idA/addUser/:idU', function(req, res, next) {
        User.findOne({"_id":req.params.idU},function (err, user_) {
            if (err) return next(err);
            Application.findOne({"_id":req.params.idA}, function (err, app_) {
                if (err) return next(err);
                User.findByIdAndUpdate(user_._id, {$push:{"followedApps":app_._id}}, function (err, user_){
                    if (err) return next(err);
                    Application.findByIdAndUpdate(app_._id, {$push:{"followers":user_._id}}, function (err, app_){
                        if (err) next(err);
                        res.json(app_);
                    });
                });
            })
        });
    });

module.exports = applicationRouter;