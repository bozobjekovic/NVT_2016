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
    application: {
        type: Schema.Types.ObjectId,
        ref: 'Application'
    }
});

var Event = mongoose.model('Event', evetnSchema);

module.exports = Event;