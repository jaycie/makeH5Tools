//全局的公用函数
define(function(require,exports,module){
    var pageMain = require( './main' ),
        allObj   = require('./objConfig'),
        ifun     = require('./ifunction'),
        lfun     = require('./layerObjIfun');
    
    //缩放图片
    var zoomPic = function($this,v){
        var real = {
            width : $this.attr("realsize").split(",")[0],
            height : $this.attr("realsize").split(",")[1]
        };
        var size = parseInt(v.width/real.width*100);
        if(size > 200){ size = 200;}
        
        var $zoom_pageSlider = $("#zoom_pageSlider");
        var $input = $zoom_pageSlider.next(".slider-input");
        var setCss = function(val){
            $input.val(val);
            var wid = val/100 * real.width, oimg = $this.find('img')[0];
            var hei = oimg.naturalHeight * wid / oimg.naturalWidth; //val/100 * real.height;
            $this.css({
                "width" : wid,
                "height" : hei
            }).trigger('imgresize');
            allObj.obj.$selectBox.css({
                "width" : wid + 4,
                "height" : hei + 4
            });    
            ifun.ifun_callback();
        };
        
        var input_zoom = function(val){
            $zoom_pageSlider.sliderMt({slider_callback:slider_zoom,input_callback:input_zoom,iniData:val});
            setCss(val);
        };
        var slider_zoom = function(val){
            setCss(val);
        };
        $zoom_pageSlider.sliderMt({slider_callback:slider_zoom,input_callback:input_zoom,iniData:size});
        $input.val(size);
    };
    
    /**
    * 图片图层 独有的方法
    */
    var picLayer = function(type){
        
        var $this = allObj.obj.$layer;
        //图片图层，和文字图层独有的 $element对象 ， 用于存储 背景色，动画效果, 圆角
        allObj.obj.$element = $this.find(".element");
        var v = {
            typename : "图片图层",
            name : null,
            url : null, //图片的地址
            top : null, //y轴
            left : null, //x轴
            width : null, //宽度
            height : null, //高度
            rotate : null, //旋转角度
            borderColor: null, //边框
            borderStyle: null,
            borderWidth: null,
            backgroundColor : null, //背景颜色
            opacity : null, //透明度
            borderRadius : null, //圆角
            filterBlur : null, //模糊
            boxShadow : null, //阴影
            animate : null, //动画名称
            delayTime : null, //延迟时间
            playTime : null, //播放时间
            playCount : null, //播放次数
            type : type, //点击类型
            layerType : "layer-pic" //图层类型
        };
        
        //赋值
        v.name = $this.attr("name");
        v.url = $this.find(".element").attr("src");
        v.top = parseInt($this.css("top"));
        v.left = parseInt($this.css("left"));
        v.width = $this.width();
        v.height = $this.height();
        v.rotate = $this.rotationDegrees();
        v.opacity = $this.css("opacity");
        v.filterBlur = $this.css("filter");
        v.borderColor = allObj.obj.$element.css("border-color");//边框
        v.borderStyle = allObj.obj.$element.css("border-style");
        v.borderWidth = allObj.obj.$element.css("border-width");
        v.boxShadow = allObj.obj.$element.css("box-shadow");
        v.borderRadius = allObj.obj.$element.css("border-radius");
        v.backgroundColor = allObj.obj.$element.css("background-color");
        v.animate = allObj.obj.$element.attr("class").replace("element ","");
        v.delayTime = allObj.obj.$element.css("-webkit-animation-delay");
        v.playTime = allObj.obj.$element.css("-webkit-animation-duration");
        v.playCount = allObj.obj.$element.css("-webkit-animation-iteration-count");
        
        
        //基础参数数据 拼接 - 渲染
        lfun.ifun.basicDataReplace(v);
        
        //图片独有的 - 渲染对象
        var _basicSetBoxPic = allObj.obj._basicSetBoxPic, oimg = allObj.obj.$layer.find('img');
        _basicSetBoxPic = _basicSetBoxPic.replace("{{url}}",v.url);
        allObj.obj.$basicSet_box_other.css("display","none");
        $("#basicSetBoxPic").html(_basicSetBoxPic).css("display","block");
        
        // 二维码 禁止删除，更换图片
        pageMain.referrer.yjsadmin||$('#changeLayerImage,#changeImageClear,.set-wh')[/(?:layer-scanCode)|(?:layer-scanCode-text)/g.test( allObj.obj.$layer.attr('id') )?'hide':'show']();
        // 操作 ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        //更换图片
        // $("#changeLayerImage").showWindow({id:"resources",center:false});
        $("#changeLayerImage").maskWindow({id:"appset_image_dialog",center:true, cb:function(){
            require('./flashPlayEvent').showFlashDialog();
        }});
        
        //移除图片 - 操作
        $("#changeImageClear").on("click",function(){
            $("#picListUl .active .del").trigger("click");
        });
        
        //缩放 - 操作
        zoomPic($this,v);
        //基础参数 - 操作
        lfun.ifun.basicSet($this,v);
        //拓展参数 - 操作
        lfun.ifun.moreSet($this,v);
        //动画效果 - 操作
        lfun.ifun.animateSet($this,v);
        //初始选项卡
        allObj.obj.$moreSet.css("display","block");
        allObj.obj.$animateSet.css("display","block");
        allObj.obj.$functionSet.css("display","block");
    };
    
    //返回rotate 角度
    exports.picLayer = function(type){
        picLayer(type);
    };
    
    //暴露 zoomPic 方法
    exports.zoomPic = function($this,v){
        zoomPic($this,v);
    };
    
});