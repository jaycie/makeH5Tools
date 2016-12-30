// JavaScript Document
/**

页面居中

简单使用：

$('#cbox1').center();
不是所有人都喜欢让某元素垂直居中，同时想要它跟随屏幕滚动的话，可以这样配置(所有在此合理配置的CSS样式都将被应用)：

$('#cbox2').center({position:'fixed',top:'30%'});
要让#cobx1脱离父容器(假定它是静态定位)的话：

$('#cbox1').center({relative:false});

*/
(function ($) {
  $.fn.center = function (settings) {
    var style = $.extend({
      position: 'absolute', //absolute or fixed
      top     : '50%', //50%即居中，将应用负边距计算，溢出不予考虑了。
      left    : '50%',
      zIndex  : 9990,
      relative: true //相对于包含它的容器居中还是整个页面
    }, settings || {});

    return this.each(function () {
      var $this = $(this);

      if (style.top == '50%') style.marginTop = -$this.outerHeight() / 2;
      if (style.left == '50%') style.marginLeft = -$this.outerWidth() / 2;
      if (style.relative && !$this.parent().is('body') && $this.parent().css('position') == 'static') $this.parent().css('position', 'relative');
      delete style.relative;
      //ie6
      if (style.position == 'fixed' && $.browser.version == '6.0') {
        style.marginTop += $(window).scrollTop();
        style.position = 'absolute';
        $(window).scroll(function () {
          $this.stop().animate({
            marginTop: $(window).scrollTop() - $this.outerHeight() / 2
          });
        });
      }

      $this.css(style);
    });
  };
})(jQuery);

/**
 * 不使用margin 负值回去 的居中
 */
(function ($) {
  $.fn.center2 = function (settings) {
    var style = $.extend({
      position: 'absolute', //absolute or fixed
      top     : '50%', //50%即居中，将应用负边距计算，溢出不予考虑了。
      left    : '50%',
      zIndex  : 9999,
      relative: true //相对于包含它的容器居中还是整个页面
    }, settings || {});

    return this.each(function () {
      var $this = $(this);
      if (style.top == '50%') style.marginTop = -$this.outerHeight() / 2;
      if (style.left == '50%') style.left = ( $this.parent().width() - $this.width() ) / 2;
      //console.log(style.left<0);
      //style.left = (style.left<0?0:style.left);
      $this.css(style);

    });
  };
})(jQuery);

/**
*     selectMt 0.1 
*     Copyright (c) 2014 MANTOU http://www.mtsee.com/ 
*     Date: 2014-08-17 
*    封装下拉菜单插件    
*   方法名： selectMt 点击后返回选择项
*    结构如下：

css:

.downNav{display:inline-block; border:1px solid #e1e1e1; border-radius:2px; font-size:14px; height:14px; width:92px; height:30px; float:right; margin-top:13px; line-height:30px; text-indent:10px; position:relative;}
.downNav span{ width:100%; height:100%; display:block; cursor:pointer; background:#f6f6f6;}
.downNav span i{ width:10px; height:10px; display:inline-block; background:url(../images/index.png) no-repeat -3px -115px; margin-left:8px;}
.downNav span:hover{ background:#ff6060; color:#FFF; border-radius:2px;}
.downNav span:hover i{background:url(../images/index.png) no-repeat -3px -129px;}
.downNav ul{ display:none; width:100%; position:absolute; top:32px; border-left:1px solid #CCC; border-right:1px solid #CCC; margin:-1px; max-height:200px; overflow:auto;}
.downNav ul li{ float:left; width:100%; height:30px; border-bottom:1px solid #CCC; line-height:30px; margin-left:0; text-align:center; background:#FFF; cursor:pointer; text-indent:0;}
.downNav ul li:hover{background:#ff6060; color:#FFF;}

html:

<div class="downNav" id="" dataValue="默认内容">
    <span>默认内容<i></i></span>
    <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
    </ul>
</div>

使用方法：

$("对象ID").selectMt({callback:回调函数名称}); //回调函数名称不加括号，值返回给回调函数

*/

;(function($){ 
    $.fn.selectMt = function(setting){ 
        var defaults = { 
            callback : null //默认回调函数为空
        } 
        //如果setting为空，就取default的值
        var setting = $.extend(defaults, setting); 
        this.each(function(){ 
        //插件实现代码 
            var $this = $(this);
            var $span = $this.find("span");
            var $ul = $this.find("ul");
            var $li = $ul.find("li");

            $span.click(function(){
               if($ul.is(":hidden")){
                     $ul.css({"display":"block"});
               }
               else{
                 $ul.css({"display":"none"});   
               }
            });
            
            $li.on("click",function(){
               $ul.css({"display":"none"});
               var selectValue = $(this).html();
               $this.attr("dataValue",selectValue);
               $span.html(selectValue+"<i></i>");
               if(setting.callback != null){
                       setting.callback(selectValue);//运行完后设置回调函数
               }
            });    
        });
    }
})(jQuery); 


/**
*    弹窗插件 , 返回yes 表示点击了确定按钮
*    弹窗的窗口，对象必须是ID
*   页面里面必须有蒙版层 
    点击 class = close 关闭弹窗
    box 必须使用 id
    <!--蒙版层--> 
    HTML:
    <div class="fixedBox" id="fixedBox"></div>
    CSS:
    .fixedBox{ position:fixed; background:#000; opacity:0.5; filter:alpha(opacity=50); -moz-opacity:0.5; width:100%; height:100%; top:0; z-index:2999; display:none;}
*/
;(function($){ 
    $.fn.showWindow = function(setting){
        var defaults = { 
            id : null, //默认回调函数为空
            speed : 300, //显示速度
            center : true, //是否居中
            callback : null //点击确定的回调函数
            ,cb : null
        } 
        //如果setting为空，就取default的值
        var setting = $.extend(defaults, setting); 
        this.each(function(){ 
            var $this = $(this);
            //插件实现代码 
            if(setting.id == null ){
                alert("showWindow插件必须填入一个name参数，且必须是ID!");
                return
            }
            var $fixedBox = $("#fixedBox");
            var box = "#"+setting.id;
            var speed = setting.speed;
            var $loginBox = $(box);
            
            var clickFun = function($thisbtn){
                $thisbtn.parent().fadeOut(speed,function(){
                    $thisbtn.off("click");
                    $fixedBox.css({"display":"none"});
                });
            };
            
            $this.click(function(){
                $fixedBox.css({"display":"block"});
                if(setting.center == true){
                    $loginBox.center();
                }
                $loginBox.fadeIn(speed).find(".close").off("click").on("click",function(){
                    clickFun($(this));
                    if(setting.callback != null){
                        setting.callback("no");
                    }
                });
                $loginBox.find(".yes").off("click").on("click",function(){
                    clickFun($(this));
                    if(setting.callback != null){
                        setting.callback("yes");
                    }
                });
                if(setting.cb != null){
                    setting.cb();
                }
            });
        });
    }
})(jQuery); 

/**
*   author: xiezhanggen@gmail.com 
*    date: 2016-07-26
*    弹窗插件 , 返回yes 表示点击了确定按钮
*    弹窗的窗口，对象必须是ID
*   页面里面必须有蒙版层 
    点击 class = close 关闭弹窗
    box 必须使用 id
    <!--蒙版层--> 
    HTML:
    <div class="fixedBox" id="fixedBox"></div>
    CSS:
    .fixedBox{ position:fixed; background:#000; opacity:0.5; filter:alpha(opacity=50); -moz-opacity:0.5; width:100%; height:100%; top:0; z-index:2999; display:none;}
*/
;(function($){ 
    $.fn.maskWindow = function(setting){ 
        var defaults = { 
            id : null, //默认回调函数为空
            speed : 300, //显示速度
            center : true, //是否居中
            callback : null, //点击确定的回调函数
            cb : null,
            cancel: null
        } 
        //如果setting为空，就取default的值
        var setting = $.extend(defaults, setting); 
        this.each(function(){ 
            var $this = $(this);
            //插件实现代码 
            if(setting.id == null ){
                alert("showWindow插件必须填入一个name参数，且必须是ID!");
                return;    
            }        
            var box = "#"+setting.id;
            var speed = setting.speed;
            var $loginBox = $(box),
                $maskBox = $loginBox.find(".maskBox"),
                $conBox = $loginBox.find(".setWindowBox");
            
            var clickFun = function($thisbtn){
                $thisbtn.parent().fadeOut(speed,function(){
                    $thisbtn.off("click");
                    $maskBox.css({"display":"none"});
                    $loginBox.css({"display":"none"});
                });
            };
            
            // $this.click(function(){
            $this.off("click.clickStartMask").on("click.clickStartMask",function(){

                $maskBox.css({"display":"block"});
                $conBox.css({"display":"block"});
                $loginBox.css({"display":"block"});

                if(setting.center == true){
                    $conBox.center();
                }
                $conBox.fadeIn(speed).find(".close").off("click.maskBtn").on("click.maskBtn",function(){
                    clickFun($(this));
                    if(setting.callback != null){
                        setting.callback("no");
                    }
                    typeof setting.cancel=='function'&&setting.cancel.call();
                });
                $conBox.find(".yes").off("click.maskBtn").on("click.maskBtn",function(){
                    clickFun($(this));
                    if(setting.callback != null){
                        setting.callback("yes");
                    }
                });
                if(setting.cb != null){
                    setting.cb();
                }
            });
        });
    }
})(jQuery);
/**

html:

鼠标按下去时：drag-mousedown

HTML：

<ul id="pageListUl">
    <li class="active">
        <div class="dragdiv">第一页</div>
    </li>
    <li>
        <div class="dragdiv">第二页</div>
    </li>
    <li>
        <div class="dragdiv">第三页</div>
    </li>
    <li>
        <div class="dragdiv">第四页</div>
    </li>
</ul>

CSS：

//拖动
.zIndexMax{ z-index:9999;}
.drag-mousedown .dragdiv{ opacity:0;}
.drag-mousedown:after{ content:'+'; font-size:24px; text-shadow:none; color:#999; display:block; border:1px dashed #999; margin:-1px; font-weight:bolder;}
.drag-sapn{ opacity:.7; visibility:visible; z-index:100;}

//UL LI 下面的span 要是 absolute 定位的
ul{ position:relative; width:125px; margin:10px;}
ul li{ position:relative; width:100%; height:40px; margin-bottom:10px; text-align:center; line-height:40px; color:#000; text-shadow: 0 1px 2px rgba(0,0,0,0.2); cursor:pointer; transition:0.2s;}
ul li .dragdiv{ display:block; width:100%; height:100%; position:absolute; top:0; left:0; background:#999; color:#FFF;}
ul li.active .dragdiv{background:#1c1c1c; color:#FFF;}

使用方法：

$("ul对象ID").dragListMt({callback:回调函数名称,liheight:li标签的高度}); //回调函数名称不加括号，值返回给回调函数 带参数 start_index,end_index

*/

;(function($){ 
    $.fn.dragListMt = function(setting){ 
        var defaults = { 
            callback : null, // 默认回调函数为空 ，返回start_index ,end_index
            liheight : 50 , // li的拖动距离
            xfloat : 0 , // 左右浮动10px
            yfloat : 10 //默认拖动20个像素才开始克隆移动
        } 
        //如果setting为空，就取default的值
        var setting = $.extend(defaults, setting); 
        this.each(function(){ 
        //插件实现代码 
            var $this_obj = $(this);
            var li_len = $this_obj.find("li").length;
            //位置
            var seat = {
                x_down : null,
                y_down : null,
                x_move : null,
                y_move : null,
                x_end : null,
                y_end : null,
                index : null,
                start_className : null
            };
            
            //重置class
            var reSetClass = function(index,len,y,y0){
                var $li = $this_obj.find("li");
                var move_num = parseInt((y - y0)/setting.liheight);
                //console.log(move_num);
                if(index + move_num <= 0){
                    $li.removeClass("drag-mousedown");
                    $li.first().addClass("drag-mousedown");
                    return ;    
                }
                if( (index + move_num) >= $li.length ){
                    $li.removeClass("drag-mousedown");
                    $li.last().addClass("drag-mousedown");
                    return ;
                }
                else {
                    $li.removeClass("drag-mousedown");
                    $li.eq(index + move_num).addClass("drag-mousedown");
                }
            };
            
            //交换数据
            var changeDiv = function(start_index , end_index , $dragMousedown){
                var $li = $this_obj.find("li");
                var div = null;
                $li.removeClass("drag-mousedown");
                //数据交换
                div = $li.eq(start_index).html();
                //$li.eq(start_index).html($li.eq(end_index).html());
                if(start_index != end_index){
                    $li.eq(start_index).remove();
                }
                //$li.eq(end_index).html(div);
                //console.log("开始：",start_index);
                //console.log("结束：",end_index);
                
                //如果往上移动
                if(start_index > end_index){
                    $li.eq(end_index).before("<li>"+div+"</li>");
                }
                //如果往下移动
                else if(start_index < end_index){
                    $li.eq(end_index).after("<li>"+div+"</li>");    
                }
                //如果移动相同位置，不用交互
                else{
                    //$li.eq(end_index).html("<li>"+div+"</li>");    
                }
                var $dragSpan = $this_obj.find(".drag-span");
                
                //交互数据后，相对位移会发生变化，让其还原回去
                var topLen = $dragSpan.position().top;
                $dragSpan.css({top:topLen + (start_index - end_index)*setting.liheight});
                $dragSpan.animate({
                    top:0,
                    left:0
                },function(){
                    $dragSpan.remove();//删掉克隆
                    //$dragMousedown.removeClass("drag-mousedown");//去掉拖动样式
                    //class 交换
                    $li = $this_obj.find("li");
                    $li.eq(end_index).attr("class",seat.start_className);
                });
                
                if(setting.callback != null){
                       setting.callback(start_index,end_index);//运行完后设置回调函数
                }
            };
            
            //clone 拖拽元素
            var cloneDragSpan = function($span,$this){
                $this.addClass("zIndexMax");
                $this.addClass("drag-mousedown");
                $this.append($span.clone().addClass("drag-span"));
                $dragSpan = $this.find(".drag-span").css({
                    "visibility" : "visible",
                    "opacity" : 0.7,
                    "z-index" : 10
                });    
            };
            
            //事件委托 动态绑定
            $this_obj.on("mousedown.drag",".dragdiv",function(e){
                //alert($(this).html());
                //如果动态绑定li标签
                //var $this = $(this);
                //var $span = $this.find("span");
                //如果动态绑定span标签
                //鼠标右键不支持拖动
                if(3 == e.which){
                    return false;
                }
                
                var $span = $(this);
                var $this = $span.parent();
                var cloneMark = 1; //1表示要克隆 cloneDragSpan($span,$this);
                //clone 元素
                
                //获取当前坐标
                seat.y_down = e.pageY;
                seat.x_down = e.pageX;
                seat.index = $this.index();
                
                //获取start_className
                seat.start_className = $this.attr("class");
                $this.removeClass();
                
                //鼠标移动事件
                $(document).on("mousemove.drag",function(e){
                    //y
                    seat.y_move = e.pageY;
                    
                    //x 移动区间在 |xfloat| 之间
                    seat.x_move=e.pageX -seat.x_down;
                    if(seat.x_move >= setting.xfloat){
                        seat.x_move = setting.xfloat;
                    }
                    if(seat.x_move <= -setting.xfloat){
                        seat.x_move = -setting.xfloat;    
                    }
                    
                    //开始clone
                    if( (seat.y_move - seat.y_down) >= setting.yfloat || (seat.y_move - seat.y_down) <= -setting.yfloat){
                            //clone一次
                            if(cloneMark == 1){
                                cloneDragSpan($span,$this);
                                cloneMark = 0;
                            }
                        
                            //移动clone元素
                            $dragSpan.css({
                                top: seat.y_move - seat.y_down,
                                left: seat.x_move
                            });
                            
                            //重置class drag-mousedown，传入 当前的 index/len/y/y0
                            reSetClass(seat.index,li_len,seat.y_move,seat.y_down);
                    }
                    
                }).on("mouseup.drag",function(e){
                    $(this).off("mousemove.drag mouseup.drag");//去掉mousemove mouseup事件
                    
                    //如果clone了span，进行了拖动
                    if(cloneMark == 0){
                        var $dragMousedown = $this_obj.find(".drag-mousedown");
                        var index = $dragMousedown.index();//获取当前的index

                        $this_obj.find("li").removeClass("zIndexMax");
                        //交互数据start_index , end_index
                        changeDiv(seat.index,index,$dragMousedown);
                        cloneMark = 1;
                    }
                });
                
            });//end mousedown
            
        });
    }
})(jQuery); 


