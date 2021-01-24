//1,引入好裁剪图片的样式设置好css和JS
//2,放一个隐藏的文件选择按钮,绑定后点击事件,为上传按钮创造点击事件,模拟文件上传的点击
//3,把要选的文件定好格式属性上传,为file选择框指定文件类型,用accept属性,上传后把裁剪去的图片换成上传的图片
//4,绑定点击事件,拿到裁剪后的图片的base64 格式的字符串,然后再调用接口上传,更新头像




$(function () {
    var layer = layui.layer;
    //这个是图片剪裁固定的js
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    //为上传按钮创造点击事件,模拟文件上传的点击,自执行事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })


    //只要选择的文件发送了变化,就会触发change事件
    // 为文件选择框绑定 change 事件,这个步骤只是改变裁剪区的图片,上传图片为头像要另外一步
    $('#file').on('change', function (e) {
        console.log(e);
        // 获取用户选择的文件
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 将文件，转化为路径createObjectURL是URL里的一个把图片转换成路径的方法
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //拿到裁剪后的图片,然后再调用接口上传,更新头像
    //拿裁剪后的图片也是用cropper里的方法
    $('#btnUpload').on('click', function () {
        //拿到用户裁剪后的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        // console.log(dataURL);
        将裁剪后的图片上传
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()
            }
        })


    })













})