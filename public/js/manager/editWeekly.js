layui.use(['form','laydate'], function(){
    var $ = layui.jquery;
    var form = layui.form;
    var laydate = layui.laydate;
    laydate.render({
        elem: '#startTime'
    });
    laydate.render({
        elem: '#endTime'
    });
    $(function(){
        var _id = getUrlParam('_id');
        $("#_id").val(_id);
        $.ajax({
            type: 'get',
            url:'/weekly/edit?_id='+_id,
            success: function(res) {
                if(res.weekly){
                    $("#startTime").val(res.weekly.startTime.split('T')[0]);
                    $("#endTime").val(res.weekly.endTime.split('T')[0]);
                    $("#taskDesc").val(res.weekly.taskDesc);
                    $("#taskTime").val(res.weekly.taskTime);
                    $("[name=process][value="+res.weekly.process+"]").attr("checked",true);
                    var projects = res.projects;
                    projects.forEach(function(project){
                        var option = $("<option value='"+project._id.toString()+"'>"+project.name+"</option>");
                        $("#project").append(option);
                    });
                    $("#project").val(res.weekly.project);
                    form.render();
                }
            }
        });
    });

    //监听提交
    form.on('submit(editWeekly)', function(data) {
        $.ajax({
            type: 'POST',
            url:'/weekly/update',
            data: data.field,
            success: function(res) {
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
        return false;
    });
});

/*关闭弹出框口的父窗口*/
function closeParentLayer(){
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return decodeURI(r[2]);
    return null;
}