/**
*    自定义 滑动 条 ($this,slider_callback,input_callback)
CSS:
.s-slider{ width:215px; display: inline-block; margin-left:8px;
           -webkit-touch-callout: none;
           -webkit-user-select: none;
           -khtml-user-select: none;
           -moz-user-select: none;
           -ms-user-select: none;
           user-select: none;}
.s-slider span.s-slider-tips{ font-size:18px; color:#ee6356; display:inline-block; margin-bottom:12px;}
.s-slider span.s-slider-tips i{ font-style:normal;}
.s-slider .s-sliderBar{ width:100%; height:5px; position:relative; background:#cccccc; border-radius:5px; background: #333;  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.4);}
.s-slider .s-sliderBar em.s-slider-bar{ display:block; height:100%; background:#999; border-radius:5px;}
.s-slider .s-sliderBar i.s-ico-slider{ cursor:pointer; position:absolute; top:-4px; margin-left:-10px; z-index:10; height: 12px;  width: 30px;  background: #f1f1f1;  display: block;  border-radius: 50px; text-decoration: none;  background: #f5f5f5;  background: linear-gradient(#f5f5f5 0%, #cccccc 100%);  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.35), 0 0 2px 1px rgba(0, 0, 0, 0.15), 0 3px 3px rgba(0, 0, 0, 0.2), 0 7px 5px rgba(0, 0, 0, 0.1), 0 11px 10px rgba(0, 0, 0, 0.1);}
.s-slider .s-sliderBar i.s-ico-slider::before,
.s-slider .s-sliderBar i.s-ico-slider::after {  content: " ";  width: 2px;  height: 40%;  position: absolute;  background: transparent;  border-radius: 0px;  box-shadow: -1px 0px 0px rgba(255, 255, 255, 0.8), 1px 0px 0px rgba(255, 255, 255, 0.8), 2px 0 0 rgba(0, 0, 0, 0.3), 1px 0 0 rgba(0, 0, 0, 0.3) inset;}
.s-slider .s-sliderBar i.s-ico-slider::before {  left: 10px;  top: 30%;}
.s-slider .s-sliderBar i.s-ico-slider::after {  right: 12px;  top: 30%;}
.ms-pageSlider .slider-input{width: 35px; height: 22px; box-shadow: inset 1px 2px 1px rgba(0, 0, 0, 0.1); margin-left: 12px; line-height: 22px; border-radius: 2px; border: none; display: inline-block; vertical-align: middle; text-align: center; -webkit-user-select: none;}

HTML:
<div class="ms-pageSlider">
    <h5>缩放比例：</h5>
    <div class="s-slider" id="zoom_pageSlider" data="minData:1,maxData:200,iniData:100">
        <div class="s-sliderBar">
            <em class="s-slider-bar"></em>
            <i class="s-ico-slider"></i>
        </div>
    </div>
    <input class="slider-input" type="text" value="100">
    <span class="unit">%</span>
</div>
*
*
*/
;(function($){ 
    $.fn.sliderMt = function(setting){ 
        var defaults = { 
            slider_callback : null, //默认回调函数为空
            input_callback : null, //默认回调函数为空
            iniData : 0 //默认参数 默认是0
        } 
        //如果setting为空，就取default的值
        var setting = $.extend(defaults, setting); 
        this.each(function(){ 
            //插件实现代码 
            var $this = $(this);
            var _obj = {
                //$tips : $this.find("span.s-slider-tips"),
                $bar : $this.find("em.s-slider-bar"),
                $btn : $this.find("i.s-ico-slider"),
                data : null,//返回是 maxData:xx,minData:xx,iniData:xx
                width : null,//slider的宽
                value : null, //区间的值
                padding : 5, //滑块偏移
                $input : $this.next("input.slider-input")
            };
            
            _obj.width = $this.width();
            _obj.data = eval( "({" + $this.attr("data") + "})" );
            //数值转换
            _obj.data.minData = parseFloat(_obj.data.minData);
            _obj.data.maxData = parseFloat(_obj.data.maxData);
            _obj.data.iniData = setting.iniData;
            
            _obj.value = _obj.data.maxData - _obj.data.minData;

            //初始化参数
            var iniSliderEmPosition = function(){
                var width = ((_obj.data.iniData - _obj.data.minData)/_obj.value)*_obj.width;
                _obj.$bar.width(width);
                _obj.$btn.css("left" , width - _obj.padding);
                //_obj.$tips.html("<i class='minData'>" + _obj.data.minData + "</i> - <i class='endData'>" + _obj.data.iniData + "</i>");
            };iniSliderEmPosition();
            
            //输入框内容变化时
            _obj.$input.off("change").on("change",function(){
                var val = $(this).val();
                if(val < _obj.data.minData || val > _obj.data.maxData){
                    return;    
                };
                var moveWidth = ( val - _obj.data.minData )/(_obj.data.maxData - _obj.data.minData)*_obj.width;
                _obj.$btn.css({
                    "left" : moveWidth
                });
                _obj.$bar.width( moveWidth + _obj.padding);
                if(setting.input_callback != null){
                    setting.input_callback(val);
                }
            });
            
            //点击事件
            _obj.$btn.off("mousedown").on("mousedown",function(e){
                var ev = {
                    x_start : null,
                    x_move : null,
                    x_end : null,
                    left_start : null,
                    moveWidth :　null
                };
                
                var pData = null ;
                var mData = null ;
                    
                ev.x_start = e.pageX;
                ev.left_start = _obj.$btn.position().left;
                $(document).on("mousemove.sevenSlider",function(e){
                    ev.x_move = e.pageX - ev.x_start;
                    ev.moveWidth = ev.x_move + ev.left_start;
                    //console.log(ev.moveWidth);
                    if( ev.moveWidth >= - _obj.padding && ev.moveWidth <= _obj.width - _obj.padding){
                        _obj.$btn.css({
                            "left" : ev.moveWidth
                        });
                        _obj.$bar.width( ev.moveWidth + _obj.padding);
                    }
                    
                    //设置 input 的值
                    pData = ((_obj.$btn.position().left + _obj.padding)/_obj.width).toFixed(2);
                    mData = parseFloat(((_obj.data.maxData - _obj.data.minData)*pData).toFixed(0)) + _obj.data.minData;
                    //_obj.$tips.html( "<i class='minData'>" + _obj.data.minData + "</i> - <i class='endData'>" + mData + "</i>");
                    _obj.$input.val(mData);
                    if(setting.slider_callback != null){
                        setting.slider_callback(mData);
                    }
//                    pData = null ;
//                    mData = null ;
                    
                }).on("mouseup.sevenSlider",function(e){
                    $(document).off("mousemove.sevenSlider mouseup.sevenSlider");
                    
                });
            });
        });
    }
})(jQuery);

/**
*    var rotation = $('img').rotationDegrees();
*    返回transform:rotate 的值
*/
;(function ($) {
     $.fn.rotationDegrees = function () {
     var matrix = this.css("-webkit-transform") ||
     this.css("-moz-transform") ||
     this.css("-ms-transform")  ||
     this.css("-o-transform")  ||
     this.css("transform");
     if(typeof matrix === 'string' && matrix !== 'none') {
      var values = matrix.split('(')[1].split(')')[0].split(',');
      var a = values[0];
      var b = values[1];
      var angle = a;
      var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
     } else { var angle = 0; }
     return angle;
     };
}(jQuery));

// 2010-03-12 v1.0.0
//十六进制颜色值域RGB格式颜色值之间的相互转换
//-------------------------------------
//十六进制颜色值的正则表达式
/*RGB颜色转换为16进制*/
String.prototype.colorHex = function(){
    var that = this;
    if(that.indexOf("rgb") != -1 || that.indexOf("RGB") != -1){
        var rgb = that.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);  
        if(rgb != null){
            function hex(x){  
                return ("0"+parseInt(x).toString(16)).slice(-2);  
            }  
            rgb="#"+hex(rgb[1])+hex(rgb[2])+hex(rgb[3]); 
        }else{
            rgb = "none";    
        }
        return rgb;    

    }else{
        return that;    
    }
};

//-------------------------------------------------

/*16进制颜色转为RGB格式*/
String.prototype.colorRgb = function(){
    var sColor = this.toLowerCase();
    if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
            var sColorNew = "#";
            for(var i=1; i<4; i+=1){
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));    
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
        }
        return "RGB(" + sColorChange.join(",") + ")";
    }else{
        return sColor;    
    }
};

/**
*    自定义下拉框
*    obj.donwSelectMt();
*/
;(function($){ 
    $.fn.donwSelectMt = function(setting){ 
        var defaults = { 
            delay : 0, //展开速度
            callback : function(data){} //回调函数
        } 
        //如果setting为空，就取default的值
        var setting = $.extend(defaults, setting); 
        this.each(function(){ 
            var $thisObj = $(this);
            var sel = {
                spanId : null,
                $this : null,
                $ul : null,
                height : null,
                delay : setting.delay //单位毫秒    
            };
            
            //初始化高度
            var iniHeight = function(){
                //console.log($thisObj.find("ul").height());
                //$thisObj.data("height",$thisObj.find("ul").height());
            };
            
            //select展开
            var openSelect = function(sel){
                sel.$this.css("z-index",9999);
                sel.$ul.css({
                    "display":"block"
                });
            };
            
            //select关闭
            var closeSelect = function(sel){
                $(document).off('click.'+sel.spanId);
                sel.$ul.css({
                    "display":"none"
                });    
                sel.$this.removeAttr("style");
            };
            
            var bindEvent = function(){
                //自定义select框
                    var $this = $thisObj.find("span");
                    
                    //如果span里面的内容为空，初始placeholder参数
                    if($this.html() == ""){
                        $this.html($this.attr("placeholder"));    
                    }
                    
                    //绑定点击事件
                    $this.off("click.bindEvent").on("click.bindEvent",function(){
                        sel.$this = $this.parent();
                        sel.spanId = $this.attr("id");
                        sel.$ul = sel.$this.find("ul");
                        sel.height = sel.$this.data("height");
                        
                        //如果隐藏才显示
                        if(sel.$ul.is(":hidden")){
                            openSelect(sel);    
                            
                            //动态绑定
                            sel.$ul.off("click.bindEventUl").on("click.bindEventUl","li",function(){
                                $this.html($(this).html());
                                $this.attr("data",$(this).attr("data"));
                                setting.callback($(this).attr("data"));
                                closeSelect(sel);
                            });
                        }
                        else{
                            closeSelect(sel);    
                        }
                        
                        //点击span区域外的区域 - 缩回菜单
                        $(document).off('click.'+sel.spanId).on('click.'+sel.spanId,function(e){
                            var e = e || window.event; //浏览器兼容性
                            var elem = e.target || e.srcElement;
                            //console.log("====",elem.id);
                            if(elem.id == sel.spanId){
                                return;
                            }
                            closeSelect(sel);
                        });
                        
                    });    //end click

            };
            
            iniHeight();
            bindEvent();
        
        });
    }
})(jQuery); 

//*******************************************
//拖拽插件
;(function($){ 
    $.fn.dragMt = function(setting){ 
        var defaults = { 
            //drag_callback : null//默认回调函数为空
            dragParent : false //拖拽父元素
        } 
        //如果setting为空，就取default的值
        var setting = $.extend(defaults, setting); 
        this.each(function(){ 
            //插件实现代码 
            var $this = $(this);
            
            //点击事件
            $this.on("mousedown",function(e){
                var ev = {
                    x_start : null,
                    y_start : null,
                    x_move : null,
                    y_move : null,
                    x_end : null,
                    y_end : null,
                    left : null,
                    top :　null
                };
                
                if(setting.dragParent == true){
                    var $drag = $this.parent();
                }else{
                    var $drag = $this;    
                }
                    
                ev.x_start = e.pageX;
                ev.y_start = e.pageY;
                ev.left = $drag.position().left + $drag.parent().get(0).scrollLeft;
                ev.top = $drag.position().top + $drag.parent().get(0).scrollTop;
                
                $(document).on("mousemove.dragMt",function(e){
                    ev.x_move = e.pageX - ev.x_start + ev.left;
                    ev.y_move = e.pageY - ev.y_start + ev.top;
                    if(ev.y_move < 0){
                        ev.y_move = 0;    
                    }
                    if(ev.x_move < 0){
                        ev.x_move = 0;    
                    }
                    $drag.css({
                        "left" : ev.x_move,
                        "top" : ev.y_move
                    });
                }).on("mouseup.dragMt",function(e){
                    $(document).off("mousemove.dragMt mouseup.dragMt");
                });
            });
        });
    }
})(jQuery);

/*
 * zyFile.js 基于HTML5 文件上传的核心脚本 http://www.czlqibu.com
 * by zhangyan 2014-06-21   
*/

var ZYFILE = {
        fileInput : null,             // 选择文件按钮dom对象
        uploadInput : null,           // 上传文件按钮dom对象
        dragDrop: null,                  //拖拽敏感区域
        url : "",                        // 上传action路径
        uploadFile : [],                // 需要上传的文件数组
        lastUploadFile : [],          // 上一次选择的文件数组，方便继续上传使用
        perUploadFile : [],           // 存放永久的文件数组，方便删除使用
        fileNum : 0,                  // 代表文件总个数，因为涉及到继续添加，所以下一次添加需要在它的基础上添加索引
        /* 提供给外部的接口 */
        filterFile : function(files){ // 提供给外部的过滤文件格式等的接口，外部需要把过滤后的文件返回
            return files;
        },
        onSelect : function(selectFile, files){      // 提供给外部获取选中的文件，供外部实现预览等功能  selectFile:当前选中的文件  allFiles:还没上传的全部文件
            
        },
        onDelete : function(file, files){            // 提供给外部获取删除的单个文件，供外部实现删除效果  file:当前删除的文件  files:删除之后的文件
            
        },
        onProgress : function(file, loaded, total){  // 提供给外部获取单个文件的上传进度，供外部实现上传进度效果
            
        },
        onSuccess : function(file, responseInfo){    // 提供给外部获取单个文件上传成功，供外部实现成功效果
            
        },
        onFailure : function(file, responseInfo){    // 提供给外部获取单个文件上传失败，供外部实现失败效果
        
        },
        onComplete : function(responseInfo){         // 提供给外部获取全部文件上传完成，供外部实现完成效果
            
        },
        
        /* 内部实现功能方法 */
        // 获得选中的文件
        //文件拖放
        funDragHover: function(e) {
            e.stopPropagation();
            e.preventDefault();
            this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
            return this;
        },
        // 获取文件
        funGetFiles : function(e){  
            var self = this;
            // 取消鼠标经过样式
            this.funDragHover(e);
            // 从事件中获取选中的所有文件
            var files = e.target.files || e.dataTransfer.files;
            self.lastUploadFile = this.uploadFile;
            this.uploadFile = this.uploadFile.concat(this.filterFile(files));
            var tmpFiles = [];
            
            // 因为jquery的inArray方法无法对object数组进行判断是否存在于，所以只能提取名称进行判断
            var lArr = [];  // 之前文件的名称数组
            var uArr = [];  // 现在文件的名称数组
            $.each(self.lastUploadFile, function(k, v){
                lArr.push(v.name);
            });
            $.each(self.uploadFile, function(k, v){
                uArr.push(v.name);
            });
            
            $.each(uArr, function(k, v){
                // 获得当前选择的每一个文件   判断当前这一个文件是否存在于之前的文件当中
                if($.inArray(v, lArr) < 0){  // 不存在
                    tmpFiles.push(self.uploadFile[k]);
                }
            });
            
            // 如果tmpFiles进行过过滤上一次选择的文件的操作，需要把过滤后的文件赋值
            //if(tmpFiles.length!=0){
                this.uploadFile = tmpFiles;
            //}
            
            // 调用对文件处理的方法
            this.funDealtFiles();
            
            return true;
        },
        // 处理过滤后的文件，给每个文件设置下标
        funDealtFiles : function(){
            var self = this;
            // 目前是遍历所有的文件，给每个文件增加唯一索引值
            $.each(this.uploadFile, function(k, v){
                // 因为涉及到继续添加，所以下一次添加需要在总个数的基础上添加
                v.index = self.fileNum;
                // 添加一个之后自增
                self.fileNum++;
            });
            // 先把当前选中的文件保存备份
            var selectFile = this.uploadFile;  
            // 要把全部的文件都保存下来，因为删除所使用的下标是全局的变量
            this.perUploadFile = this.perUploadFile.concat(this.uploadFile);
            // 合并下上传的文件
            this.uploadFile = this.lastUploadFile.concat(this.uploadFile);
            
            // 执行选择回调
            this.onSelect(selectFile, this.uploadFile);
            //console.info("继续选择");
            //console.info(this.uploadFile);
            return this;
        },
        // 处理需要删除的文件  isCb代表是否回调onDelete方法  
        // 因为上传完成并不希望在页面上删除div，但是单独点击删除的时候需要删除div   所以用isCb做判断
        funDeleteFile : function(delFileIndex, isCb){
            var self = this;  // 在each中this指向没个v  所以先将this保留
            
            var tmpFile = [];  // 用来替换的文件数组
            // 合并下上传的文件
            var delFile = this.perUploadFile[delFileIndex];
            //console.info(delFile);
            // 目前是遍历所有的文件，对比每个文件  删除
            $.each(this.uploadFile, function(k, v){
                if(delFile != v){
                    // 如果不是删除的那个文件 就放到临时数组中
                    tmpFile.push(v);
                }else{
                    
                }
            });
            this.uploadFile = tmpFile;
            if(isCb){  // 执行回调
                // 回调删除方法，供外部进行删除效果的实现
                self.onDelete(delFile, this.uploadFile);
            }
            
            //console.info("还剩这些文件没有上传:");
            //console.info(this.uploadFile);
            return true;
        },
        // 上传多个文件
        funUploadFiles : function(){
            var self = this;  // 在each中this指向没个v  所以先将this保留
            // 遍历所有文件  ，在调用单个文件上传的方法
            $.each(this.uploadFile, function(k, v){
                self.funUploadFile(v);
            });
        },
        // 上传单个个文件
        funUploadFile : function(file){
            var self = this;  // 在each中this指向没个v  所以先将this保留
            var formdata = new FormData();
            formdata.append("fileList", file);                     
            var xhr = new XMLHttpRequest();
            // 绑定上传事件
            // 进度
            xhr.upload.addEventListener("progress",     function(e){
                // 回调到外部
                self.onProgress(file, e.loaded, e.total);
            }, false); 
            // 完成
            xhr.addEventListener("load", function(e){
                // 从文件中删除上传成功的文件  false是不执行onDelete回调方法
                self.funDeleteFile(file.index, false);
                // 回调到外部
                self.onSuccess(file, xhr.responseText);
                if(self.uploadFile.length==0){
                    // 回调全部完成方法
                    self.onComplete("全部完成");
                }
            }, false);  
            // 错误
            xhr.addEventListener("error", function(e){
                // 回调到外部
                self.onFailure(file, xhr.responseText);
            }, false);  
            
            xhr.open("POST",self.url, true);
            //xhr.setRequestHeader("X_FILENAME", file.name);
            xhr.setRequestHeader("X_FILENAME", ((new Date()).valueOf()));
            //console.log(((new Date()).valueOf()));
            xhr.send(formdata);
        },
        // 返回需要上传的文件
        funReturnNeedFiles : function(){
            return this.uploadFile;
        },
        
        // 初始化
        init : function(){  // 初始化方法，在此给选择、上传按钮绑定事件
            var self = this;  // 克隆一个自身
            
            if (this.dragDrop) {
                this.dragDrop.addEventListener("dragover", function(e) { self.funDragHover(e); }, false);
                this.dragDrop.addEventListener("dragleave", function(e) { self.funDragHover(e); }, false);
                this.dragDrop.addEventListener("drop", function(e) { self.funGetFiles(e); }, false);
            }
            
            // 如果选择按钮存在
            if(self.fileInput){
                // 绑定change事件
                this.fileInput.addEventListener("change", function(e) {
                    self.funGetFiles(e); 
                }, false);    
            }
            
            // 如果上传按钮存在
            if(self.uploadInput){
                // 绑定click事件
                this.uploadInput.addEventListener("click", function(e) {
                    self.funUploadFiles(e); 
                }, false);    
            }
        }
};

