//1,渲染文章类别对应的下拉选择框结构

$(function () {
    var layer = layui.layer
    var form = layui.form
    // 初始化富文本编辑器
    initEditor()
    initCate()

    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                // 调用模板引擎，渲染分类的下拉菜单
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 一定要记得调用 form.render() 方法
                //通知layui重新渲染表单区域的UI结构
                form.render()

            }
        })
    }


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
})