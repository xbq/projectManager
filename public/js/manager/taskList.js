layui.use(['table','form','layer'], function(){
    var $ = layui.jquery;
    var table = layui.table;
    var form = layui.form;
    var layer= layui.layer;

    //第一个实例
    var userTable = table.render({
        elem: '#taskList'
        ,height: 600
        ,url: '/task/list' //数据接口
        ,page: true //开启分页
        ,layout:['count','prev', 'page', 'next','limit','skip']
        ,cols: [[ //表头
            {field: 'description',width:200,  title: '任务描述'}
            ,{field: 'predictTime',width:200,  title: '预计工时数' }
            ,{field: 'practiceTime',width:200,  title: '实际工时数' }
            ,{width:200,  title: '任务执行人',templet:'<div>{{d.executor.username}}</div>'}
            ,{field: 'isPublish',width:200,  title: '是否发布',templet:'<div>{{d.executor.isPublish?"是":"否"}}</div>'}
            ,{field: 'isApproved',width:200,  title: '是否审批通过',templet:'<div>{{d.executor.isPublish?"是":"否"}}</div>'}
            ,{fixed: 'right', width:200, align:'center', toolbar: '#toolBar',title:'操作'}
        ]],
        limits:[1,10,20,50,100],
        limit:20,
        jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：
            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            console.log(obj.limit); //得到每页显示的条数

            //首次不执行
            if(!first){
                //do something
            }
        }
    });

    //监听提交
    form.on('submit(searchTask)', function(data) {
        userTable.reload({
            url: '/task/find',
            where: data.field
        });
        return false;
    });
    //监听提交
    form.on('submit(addTask)', function() {
        layer.open({
            type: 2,
            title: '添加任务',
            shadeClose: true,
            resize: false,
            shade: false,
            area: ['600px', '350px'],
            content: '/task/add',
            end:function(){
                if($('.layui-laypage-btn')[0]){
                    $('.layui-laypage-btn')[0].click();
                }else{
                    userTable.reload({
                        url: '/task/list'
                    });
                }
            }
        });
        return false
    });


    table.on('tool(handler)', function(obj) {
        var data = obj.data,
            layEvent = obj.event;
        var _id = data._id;
        if(layEvent === 'del') {
            layer.confirm('确认删除该行记录？', function(index) {
                obj.del();
                layer.close(index);
                $.ajax({
                    type: 'GET',
                    url: '/task/delete?_id=' + _id,
                    success: function(data) {
                        layer.msg(data.message, {
                            icon: 1,
                            time: 1000
                        });
                        if($('.layui-laypage-btn')[0]){
                            $('.layui-laypage-btn')[0].click();
                        }else{
                            userTable.reload({
                                url: '/task/list'
                            });
                        }
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
                content: '/manager/editTask?_id='+_id,
                end:function(){
                    if($('.layui-laypage-btn')[0]){
                        $('.layui-laypage-btn')[0].click();
                    }else{
                        userTable.reload({
                            url: '/task/list'
                        });
                    }
                }
            });
        }
    });

});