(function($,undefined){
    $.fn.zyUpload = function(options,param){
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == 'string') {
            var fn = this[0][options];
            if($.isFunction(fn)){
                return fn.apply(this, otherArgs);
            }else{
                throw ("zyUpload - No such method: " + options);
            }
        }

        return this.each(function(){
            var para = {};    // 保留参数
            var self = this;  // 保存组件对象
            
            var defaults = {
                    width            : "700px",                      // 宽度
                    height           : "400px",                      // 宽度
                    itemWidth        : "140px",                     // 文件项的宽度
                    itemHeight       : "120px",                     // 文件项的高度
                    url              : "",      // 上传文件的路径
                    multiple         : true,                          // 是否可以多个文件上传
                    dragDrop         : true,                          // 是否可以拖动上传文件
                    del              : true,                          // 是否可以删除文件
                    finishDel        : false,                          // 是否在上传文件完成后删除预览
                    /* 提供给外部的接口方法 */
                    onSelect         : function(selectFiles, files){},// 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    onDelete         : function(file, files){},     // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
                    onSuccess         : function(file){},            // 文件上传成功的回调方法
                    onFailure         : function(file){},            // 文件上传失败的回调方法
                    onComplete         : function(responseInfo){},    // 上传完成的回调方法
            };
            
            para = $.extend(defaults,options);
            
            this.init = function(){
                this.createHtml();  // 创建组件html
                this.createCorePlug();  // 调用核心js
            };
            
            /**
             * 功能：创建上传所使用的html
             * 参数: 无
             * 返回: 无
             */
            this.createHtml = function(){
                var multiple = "";  // 设置多选的参数
                para.multiple ? multiple = "multiple" : multiple = "";
                var html= '';
                
                if(para.dragDrop){
                    // 创建带有拖动的html
                    html += '<form id="uploadForm" action="'+para.url+'" method="post" enctype="multipart/form-data">';
                    html += '    <div class="upload_box">';
                    html += '        <div class="upload_main">';
                    html += '            <div class="upload_choose">';
                    html += '                <div class="convent_choice">';
                    html += '                    <div class="andArea">';
                    html += '                        <div class="filePicker"><i class="fa fa-cloud-upload"></i> 点击选择图片</div>';
                    html += '                        <input id="fileImage" type="file" size="30" name="fileselect[]" '+multiple+'>';
                    html += '                    </div>';
                    html += '                </div>';
                    html += '                <span id="fileDragArea" class="upload_drag_area">或者将图片拖到此处</span>';
                    html += '            </div>';
                    html += '            <div class="status_bar">';
                    html += '                <div id="status_info" class="info">选中0张图片，共0B。</div>';
                    html += '                <div class="btns">';
                    html += '                    <div class="webuploader_pick">继续选择</div>';
                    html += '                    <div class="upload_btn">开始上传</div>';
                    html += '                </div>';
                    html += '            </div>';
                    html += '            <div id="preview" class="upload_preview"></div>';
                    html += '        </div>';
                    html += '        <div class="upload_submit">';
                    html += '            <button type="button" id="fileSubmit" class="upload_submit_btn">确认上传图片</button>';
                    html += '        </div>';
                    html += '        <div id="uploadInf" class="upload_inf"></div>';
                    html += '    </div>';
                    html += '</form>';
                }else{
                    var imgWidth = parseInt(para.itemWidth.replace("px", ""))-15;
                    
                    // 创建不带有拖动的html
                    html += '<form id="uploadForm" action="'+para.url+'" method="post" enctype="multipart/form-data">';
                    html += '    <div class="upload_box">';
                    html += '        <div class="upload_main single_main">';
                    html += '            <div class="status_bar">';
                    html += '                <div id="status_info" class="info">选中0张图片，共0B。</div>';
                    html += '                <div class="btns">';
                    html += '                    <input id="fileImage" type="file" size="30" name="fileselect[]" '+multiple+'>';
                    html += '                    <div class="webuploader_pick">选择图片</div>';
                    html += '                    <div class="upload_btn">开始上传</div>';
                    html += '                </div>';
                    html += '            </div>';
                    html += '            <div id="preview" class="upload_preview">';
                    html += '                <div class="add_upload">';
                    html += '                    <a style="height:'+para.itemHeight+';width:'+para.itemWidth+';" title="点击添加图片" id="rapidAddImg" class="add_imgBox" href="javascript:void(0)">';
                    html += '                        <div class="uploadImg" style="width:'+imgWidth+'px">';
                    html += '                            <img class="upload_image" src="control/images/add_img.png" style="width:expression(this.width > '+imgWidth+' ? '+imgWidth+'px : this.width)" />';
                    html += '                        </div>';
                    html += '                    </a>';
                    html += '                </div>';
                    html += '            </div>';
                    html += '        </div>';
                    html += '        <div class="upload_submit">';
                    html += '            <button type="button" id="fileSubmit" class="upload_submit_btn">确认上传图片</button>';
                    html += '        </div>';
                    html += '        <div id="uploadInf" class="upload_inf"></div>';
                    html += '    </div>';
                    html += '</form>';
                }
                
                $(self).append(html).css({"width":para.width,"height":para.height});
                
                // 初始化html之后绑定按钮的点击事件
                this.addEvent();
            };
            
            /**
             * 功能：显示统计信息和绑定继续上传和上传按钮的点击事件
             * 参数: 无
             * 返回: 无
             */
            this.funSetStatusInfo = function(files){
                var size = 0;
                var num = files.length;
                $.each(files, function(k,v){
                    // 计算得到文件总大小
                    size += v.size;
                });
                
                // 转化为kb和MB格式。文件的名字、大小、类型都是可以现实出来。
                if (size > 1024 * 1024) {                    
                    size = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';                
                } else {                    
                    size = (Math.round(size * 100 / 1024) / 100).toString() + 'KB';                
                }  
                
                // 设置内容
                $("#status_info").html("选中"+num+"张文件，共"+size+"。");
            };
            
            /**
             * 功能：过滤上传的文件格式等
             * 参数: files 本次选择的文件
             * 返回: 通过的文件
             */
            this.funFilterEligibleFile = function(files){
                var arrFiles = [];  // 替换的文件数组
                for (var i = 0, file; file = files[i]; i++) {
                    if (file.size >= 51200000) {
                        alert('您这个"'+ file.name +'"文件大小过大');    
                    } else {
                        // 在这里需要判断当前所有文件中
                        arrFiles.push(file);    
                    }
                }
                return arrFiles;
            };
            
            /**
             * 功能： 处理参数和格式上的预览html
             * 参数: files 本次选择的文件
             * 返回: 预览的html
             */
            this.funDisposePreviewHtml = function(file, e){
                var html = "";
                var imgWidth = parseInt(para.itemWidth.replace("px", ""))-15;
                
                // 处理配置参数删除按钮
                var delHtml = "";
                if(para.del){  // 显示删除按钮
                    delHtml = '<span class="file_del" data-index="'+file.index+'" title="删除"></span>';
                }
                
                // 处理不同类型文件代表的图标
                var fileImgSrc = "control/images/fileType/";
                if(file.type.indexOf("rar") > 0){
                    fileImgSrc = fileImgSrc + "rar.png";
                }else if(file.type.indexOf("zip") > 0){
                    fileImgSrc = fileImgSrc + "zip.png";
                }else if(file.type.indexOf("text") > 0){
                    fileImgSrc = fileImgSrc + "txt.png";
                }else{
                    fileImgSrc = fileImgSrc + "file.png";
                }
                
                
                // 图片上传的是图片还是其他类型文件
                if (file.type.indexOf("image") == 0) {
                    html += '<div id="uploadList_'+ file.index +'" class="upload_append_list">';
                    html += '    <div class="file_bar">';
                    html += '        <div style="padding:5px;">';
                    html += '            <p class="file_name">' + file.name + '</p>';
                    html += delHtml;   // 删除按钮的html
                    html += '        </div>';
                    html += '    </div>';
                    html += '    <a style="height:'+para.itemHeight+';width:'+para.itemWidth+';" href="#" class="imgBox">';
                    html += '        <div class="uploadImg" style="width:'+imgWidth+'px">';                
                    html += '            <img id="uploadImage_'+file.index+'" class="upload_image" src="' + e.target.result + '" style="width:expression(this.width > '+imgWidth+' ? '+imgWidth+'px : this.width)" />';                                                                 
                    html += '        </div>';
                    html += '    </a>';
                    html += '    <p id="uploadProgress_'+file.index+'" class="file_progress"></p>';
                    html += '    <p id="uploadFailure_'+file.index+'" class="file_failure">上传失败，请重试</p>';
                    html += '    <p id="uploadSuccess_'+file.index+'" class="file_success"></p>';
                    html += '</div>';
                    
                }else{
                    html += '<div id="uploadList_'+ file.index +'" class="upload_append_list">';
                    html += '    <div class="file_bar">';
                    html += '        <div style="padding:5px;">';
                    html += '            <p class="file_name">' + file.name + '</p>';
                    html += delHtml;   // 删除按钮的html
                    html += '        </div>';
                    html += '    </div>';
                    html += '    <a style="height:'+para.itemHeight+';width:'+para.itemWidth+';" href="#" class="imgBox">';
                    html += '        <div class="uploadImg" style="width:'+imgWidth+'px">';                
                    html += '            <img id="uploadImage_'+file.index+'" class="upload_image" src="' + fileImgSrc + '" style="width:expression(this.width > '+imgWidth+' ? '+imgWidth+'px : this.width)" />';                                                                 
                    html += '        </div>';
                    html += '    </a>';
                    html += '    <p id="uploadProgress_'+file.index+'" class="file_progress"></p>';
                    html += '    <p id="uploadFailure_'+file.index+'" class="file_failure">上传失败，请重试</p>';
                    html += '    <p id="uploadSuccess_'+file.index+'" class="file_success"></p>';
                    html += '</div>';
                }
                
                return html;
            };
            
            /**
             * 功能：调用核心插件
             * 参数: 无
             * 返回: 无
             */
            this.createCorePlug = function(){
                var params = {
                    fileInput: $("#fileImage").get(0),
                    uploadInput: $("#fileSubmit").get(0),
                    dragDrop: $("#fileDragArea").get(0),
                    url: $("#uploadForm").attr("action"),
                    
                    filterFile: function(files) {
                        // 过滤合格的文件
                        return self.funFilterEligibleFile(files);
                    },
                    onSelect: function(selectFiles, allFiles) {
                        para.onSelect(selectFiles, allFiles);  // 回调方法
                        self.funSetStatusInfo(ZYFILE.funReturnNeedFiles());  // 显示统计信息
                        var html = '', i = 0;
                        // 组织预览html
                        var funDealtPreviewHtml = function() {
                            file = selectFiles[i];
                            if (file) {
                                var reader = new FileReader()
                                reader.onload = function(e) {
                                    // 处理下配置参数和格式的html
                                    html += self.funDisposePreviewHtml(file, e);
                                    
                                    i++;
                                    // 再接着调用此方法递归组成可以预览的html
                                    funDealtPreviewHtml();
                                }
                                reader.readAsDataURL(file);
                            } else {
                                // 走到这里说明文件html已经组织完毕，要把html添加到预览区
                                funAppendPreviewHtml(html);
                            }
                        };
                        
                        // 添加预览html
                        var funAppendPreviewHtml = function(html){
                            // 添加到添加按钮前
                            if(para.dragDrop){
                                $("#preview").append(html);
                            }else{
                                $(".add_upload").before(html);
                            }
                            // 绑定删除按钮
                            funBindDelEvent();
                            funBindHoverEvent();
                        };
                        
                        // 绑定删除按钮事件
                        var funBindDelEvent = function(){
                            if($(".file_del").length>0){
                                // 删除方法
                                $(".file_del").click(function() {
                                    ZYFILE.funDeleteFile(parseInt($(this).attr("data-index")), true);
                                    return false;
                                });
                            }
                            
                            if($(".file_edit").length>0){
                                // 编辑方法
                                $(".file_edit").click(function() {
                                    // 调用编辑操作
                                    //ZYFILE.funEditFile(parseInt($(this).attr("data-index")), true);
                                    return false;    
                                });
                            }
                        };
                        
                        // 绑定显示操作栏事件
                        var funBindHoverEvent = function(){
                            $(".upload_append_list").hover(
                                function (e) {
                                    $(this).find(".file_bar").addClass("file_hover");
                                },function (e) {
                                    $(this).find(".file_bar").removeClass("file_hover");
                                }
                            );
                        };
                        
                        funDealtPreviewHtml();        
                    },
                    onDelete: function(file, files) {
                        // 移除效果
                        $("#uploadList_" + file.index).fadeOut();
                        // 重新设置统计栏信息
                        self.funSetStatusInfo(files);
                        //console.info("剩下的文件");
                        //console.info(files);
                        para.onDelete(file, files);  // 回调方法
                    },
                    onProgress: function(file, loaded, total) {
                        var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
                        if(eleProgress.is(":hidden")){
                            eleProgress.show();
                        }
                        eleProgress.css("width",percent);
                    },
                    onSuccess: function(file, response) {
                        $("#uploadProgress_" + file.index).hide();
                        $("#uploadSuccess_" + file.index).show();
                        //$("#uploadInf").append("<p>上传成功，文件地址是：" + response + "</p>");
                        // 根据配置参数确定隐不隐藏上传成功的文件
                        if(para.finishDel){
                            // 移除效果
                            $("#uploadList_" + file.index).fadeOut();
                            // 重新设置统计栏信息
                            self.funSetStatusInfo(ZYFILE.funReturnNeedFiles());
                        };
                        para.onSuccess(file,response);// 回调方法
                    },
                    onFailure: function(file) {
                        $("#uploadProgress_" + file.index).hide();
                        $("#uploadSuccess_" + file.index).show();
                        $("#uploadInf").append("<p>文件" + file.name + "上传失败！</p>");    
                        //$("#uploadImage_" + file.index).css("opacity", 0.2);
                        para.onFailure(file);
                    },
                    onComplete: function(response){
                        //console.info(response);
                        para.onComplete(response); // 回调方法
                    },
                    onDragOver: function() {
                        $(this).addClass("upload_drag_hover");
                    },
                    onDragLeave: function() {
                        $(this).removeClass("upload_drag_hover");
                    }

                };
                
                ZYFILE = $.extend(ZYFILE, params);
                ZYFILE.init();
            };
            
            /**
             * 功能：绑定事件
             * 参数: 无
             * 返回: 无
             */
            this.addEvent = function(){
                // 如果快捷添加文件按钮存在
                if($(".filePicker").length > 0){
                    // 绑定选择事件
                    $(".filePicker").bind("click", function(e){
                        $("#fileImage").click();
                    });
                }
                
                // 绑定继续添加点击事件
                $(".webuploader_pick").bind("click", function(e){
                    $("#fileImage").click();
                });
                
                // 绑定上传点击事件
                $(".upload_btn").bind("click", function(e){
                    // 判断当前是否有文件需要上传
                    if(ZYFILE.funReturnNeedFiles().length > 0){
                        $("#fileSubmit").click();
                    }else{
                        alert("请先选中文件再点击上传");
                    }
                });
                
                // 如果快捷添加文件按钮存在
                if($("#rapidAddImg").length > 0){
                    // 绑定添加点击事件
                    $("#rapidAddImg").bind("click", function(e){
                        $("#fileImage").click();
                    });
                }
            };
            
            
            // 初始化上传控制层插件
            this.init();
        });
    };
})(jQuery);


