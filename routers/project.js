var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Project = require('../models/Project');

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

//项目列表
router.get('/list',function (req,res) {
    var page = req.query.page||1;
    var limit = Number(req.query.limit||10);
    var skip = (page-1)*limit;
    Project.count().then(function (count) {
        Project.find().skip(skip).limit(limit).populate('manager','username').then(function (projects) {
            console.log(projects);
            res.json({
                code:0,
                count:count,
                data:projects,
                message:""
            });
        });
    })
});

//项目查询接口
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
    Project.count(queryBody).then(function (count) {
        Project.find(queryBody).skip(skip).limit(limit).then(function (projects) {
            res.json({
                code:0,
                count:count,
                data:projects,
                message:""
            });
        });
    })
});

//删除项目
router.get('/delete',function (req,res) {
    var task = new Project(req.query);
    task.remove().then(function (project) {
        if(project){
            responseData.message="删除成功";
        }else{
            responseData.code=1;
            responseData.message="删除失败";
        }
        res.json(responseData);
    })
});


//添加项目
router.get('/add',function (req,res) {
    //将项目经理的人选传入页面
    User.find().then(function (users) {
        res.render('manager/addProject',{
            userInfo:req.userInfo,
            managers:users
        });
    });
});


//添加项目
router.post('/add',function (req,res) {
    new Project(req.body).save().then(function (project) {
        if(project){
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
    Project.findOneAndUpdate({_id:req.body._id},req.body).then(function (project) {
        if(project){
            responseData.message="修改成功";
        }else{
            responseData.code = 1;
            responseData.message = "修改失败";
        }
        res.json(responseData);
    });
});

//编辑项目页面跳转
router.get('/edit',function (req,res) {
    //添加初始密码
    Project.findOne(req.query).then(function (project) {
        res.json({
            user:project
        });
    });
});

module.exports = router;