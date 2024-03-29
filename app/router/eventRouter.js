var express = require('express');
var AppEvent = require('../../app/model/event');

var Application = require('../../app/model/application');
var User = require('../../app/model/user');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport("SMTP", {
    service: 'Gmail',
    auth: {
        user: "bozo.bjekovic@gmail.com",
        pass: "753570"
    }

});

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
    }) // Adding new event for application with id, sending mails to all users that are following this app
    .post('/application/:domain', function(req, res, next) {
        var event = new AppEvent(req.body);
        Application.findOne({"domain":req.params.domain},function (err, app_) {
            if(!app_){
                return res.json({});
            }
            event.application = app_;
            event.save(function(err, event_) {
                if (err) return next(err);
                if(event_.version > app_.version){
                    var update = {$push:{"events":event_._id}, $set:{version : event_.version}};
                }
                else{
                    var update = {$push:{"events":event_._id}};
                }
                Application.findByIdAndUpdate(app_._id, update, function (err, app_){
                    if (err) next(err);
                    var mailTo = "";
                    var itemsProcessed = 0;
                    app_.followers.forEach(function(value){
                         User.findOne({"_id":value},function (err, u) {
                            mailTo += u.email + ", ";
                            itemsProcessed++;
                            if (itemsProcessed === app_.followers.length) {
                             send(mailTo);
                            }
                         });                         
                    });
                    res.json(event_);
                });
            });
        });
    });

function email_object(mailTo) {
    var mailOptions = {
        from: '"Tim 9" <bozo.bjekovic@gmail.com>',
        to: mailTo ,
        subject: 'Event error',
        html: '<b>Error occured</b>'
    };
    return mailOptions;
}

function send(mailTo){
    transporter.sendMail(email_object(mailTo), function(err, info){
        if (err) return (err);
    });
}

module.exports = eventRouter;