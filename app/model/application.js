var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applicationSchema = new Schema({
    domain: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    version: {
        type: String
    },
    repositoryLink: {
        type: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

var Application = mongoose.model('Application', applicationSchema);

module.exports = Application;