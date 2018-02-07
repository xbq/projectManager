var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var task = new Schema({
    description:String,
    predictTime:Number,
    practiceTime:Number,
    executor:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    isPublish:{
        type:Boolean,
        default:false
    },
    publishTime:Date,
    isApproved:{
        type:Boolean,
        default:false
    }
});

module.exports = task;