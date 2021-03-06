layui.use(['table','form','layer'], function(){
    var $ = layui.jquery;
    var table = layui.table;
    var form = layui.form;
    var layer= layui.layer;

    //第一个实例
    var userTable = table.render({
        elem: '#userList'
        ,height: 600
        ,url: '/user/list' //数据接口
        ,page: true //开启分页
        ,layout:['count','prev', 'page', 'next','limit','skip']
        ,cols: [[ //表头
            {field: 'username',width:200,  title: '用户名'}
            ,{field: 'password',width:200,  title: '密码' }
            ,{field: 'role',width:200,  title: '角色'}
            ,{field: 'tel',width:200,  title: '联系方式'}
            ,{field: 'department',width:200,  title: '部门'}
            ,{fixed: 'right', width:200, align:'center', toolbar: '#toolBar',title:'操作'}
        ]],
        limits:[1,10,20,50,100],
        limit:20
    });

//监听提交
    form.on('submit(searchUser)', function(data) {
        userTable.reload({
            url: '/user/find',
            where: data.field
        });
        return false;
    });
//监听提交
    form.on('submit(addUser)', function() {
        layer.open({
            type: 2,
            title: '添加用户',
            shadeClose: true,
            resize: false,
            shade: false,
            area: ['500px', '350px'],
            content: '/user/add'
        });
        return false
    });


    table.on('tool(handler)', function(obj) {
        console.log(obj);
        var data = obj.data,
            layEvent = obj.event;
        var _id = data._id;
        if(layEvent === 'del') {
            layer.confirm('确认删除该行记录？', function(index) {
                obj.del();
                layer.close(index);
                $.ajax({
                    type: 'GET',
                    url: '/user/delete?_id=' + _id,
                    success: function(data) {
                        layer.msg(data.message, {
                            icon: 1,
                            time: 1000
                        });
                    }
                });
            });
        } else if(layEvent === 'edit') {
            layer.open({
                type: 2,
                area: ['500px', '350px'],
                fix: false,
                resize: false,
                shade: 0.4,
                title: '用户信息编辑',
                content: '/manager/editUser?_id='+_id
            });
        }else if(layEvent==='initPsw'){
            layer.confirm('确认初始化改用户的密码',function(index){
                layer.close(index);
                $.ajax({
                    url:'/user/initPsw?_id='+_id,
                    success:function(res){
                        if(!res.code) {
                            layer.open({
                                content: res.message,
                                yes: function(index, layero) {
                                    closeParentLayer();
                                    parent.document.getElementsByClassName('layui-laypage-btn')[0].click();
                                }
                            });
                        } else {
                            layer.msg(res.message, {
                                icon: 5,
                                shift: 6
                            });
                        }
                    }
                });
            });
        }
    });

});
