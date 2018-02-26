var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Project = require('../models/Project');
//统一返回格式
var responseData = {};

//初始化处理
router.use(function(req,res,next){
    responseData = {
        code:0,
        message:''
    };
    next();
});

router.use(function (req,res,next) {
    if(!req.userInfo.username){
        res.send('对不起，请返回登录页面进入系统！');
        return;
    }
    next();
});
/**
 * 首页
 */
router.get('/',function (req,res,next) {
    res.render('manager/index',{
        userInfo:{
            username:new Buffer(req.userInfo.username, 'base64').toString(),
            role:new Buffer(req.userInfo.role, 'base64').toString()
        }
    });
});

/**
 * 用户管理页面跳转
 */
router.get('/userList',function (req,res,next) {
    res.render('manager/userList',{
        userInfo:{
            username:new Buffer(req.userInfo.username, 'base64').toString(),
            role:new Buffer(req.userInfo.role, 'base64').toString()
        }
    });
});

/**
 *用户添加页面跳转
 */
router.get('/addUser',function (req,res) {
    res.render('manager/addUser',{
        userInfo:{
            username:new Buffer(req.userInfo.username, 'base64').toString(),
            role:new Buffer(req.userInfo.role, 'base64').toString()
        }
    });
});
/**
 *用户添加页面跳转
 */
router.get('/editUser',function (req,res) {
    res.render('manager/editUser',{
        userInfo:{
            username:new Buffer(req.userInfo.username, 'base64').toString(),
            role:new Buffer(req.userInfo.role, 'base64').toString()
        }
    });
});


/**
 * 任务管理页面跳转
 */
router.get('/taskList',function (req,res) {
    res.render('manager/taskList',{
        userInfo:{
            username:new Buffer(req.userInfo.username, 'base64').toString(),
            role:new Buffer(req.userInfo.role, 'base64').toString()
        }
    });
});


/**
 * 项目管理页面跳转
 */
router.get('/projectList',function (req,res) {
    res.render('manager/projectList',{
        userInfo:{
            username:new Buffer(req.userInfo.username, 'base64').toString(),
            role:new Buffer(req.userInfo.role, 'base64').toString()
        }
    });
});

/**
 * 项目编辑页面跳转
 */
router.get('/editProject',function (req,res) {

    res.render('manager/editProject',{
        userInfo:{
            username:new Buffer(req.userInfo.username, 'base64').toString(),
            role:new Buffer(req.userInfo.role, 'base64').toString(),
            _id:req.userInfo._id
        }
    });
});

/**
 * 周报管理页面跳转
 */
router.get('/weeklyList',function (req,res) {
    Project.find().then(function(projects){
        res.render('manager/weeklyList',{
            userInfo:{
                username:new Buffer(req.userInfo.username, 'base64').toString(),
                role:new Buffer(req.userInfo.role, 'base64').toString(),
                _id:req.userInfo._id
            },
            projects:projects
        });
    });

});

/**
 * 添加周报
 */
router.get('/addWeekly',function (req,res) {
    res.render('manager/addWeekly',{
        userInfo:{
            username:new Buffer(req.userInfo.username, 'base64').toString(),
            role:new Buffer(req.userInfo.role, 'base64').toString(),
            _id:req.userInfo._id
        }
    });
});

/**
 *用户添加页面跳转
 */
router.get('/editWeekly',function (req,res) {
    res.render('manager/editWeekly',{
        userInfo:{
            username:new Buffer(req.userInfo.username, 'base64').toString(),
            role:new Buffer(req.userInfo.role, 'base64').toString()
        }
    });
});

/**
 *周报审批页面跳转
 */
router.get('/approveWeekly',function (req,res) {
    res.render('manager/approveWeekly',{
        userInfo:{
            username:new Buffer(req.userInfo.username, 'base64').toString(),
            role:new Buffer(req.userInfo.role, 'base64').toString(),
            _id:req.userInfo._id
        }
    });
});

/**
 *周报详情页面跳转
 */
router.get('/detailWeekly',function (req,res) {
    res.render('manager/detailWeekly',{
        userInfo:{
            username:new Buffer(req.userInfo.username, 'base64').toString(),
            role:new Buffer(req.userInfo.role, 'base64').toString()
        }
    });
});
module.exports=router;