var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user = new Schema({
    username:String,
    password:String,
    role:String,
    department:String,
    tel:String
});

module.exports = user;