$(function () {
    
    getUserInfo()
    //退出功能
    $('#btnTuichu').on('click', function () {
        var layer=layui.layer
        layer.confirm('确定关闭?', {icon: 3, title:'提示'}, function(index){
            //do something
            //清空本地token,跳转页面
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          });
    })
}) 
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
       
        success: function (res) {
            console.log(res);
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败！')
            reavatar(res.data)
        }
    })
}
function reavatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.text-avatar').html(name[0].toUpperCase()).show()
        $('.layui-nav-img').hide()
    }
}