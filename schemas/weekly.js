var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user = new Schema({
    startTime:Date,
    endTime:Date,
    task:String,
    taskTime:Number,
    process:String,
    isApprove:Boolean
});

module.exports = user;