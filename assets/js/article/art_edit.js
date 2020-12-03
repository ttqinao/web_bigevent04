$(function () {
  function initform() {
    var id = location.search.split('=')[1]
    $.ajax({
      method: 'get',
      url: '/my/article/' + id,
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        form.val('form_edit', res.data)
        tinyMCE.activeEditor.setContent(res.data.content)
        if (!res.data.cover_img){
          return layer.msg('未曾上传头像')
        }
        var newImgURL ='http://ajax.frontend.itheima.net' +res.data.cover_img
        $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
      }
    })
  }


  var layer = layui.layer;
  var form = layui.form;
  initCate();
  // 初始化富文本编辑器
  initEditor();
  function initCate() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        var str = template("tpl_cate", res);
        $("[name=cate_id]").html(str);
        form.render();
        initform()
      },
    });
  }

  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  //4.点击按钮，选择图片
  $("#btnImage").on("click", function () {
    $("#file").click();
  });

  //5.设置图片
  $("#file").change(function (e) {
    // 拿到用户选择的文件
    var file = e.target.files[0];
    if (file == undefined) return;
    //根据选择的文件，创建一个对应的 URL 地址
    var newImgURL = URL.createObjectURL(file);
    // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  //6.设置状态
  var state = "已发布";
  $("#btnSave2").on("click", function () {
    state = "草稿";
  });

  //7.添加文章
  $("#form-pub").on("submit", function (e) {
    e.preventDefault();
    var fd = new FormData(this);
    fd.append("state", state);
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append("cover_img", blob);
        publishArticle(fd);
      });
  });
  function publishArticle(fd) {
    $.ajax({
      method: "post",
      url: "/my/article/edit",
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        // location.href='/article/art_list.html'

        setTimeout(function () {
          // window.parent.document.getElementById('art_list').click();
          window.parent.$('#art_list')[0].click()
        }, 1500);
      },
    });
  }
});