/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

/**
 * 将指定区域HTML保存为 图片
 */
/*
 html2canvas 0.4.1 <http://html2canvas.hertzen.com>
 Copyright (c) 2013 Niklas von Hertzen

 Released under MIT License

 html2canvas($(".test")[0], {  
  allowTaint: true,  
  taintTest: false,  
  onrendered: function(canvas) {  
      canvas.id = "mycanvas";
      //生成base64图片数据  
      var dataUrl = canvas.toDataURL();  
      var newImg = document.createElement("img");  
      newImg.src =  dataUrl;  
      document.body.appendChild(newImg);  
  }  
 */

(function(window, document, undefined){

    "use strict";

    var _html2canvas = {},
        previousElement,
        computedCSS,
        html2canvas;

    _html2canvas.Util = {};

    _html2canvas.Util.log = function(a) {
        if (_html2canvas.logging && window.console && window.console.log) {
            window.console.log(a);
        }
    };

    _html2canvas.Util.trimText = (function(isNative){
        return function(input) {
            return isNative ? isNative.apply(input) : ((input || '') + '').replace( /^\s+|\s+$/g , '' );
        };
    })(String.prototype.trim);

    _html2canvas.Util.asFloat = function(v) {
        return parseFloat(v);
    };

    (function() {
        // TODO: support all possible length values
        var TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
        var TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
        _html2canvas.Util.parseTextShadows = function (value) {
            if (!value || value === 'none') {
                return [];
            }

            // find multiple shadow declarations
            var shadows = value.match(TEXT_SHADOW_PROPERTY),
                results = [];
            for (var i = 0; shadows && (i < shadows.length); i++) {
                var s = shadows[i].match(TEXT_SHADOW_VALUES);
                results.push({
                    color: s[0],
                    offsetX: s[1] ? s[1].replace('px', '') : 0,
                    offsetY: s[2] ? s[2].replace('px', '') : 0,
                    blur: s[3] ? s[3].replace('px', '') : 0
                });
            }
            return results;
        };
    })();


    _html2canvas.Util.parseBackgroundImage = function (value) {
        var whitespace = ' \r\n\t',
            method, definition, prefix, prefix_i, block, results = [],
            c, mode = 0, numParen = 0, quote, args;

        var appendResult = function(){
            if(method) {
                if(definition.substr( 0, 1 ) === '"') {
                    definition = definition.substr( 1, definition.length - 2 );
                }
                if(definition) {
                    args.push(definition);
                }
                if(method.substr( 0, 1 ) === '-' &&
                    (prefix_i = method.indexOf( '-', 1 ) + 1) > 0) {
                    prefix = method.substr( 0, prefix_i);
                    method = method.substr( prefix_i );
                }
                results.push({
                    prefix: prefix,
                    method: method.toLowerCase(),
                    value: block,
                    args: args
                });
            }
            args = []; //for some odd reason, setting .length = 0 didn't work in safari
            method =
                prefix =
                    definition =
                        block = '';
        };

        appendResult();
        for(var i = 0, ii = value.length; i<ii; i++) {
            c = value[i];
            if(mode === 0 && whitespace.indexOf( c ) > -1){
                continue;
            }
            switch(c) {
                case '"':
                    if(!quote) {
                        quote = c;
                    }
                    else if(quote === c) {
                        quote = null;
                    }
                    break;

                case '(':
                    if(quote) { break; }
                    else if(mode === 0) {
                        mode = 1;
                        block += c;
                        continue;
                    } else {
                        numParen++;
                    }
                    break;

                case ')':
                    if(quote) { break; }
                    else if(mode === 1) {
                        if(numParen === 0) {
                            mode = 0;
                            block += c;
                            appendResult();
                            continue;
                        } else {
                            numParen--;
                        }
                    }
                    break;

                case ',':
                    if(quote) { break; }
                    else if(mode === 0) {
                        appendResult();
                        continue;
                    }
                    else if (mode === 1) {
                        if(numParen === 0 && !method.match(/^url$/i)) {
                            args.push(definition);
                            definition = '';
                            block += c;
                            continue;
                        }
                    }
                    break;
            }

            block += c;
            if(mode === 0) { method += c; }
            else { definition += c; }
        }
        appendResult();

        return results;
    };

    _html2canvas.Util.Bounds = function (element) {
        var clientRect, bounds = {};

        if (element.getBoundingClientRect){
            clientRect = element.getBoundingClientRect();

            // TODO add scroll position to bounds, so no scrolling of window necessary
            bounds.top = clientRect.top;
            bounds.bottom = clientRect.bottom || (clientRect.top + clientRect.height);
            bounds.left = clientRect.left;

            bounds.width = element.offsetWidth;
            bounds.height = element.offsetHeight;
        }

        return bounds;
    };

// TODO ideally, we'd want everything to go through this function instead of Util.Bounds,
// but would require further work to calculate the correct positions for elements with offsetParents
    _html2canvas.Util.OffsetBounds = function (element) {
        var parent = element.offsetParent ? _html2canvas.Util.OffsetBounds(element.offsetParent) : {top: 0, left: 0};

        return {
            top: element.offsetTop + parent.top,
            bottom: element.offsetTop + element.offsetHeight + parent.top,
            left: element.offsetLeft + parent.left,
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    };

    function toPX(element, attribute, value ) {
        var rsLeft = element.runtimeStyle && element.runtimeStyle[attribute],
            left,
            style = element.style;

        // Check if we are not dealing with pixels, (Opera has issues with this)
        // Ported from jQuery css.js
        // From the awesome hack by Dean Edwards
        // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

        // If we're not dealing with a regular pixel number
        // but a number that has a weird ending, we need to convert it to pixels

        if ( !/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test( value ) && /^-?\d/.test(value) ) {
            // Remember the original values
            left = style.left;

            // Put in the new values to get a computed value out
            if (rsLeft) {
                element.runtimeStyle.left = element.currentStyle.left;
            }
            style.left = attribute === "fontSize" ? "1em" : (value || 0);
            value = style.pixelLeft + "px";

            // Revert the changed values
            style.left = left;
            if (rsLeft) {
                element.runtimeStyle.left = rsLeft;
            }
        }

        if (!/^(thin|medium|thick)$/i.test(value)) {
            return Math.round(parseFloat(value)) + "px";
        }

        return value;
    }

    function asInt(val) {
        return parseInt(val, 10);
    }

    function parseBackgroundSizePosition(value, element, attribute, index) {
        value = (value || '').split(',');
        value = value[index || 0] || value[0] || 'auto';
        value = _html2canvas.Util.trimText(value).split(' ');

        if(attribute === 'backgroundSize' && (!value[0] || value[0].match(/cover|contain|auto/))) {
            //these values will be handled in the parent function
        } else {
            value[0] = (value[0].indexOf( "%" ) === -1) ? toPX(element, attribute + "X", value[0]) : value[0];
            if(value[1] === undefined) {
                if(attribute === 'backgroundSize') {
                    value[1] = 'auto';
                    return value;
                } else {
                    // IE 9 doesn't return double digit always
                    value[1] = value[0];
                }
            }
            value[1] = (value[1].indexOf("%") === -1) ? toPX(element, attribute + "Y", value[1]) : value[1];
        }
        return value;
    }

    _html2canvas.Util.getCSS = function (element, attribute, index) {
        if (previousElement !== element) {
            computedCSS = document.defaultView.getComputedStyle(element, null);
        }

        var value = computedCSS[attribute];

        if (/^background(Size|Position)$/.test(attribute)) {
            return parseBackgroundSizePosition(value, element, attribute, index);
        } else if (/border(Top|Bottom)(Left|Right)Radius/.test(attribute)) {
            var arr = value.split(" ");
            if (arr.length <= 1) {
                arr[1] = arr[0];
            }
            return arr.map(asInt);
        }

        return value;
    };

    _html2canvas.Util.resizeBounds = function( current_width, current_height, target_width, target_height, stretch_mode ){
        var target_ratio = target_width / target_height,
            current_ratio = current_width / current_height,
            output_width, output_height;

        if(!stretch_mode || stretch_mode === 'auto') {
            output_width = target_width;
            output_height = target_height;
        } else if(target_ratio < current_ratio ^ stretch_mode === 'contain') {
            output_height = target_height;
            output_width = target_height * current_ratio;
        } else {
            output_width = target_width;
            output_height = target_width / current_ratio;
        }

        return {
            width: output_width,
            height: output_height
        };
    };

    function backgroundBoundsFactory( prop, el, bounds, image, imageIndex, backgroundSize ) {
        var bgposition =  _html2canvas.Util.getCSS( el, prop, imageIndex ) ,
            topPos,
            left,
            percentage,
            val;

        if (bgposition.length === 1){
            val = bgposition[0];

            bgposition = [];

            bgposition[0] = val;
            bgposition[1] = val;
        }

        if (bgposition[0].toString().indexOf("%") !== -1){
            percentage = (parseFloat(bgposition[0])/100);
            left = bounds.width * percentage;
            if(prop !== 'backgroundSize') {
                left -= (backgroundSize || image).width*percentage;
            }
        } else {
            if(prop === 'backgroundSize') {
                if(bgposition[0] === 'auto') {
                    left = image.width;
                } else {
                    if (/contain|cover/.test(bgposition[0])) {
                        var resized = _html2canvas.Util.resizeBounds(image.width, image.height, bounds.width, bounds.height, bgposition[0]);
                        left = resized.width;
                        topPos = resized.height;
                    } else {
                        left = parseInt(bgposition[0], 10);
                    }
                }
            } else {
                left = parseInt( bgposition[0], 10);
            }
        }


        if(bgposition[1] === 'auto') {
            topPos = left / image.width * image.height;
        } else if (bgposition[1].toString().indexOf("%") !== -1){
            percentage = (parseFloat(bgposition[1])/100);
            topPos =  bounds.height * percentage;
            if(prop !== 'backgroundSize') {
                topPos -= (backgroundSize || image).height * percentage;
            }

        } else {
            topPos = parseInt(bgposition[1],10);
        }

        return [left, topPos];
    }

    _html2canvas.Util.BackgroundPosition = function( el, bounds, image, imageIndex, backgroundSize ) {
        var result = backgroundBoundsFactory( 'backgroundPosition', el, bounds, image, imageIndex, backgroundSize );
        return { left: result[0], top: result[1] };
    };

    _html2canvas.Util.BackgroundSize = function( el, bounds, image, imageIndex ) {
        var result = backgroundBoundsFactory( 'backgroundSize', el, bounds, image, imageIndex );
        return { width: result[0], height: result[1] };
    };

    _html2canvas.Util.Extend = function (options, defaults) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                defaults[key] = options[key];
            }
        }
        return defaults;
    };


    /*
     * Derived from jQuery.contents()
     * Copyright 2010, John Resig
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://jquery.org/license
     */
    _html2canvas.Util.Children = function( elem ) {
        var children;
        try {
            children = (elem.nodeName && elem.nodeName.toUpperCase() === "IFRAME") ? elem.contentDocument || elem.contentWindow.document : (function(array) {
                var ret = [];
                if (array !== null) {
                    (function(first, second ) {
                        var i = first.length,
                            j = 0;

                        if (typeof second.length === "number") {
                            for (var l = second.length; j < l; j++) {
                                first[i++] = second[j];
                            }
                        } else {
                            while (second[j] !== undefined) {
                                first[i++] = second[j++];
                            }
                        }

                        first.length = i;

                        return first;
                    })(ret, array);
                }
                return ret;
            })(elem.childNodes);

        } catch (ex) {
            _html2canvas.Util.log("html2canvas.Util.Children failed with exception: " + ex.message);
            children = [];
        }
        return children;
    };

    _html2canvas.Util.isTransparent = function(backgroundColor) {
        return (backgroundColor === "transparent" || backgroundColor === "rgba(0, 0, 0, 0)");
    };
    _html2canvas.Util.Font = (function () {

        var fontData = {};

        return function(font, fontSize, doc) {
            if (fontData[font + "-" + fontSize] !== undefined) {
                return fontData[font + "-" + fontSize];
            }

            var container = doc.createElement('div'),
                img = doc.createElement('img'),
                span = doc.createElement('span'),
                sampleText = 'Hidden Text',
                baseline,
                middle,
                metricsObj;

            container.style.visibility = "hidden";
            container.style.fontFamily = font;
            container.style.fontSize = fontSize;
            container.style.margin = 0;
            container.style.padding = 0;

            doc.body.appendChild(container);

            // http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever (handtinywhite.gif)
            img.src = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=";
            img.width = 1;
            img.height = 1;

            img.style.margin = 0;
            img.style.padding = 0;
            img.style.verticalAlign = "baseline";

            span.style.fontFamily = font;
            span.style.fontSize = fontSize;
            span.style.margin = 0;
            span.style.padding = 0;

            span.appendChild(doc.createTextNode(sampleText));
            container.appendChild(span);
            container.appendChild(img);
            baseline = (img.offsetTop - span.offsetTop) + 1;

            container.removeChild(span);
            container.appendChild(doc.createTextNode(sampleText));

            container.style.lineHeight = "normal";
            img.style.verticalAlign = "super";

            middle = (img.offsetTop-container.offsetTop) + 1;
            metricsObj = {
                baseline: baseline,
                lineWidth: 1,
                middle: middle
            };

            fontData[font + "-" + fontSize] = metricsObj;

            doc.body.removeChild(container);

            return metricsObj;
        };
    })();

    (function(){
        var Util = _html2canvas.Util,
            Generate = {};

        _html2canvas.Generate = Generate;

        var reGradients = [
            /^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
            /^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
            /^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/,
            /^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/,
            /^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/,
            /^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/,
            /^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/
        ];

        /*
         * TODO: Add IE10 vendor prefix (-ms) support
         * TODO: Add W3C gradient (linear-gradient) support
         * TODO: Add old Webkit -webkit-gradient(radial, ...) support
         * TODO: Maybe some RegExp optimizations are possible ;o)
         */
        Generate.parseGradient = function(css, bounds) {
            var gradient, i, len = reGradients.length, m1, stop, m2, m2Len, step, m3, tl,tr,br,bl;

            for(i = 0; i < len; i+=1){
                m1 = css.match(reGradients[i]);
                if(m1) {
                    break;
                }
            }

            if(m1) {
                switch(m1[1]) {
                    case '-webkit-linear-gradient':
                    case '-o-linear-gradient':

                        gradient = {
                            type: 'linear',
                            x0: null,
                            y0: null,
                            x1: null,
                            y1: null,
                            colorStops: []
                        };

                        // get coordinates
                        m2 = m1[2].match(/\w+/g);
                        if(m2){
                            m2Len = m2.length;
                            for(i = 0; i < m2Len; i+=1){
                                switch(m2[i]) {
                                    case 'top':
                                        gradient.y0 = 0;
                                        gradient.y1 = bounds.height;
                                        break;

                                    case 'right':
                                        gradient.x0 = bounds.width;
                                        gradient.x1 = 0;
                                        break;

                                    case 'bottom':
                                        gradient.y0 = bounds.height;
                                        gradient.y1 = 0;
                                        break;

                                    case 'left':
                                        gradient.x0 = 0;
                                        gradient.x1 = bounds.width;
                                        break;
                                }
                            }
                        }
                        if(gradient.x0 === null && gradient.x1 === null){ // center
                            gradient.x0 = gradient.x1 = bounds.width / 2;
                        }
                        if(gradient.y0 === null && gradient.y1 === null){ // center
                            gradient.y0 = gradient.y1 = bounds.height / 2;
                        }

                        // get colors and stops
                        m2 = m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g);
                        if(m2){
                            m2Len = m2.length;
                            step = 1 / Math.max(m2Len - 1, 1);
                            for(i = 0; i < m2Len; i+=1){
                                m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/);
                                if(m3[2]){
                                    stop = parseFloat(m3[2]);
                                    if(m3[3] === '%'){
                                        stop /= 100;
                                    } else { // px - stupid opera
                                        stop /= bounds.width;
                                    }
                                } else {
                                    stop = i * step;
                                }
                                gradient.colorStops.push({
                                    color: m3[1],
                                    stop: stop
                                });
                            }
                        }
                        break;

                    case '-webkit-gradient':

                        gradient = {
                            type: m1[2] === 'radial' ? 'circle' : m1[2], // TODO: Add radial gradient support for older mozilla definitions
                            x0: 0,
                            y0: 0,
                            x1: 0,
                            y1: 0,
                            colorStops: []
                        };

                        // get coordinates
                        m2 = m1[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/);
                        if(m2){
                            gradient.x0 = (m2[1] * bounds.width) / 100;
                            gradient.y0 = (m2[2] * bounds.height) / 100;
                            gradient.x1 = (m2[3] * bounds.width) / 100;
                            gradient.y1 = (m2[4] * bounds.height) / 100;
                        }

                        // get colors and stops
                        m2 = m1[4].match(/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g);
                        if(m2){
                            m2Len = m2.length;
                            for(i = 0; i < m2Len; i+=1){
                                m3 = m2[i].match(/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/);
                                stop = parseFloat(m3[2]);
                                if(m3[1] === 'from') {
                                    stop = 0.0;
                                }
                                if(m3[1] === 'to') {
                                    stop = 1.0;
                                }
                                gradient.colorStops.push({
                                    color: m3[3],
                                    stop: stop
                                });
                            }
                        }
                        break;

                    case '-moz-linear-gradient':

                        gradient = {
                            type: 'linear',
                            x0: 0,
                            y0: 0,
                            x1: 0,
                            y1: 0,
                            colorStops: []
                        };

                        // get coordinates
                        m2 = m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/);

                        // m2[1] == 0%   -> left
                        // m2[1] == 50%  -> center
                        // m2[1] == 100% -> right

                        // m2[2] == 0%   -> top
                        // m2[2] == 50%  -> center
                        // m2[2] == 100% -> bottom

                        if(m2){
                            gradient.x0 = (m2[1] * bounds.width) / 100;
                            gradient.y0 = (m2[2] * bounds.height) / 100;
                            gradient.x1 = bounds.width - gradient.x0;
                            gradient.y1 = bounds.height - gradient.y0;
                        }

                        // get colors and stops
                        m2 = m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g);
                        if(m2){
                            m2Len = m2.length;
                            step = 1 / Math.max(m2Len - 1, 1);
                            for(i = 0; i < m2Len; i+=1){
                                m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/);
                                if(m3[2]){
                                    stop = parseFloat(m3[2]);
                                    if(m3[3]){ // percentage
                                        stop /= 100;
                                    }
                                } else {
                                    stop = i * step;
                                }
                                gradient.colorStops.push({
                                    color: m3[1],
                                    stop: stop
                                });
                            }
                        }
                        break;

                    case '-webkit-radial-gradient':
                    case '-moz-radial-gradient':
                    case '-o-radial-gradient':

                        gradient = {
                            type: 'circle',
                            x0: 0,
                            y0: 0,
                            x1: bounds.width,
                            y1: bounds.height,
                            cx: 0,
                            cy: 0,
                            rx: 0,
                            ry: 0,
                            colorStops: []
                        };

                        // center
                        m2 = m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/);
                        if(m2){
                            gradient.cx = (m2[1] * bounds.width) / 100;
                            gradient.cy = (m2[2] * bounds.height) / 100;
                        }

                        // size
                        m2 = m1[3].match(/\w+/);
                        m3 = m1[4].match(/[a-z\-]*/);
                        if(m2 && m3){
                            switch(m3[0]){
                                case 'farthest-corner':
                                case 'cover': // is equivalent to farthest-corner
                                case '': // mozilla removes "cover" from definition :(
                                    tl = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.cy, 2));
                                    tr = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                                    br = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                                    bl = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.cy, 2));
                                    gradient.rx = gradient.ry = Math.max(tl, tr, br, bl);
                                    break;
                                case 'closest-corner':
                                    tl = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.cy, 2));
                                    tr = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                                    br = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                                    bl = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.cy, 2));
                                    gradient.rx = gradient.ry = Math.min(tl, tr, br, bl);
                                    break;
                                case 'farthest-side':
                                    if(m2[0] === 'circle'){
                                        gradient.rx = gradient.ry = Math.max(
                                            gradient.cx,
                                            gradient.cy,
                                            gradient.x1 - gradient.cx,
                                            gradient.y1 - gradient.cy
                                        );
                                    } else { // ellipse

                                        gradient.type = m2[0];

                                        gradient.rx = Math.max(
                                            gradient.cx,
                                            gradient.x1 - gradient.cx
                                        );
                                        gradient.ry = Math.max(
                                            gradient.cy,
                                            gradient.y1 - gradient.cy
                                        );
                                    }
                                    break;
                                case 'closest-side':
                                case 'contain': // is equivalent to closest-side
                                    if(m2[0] === 'circle'){
                                        gradient.rx = gradient.ry = Math.min(
                                            gradient.cx,
                                            gradient.cy,
                                            gradient.x1 - gradient.cx,
                                            gradient.y1 - gradient.cy
                                        );
                                    } else { // ellipse

                                        gradient.type = m2[0];

                                        gradient.rx = Math.min(
                                            gradient.cx,
                                            gradient.x1 - gradient.cx
                                        );
                                        gradient.ry = Math.min(
                                            gradient.cy,
                                            gradient.y1 - gradient.cy
                                        );
                                    }
                                    break;

                                // TODO: add support for "30px 40px" sizes (webkit only)
                            }
                        }

                        // color stops
                        m2 = m1[5].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g);
                        if(m2){
                            m2Len = m2.length;
                            step = 1 / Math.max(m2Len - 1, 1);
                            for(i = 0; i < m2Len; i+=1){
                                m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/);
                                if(m3[2]){
                                    stop = parseFloat(m3[2]);
                                    if(m3[3] === '%'){
                                        stop /= 100;
                                    } else { // px - stupid opera
                                        stop /= bounds.width;
                                    }
                                } else {
                                    stop = i * step;
                                }
                                gradient.colorStops.push({
                                    color: m3[1],
                                    stop: stop
                                });
                            }
                        }
                        break;
                }
            }

            return gradient;
        };

        function addScrollStops(grad) {
            return function(colorStop) {
                try {
                    grad.addColorStop(colorStop.stop, colorStop.color);
                }
                catch(e) {
                    Util.log(['failed to add color stop: ', e, '; tried to add: ', colorStop]);
                }
            };
        }

        Generate.Gradient = function(src, bounds) {
            if(bounds.width === 0 || bounds.height === 0) {
                return;
            }

            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                gradient, grad;

            canvas.width = bounds.width;
            canvas.height = bounds.height;

            // TODO: add support for multi defined background gradients
            gradient = _html2canvas.Generate.parseGradient(src, bounds);

            if(gradient) {
                switch(gradient.type) {
                    case 'linear':
                        grad = ctx.createLinearGradient(gradient.x0, gradient.y0, gradient.x1, gradient.y1);
                        gradient.colorStops.forEach(addScrollStops(grad));
                        ctx.fillStyle = grad;
                        ctx.fillRect(0, 0, bounds.width, bounds.height);
                        break;

                    case 'circle':
                        grad = ctx.createRadialGradient(gradient.cx, gradient.cy, 0, gradient.cx, gradient.cy, gradient.rx);
                        gradient.colorStops.forEach(addScrollStops(grad));
                        ctx.fillStyle = grad;
                        ctx.fillRect(0, 0, bounds.width, bounds.height);
                        break;

                    case 'ellipse':
                        var canvasRadial = document.createElement('canvas'),
                            ctxRadial = canvasRadial.getContext('2d'),
                            ri = Math.max(gradient.rx, gradient.ry),
                            di = ri * 2;

                        canvasRadial.width = canvasRadial.height = di;

                        grad = ctxRadial.createRadialGradient(gradient.rx, gradient.ry, 0, gradient.rx, gradient.ry, ri);
                        gradient.colorStops.forEach(addScrollStops(grad));

                        ctxRadial.fillStyle = grad;
                        ctxRadial.fillRect(0, 0, di, di);

                        ctx.fillStyle = gradient.colorStops[gradient.colorStops.length - 1].color;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(canvasRadial, gradient.cx - gradient.rx, gradient.cy - gradient.ry, 2 * gradient.rx, 2 * gradient.ry);
                        break;
                }
            }

            return canvas;
        };

        Generate.ListAlpha = function(number) {
            var tmp = "",
                modulus;

            do {
                modulus = number % 26;
                tmp = String.fromCharCode((modulus) + 64) + tmp;
                number = number / 26;
            }while((number*26) > 26);

            return tmp;
        };

        Generate.ListRoman = function(number) {
            var romanArray = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
                decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
                roman = "",
                v,
                len = romanArray.length;

            if (number <= 0 || number >= 4000) {
                return number;
            }

            for (v=0; v < len; v+=1) {
                while (number >= decimal[v]) {
                    number -= decimal[v];
                    roman += romanArray[v];
                }
            }

            return roman;
        };
    })();
    function h2cRenderContext(width, height) {
        var storage = [];
        return {
            storage: storage,
            width: width,
            height: height,
            clip: function() {
                storage.push({
                    type: "function",
                    name: "clip",
                    'arguments': arguments
                });
            },
            translate: function() {
                storage.push({
                    type: "function",
                    name: "translate",
                    'arguments': arguments
                });
            },
            fill: function() {
                storage.push({
                    type: "function",
                    name: "fill",
                    'arguments': arguments
                });
            },
            save: function() {
                storage.push({
                    type: "function",
                    name: "save",
                    'arguments': arguments
                });
            },
            restore: function() {
                storage.push({
                    type: "function",
                    name: "restore",
                    'arguments': arguments
                });
            },
            fillRect: function () {
                storage.push({
                    type: "function",
                    name: "fillRect",
                    'arguments': arguments
                });
            },
            createPattern: function() {
                storage.push({
                    type: "function",
                    name: "createPattern",
                    'arguments': arguments
                });
            },
            drawShape: function() {

                var shape = [];

                storage.push({
                    type: "function",
                    name: "drawShape",
                    'arguments': shape
                });

                return {
                    moveTo: function() {
                        shape.push({
                            name: "moveTo",
                            'arguments': arguments
                        });
                    },
                    lineTo: function() {
                        shape.push({
                            name: "lineTo",
                            'arguments': arguments
                        });
                    },
                    arcTo: function() {
                        shape.push({
                            name: "arcTo",
                            'arguments': arguments
                        });
                    },
                    bezierCurveTo: function() {
                        shape.push({
                            name: "bezierCurveTo",
                            'arguments': arguments
                        });
                    },
                    quadraticCurveTo: function() {
                        shape.push({
                            name: "quadraticCurveTo",
                            'arguments': arguments
                        });
                    }
                };

            },
            drawImage: function () {
                storage.push({
                    type: "function",
                    name: "drawImage",
                    'arguments': arguments
                });
            },
            fillText: function () {
                storage.push({
                    type: "function",
                    name: "fillText",
                    'arguments': arguments
                });
            },
            setVariable: function (variable, value) {
                storage.push({
                    type: "variable",
                    name: variable,
                    'arguments': value
                });
                return value;
            }
        };
    }
    _html2canvas.Parse = function (images, options) {
        window.scroll(0,0);

        var element = (( options.elements === undefined ) ? document.body : options.elements[0]), // select body by default
            numDraws = 0,
            doc = element.ownerDocument,
            Util = _html2canvas.Util,
            support = Util.Support(options, doc),
            ignoreElementsRegExp = new RegExp("(" + options.ignoreElements + ")"),
            body = doc.body,
            getCSS = Util.getCSS,
            pseudoHide = "___html2canvas___pseudoelement",
            hidePseudoElements = doc.createElement('style');

        hidePseudoElements.innerHTML = '.' + pseudoHide + '-before:before { content: "" !important; display: none !important; }' +
            '.' + pseudoHide + '-after:after { content: "" !important; display: none !important; }';

        body.appendChild(hidePseudoElements);

        images = images || {};

        function documentWidth () {
            return Math.max(
                Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
                Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
                Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
            );
        }

        function documentHeight () {
            return Math.max(
                Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
                Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
                Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
            );
        }

        function getCSSInt(element, attribute) {
            var val = parseInt(getCSS(element, attribute), 10);
            return (isNaN(val)) ? 0 : val; // borders in old IE are throwing 'medium' for demo.html
        }

        function renderRect (ctx, x, y, w, h, bgcolor) {
            if (bgcolor !== "transparent"){
                ctx.setVariable("fillStyle", bgcolor);
                ctx.fillRect(x, y, w, h);
                numDraws+=1;
            }
        }

        function capitalize(m, p1, p2) {
            if (m.length > 0) {
                return p1 + p2.toUpperCase();
            }
        }

        function textTransform (text, transform) {
            switch(transform){
                case "lowercase":
                    return text.toLowerCase();
                case "capitalize":
                    return text.replace( /(^|\s|:|-|\(|\))([a-z])/g, capitalize);
                case "uppercase":
                    return text.toUpperCase();
                default:
                    return text;
            }
        }

        function noLetterSpacing(letter_spacing) {
            return (/^(normal|none|0px)$/.test(letter_spacing));
        }

        function drawText(currentText, x, y, ctx){
            if (currentText !== null && Util.trimText(currentText).length > 0) {
                ctx.fillText(currentText, x, y);
                numDraws+=1;
            }
        }

        function setTextVariables(ctx, el, text_decoration, color) {
            var align = false,
                bold = getCSS(el, "fontWeight"),
                family = getCSS(el, "fontFamily"),
                size = getCSS(el, "fontSize"),
                shadows = Util.parseTextShadows(getCSS(el, "textShadow"));

            switch(parseInt(bold, 10)){
                case 401:
                    bold = "bold";
                    break;
                case 400:
                    bold = "normal";
                    break;
            }

            ctx.setVariable("fillStyle", color);
            ctx.setVariable("font", [getCSS(el, "fontStyle"), getCSS(el, "fontVariant"), bold, size, family].join(" "));
            ctx.setVariable("textAlign", (align) ? "right" : "left");

            if (shadows.length) {
                // TODO: support multiple text shadows
                // apply the first text shadow
                ctx.setVariable("shadowColor", shadows[0].color);
                ctx.setVariable("shadowOffsetX", shadows[0].offsetX);
                ctx.setVariable("shadowOffsetY", shadows[0].offsetY);
                ctx.setVariable("shadowBlur", shadows[0].blur);
            }

            if (text_decoration !== "none"){
                return Util.Font(family, size, doc);
            }
        }

        function renderTextDecoration(ctx, text_decoration, bounds, metrics, color) {
            switch(text_decoration) {
                case "underline":
                    // Draws a line at the baseline of the font
                    // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
                    renderRect(ctx, bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, color);
                    break;
                case "overline":
                    renderRect(ctx, bounds.left, Math.round(bounds.top), bounds.width, 1, color);
                    break;
                case "line-through":
                    // TODO try and find exact position for line-through
                    renderRect(ctx, bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, color);
                    break;
            }
        }

        function getTextBounds(state, text, textDecoration, isLast, transform) {
            var bounds;
            if (support.rangeBounds && !transform) {
                if (textDecoration !== "none" || Util.trimText(text).length !== 0) {
                    bounds = textRangeBounds(text, state.node, state.textOffset);
                }
                state.textOffset += text.length;
            } else if (state.node && typeof state.node.nodeValue === "string" ){
                var newTextNode = (isLast) ? state.node.splitText(text.length) : null;
                bounds = textWrapperBounds(state.node, transform);
                state.node = newTextNode;
            }
            return bounds;
        }

        function textRangeBounds(text, textNode, textOffset) {
            var range = doc.createRange();
            range.setStart(textNode, textOffset);
            range.setEnd(textNode, textOffset + text.length);
            return range.getBoundingClientRect();
        }

        function textWrapperBounds(oldTextNode, transform) {
            var parent = oldTextNode.parentNode,
                wrapElement = doc.createElement('wrapper'),
                backupText = oldTextNode.cloneNode(true);

            wrapElement.appendChild(oldTextNode.cloneNode(true));
            parent.replaceChild(wrapElement, oldTextNode);

            var bounds = transform ? Util.OffsetBounds(wrapElement) : Util.Bounds(wrapElement);
            parent.replaceChild(backupText, wrapElement);
            return bounds;
        }

        function renderText(el, textNode, stack) {
            var ctx = stack.ctx,
                color = getCSS(el, "color"),
                textDecoration = getCSS(el, "textDecoration"),
                textAlign = getCSS(el, "textAlign"),
                metrics,
                textList,
                state = {
                    node: textNode,
                    textOffset: 0
                };

            if (Util.trimText(textNode.nodeValue).length > 0) {
                textNode.nodeValue = textTransform(textNode.nodeValue, getCSS(el, "textTransform"));
                textAlign = textAlign.replace(["-webkit-auto"],["auto"]);

                textList = (!options.letterRendering && /^(left|right|justify|auto)$/.test(textAlign) && noLetterSpacing(getCSS(el, "letterSpacing"))) ?
                    textNode.nodeValue.split(/(\b| )/)
                    : textNode.nodeValue.split("");

                metrics = setTextVariables(ctx, el, textDecoration, color);

                if (options.chinese) {
                    textList.forEach(function(word, index) {
                        if (/.*[\u4E00-\u9FA5].*$/.test(word)) {
                            word = word.split("");
                            word.unshift(index, 1);
                            textList.splice.apply(textList, word);
                        }
                    });
                }

                textList.forEach(function(text, index) {
                    var bounds = getTextBounds(state, text, textDecoration, (index < textList.length - 1), stack.transform.matrix);
                    if (bounds) {
                        drawText(text, bounds.left, bounds.bottom, ctx);
                        renderTextDecoration(ctx, textDecoration, bounds, metrics, color);
                    }
                });
            }
        }

        function listPosition (element, val) {
            var boundElement = doc.createElement( "boundelement" ),
                originalType,
                bounds;

            boundElement.style.display = "inline";

            originalType = element.style.listStyleType;
            element.style.listStyleType = "none";

            boundElement.appendChild(doc.createTextNode(val));

            element.insertBefore(boundElement, element.firstChild);

            bounds = Util.Bounds(boundElement);
            element.removeChild(boundElement);
            element.style.listStyleType = originalType;
            return bounds;
        }

        function elementIndex(el) {
            var i = -1,
                count = 1,
                childs = el.parentNode.childNodes;

            if (el.parentNode) {
                while(childs[++i] !== el) {
                    if (childs[i].nodeType === 1) {
                        count++;
                    }
                }
                return count;
            } else {
                return -1;
            }
        }

        function listItemText(element, type) {
            var currentIndex = elementIndex(element), text;
            switch(type){
                case "decimal":
                    text = currentIndex;
                    break;
                case "decimal-leading-zero":
                    text = (currentIndex.toString().length === 1) ? currentIndex = "0" + currentIndex.toString() : currentIndex.toString();
                    break;
                case "upper-roman":
                    text = _html2canvas.Generate.ListRoman( currentIndex );
                    break;
                case "lower-roman":
                    text = _html2canvas.Generate.ListRoman( currentIndex ).toLowerCase();
                    break;
                case "lower-alpha":
                    text = _html2canvas.Generate.ListAlpha( currentIndex ).toLowerCase();
                    break;
                case "upper-alpha":
                    text = _html2canvas.Generate.ListAlpha( currentIndex );
                    break;
            }

            return text + ". ";
        }

        function renderListItem(element, stack, elBounds) {
            var x,
                text,
                ctx = stack.ctx,
                type = getCSS(element, "listStyleType"),
                listBounds;

            if (/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(type)) {
                text = listItemText(element, type);
                listBounds = listPosition(element, text);
                setTextVariables(ctx, element, "none", getCSS(element, "color"));

                if (getCSS(element, "listStylePosition") === "inside") {
                    ctx.setVariable("textAlign", "left");
                    x = elBounds.left;
                } else {
                    return;
                }

                drawText(text, x, listBounds.bottom, ctx);
            }
        }

        function loadImage (src){
            var img = images[src];
            return (img && img.succeeded === true) ? img.img : false;
        }

        function clipBounds(src, dst){
            var x = Math.max(src.left, dst.left),
                y = Math.max(src.top, dst.top),
                x2 = Math.min((src.left + src.width), (dst.left + dst.width)),
                y2 = Math.min((src.top + src.height), (dst.top + dst.height));

            return {
                left:x,
                top:y,
                width:x2-x,
                height:y2-y
            };
        }

        function setZ(element, stack, parentStack){
            var newContext,
                isPositioned = stack.cssPosition !== 'static',
                zIndex = isPositioned ? getCSS(element, 'zIndex') : 'auto',
                opacity = getCSS(element, 'opacity'),
                isFloated = getCSS(element, 'cssFloat') !== 'none';

            // https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context
            // When a new stacking context should be created:
            // the root element (HTML),
            // positioned (absolutely or relatively) with a z-index value other than "auto",
            // elements with an opacity value less than 1. (See the specification for opacity),
            // on mobile WebKit and Chrome 22+, position: fixed always creates a new stacking context, even when z-index is "auto" (See this post)

            stack.zIndex = newContext = h2czContext(zIndex);
            newContext.isPositioned = isPositioned;
            newContext.isFloated = isFloated;
            newContext.opacity = opacity;
            newContext.ownStacking = (zIndex !== 'auto' || opacity < 1);

            if (parentStack) {
                parentStack.zIndex.children.push(stack);
            }
        }

        function renderImage(ctx, element, image, bounds, borders) {

            var paddingLeft = getCSSInt(element, 'paddingLeft'),
                paddingTop = getCSSInt(element, 'paddingTop'),
                paddingRight = getCSSInt(element, 'paddingRight'),
                paddingBottom = getCSSInt(element, 'paddingBottom');

            drawImage(
                ctx,
                image,
                0, //sx
                0, //sy
                image.width, //sw
                image.height, //sh
                bounds.left + paddingLeft + borders[3].width, //dx
                bounds.top + paddingTop + borders[0].width, // dy
                bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight), //dw
                bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom) //dh
            );
        }

        function getBorderData(element) {
            return ["Top", "Right", "Bottom", "Left"].map(function(side) {
                return {
                    width: getCSSInt(element, 'border' + side + 'Width'),
                    color: getCSS(element, 'border' + side + 'Color')
                };
            });
        }

        function getBorderRadiusData(element) {
            return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
                return getCSS(element, 'border' + side + 'Radius');
            });
        }

        var getCurvePoints = (function(kappa) {

            return function(x, y, r1, r2) {
                var ox = (r1) * kappa, // control point offset horizontal
                    oy = (r2) * kappa, // control point offset vertical
                    xm = x + r1, // x-middle
                    ym = y + r2; // y-middle
                return {
                    topLeft: bezierCurve({
                        x:x,
                        y:ym
                    }, {
                        x:x,
                        y:ym - oy
                    }, {
                        x:xm - ox,
                        y:y
                    }, {
                        x:xm,
                        y:y
                    }),
                    topRight: bezierCurve({
                        x:x,
                        y:y
                    }, {
                        x:x + ox,
                        y:y
                    }, {
                        x:xm,
                        y:ym - oy
                    }, {
                        x:xm,
                        y:ym
                    }),
                    bottomRight: bezierCurve({
                        x:xm,
                        y:y
                    }, {
                        x:xm,
                        y:y + oy
                    }, {
                        x:x + ox,
                        y:ym
                    }, {
                        x:x,
                        y:ym
                    }),
                    bottomLeft: bezierCurve({
                        x:xm,
                        y:ym
                    }, {
                        x:xm - ox,
                        y:ym
                    }, {
                        x:x,
                        y:y + oy
                    }, {
                        x:x,
                        y:y
                    })
                };
            };
        })(4 * ((Math.sqrt(2) - 1) / 3));

        function bezierCurve(start, startControl, endControl, end) {

            var lerp = function (a, b, t) {
                return {
                    x:a.x + (b.x - a.x) * t,
                    y:a.y + (b.y - a.y) * t
                };
            };

            return {
                start: start,
                startControl: startControl,
                endControl: endControl,
                end: end,
                subdivide: function(t) {
                    var ab = lerp(start, startControl, t),
                        bc = lerp(startControl, endControl, t),
                        cd = lerp(endControl, end, t),
                        abbc = lerp(ab, bc, t),
                        bccd = lerp(bc, cd, t),
                        dest = lerp(abbc, bccd, t);
                    return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
                },
                curveTo: function(borderArgs) {
                    borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
                },
                curveToReversed: function(borderArgs) {
                    borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
                }
            };
        }

        function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
            if (radius1[0] > 0 || radius1[1] > 0) {
                borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
                corner1[0].curveTo(borderArgs);
                corner1[1].curveTo(borderArgs);
            } else {
                borderArgs.push(["line", x, y]);
            }

            if (radius2[0] > 0 || radius2[1] > 0) {
                borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
            }
        }

        function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
            var borderArgs = [];

            if (radius1[0] > 0 || radius1[1] > 0) {
                borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
                outer1[1].curveTo(borderArgs);
            } else {
                borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
            }

            if (radius2[0] > 0 || radius2[1] > 0) {
                borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
                outer2[0].curveTo(borderArgs);
                borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
                inner2[0].curveToReversed(borderArgs);
            } else {
                borderArgs.push([ "line", borderData.c2[0], borderData.c2[1]]);
                borderArgs.push([ "line", borderData.c3[0], borderData.c3[1]]);
            }

            if (radius1[0] > 0 || radius1[1] > 0) {
                borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
                inner1[1].curveToReversed(borderArgs);
            } else {
                borderArgs.push([ "line", borderData.c4[0], borderData.c4[1]]);
            }

            return borderArgs;
        }

        function calculateCurvePoints(bounds, borderRadius, borders) {

            var x = bounds.left,
                y = bounds.top,
                width = bounds.width,
                height = bounds.height,

                tlh = borderRadius[0][0],
                tlv = borderRadius[0][1],
                trh = borderRadius[1][0],
                trv = borderRadius[1][1],
                brh = borderRadius[2][0],
                brv = borderRadius[2][1],
                blh = borderRadius[3][0],
                blv = borderRadius[3][1],

                topWidth = width - trh,
                rightHeight = height - brv,
                bottomWidth = width - brh,
                leftHeight = height - blv;

            return {
                topLeftOuter: getCurvePoints(
                    x,
                    y,
                    tlh,
                    tlv
                ).topLeft.subdivide(0.5),

                topLeftInner: getCurvePoints(
                    x + borders[3].width,
                    y + borders[0].width,
                    Math.max(0, tlh - borders[3].width),
                    Math.max(0, tlv - borders[0].width)
                ).topLeft.subdivide(0.5),

                topRightOuter: getCurvePoints(
                    x + topWidth,
                    y,
                    trh,
                    trv
                ).topRight.subdivide(0.5),

                topRightInner: getCurvePoints(
                    x + Math.min(topWidth, width + borders[3].width),
                    y + borders[0].width,
                    (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width,
                    trv - borders[0].width
                ).topRight.subdivide(0.5),

                bottomRightOuter: getCurvePoints(
                    x + bottomWidth,
                    y + rightHeight,
                    brh,
                    brv
                ).bottomRight.subdivide(0.5),

                bottomRightInner: getCurvePoints(
                    x + Math.min(bottomWidth, width + borders[3].width),
                    y + Math.min(rightHeight, height + borders[0].width),
                    Math.max(0, brh - borders[1].width),
                    Math.max(0, brv - borders[2].width)
                ).bottomRight.subdivide(0.5),

                bottomLeftOuter: getCurvePoints(
                    x,
                    y + leftHeight,
                    blh,
                    blv
                ).bottomLeft.subdivide(0.5),

                bottomLeftInner: getCurvePoints(
                    x + borders[3].width,
                    y + leftHeight,
                    Math.max(0, blh - borders[3].width),
                    Math.max(0, blv - borders[2].width)
                ).bottomLeft.subdivide(0.5)
            };
        }

        function getBorderClip(element, borderPoints, borders, radius, bounds) {
            var backgroundClip = getCSS(element, 'backgroundClip'),
                borderArgs = [];

            switch(backgroundClip) {
                case "content-box":
                case "padding-box":
                    parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
                    parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
                    parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
                    parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
                    break;

                default:
                    parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
                    parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
                    parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
                    parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
                    break;
            }

            return borderArgs;
        }

        function parseBorders(element, bounds, borders){
            var x = bounds.left,
                y = bounds.top,
                width = bounds.width,
                height = bounds.height,
                borderSide,
                bx,
                by,
                bw,
                bh,
                borderArgs,
            // http://www.w3.org/TR/css3-background/#the-border-radius
                borderRadius = getBorderRadiusData(element),
                borderPoints = calculateCurvePoints(bounds, borderRadius, borders),
                borderData = {
                    clip: getBorderClip(element, borderPoints, borders, borderRadius, bounds),
                    borders: []
                };

            for (borderSide = 0; borderSide < 4; borderSide++) {

                if (borders[borderSide].width > 0) {
                    bx = x;
                    by = y;
                    bw = width;
                    bh = height - (borders[2].width);

                    switch(borderSide) {
                        case 0:
                            // top border
                            bh = borders[0].width;

                            borderArgs = drawSide({
                                    c1: [bx, by],
                                    c2: [bx + bw, by],
                                    c3: [bx + bw - borders[1].width, by + bh],
                                    c4: [bx + borders[3].width, by + bh]
                                }, borderRadius[0], borderRadius[1],
                                borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
                            break;
                        case 1:
                            // right border
                            bx = x + width - (borders[1].width);
                            bw = borders[1].width;

                            borderArgs = drawSide({
                                    c1: [bx + bw, by],
                                    c2: [bx + bw, by + bh + borders[2].width],
                                    c3: [bx, by + bh],
                                    c4: [bx, by + borders[0].width]
                                }, borderRadius[1], borderRadius[2],
                                borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
                            break;
                        case 2:
                            // bottom border
                            by = (by + height) - (borders[2].width);
                            bh = borders[2].width;

                            borderArgs = drawSide({
                                    c1: [bx + bw, by + bh],
                                    c2: [bx, by + bh],
                                    c3: [bx + borders[3].width, by],
                                    c4: [bx + bw - borders[3].width, by]
                                }, borderRadius[2], borderRadius[3],
                                borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
                            break;
                        case 3:
                            // left border
                            bw = borders[3].width;

                            borderArgs = drawSide({
                                    c1: [bx, by + bh + borders[2].width],
                                    c2: [bx, by],
                                    c3: [bx + bw, by + borders[0].width],
                                    c4: [bx + bw, by + bh]
                                }, borderRadius[3], borderRadius[0],
                                borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
                            break;
                    }

                    borderData.borders.push({
                        args: borderArgs,
                        color: borders[borderSide].color
                    });

                }
            }

            return borderData;
        }

        function createShape(ctx, args) {
            var shape = ctx.drawShape();
            args.forEach(function(border, index) {
                shape[(index === 0) ? "moveTo" : border[0] + "To" ].apply(null, border.slice(1));
            });
            return shape;
        }

        function renderBorders(ctx, borderArgs, color) {
            if (color !== "transparent") {
                ctx.setVariable( "fillStyle", color);
                createShape(ctx, borderArgs);
                ctx.fill();
                numDraws+=1;
            }
        }

        function renderFormValue (el, bounds, stack){

            var valueWrap = doc.createElement('valuewrap'),
                cssPropertyArray = ['lineHeight','textAlign','fontFamily','color','fontSize','paddingLeft','paddingTop','width','height','border','borderLeftWidth','borderTopWidth'],
                textValue,
                textNode;

            cssPropertyArray.forEach(function(property) {
                try {
                    valueWrap.style[property] = getCSS(el, property);
                } catch(e) {
                    // Older IE has issues with "border"
                    Util.log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
                }
            });

            valueWrap.style.borderColor = "black";
            valueWrap.style.borderStyle = "solid";
            valueWrap.style.display = "block";
            valueWrap.style.position = "absolute";

            if (/^(submit|reset|button|text|password)$/.test(el.type) || el.nodeName === "SELECT"){
                valueWrap.style.lineHeight = getCSS(el, "height");
            }

            valueWrap.style.top = bounds.top + "px";
            valueWrap.style.left = bounds.left + "px";

            textValue = (el.nodeName === "SELECT") ? (el.options[el.selectedIndex] || 0).text : el.value;
            if(!textValue) {
                textValue = el.placeholder;
            }

            textNode = doc.createTextNode(textValue);

            valueWrap.appendChild(textNode);
            body.appendChild(valueWrap);

            renderText(el, textNode, stack);
            body.removeChild(valueWrap);
        }

        function drawImage (ctx) {
            ctx.drawImage.apply(ctx, Array.prototype.slice.call(arguments, 1));
            numDraws+=1;
        }

        function getPseudoElement(el, which) {
            var elStyle = window.getComputedStyle(el, which);
            if(!elStyle || !elStyle.content || elStyle.content === "none" || elStyle.content === "-moz-alt-content" || elStyle.display === "none") {
                return;
            }
            var content = elStyle.content + '',
                first = content.substr( 0, 1 );
            //strips quotes
            if(first === content.substr( content.length - 1 ) && first.match(/'|"/)) {
                content = content.substr( 1, content.length - 2 );
            }

            var isImage = content.substr( 0, 3 ) === 'url',
                elps = document.createElement( isImage ? 'img' : 'span' );

            elps.className = pseudoHide + "-before " + pseudoHide + "-after";

            Object.keys(elStyle).filter(indexedProperty).forEach(function(prop) {
                // Prevent assigning of read only CSS Rules, ex. length, parentRule
                try {
                    elps.style[prop] = elStyle[prop];
                } catch (e) {
                    Util.log(['Tried to assign readonly property ', prop, 'Error:', e]);
                }
            });

            if(isImage) {
                elps.src = Util.parseBackgroundImage(content)[0].args[0];
            } else {
                elps.innerHTML = content;
            }
            return elps;
        }

        function indexedProperty(property) {
            return (isNaN(window.parseInt(property, 10)));
        }

        function injectPseudoElements(el, stack) {
            var before = getPseudoElement(el, ':before'),
                after = getPseudoElement(el, ':after');
            if(!before && !after) {
                return;
            }

            if(before) {
                el.className += " " + pseudoHide + "-before";
                el.parentNode.insertBefore(before, el);
                parseElement(before, stack, true);
                el.parentNode.removeChild(before);
                el.className = el.className.replace(pseudoHide + "-before", "").trim();
            }

            if (after) {
                el.className += " " + pseudoHide + "-after";
                el.appendChild(after);
                parseElement(after, stack, true);
                el.removeChild(after);
                el.className = el.className.replace(pseudoHide + "-after", "").trim();
            }

        }

        function renderBackgroundRepeat(ctx, image, backgroundPosition, bounds) {
            var offsetX = Math.round(bounds.left + backgroundPosition.left),
                offsetY = Math.round(bounds.top + backgroundPosition.top);

            ctx.createPattern(image);
            ctx.translate(offsetX, offsetY);
            ctx.fill();
            ctx.translate(-offsetX, -offsetY);
        }

        function backgroundRepeatShape(ctx, image, backgroundPosition, bounds, left, top, width, height) {
            var args = [];
            args.push(["line", Math.round(left), Math.round(top)]);
            args.push(["line", Math.round(left + width), Math.round(top)]);
            args.push(["line", Math.round(left + width), Math.round(height + top)]);
            args.push(["line", Math.round(left), Math.round(height + top)]);
            createShape(ctx, args);
            ctx.save();
            ctx.clip();
            renderBackgroundRepeat(ctx, image, backgroundPosition, bounds);
            ctx.restore();
        }

        function renderBackgroundColor(ctx, backgroundBounds, bgcolor) {
            renderRect(
                ctx,
                backgroundBounds.left,
                backgroundBounds.top,
                backgroundBounds.width,
                backgroundBounds.height,
                bgcolor
            );
        }

        function renderBackgroundRepeating(el, bounds, ctx, image, imageIndex) {
            var backgroundSize = Util.BackgroundSize(el, bounds, image, imageIndex),
                backgroundPosition = Util.BackgroundPosition(el, bounds, image, imageIndex, backgroundSize),
                backgroundRepeat = getCSS(el, "backgroundRepeat").split(",").map(Util.trimText);

            image = resizeImage(image, backgroundSize);

            backgroundRepeat = backgroundRepeat[imageIndex] || backgroundRepeat[0];

            switch (backgroundRepeat) {
                case "repeat-x":
                    backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
                        bounds.left, bounds.top + backgroundPosition.top, 99999, image.height);
                    break;

                case "repeat-y":
                    backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
                        bounds.left + backgroundPosition.left, bounds.top, image.width, 99999);
                    break;

                case "no-repeat":
                    backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
                        bounds.left + backgroundPosition.left, bounds.top + backgroundPosition.top, image.width, image.height);
                    break;

                default:
                    renderBackgroundRepeat(ctx, image, backgroundPosition, {
                        top: bounds.top,
                        left: bounds.left,
                        width: image.width,
                        height: image.height
                    });
                    break;
            }
        }

        function renderBackgroundImage(element, bounds, ctx) {
            var backgroundImage = getCSS(element, "backgroundImage"),
                backgroundImages = Util.parseBackgroundImage(backgroundImage),
                image,
                imageIndex = backgroundImages.length;

            while(imageIndex--) {
                backgroundImage = backgroundImages[imageIndex];

                if (!backgroundImage.args || backgroundImage.args.length === 0) {
                    continue;
                }

                var key = backgroundImage.method === 'url' ?
                    backgroundImage.args[0] :
                    backgroundImage.value;

                image = loadImage(key);

                // TODO add support for background-origin
                if (image) {
                    renderBackgroundRepeating(element, bounds, ctx, image, imageIndex);
                } else {
                    Util.log("html2canvas: Error loading background:", backgroundImage);
                }
            }
        }

        function resizeImage(image, bounds) {
            if(image.width === bounds.width && image.height === bounds.height) {
                return image;
            }

            var ctx, canvas = doc.createElement('canvas');
            canvas.width = bounds.width;
            canvas.height = bounds.height;
            ctx = canvas.getContext("2d");
            drawImage(ctx, image, 0, 0, image.width, image.height, 0, 0, bounds.width, bounds.height );
            return canvas;
        }

        function setOpacity(ctx, element, parentStack) {
            return ctx.setVariable("globalAlpha", getCSS(element, "opacity") * ((parentStack) ? parentStack.opacity : 1));
        }

        function removePx(str) {
            return str.replace("px", "");
        }

        var transformRegExp = /(matrix)\((.+)\)/;

        function getTransform(element, parentStack) {
            var transform = getCSS(element, "transform") || getCSS(element, "-webkit-transform") || getCSS(element, "-moz-transform") || getCSS(element, "-ms-transform") || getCSS(element, "-o-transform");
            var transformOrigin = getCSS(element, "transform-origin") || getCSS(element, "-webkit-transform-origin") || getCSS(element, "-moz-transform-origin") || getCSS(element, "-ms-transform-origin") || getCSS(element, "-o-transform-origin") || "0px 0px";

            transformOrigin = transformOrigin.split(" ").map(removePx).map(Util.asFloat);

            var matrix;
            if (transform && transform !== "none") {
                var match = transform.match(transformRegExp);
                if (match) {
                    switch(match[1]) {
                        case "matrix":
                            matrix = match[2].split(",").map(Util.trimText).map(Util.asFloat);
                            break;
                    }
                }
            }

            return {
                origin: transformOrigin,
                matrix: matrix
            };
        }

        function createStack(element, parentStack, bounds, transform) {
            var ctx = h2cRenderContext((!parentStack) ? documentWidth() : bounds.width , (!parentStack) ? documentHeight() : bounds.height),
                stack = {
                    ctx: ctx,
                    opacity: setOpacity(ctx, element, parentStack),
                    cssPosition: getCSS(element, "position"),
                    borders: getBorderData(element),
                    transform: transform,
                    clip: (parentStack && parentStack.clip) ? Util.Extend( {}, parentStack.clip ) : null
                };

            setZ(element, stack, parentStack);

            // TODO correct overflow for absolute content residing under a static position
            if (options.useOverflow === true && /(hidden|scroll|auto)/.test(getCSS(element, "overflow")) === true && /(BODY)/i.test(element.nodeName) === false){
                stack.clip = (stack.clip) ? clipBounds(stack.clip, bounds) : bounds;
            }

            return stack;
        }

        function getBackgroundBounds(borders, bounds, clip) {
            var backgroundBounds = {
                left: bounds.left + borders[3].width,
                top: bounds.top + borders[0].width,
                width: bounds.width - (borders[1].width + borders[3].width),
                height: bounds.height - (borders[0].width + borders[2].width)
            };

            if (clip) {
                backgroundBounds = clipBounds(backgroundBounds, clip);
            }

            return backgroundBounds;
        }

        function getBounds(element, transform) {
            var bounds = (transform.matrix) ? Util.OffsetBounds(element) : Util.Bounds(element);
            transform.origin[0] += bounds.left;
            transform.origin[1] += bounds.top;
            return bounds;
        }

        function renderElement(element, parentStack, pseudoElement, ignoreBackground) {
            var transform = getTransform(element, parentStack),
                bounds = getBounds(element, transform),
                image,
                stack = createStack(element, parentStack, bounds, transform),
                borders = stack.borders,
                ctx = stack.ctx,
                backgroundBounds = getBackgroundBounds(borders, bounds, stack.clip),
                borderData = parseBorders(element, bounds, borders),
                backgroundColor = (ignoreElementsRegExp.test(element.nodeName)) ? "#efefef" : getCSS(element, "backgroundColor");


            createShape(ctx, borderData.clip);

            ctx.save();
            ctx.clip();

            if (backgroundBounds.height > 0 && backgroundBounds.width > 0 && !ignoreBackground) {
                renderBackgroundColor(ctx, bounds, backgroundColor);
                renderBackgroundImage(element, backgroundBounds, ctx);
            } else if (ignoreBackground) {
                stack.backgroundColor =  backgroundColor;
            }

            ctx.restore();

            borderData.borders.forEach(function(border) {
                renderBorders(ctx, border.args, border.color);
            });

            if (!pseudoElement) {
                injectPseudoElements(element, stack);
            }

            switch(element.nodeName){
                case "IMG":
                    if ((image = loadImage(element.getAttribute('src')))) {
                        renderImage(ctx, element, image, bounds, borders);
                    } else {
                        Util.log("html2canvas: Error loading <img>:" + element.getAttribute('src'));
                    }
                    break;
                case "INPUT":
                    // TODO add all relevant type's, i.e. HTML5 new stuff
                    // todo add support for placeholder attribute for browsers which support it
                    if (/^(text|url|email|submit|button|reset)$/.test(element.type) && (element.value || element.placeholder || "").length > 0){
                        renderFormValue(element, bounds, stack);
                    }
                    break;
                case "TEXTAREA":
                    if ((element.value || element.placeholder || "").length > 0){
                        renderFormValue(element, bounds, stack);
                    }
                    break;
                case "SELECT":
                    if ((element.options||element.placeholder || "").length > 0){
                        renderFormValue(element, bounds, stack);
                    }
                    break;
                case "LI":
                    renderListItem(element, stack, backgroundBounds);
                    break;
                case "CANVAS":
                    renderImage(ctx, element, element, bounds, borders);
                    break;
            }

            return stack;
        }

        function isElementVisible(element) {
            return (getCSS(element, 'display') !== "none" && getCSS(element, 'visibility') !== "hidden" && !element.hasAttribute("data-html2canvas-ignore"));
        }

        function parseElement (element, stack, pseudoElement) {
            if (isElementVisible(element)) {
                stack = renderElement(element, stack, pseudoElement, false) || stack;
                if (!ignoreElementsRegExp.test(element.nodeName)) {
                    parseChildren(element, stack, pseudoElement);
                }
            }
        }

        function parseChildren(element, stack, pseudoElement) {
            Util.Children(element).forEach(function(node) {
                if (node.nodeType === node.ELEMENT_NODE) {
                    parseElement(node, stack, pseudoElement);
                } else if (node.nodeType === node.TEXT_NODE) {
                    renderText(element, node, stack);
                }
            });
        }

        function init() {
            var background = getCSS(document.documentElement, "backgroundColor"),
                transparentBackground = (Util.isTransparent(background) && element === document.body),
                stack = renderElement(element, null, false, transparentBackground);
            parseChildren(element, stack);

            if (transparentBackground) {
                background = stack.backgroundColor;
            }

            body.removeChild(hidePseudoElements);
            return {
                backgroundColor: background,
                stack: stack
            };
        }

        return init();
    };

    function h2czContext(zindex) {
        return {
            zindex: zindex,
            children: []
        };
    }

    _html2canvas.Preload = function( options ) {

        var images = {
                numLoaded: 0,   // also failed are counted here
                numFailed: 0,
                numTotal: 0,
                cleanupDone: false
            },
            pageOrigin,
            Util = _html2canvas.Util,
            methods,
            i,
            count = 0,
            element = options.elements[0] || document.body,
            doc = element.ownerDocument,
            domImages = element.getElementsByTagName('img'), // Fetch images of the present element only
            imgLen = domImages.length,
            link = doc.createElement("a"),
            supportCORS = (function( img ){
                return (img.crossOrigin !== undefined);
            })(new Image()),
            timeoutTimer;

        link.href = window.location.href;
        pageOrigin  = link.protocol + link.host;

        function isSameOrigin(url){
            link.href = url;
            link.href = link.href; // YES, BELIEVE IT OR NOT, that is required for IE9 - http://jsfiddle.net/niklasvh/2e48b/
            var origin = link.protocol + link.host;
            return (origin === pageOrigin);
        }

        function start(){
            Util.log("html2canvas: start: images: " + images.numLoaded + " / " + images.numTotal + " (failed: " + images.numFailed + ")");
            if (!images.firstRun && images.numLoaded >= images.numTotal){
                Util.log("Finished loading images: # " + images.numTotal + " (failed: " + images.numFailed + ")");

                if (typeof options.complete === "function"){
                    options.complete(images);
                }

            }
        }

        // TODO modify proxy to serve images with CORS enabled, where available
        function proxyGetImage(url, img, imageObj){
            var callback_name,
                scriptUrl = options.proxy,
                script;

            link.href = url;
            url = link.href; // work around for pages with base href="" set - WARNING: this may change the url

            callback_name = 'html2canvas_' + (count++);
            imageObj.callbackname = callback_name;

            if (scriptUrl.indexOf("?") > -1) {
                scriptUrl += "&";
            } else {
                scriptUrl += "?";
            }
            scriptUrl += 'url=' + encodeURIComponent(url) + '&callback=' + callback_name;
            script = doc.createElement("script");

            window[callback_name] = function(a){
                if (a.substring(0,6) === "error:"){
                    imageObj.succeeded = false;
                    images.numLoaded++;
                    images.numFailed++;
                    start();
                } else {
                    setImageLoadHandlers(img, imageObj);
                    img.src = a;
                }
                window[callback_name] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
                try {
                    delete window[callback_name];  // for all browser that support this
                } catch(ex) {}
                script.parentNode.removeChild(script);
                script = null;
                delete imageObj.script;
                delete imageObj.callbackname;
            };

            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", scriptUrl);
            imageObj.script = script;
            window.document.body.appendChild(script);

        }

        function loadPseudoElement(element, type) {
            var style = window.getComputedStyle(element, type),
                content = style.content;
            if (content.substr(0, 3) === 'url') {
                methods.loadImage(_html2canvas.Util.parseBackgroundImage(content)[0].args[0]);
            }
            loadBackgroundImages(style.backgroundImage, element);
        }

        function loadPseudoElementImages(element) {
            loadPseudoElement(element, ":before");
            loadPseudoElement(element, ":after");
        }

        function loadGradientImage(backgroundImage, bounds) {
            var img = _html2canvas.Generate.Gradient(backgroundImage, bounds);

            if (img !== undefined){
                images[backgroundImage] = {
                    img: img,
                    succeeded: true
                };
                images.numTotal++;
                images.numLoaded++;
                start();
            }
        }

        function invalidBackgrounds(background_image) {
            return (background_image && background_image.method && background_image.args && background_image.args.length > 0 );
        }

        function loadBackgroundImages(background_image, el) {
            var bounds;

            _html2canvas.Util.parseBackgroundImage(background_image).filter(invalidBackgrounds).forEach(function(background_image) {
                if (background_image.method === 'url') {
                    methods.loadImage(background_image.args[0]);
                } else if(background_image.method.match(/\-?gradient$/)) {
                    if(bounds === undefined) {
                        bounds = _html2canvas.Util.Bounds(el);
                    }
                    loadGradientImage(background_image.value, bounds);
                }
            });
        }

        function getImages (el) {
            var elNodeType = false;

            // Firefox fails with permission denied on pages with iframes
            try {
                Util.Children(el).forEach(getImages);
            }
            catch( e ) {}

            try {
                elNodeType = el.nodeType;
            } catch (ex) {
                elNodeType = false;
                Util.log("html2canvas: failed to access some element's nodeType - Exception: " + ex.message);
            }

            if (elNodeType === 1 || elNodeType === undefined) {
                loadPseudoElementImages(el);
                try {
                    loadBackgroundImages(Util.getCSS(el, 'backgroundImage'), el);
                } catch(e) {
                    Util.log("html2canvas: failed to get background-image - Exception: " + e.message);
                }
                loadBackgroundImages(el);
            }
        }

        function setImageLoadHandlers(img, imageObj) {
            img.onload = function() {
                if ( imageObj.timer !== undefined ) {
                    // CORS succeeded
                    window.clearTimeout( imageObj.timer );
                }

                images.numLoaded++;
                imageObj.succeeded = true;
                img.onerror = img.onload = null;
                start();
            };
            img.onerror = function() {
                if (img.crossOrigin === "anonymous") {
                    // CORS failed
                    window.clearTimeout( imageObj.timer );

                    // let's try with proxy instead
                    if ( options.proxy ) {
                        var src = img.src;
                        img = new Image();
                        imageObj.img = img;
                        img.src = src;

                        proxyGetImage( img.src, img, imageObj );
                        return;
                    }
                }

                images.numLoaded++;
                images.numFailed++;
                imageObj.succeeded = false;
                img.onerror = img.onload = null;
                start();
            };
        }

        methods = {
            loadImage: function( src ) {
                var img, imageObj;
                if ( src && images[src] === undefined ) {
                    img = new Image();
                    if ( src.match(/data:image\/.*;base64,/i) ) {
                        img.src = src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, '');
                        imageObj = images[src] = {
                            img: img
                        };
                        images.numTotal++;
                        setImageLoadHandlers(img, imageObj);
                    } else if ( isSameOrigin( src ) || options.allowTaint ===  true ) {
                        imageObj = images[src] = {
                            img: img
                        };
                        images.numTotal++;
                        setImageLoadHandlers(img, imageObj);
                        img.src = src;
                    } else if ( supportCORS && !options.allowTaint && options.useCORS ) {
                        // attempt to load with CORS

                        img.crossOrigin = "anonymous";
                        imageObj = images[src] = {
                            img: img
                        };
                        images.numTotal++;
                        setImageLoadHandlers(img, imageObj);
                        img.src = src;
                    } else if ( options.proxy ) {
                        imageObj = images[src] = {
                            img: img
                        };
                        images.numTotal++;
                        proxyGetImage( src, img, imageObj );
                    }
                }

            },
            cleanupDOM: function(cause) {
                var img, src;
                if (!images.cleanupDone) {
                    if (cause && typeof cause === "string") {
                        Util.log("html2canvas: Cleanup because: " + cause);
                    } else {
                        Util.log("html2canvas: Cleanup after timeout: " + options.timeout + " ms.");
                    }

                    for (src in images) {
                        if (images.hasOwnProperty(src)) {
                            img = images[src];
                            if (typeof img === "object" && img.callbackname && img.succeeded === undefined) {
                                // cancel proxy image request
                                window[img.callbackname] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
                                try {
                                    delete window[img.callbackname];  // for all browser that support this
                                } catch(ex) {}
                                if (img.script && img.script.parentNode) {
                                    img.script.setAttribute("src", "about:blank");  // try to cancel running request
                                    img.script.parentNode.removeChild(img.script);
                                }
                                images.numLoaded++;
                                images.numFailed++;
                                Util.log("html2canvas: Cleaned up failed img: '" + src + "' Steps: " + images.numLoaded + " / " + images.numTotal);
                            }
                        }
                    }

                    // cancel any pending requests
                    if(window.stop !== undefined) {
                        window.stop();
                    } else if(document.execCommand !== undefined) {
                        document.execCommand("Stop", false);
                    }
                    if (document.close !== undefined) {
                        document.close();
                    }
                    images.cleanupDone = true;
                    if (!(cause && typeof cause === "string")) {
                        start();
                    }
                }
            },

            renderingDone: function() {
                if (timeoutTimer) {
                    window.clearTimeout(timeoutTimer);
                }
            }
        };

        if (options.timeout > 0) {
            timeoutTimer = window.setTimeout(methods.cleanupDOM, options.timeout);
        }

        Util.log('html2canvas: Preload starts: finding background-images');
        images.firstRun = true;

        getImages(element);

        Util.log('html2canvas: Preload: Finding images');
        // load <img> images
        for (i = 0; i < imgLen; i+=1){
            methods.loadImage( domImages[i].getAttribute( "src" ) );
        }

        images.firstRun = false;
        Util.log('html2canvas: Preload: Done.');
        if (images.numTotal === images.numLoaded) {
            start();
        }

        return methods;
    };

    _html2canvas.Renderer = function(parseQueue, options){

        // http://www.w3.org/TR/CSS21/zindex.html
        function createRenderQueue(parseQueue) {
            var queue = [],
                rootContext;

            rootContext = (function buildStackingContext(rootNode) {
                var rootContext = {};
                function insert(context, node, specialParent) {
                    var zi = (node.zIndex.zindex === 'auto') ? 0 : Number(node.zIndex.zindex),
                        contextForChildren = context, // the stacking context for children
                        isPositioned = node.zIndex.isPositioned,
                        isFloated = node.zIndex.isFloated,
                        stub = {node: node},
                        childrenDest = specialParent; // where children without z-index should be pushed into

                    if (node.zIndex.ownStacking) {
                        // '!' comes before numbers in sorted array
                        contextForChildren = stub.context = { '!': [{node:node, children: []}]};
                        childrenDest = undefined;
                    } else if (isPositioned || isFloated) {
                        childrenDest = stub.children = [];
                    }

                    if (zi === 0 && specialParent) {
                        specialParent.push(stub);
                    } else {
                        if (!context[zi]) { context[zi] = []; }
                        context[zi].push(stub);
                    }

                    node.zIndex.children.forEach(function(childNode) {
                        insert(contextForChildren, childNode, childrenDest);
                    });
                }
                insert(rootContext, rootNode);
                return rootContext;
            })(parseQueue);

            function sortZ(context) {
                Object.keys(context).sort().forEach(function(zi) {
                    var nonPositioned = [],
                        floated = [],
                        positioned = [],
                        list = [];

                    // positioned after static
                    context[zi].forEach(function(v) {
                        if (v.node.zIndex.isPositioned || v.node.zIndex.opacity < 1) {
                            // http://www.w3.org/TR/css3-color/#transparency
                            // non-positioned element with opactiy < 1 should be stacked as if it were a positioned element with ‘z-index: 0’ and ‘opacity: 1’.
                            positioned.push(v);
                        } else if (v.node.zIndex.isFloated) {
                            floated.push(v);
                        } else {
                            nonPositioned.push(v);
                        }
                    });

                    (function walk(arr) {
                        arr.forEach(function(v) {
                            list.push(v);
                            if (v.children) { walk(v.children); }
                        });
                    })(nonPositioned.concat(floated, positioned));

                    list.forEach(function(v) {
                        if (v.context) {
                            sortZ(v.context);
                        } else {
                            queue.push(v.node);
                        }
                    });
                });
            }

            sortZ(rootContext);

            return queue;
        }

        function getRenderer(rendererName) {
            var renderer;

            if (typeof options.renderer === "string" && _html2canvas.Renderer[rendererName] !== undefined) {
                renderer = _html2canvas.Renderer[rendererName](options);
            } else if (typeof rendererName === "function") {
                renderer = rendererName(options);
            } else {
                throw new Error("Unknown renderer");
            }

            if ( typeof renderer !== "function" ) {
                throw new Error("Invalid renderer defined");
            }
            return renderer;
        }

        return getRenderer(options.renderer)(parseQueue, options, document, createRenderQueue(parseQueue.stack), _html2canvas);
    };

    _html2canvas.Util.Support = function (options, doc) {

        function supportSVGRendering() {
            var img = new Image(),
                canvas = doc.createElement("canvas"),
                ctx = (canvas.getContext === undefined) ? false : canvas.getContext("2d");
            if (ctx === false) {
                return false;
            }
            canvas.width = canvas.height = 10;
            img.src = [
                "data:image/svg+xml,",
                "<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>",
                "<foreignObject width='10' height='10'>",
                "<div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>",
                "sup",
                "</div>",
                "</foreignObject>",
                "</svg>"
            ].join("");
            try {
                ctx.drawImage(img, 0, 0);
                canvas.toDataURL();
            } catch(e) {
                return false;
            }
            _html2canvas.Util.log('html2canvas: Parse: SVG powered rendering available');
            return true;
        }

        // Test whether we can use ranges to measure bounding boxes
        // Opera doesn't provide valid bounds.height/bottom even though it supports the method.

        function supportRangeBounds() {
            var r, testElement, rangeBounds, rangeHeight, support = false;

            if (doc.createRange) {
                r = doc.createRange();
                if (r.getBoundingClientRect) {
                    testElement = doc.createElement('boundtest');
                    testElement.style.height = "123px";
                    testElement.style.display = "block";
                    doc.body.appendChild(testElement);

                    r.selectNode(testElement);
                    rangeBounds = r.getBoundingClientRect();
                    rangeHeight = rangeBounds.height;

                    if (rangeHeight === 123) {
                        support = true;
                    }
                    doc.body.removeChild(testElement);
                }
            }

            return support;
        }

        return {
            rangeBounds: supportRangeBounds(),
            svgRendering: options.svgRendering && supportSVGRendering()
        };
    };
    window.html2canvas = function(elements, opts) {
        elements = (elements.length) ? elements : [elements];
        var queue,
            canvas,
            options = {
                // general
                logging: false,
                elements: elements,
                background: "#fff",

                // preload options
                proxy: null,
                timeout: 0,    // no timeout
                useCORS: false, // try to load images as CORS (where available), before falling back to proxy
                allowTaint: false, // whether to allow images to taint the canvas, won't need proxy if set to true

                // parse options
                svgRendering: false, // use svg powered rendering where available (FF11+)
                ignoreElements: "IFRAME|OBJECT|PARAM",
                useOverflow: true,
                letterRendering: false,
                chinese: false,

                // render options

                width: null,
                height: null,
                taintTest: true, // do a taint test with all images before applying to canvas
                renderer: "Canvas"
            };

        options = _html2canvas.Util.Extend(opts, options);

        _html2canvas.logging = options.logging;
        options.complete = function( images ) {

            if (typeof options.onpreloaded === "function") {
                if ( options.onpreloaded( images ) === false ) {
                    return;
                }
            }
            queue = _html2canvas.Parse( images, options );

            if (typeof options.onparsed === "function") {
                if ( options.onparsed( queue ) === false ) {
                    return;
                }
            }

            canvas = _html2canvas.Renderer( queue, options );

            if (typeof options.onrendered === "function") {
                options.onrendered( canvas );
            }


        };

        // for pages without images, we still want this to be async, i.e. return methods before executing
        window.setTimeout( function(){
            _html2canvas.Preload( options );
        }, 0 );

        return {
            render: function( queue, opts ) {
                return _html2canvas.Renderer( queue, _html2canvas.Util.Extend(opts, options) );
            },
            parse: function( images, opts ) {
                return _html2canvas.Parse( images, _html2canvas.Util.Extend(opts, options) );
            },
            preload: function( opts ) {
                return _html2canvas.Preload( _html2canvas.Util.Extend(opts, options) );
            },
            log: _html2canvas.Util.log
        };
    };

    window.html2canvas.log = _html2canvas.Util.log; // for renderers
    window.html2canvas.Renderer = {
        Canvas: undefined // We are assuming this will be used
    };
    _html2canvas.Renderer.Canvas = function(options) {
        options = options || {};

        var doc = document,
            safeImages = [],
            testCanvas = document.createElement("canvas"),
            testctx = testCanvas.getContext("2d"),
            Util = _html2canvas.Util,
            canvas = options.canvas || doc.createElement('canvas');

        function createShape(ctx, args) {
            ctx.beginPath();
            args.forEach(function(arg) {
                ctx[arg.name].apply(ctx, arg['arguments']);
            });
            ctx.closePath();
        }

        function safeImage(item) {
            if (safeImages.indexOf(item['arguments'][0].src ) === -1) {
                testctx.drawImage(item['arguments'][0], 0, 0);
                try {
                    testctx.getImageData(0, 0, 1, 1);
                } catch(e) {
                    testCanvas = doc.createElement("canvas");
                    testctx = testCanvas.getContext("2d");
                    return false;
                }
                safeImages.push(item['arguments'][0].src);
            }
            return true;
        }

        function renderItem(ctx, item) {
            switch(item.type){
                case "variable":
                    ctx[item.name] = item['arguments'];
                    break;
                case "function":
                    switch(item.name) {
                        case "createPattern":
                            if (item['arguments'][0].width > 0 && item['arguments'][0].height > 0) {
                                try {
                                    ctx.fillStyle = ctx.createPattern(item['arguments'][0], "repeat");
                                }
                                catch(e) {
                                    Util.log("html2canvas: Renderer: Error creating pattern", e.message);
                                }
                            }
                            break;
                        case "drawShape":
                            createShape(ctx, item['arguments']);
                            break;
                        case "drawImage":
                            if (item['arguments'][8] > 0 && item['arguments'][7] > 0) {
                                if (!options.taintTest || (options.taintTest && safeImage(item))) {
                                    ctx.drawImage.apply( ctx, item['arguments'] );
                                }
                            }
                            break;
                        default:
                            ctx[item.name].apply(ctx, item['arguments']);
                    }
                    break;
            }
        }

        return function(parsedData, options, document, queue, _html2canvas) {
            var ctx = canvas.getContext("2d"),
                newCanvas,
                bounds,
                fstyle,
                zStack = parsedData.stack;

            canvas.width = canvas.style.width =  options.width || zStack.ctx.width;
            canvas.height = canvas.style.height = options.height || zStack.ctx.height;

            fstyle = ctx.fillStyle;
            ctx.fillStyle = (Util.isTransparent(zStack.backgroundColor) && options.background !== undefined) ? options.background : parsedData.backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = fstyle;

            queue.forEach(function(storageContext) {
                // set common settings for canvas
                ctx.textBaseline = "bottom";
                ctx.save();

                if (storageContext.transform.matrix) {
                    ctx.translate(storageContext.transform.origin[0], storageContext.transform.origin[1]);
                    ctx.transform.apply(ctx, storageContext.transform.matrix);
                    ctx.translate(-storageContext.transform.origin[0], -storageContext.transform.origin[1]);
                }

                if (storageContext.clip){
                    ctx.beginPath();
                    ctx.rect(storageContext.clip.left, storageContext.clip.top, storageContext.clip.width, storageContext.clip.height);
                    ctx.clip();
                }

                if (storageContext.ctx.storage) {
                    storageContext.ctx.storage.forEach(function(item) {
                        renderItem(ctx, item);
                    });
                }

                ctx.restore();
            });

            Util.log("html2canvas: Renderer: Canvas renderer done - returning canvas obj");

            if (options.elements.length === 1) {
                if (typeof options.elements[0] === "object" && options.elements[0].nodeName !== "BODY") {
                    // crop image to the bounds of selected (single) element
                    bounds = _html2canvas.Util.Bounds(options.elements[0]);
                    newCanvas = document.createElement('canvas');
                    newCanvas.width = Math.ceil(bounds.width);
                    newCanvas.height = Math.ceil(bounds.height);
                    ctx = newCanvas.getContext("2d");

                    ctx.drawImage(canvas, bounds.left, bounds.top, bounds.width, bounds.height, 0, 0, bounds.width, bounds.height);
                    canvas = null;
                    return newCanvas;
                }
            }

            return canvas;
        };
    };
})(window,document);