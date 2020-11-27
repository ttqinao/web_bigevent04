$(function () {
    //1.校验
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if(value.length>6) return '昵称位数应该在1~6位之间'
        }

    })

    //2.渲染输入框里的内容
    initUserInfo()
    var layer=layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                form.val("formText",res.data)
            }
        })
    }

    //3.重置表单
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //4.提交修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
})