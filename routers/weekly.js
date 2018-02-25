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
        Weekly.find().skip(skip).limit(limit).populate('project').populate('executor').then(function (weeklies) {
            console.log(weeklies);
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


module.exports=router;