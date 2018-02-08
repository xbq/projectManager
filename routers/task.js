var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Task = require('../models/Task');

//统一返回格式
var responseData = {};

//初始化处理
router.use(function(req,res,next){
    //这里需要进一步处理，到时候根据业务分几种角色来判断
    if(!req.userInfo.username){
        res.send('对不起，只有管理员才能进入此页面');
        return;
    }
    responseData = {
        code:0,
        message:''
    };
    next();
});




//用户列表
router.get('/list',function (req,res) {
    var page = req.query.page||1;
    var limit = Number(req.query.limit||10);
    var skip = (page-1)*limit;
    Task.count().then(function (count) {
        Task.find().skip(skip).limit(limit).populate('executor','username').then(function (tasks) {
            console.log(tasks);
            res.json({
                code:0,
                count:count,
                data:tasks,
                message:""
            });
        });
    })
});

//用户列表
router.get('/find',function (req,res) {
    var page = req.query.page||1;
    var limit = Number(req.query.limit||10);
    var skip = (page-1)*limit;
    var description = req.query.description||'';
    var executor = req.query.executor||'';
    var queryBody ={};
    if(description){
        queryBody.username = {$regex:description};
    }
    if(executor){
        queryBody.executor = {$regex:executor};
    }
    User.count(queryBody).then(function (count) {
        User.find(queryBody).skip(skip).limit(limit).then(function (users) {
            res.json({
                code:0,
                count:count,
                data:users,
                message:""
            });
        });
    })
});

//用户列表
router.get('/delete',function (req,res) {
    console.log(req.query);
    var task = new Task(req.query);
    task.remove().then(function (user) {
        if(task){
            responseData.message="删除成功";
        }else{
            responseData.code=1;
            responseData.message="删除失败";
        }
        res.json(responseData);
    })
});


//添加任务
router.get('/add',function (req,res) {
    //将执行任务的人员传入页面
    User.find().then(function (users) {
        res.render('manager/addTask',{
            userInfo:req.userInfo,
            executors:users
        });
    });
});


//添加用户
router.post('/add',function (req,res) {
    //添加初始密码
    console.log(req.body);
    new Task(req.body).save().then(function (task) {
        if(task){
            responseData.message="添加成功";
        }else{
            responseData.code = 1;
            responseData.message = "添加失败";
        }
        res.json(responseData);
    });
});

//更新用户
router.post('/update',function (req,res) {
    Task.findOneAndUpdate({_id:req.body._id},req.body).then(function (task) {
        if(task){
            responseData.message="修改成功";
        }else{
            responseData.code = 1;
            responseData.message = "修改失败";
        }
        res.json(responseData);
    });
});


//添加用户
router.get('/edit',function (req,res) {
    //添加初始密码
    Task.findOne(req.query).then(function (task) {
        res.json({
            user:task
        });
    });
});

module.exports = router;