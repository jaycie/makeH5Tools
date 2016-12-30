//全局的公用函数
define(function(require,exports,module){
	var allObj = require('./objConfig');
	var ifun = require('./ifunction');
	var lfun = require('./layerObjIfun');
	
	/**
	* iframe图层 独有的方法
	*/
	var iframeLayer = function(type){
		var $this = allObj.obj.$layer;
		//图片图层，和文字图层独有的 $element对象 ， 用于存储 背景色，动画效果
		allObj.obj.$element = $this.find(".element");
		var v = {
			typename : "iframe图层",
			src : null, //嵌套页面
			name : null,
			top : null, //y轴
			left : null, //x轴
			width : null, //宽度
			height : null, //高度
			rotate : null, //旋转角度
			backgroundColor : null, //背景颜色
			borderColor: null, //边框
			borderStyle: null,
			borderWidth: null,
			opacity : null, //透明度
			borderRadius : null, //圆角
			filterBlur : null, //模糊
			boxShadow : null, //阴影
			animate : null, //动画名称
			delayTime : null, //延迟时间
			playTime : null, //播放时间
			playCount : null, //播放次数
			type : type, //点击类型
			layerType : "layer-iframe" //图层类型
		};
		
		//赋值
		v.name = $this.attr("name");
		v.src = allObj.obj.$element.find("iframe").attr("src");
		v.top = $this.position().top.toFixed(0);
		v.left = $this.position().left.toFixed(0);
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
		v.animate = allObj.obj.$element.attr("class").replace("element ","");

		v.backgroundColor = allObj.obj.$element.css("background-color");
		v.delayTime = allObj.obj.$element.css("-webkit-animation-delay");
		v.playTime = allObj.obj.$element.css("-webkit-animation-duration");
		v.playCount = allObj.obj.$element.css("-webkit-animation-iteration-count");
		
		console.log("====>",v);
		
		//基础参数数据 拼接 - 渲染
		lfun.ifun.basicDataReplace(v);

		var _basicSetBoxIframe = allObj.obj._basicSetBoxIframe;
		_basicSetBoxIframe = _basicSetBoxIframe.replace("{{box_width}}",v.width);
		_basicSetBoxIframe = _basicSetBoxIframe.replace("{{box_height}}",v.height);
		
		$("#basicSetBoxIframe").html(_basicSetBoxIframe);
		
		allObj.obj.$basicSet_box_other.css("display","none");
		$("#basicSetBoxIframe").css("display","block");
		
		//基础参数
		lfun.ifun.basicSet($this,v);
		
		//设置iframe的尺寸
		$("#text_box_width").on("change",function(){
			$this.width($(this).val());
			allObj.obj.$selectBox.css("display","none");
		});
		$("#text_box_height").on("change",function(){
			$this.height($(this).val());
			allObj.obj.$selectBox.css("display","none");	
		});

		//初始路径
		allObj.obj.$element.find("iframe").attr("src",v.src);

		//绑定路径输入框
		$("#iframeSrc").off("change").on('change', function() {
			allObj.obj.$element.find("iframe").attr("src",$(this).val());
		});
		
		//拓展参数 - 操作
		lfun.ifun.moreSet($this,v);
		
		//动画效果 - 操作
		lfun.ifun.animateSet($this,v);
		
		//初始选项卡
		allObj.obj.$moreSet.css("display","block");
		allObj.obj.$animateSet.css("display","block");
		allObj.obj.$functionSet.css("display","block");
		
	};
	
	//返回接口
	exports.iframeLayer = function(type){
		iframeLayer(type);
	};
	
	//暴露 zoomText 方法
//	exports.zoomText = function($this,v){
//		zoomText($this,v);
//	};
	
});