layui.use(['table','form','layer'], function(){
    var $ = layui.jquery;
    var table = layui.table;
    var form = layui.form;
    var layer= layui.layer;

    //第一个实例
    var weeklyTable = table.render({
        elem: '#weeklyTable'
        ,height: 600
        ,url: '/weekly/list' //数据接口
        ,page: true //开启分页
        ,layout:['count','prev', 'page', 'next','limit','skip']
        ,cols: [[ //表头
            {field: 'executor',width:100,  title: '任务执行人',templet:'<div>{{d.executor.username}}</div>'}
            ,{field: 'startTime',width:120,  title: '开始时间',templet:'<div>{{d.startTime.split("T")[0]}}</div>'}
            ,{field: 'endTime',width:120,  title: '结束时间',templet:'<div>{{d.endTime.split("T")[0]}}</div>' }
            ,{field: 'taskDesc',width:550,  title: '任务描述' }
            ,{field: 'taskTime',width:100,  title: '工时'}
            ,{field: 'approveTaskTime',width:100,  title: '审批工时'}
            ,{field: 'project',width:200,  title: '所属项目',templet:'<div>{{d.project.name}}</div>'}
            ,{field: 'isApprove',width:100,  title: '是否审批',templet:'<div>{{d.isApprove?"是":"否"}}</div>'}
            ,{fixed: 'right', width:200, align:'center', toolbar: '#toolBar',title:'操作'}
        ]],
        limits:[1,10,20,50,100],
        limit:20
    });

    //监听提交
    form.on('submit(searchWeekly)', function(data) {
        weeklyTable.reload({
            url: '/project/find',
            where: data.field
        });
        return false;
    });
    //监听提交
    form.on('submit(addWeekly)', function() {
        layer.open({
            type: 2,
            title: '添加周报',
            shadeClose: true,
            resize: false,
            shade: false,
            area: ['800px', '510px'],
            content: '/weekly/add'
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
                    url: '/weekly/delete?_id=' + _id,
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
                title: '周报信息编辑',
                content: '/manager/editProject?_id='+_id
            });
        }
    });

});
