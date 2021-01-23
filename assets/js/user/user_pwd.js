// 1,用layui的verity给表单定校验规则,新密码和就密码不一样,而且两次密码不一样
// 2,用表格的点击事件,ajax把密码进行更新,点击重置的时候,表单内容重置



$(function () {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        },
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '原密码和新密码不能一样'
            }
        }
    })


    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('修改密码失败')
                }
                layui.layer.msg('修改密码成功')

                // 重置表单
                $('.layui-form')[0].reset()
            }
        })

    })






})