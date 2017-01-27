var express = require('express');
var Comment = require('../../app/model/comment').model;

var AppEvent = require('../../app/model/event');

// Router for applications
var commentRouter = express.Router();

commentRouter
    // get comments for chosen event
    .get('/event/:id', function(req, res) {
        AppEvent.findOne({ "_id": req.params.id })
            .populate('comments')
            .exec(function(err, event_) {
                if (err) next(err);
                res.json(event_);
        });
    })
    // get comments for chosen comment
    .get('/comment/:id', function(req, res) {
        Comment.findOne({ "_id": req.params.id }, function (err, comment_) {
            if (err) return next(err);
            res.json(comment_.comments);
        });
    })
    // post new comment on event
    .post('/', function(req, res, next) {
        var comment = new Comment(req.body);
        comment.save(function(err, comment_) {
            if (err) return next(err);
            AppEvent.findByIdAndUpdate(comment.event, {$push:{"comments":comment_._id}}, function (err, event_){
                if (err) next(err);
                res.json(comment_);
            });
        });
    })
    // post new comment on existing comment
    .post('/comment/:id', function(req, res, next) {
        var comment = new Comment(req.body);
        Comment.findByIdAndUpdate(req.params.id, {$push:{"comments":comment}}, function (err, comment_) {
            if (err) next(err);
            res.json(comment_.comments);
        });
    })

module.exports = commentRouter;