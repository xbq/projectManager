layui.use(['table','form','layer'], function(){
    var $ = layui.jquery;
    var table = layui.table;
    var form = layui.form;
    var layer= layui.layer;

    //第一个实例
    var projectTable = table.render({
        elem: '#projectList'
        ,height: 600
        ,url: '/project/list' //数据接口
        ,page: true //开启分页
        ,layout:['count','prev', 'page', 'next','limit','skip']
        ,cols: [[ //表头
            {field: 'number',width:200,  title: '项目编号'}
            ,{field: 'name',width:200,  title: '项目名称' }
            ,{field: 'budget',width:200,  title: '项目预算' }
            ,{width:200,  title: '项目经理',templet:'<div>{{d.manager.username}}</div>'}
            ,{field: 'state',width:200,  title: '项目状态'}
            ,{fixed: 'right', width:200, align:'center', toolbar: '#toolBar',title:'操作'}
        ]],
        limits:[1,10,20,50,100],
        limit:20
    });

    //监听提交
    form.on('submit(searchProject)', function(data) {
        projectTable.reload({
            url: '/project/find',
            where: data.field
        });
        return false;
    });
    //监听提交
    form.on('submit(addProject)', function() {
        layer.open({
            type: 2,
            title: '添加项目',
            shadeClose: true,
            resize: false,
            shade: false,
            area: ['800px', '510px'],
            content: '/project/add'
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
                    url: '/project/delete?_id=' + _id,
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
                title: '项目信息编辑',
                content: '/project/edit?_id='+_id
            });
        }
    });

});
