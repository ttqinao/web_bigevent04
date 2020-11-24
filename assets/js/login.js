$(function () {
    $('#link-reg').on('click', function () {
        $('.regBox').show()
        $('.loginBox').hide()
    })
    $('#link-login').on('click', function () {
        $('.regBox').hide()
        $('.loginBox').show()
    })


    //表单验证
var form = layui.form
var layer = layui.layer
form.verify({
    pwd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
        var pwd = $('.regBox [name=password]').val()
        if(value !==pwd) return '俩次密码不一致'
    }
})

//监测注册表单提交事件
$('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}, function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        $('#link-login').click()
        $('#form_reg')[0].reset()
    })
    
})
$('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.post('/api/login', $(this).serialize(), function (res) {
        // console.log(res);
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        // $('#form_login')[0].reset()
        localStorage.setItem('token',res.token)
        location.href ='/index.html'
    })
})
})

