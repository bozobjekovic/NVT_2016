var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'AppEvent',
        required: true
    }
});

commentSchema.add({comments:[commentSchema]});

commentSchema.pre('save', function(next) {
    var currentDate = new Date();
    
    if (!this.createdAt)
        this.createdAt = currentDate;

    next();
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;