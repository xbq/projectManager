/**
 * layout是后台管理页面的大框架，包含了相同的导航条和侧边栏
 * 一些公共的函数也可以定义在这个文件里面
 */
layui.use('form',function(){
    var $ = layui.jquery;
    $(function() {
        //退出
        $("#btn_logout").on('click',function(){
            layer.confirm('确定退出？', function(index) {
                layer.close(index);
                $.ajax({
                    url:'/logout',
                    success:function(res){
                        if(!res.code){
                            window.location='/';
                        }
                    }
                });
            });

        });
    });
});

/*关闭弹出框口的父窗口*/
function closeParentLayer(){
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}