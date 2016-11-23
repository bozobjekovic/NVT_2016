var express = require('express');
var User = require('../../app/model/user');

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
    })
    .get('/:id/events', function(req, res, next) {
        User.findOne({"_id":req.params.id}, function (err, user_) {
            if(err) next(err);
            var events = [];
            for(app in user_.registratedApps) {
                console.log(app.name);
            }
        });
    })
    .post('/', function(req, res, next) {
        var user = new User(req.body);
        user.save(function(err, user_) {
            if (err) next(err);
            res.json(user_);
        });
    })
    .delete('/:id', function(req, res, next) {
        User.remove({
            "_id": req.params.id
        }, function(err, successIndicator) {
            if (err) next(err);
            res.json(successIndicator);
        });
    });

module.exports = userRouter;