layui.use(['form'], function(){
    var $ = layui.jquery;
    var form = layui.form;
    $(function(){
        form.render();
    });

    //监听提交
    form.on('submit(publishTask)', function(data) {
        data.field.isPublish=true;
        data.field.publishTime = new Date();
        data.field.practiceTime = data.field.predictTime;
        $.ajax({
            type: 'POST',
            url:'/task/add',
            data: data.field,
            success: function(res) {
                if(!res.code) {
                    layer.open({
                        content: res.message,
                        yes: function(index, layero) {
                            closeParentLayer();
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
        return false;
    });
});

/*关闭弹出框口的父窗口*/
function closeParentLayer(){
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}