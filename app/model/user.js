var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surName: {
        type: String,
        required: true
    },
    registratedApps: [{
        type: Schema.Types.ObjectId,
        ref: 'Application'
    }],
    followedApps: [{
        type: Schema.Types.ObjectId,
        ref: 'Application'
    }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;