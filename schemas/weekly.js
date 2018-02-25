var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var weekly = new Schema({
    startTime: Date,
    endTime: Date,
    taskDesc: String,
    taskTime: Number,
    approveTaskTime: Number,
    process: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    isApprove: Boolean,
    executor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = weekly;