//全局变量使用G_开头
(function($) {
  'use strict';

  $(function() {
    var $fullText = $('.admin-fullText');
    $('#admin-fullscreen').on('click', function() {
      $.AMUI.fullscreen.toggle();
    });

    $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
      $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
    });

    //默认关闭面板
    $("#collapse-nav").collapse('close');
    $("#collapse-nav2").collapse('close');
    $("#collapse-nav3").collapse('close');
    $("#collapse-nav4").collapse('close');
    $("#collapse-nav5").collapse('close');

  });
})(jQuery);

/**
* 提示的弹窗 ,
* str:提示的字符串
* color:字体的颜色，有4个值：success，warning，danger，default
* t:显示的时间，如果不传值，不自动关闭
*/
var G_autoTimeClose = function(str,color,t){ 
  var da = "autowindow_"+new Date().getTime();
  var c = "#666";
  var imgsrc = "/publicStatic/images/default.png";
  switch(color){
    case "success":{c = "#4bad4b"; imgsrc = "/publicStatic/images/success.png"};break;
    case "warning":{c = "#e56c0c"; imgsrc = "/publicStatic/images/warning.png"};break;
    case "danger":{c = "#d83832"; imgsrc = "/publicStatic/images/danger.png"};break;
    case "loading":{c = "#666"; imgsrc = "/publicStatic/images/loading.gif"};break;
  }
  var closeDa = function(){
    var $da = $("#"+da);
    $da.fadeOut(500,function(){
      $da.remove();
    });
  };
  //自动关闭的弹窗
  if( t == "nobtn"){
    var tpl = ' <div  id="'+da+'" class="autowindow_always" style="position:fixed; background:#fff; z-index:100000; width:400px; box-shadow:0 0 10px rgba(0,0,0,0.3); text-align:center; left:50%; top:50%; margin:-100px 0 0 -200px;">\
            <h1 style="height:40px; line-height:40px; font-size:16px; color:#333333; text-indent:10px; text-align:left; background:#f3f3f3;">去兜风提示</h1>\
            <div style="margin:40px 10px;"><img  src="'+imgsrc+'"><span style="color:#333333; margin-left:15px; font-size:18px;">'+str+'</span></div>\
            <div>\
            <a style="background:#18e698; color:#222430;  width:120px; height:40px; line-height:40px; text-align:center; margin:0 10px 20px 10px; display: inline-block;" href="javascript:void(0)" class="'+da+'_del doyes">关闭窗口</a></div>\
            </div>';
    $("body").append(tpl);
    $("."+da+"_del").on("click",function(e){
      closeDa();
    });
  }else if(t != undefined || t == "always"){
    var tpl = ' <div  id="'+da+'" class="autowindow_always" style="position:fixed; background:#fff; z-index:100000; width:400px; box-shadow:0 0 10px rgba(0,0,0,0.3); text-align:center; left:50%; top:50%; margin:-100px 0 0 -200px;">\
            <h1 style="height:40px; line-height:40px; font-size:16px; color:#333333; text-indent:10px; text-align:left; background:#f3f3f3;">去兜风提示</h1>\
            <div style="margin:40px 10px;"><img  src="'+imgsrc+'"><span style="color:#333333; margin-left:15px; font-size:18px;">'+str+'</span></div>\
            </div>';
    $("body").append(tpl);
    if(t != "always"){
      setTimeout(function(){
        closeDa();
      },t);
    }else{
      return "#"+da;
    }
  }else{
    var tpl = ' <div  id="'+da+'" class="autowindow_always" style="position:fixed; background:#fff; z-index:100000; width:400px; box-shadow:0 0 10px rgba(0,0,0,0.3); text-align:center; left:50%; top:50%; margin:-100px 0 0 -200px;">\
            <h1 style="height:40px; line-height:40px; font-size:16px; color:#333333; text-indent:10px; text-align:left; background:#f3f3f3;">去兜风提示</h1>\
            <div style="margin:40px 10px;"><img  src="'+imgsrc+'"><span style="color:#333333; margin-left:15px; font-size:18px;">'+str+'</span></div>\
            <div>\
            <a style="display:inline-block; color:#333333; background:#f3f3f3; width:120px; height:40px; line-height:40px; text-align:center; margin:0 10px 20px 10px;" href="javascript:void(0)" class="'+da+'_del">取消</a>\
            <a style="background:#18e698; color:#222430;  width:120px; height:40px; line-height:40px; text-align:center; margin:0 10px 20px 10px; display: inline-block;" href="javascript:void(0)" class="'+da+'_del doyes">确定</a></div>\
            </div>';
    $("body").append(tpl);
    $("."+da+"_del").on("click",function(e){
      closeDa();
      if(e.currentTarget.className.indexOf("doyes") != -1){
        return true;
      }else{
        return false;
      }
    });
  }
  
}
