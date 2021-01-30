$(function () {
  //键盘弹起触发
  $(".ipt").on("keyup", function () {
    // 每次清空一下延时器
    clearTimeout(timer);
    var text = $(this).val().trim();
    if (text.length <= 0) {
      return $(".search_res").html("").hide();
    }
    if (cachobj[text]) {
      return get(cachobj[text]);
    }
    // 调用防抖
    debounce(text);
  });
  // 定义缓存数据
  var cachobj = {};
  //发送请求
  function get(text) {
    $.ajax({
      url: "https://suggest.taobao.com/sug",
      data: {
        q: text, //淘宝规定这里这样写
      },
      dataType: "jsonp",
      success(res) {
        // 把值存给她
        cachobj[text] = res;
        var htmlStr = template("result", res);
        $(".search_res").html(htmlStr).show();
      },
    });
  }
  // 定义防抖的函数(定时器)
  var timer;
  function debounce(fd) {
    timer = setTimeout(function () {
      get(fd);
    }, 300);
  }
});
