layui.use(['form'], function(){
    var $ = layui.jquery;
    var form = layui.form;
    var href = '/public/plugins/CFEditor-master/bootstrap/css/bootstrap-2014-10-23-e2373d4a.min.css'

    var editor = new wysihtml5.Editor(
        "content",{
            name: "content",
            style: true,
            toolbar:  "page-toolbar-a794381c",
            parserRules:  ToolBarRules,
            useLineBreaks: false,
            stylesheets: href
        });

    function onChange() {
        $("#content").html($('.wysihtml5-sandbox').contents().find('body')[0].innerHTML)
    };
    editor.on("change", onChange);

    //监听提交
    form.on('submit(addArchive)', function(data) {
        $.ajax({
            type: 'POST',
            url:'/admin/archive/add',
            data: data.field,
            success: function(res) {
                if(!res.code){
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
