var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var project = new Schema({
    name:String,
    number:String,
    description:String,
    manager:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    budget:String
});
module.exports = project;