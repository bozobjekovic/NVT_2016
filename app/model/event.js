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
    }
});

var AppEvent = mongoose.model('AppEvent', evetnSchema);

module.exports = AppEvent;