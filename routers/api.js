var express = require('express');
var router = express.Router();
var User = require('../models/User')
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

router.post('/login',function (req,res) {
    console.log(req.body);
    if(req&&req.body){
        var username = req.body.username;
        var password = req.body.password;
        console.log(req.body);
        //查询数据库，验证用户名密码是否正确
        User.findOne({
            username:username,
            password:password
        }).then(function(userInfo){
            if(!userInfo){
                responseData.code=3;
                responseData.message= "用户名或密码错误";
                res.json(responseData);
                return;
            }else{
                responseData.message="登陆成功";
                req.cookies.set('userInfo',JSON.stringify({
                    _id:userInfo._id,
                    username:userInfo.username,
                    role:userInfo.role
                }));
                res.json(responseData);
                return;
            }
        });
    }
});

router.get('/logout',function (req,res,next) {
    req.cookies.set('userInfo',null);
    res.json(responseData);
});

router.get('/',function (req,res,next) {
    res.render('login');
});


module.exports=router;