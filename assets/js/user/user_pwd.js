$(function () {
    var form = layui.form
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if(value==$('[name=oldPwd]').val()) return '原旧密码不能相同'
        },
        repwd: function (value) {
            if(value!==$('[name=newPwd]').val()) return '俩次密码输入不一致'
        }
    })

    //提交修改
    var layer = layui.layer
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })
})