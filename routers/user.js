var express = require('express');
var router = express.Router();
var User = require('../models/User');


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


//用户列表
router.get('/list',function (req,res) {
    var page = req.query.page||1;
    var limit = Number(req.query.limit||10);
    var skip = (page-1)*limit;
    User.count().then(function (count) {
        User.find().skip(skip).limit(limit).then(function (users) {
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
router.get('/find',function (req,res) {
    var page = req.query.page||1;
    var limit = Number(req.query.limit||10);
    var skip = (page-1)*limit;
    var username = req.query.username||'';
    var tel = req.query.tel||'';
    var queryBody ={};
    if(username){
        queryBody.username = {$regex:username};
    }
    if(tel){
        queryBody.tel = {$regex:tel};
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
    var user = new User(req.query);
    user.remove().then(function (user) {
        if(user){
            responseData.message="删除成功";
        }else{
            responseData.code=1;
            responseData.message="删除失败";
        }
        res.json(responseData);
    })
});


//添加用户
router.get('/add',function (req,res) {
    res.render('manager/addUser',{
        userInfo:req.userInfo
    });
});


//添加用户
router.post('/add',function (req,res) {
    //添加初始密码
    req.body.password = 'zjzhd';
    new User(req.body).save().then(function (user) {
        if(user){
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
    User.findOneAndUpdate({_id:req.body._id},req.body).then(function (user) {
        if(user){
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
    User.findOne(req.query).then(function (user) {
        res.json({
            user:user
        });
    });
});

//初始化密码
router.get('/initPsw',function (req,res) {
    //添加初始密码
    var initPsw = 'zjzhd';
    User.findOneAndUpdate({_id:req.query._id},{'password':initPsw}).then(function (user) {
        if(user){
            responseData.message="初始化成功，初始密码为zjzhd";
        }else{
            responseData.code = 1;
            responseData.message = "初始化失败";
        }
        res.json(responseData);
    });
});


module.exports = router;