var mongoose = require('mongoose');
var userSchema = require('../schemas/task');
/*
name, schema, collection, skipInit
* 第一个参数为model的name
* 第二个参数为schema对象
* 第三个参数为操作的数据库的collection的名称，即表明，如果没有，默认为model.name+‘s’作为表明
* */
var Task =  mongoose.model('Task',userSchema,'task');

module.exports=Task;