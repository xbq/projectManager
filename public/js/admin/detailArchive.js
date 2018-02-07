layui.use(['form'], function(){
    var $ = layui.jquery;
    var form = layui.form;
    var href = '/public/plugins/CFEditor-master/bootstrap/css/bootstrap-2014-10-23-e2373d4a.min.css'

    var editor = new wysihtml5.Editor(
        "content",{
            name: "content",
            style: true,
            parserRules:  ToolBarRules,
            useLineBreaks: false,
            stylesheets: href
        });
});
