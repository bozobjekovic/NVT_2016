var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var evetnSchema = new Schema({
    version: {
        type: String
    },
    timeStamp: Date,
    fragment: {
        type: String,
        required: true
    },
    stack: {
        type: String,
        required: true
    },
    application: {
        type: Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

evetnSchema.pre('save', function(next) {
    var currentDate = new Date();
    
    if (!this.timeStamp)
        this.timeStamp = currentDate;

    next();
});

var AppEvent = mongoose.model('AppEvent', evetnSchema);

module.exports = AppEvent;