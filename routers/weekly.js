var express = require('express');
var router = express.Router();
var Project = require('../models/Project');
var Weekly = require('../models/Weekly');

//统一返回格式
var responseData = {};

//初始化处理
router.use(function(req,res,next){
    //这里需要进一步处理，到时候根据业务分几种角色来判断
    if(!req.userInfo.username){
        res.send('对不起，请先登录');
        return;
    }
    responseData = {
        code:0,
        message:''
    };
    next();
});

//周报列表
router.get('/list',function (req,res) {
    var page = req.query.page||1;
    var limit = Number(req.query.limit||10);
    var skip = (page-1)*limit;
    Weekly.count().then(function (count) {
        Weekly.find().skip(skip).limit(limit).populate('project').populate('executor').populate('approver').then(function (weeklies) {
            res.json({
                code:0,
                count:count,
                data:weeklies,
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
    var taskDesc = req.query.taskDesc||'';
    var project = req.query.project||'';
    var isApprove = req.query.isApprove||'';
    var process = req.query.process||'';
    var queryBody ={};
    if(taskDesc){
        queryBody.taskDesc = {$regex:taskDesc};
    }
    if(process){
        queryBody.process = {$regex:process};
    }
    if(isApprove){
        queryBody.isApprove = {$regex:isApprove};
    }
    if(project){
        //这里就不进行模糊查询了，直接将id值赋过去
        queryBody.project = project;
    }
    Weekly.count(queryBody).then(function (count) {
        Weekly.find(queryBody).populate('project').populate('executor').skip(skip).limit(limit).then(function (weeklies) {
            res.json({
                code:0,
                count:count,
                data:weeklies,
                message:""
            });
        });
    })
});


//周报列表
router.get('/add',function (req,res) {
    //将项目列表传入页面
    Project.find().then(function (projects) {
        res.render('manager/addWeekly',{
            userInfo:req.userInfo,
            projects:projects
        });
    });
});

//周报列表
router.post('/add',function (req,res) {
    new Weekly(req.body).save().then(function (weekly) {
        if(weekly){
            responseData.message="添加成功";
        }else{
            responseData.code = 1;
            responseData.message = "添加失败";
        }
        res.json(responseData);
    });
});

//周报修改页面跳转
router.get('/edit',function (req,res) {
    //将项目列表传入页面
    Project.find().then(function (projects) {
        Weekly.findOne(req.query).then(function(weekly){
            res.json({
                userInfo:req.userInfo,
                projects:projects,
                weekly:weekly
            });
        })
    });
});

//周报修改
router.post('/update',function (req,res) {
     Weekly.findOneAndUpdate({_id:req.body._id},req.body).then(function (weekly) {
        if(weekly){
            responseData.message="修改成功";
        }else{
            responseData.code = 1;
            responseData.message = "修改失败";
        }
        res.json(responseData);
    });
});

//周报审批页面取值
router.get('/approve',function (req,res) {
    //将周报信息传入页面
    Weekly.findOne(req.query).populate('project').populate('executor').then(function(weekly){
        res.json({
            userInfo:req.userInfo,
            weekly:weekly
        });
    })
});


module.exports=router;