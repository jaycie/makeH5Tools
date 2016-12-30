//全局的公用函数
define(function(require,exports,module){
	var allObj = require('./objConfig');
	var ifun = require('./ifunction');
	var lfun = require('./layerObjIfun');
	
	/**
	* 图片图层 独有的方法
	*/
	var textLayer = function(type){
		var $this = allObj.obj.$layer;
		//图片图层，和文字图层独有的 $element对象 ， 用于存储 背景色，动画效果
		allObj.obj.$element = $this.find(".element");
		var v = {
			typename : "文本图层",
			content : null, //文本内容
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
			fontSize : null, //字体大小
			fontWeight : null, //加粗
			fontStyle : null, //倾斜 oblique
			textDecoration : null, //中线
			textAlign : null, //对齐方式
			color : null, //文本颜色
			lineHeight : null, //行距
			letterSpacing : null, //间距
			type : type, //点击类型
			center : "normal", //文本居中
			layerType : "layer-text" //图层类型
		};
		
		//赋值
		v.name = $this.attr("name");
		v.content = allObj.obj.$element.find(".el-text").html();
		v.top = $this.position().top.toFixed(0);
		v.left = $this.position().left.toFixed(0);
		v.width = $this.width();
		v.height = $this.height();
		v.rotate = $this.rotationDegrees();
		v.opacity = $this.css("opacity");
		v.filterBlur = $this.css("filter");
		v.fontSize = $this.css("font-size");
		v.fontWeight = $this.css("font-weight");
		v.fontStyle = $this.css("font-style");
		v.textDecoration = $this.css("text-decoration");
		v.textAlign = $this.css("text-align");
		v.textColor = $this.css("color");
		v.lineHeight = $this.css("line-height");
		v.letterSpacing = $this.css("letter-spacing");
		v.borderColor = allObj.obj.$element.css("border-color");//边框
		v.borderStyle = allObj.obj.$element.css("border-style");
		v.borderWidth = allObj.obj.$element.css("border-width");
		v.boxShadow = allObj.obj.$element.css("box-shadow");
		v.borderRadius = allObj.obj.$element.css("border-radius");
		v.animate = allObj.obj.$element.attr("class").replace("element ","");
		v.center = allObj.obj.$element.attr("class").indexOf("layer-text-center") != -1 ? "center" : "normal";
		v.backgroundColor = allObj.obj.$element.css("background-color");
		v.delayTime = allObj.obj.$element.css("-webkit-animation-delay");
		v.playTime = allObj.obj.$element.css("-webkit-animation-duration");
		v.playCount = allObj.obj.$element.css("-webkit-animation-iteration-count");
		
		//
		//console.log(v);
		
		//基础参数数据 拼接 - 渲染
		lfun.ifun.basicDataReplace(v);
		if(v.center=="center"){
			v.textAlign = "normal"	
		}
		var _basicSetBoxText = allObj.obj._basicSetBoxText;
		_basicSetBoxText = _basicSetBoxText.replace("{{box_width}}",v.width);
		_basicSetBoxText = _basicSetBoxText.replace("{{box_height}}",v.height);
		_basicSetBoxText = _basicSetBoxText.replace("{{font_bold}}",v.fontWeight=="bolder"?"on":"");
		_basicSetBoxText = _basicSetBoxText.replace("{{font_underline}}",v.textDecoration=="underline"?"on":"");
		_basicSetBoxText = _basicSetBoxText.replace("{{font_italic}}",v.fontStyle=="italic"?"on":"");
		_basicSetBoxText = _basicSetBoxText.replace("{{font_strikethrough}}",v.textDecoration=="line-through"?"on":"");
		_basicSetBoxText = _basicSetBoxText.replace("{{font_alignLeft}}",v.textAlign=="left"?"on":"");
		_basicSetBoxText = _basicSetBoxText.replace("{{font_alignCenter}}",v.textAlign=="center"?"on":"");
		_basicSetBoxText = _basicSetBoxText.replace("{{font_alignRight}}",v.textAlign=="right"?"on":"");
		_basicSetBoxText = _basicSetBoxText.replace("{{font_Center}}",v.center=="center"?"on":"");
		_basicSetBoxText = _basicSetBoxText.replace("{{fontsize}}",parseInt(v.fontSize));
		_basicSetBoxText = _basicSetBoxText.replace("{{fontlineHeight}}", isNaN(parseInt(v.lineHeight)) ? "":parseInt(v.lineHeight));
		_basicSetBoxText = _basicSetBoxText.replace("{{fontetterSpacing}}",parseInt(v.letterSpacing));
		_basicSetBoxText = _basicSetBoxText.replace("{{fontcolor}}",v.textColor.colorHex());
		
		$("#basicSetBoxText").html(_basicSetBoxText);
		
		allObj.obj.$basicSet_box_other.css("display","none");
		$("#basicSetBoxText").css("display","block");
		
		//基础参数
		lfun.ifun.basicSet($this,v);
		
		//设置文本的尺寸
		$("#text_box_width").on("change",function(){
			$this.width($(this).val());
			allObj.obj.$selectBox.css("display","none");
		});
		$("#text_box_height").on("change",function(){
			$this.height($(this).val());
			allObj.obj.$selectBox.css("display","none");	
		});
		
		//文本独有
		var $textLayerArea = $("#textLayerArea").attr('contenteditable', true);
		$textLayerArea.html(allObj.obj.$element.find(".el-text").html());
		$("#textLayerArea").on("keydown",function(e){e.stopPropagation();}).on("keyup",function(event){
			var text = $textLayerArea.html();
			
			//清除格式
			text = text.replace( /style="[^"]*"/g,"");

			allObj.obj.$element.find(".el-text").html(text);
			allObj.obj.$picListUl.find('>.active :text').val( $('<div/>').html(text).text() );
			ifun.ifun_callback();
		});
		//文本框绑定右侧文本 数据同步
		allObj.obj.$element.find(".el-text").on("keydown",function(e){e.stopPropagation();}).on("keyup",function(event){
			var text = $(this).html();
			
			//清除格式
			text = text.replace( /style="[^"]*"/g,"");

			$textLayerArea.html(text);
		});
		
		//富文本编辑器
		//加粗
		$("#font_bold").on("click",function(){
			if($(this).attr("class") != "on"){
				$this.css({
					"font-weight" : "bolder"
				});
				$(this).addClass("on");
			}
			else{
				$this.css({
					"font-weight" : "normal"
				});
				$(this).removeClass();
			}
			ifun.ifun_callback();
		});
		
		// 字体设置
		$('#setPageFont').on('change',function(){
			var fname = $(this).val();
			if( /[^\W\\\s]+/g.test(fname) )fname = '"'+fname+'"';
			$this.css('font-family', fname);
			ifun.ifun_callback();
		})
		
		//下划线
		var $font_underline = $("#font_underline");
		var $font_strikethrough = $("#font_strikethrough");
		
		$font_underline.on("click",function(){
			if($(this).attr("class") != "on"){
				$this.css({
					"text-decoration" : "underline"	
				});
				$(this).addClass("on");
			}
			else{
				$this.css({
					"text-decoration" : "initial"	
				});
				$(this).removeClass();	
			}
			$font_strikethrough.removeClass();	
			ifun.ifun_callback();
		});
		
		//中线
		$font_strikethrough.on("click",function(){
			if($(this).attr("class") != "on"){
				$this.css({
					"text-decoration" : "line-through"	
				});
				$(this).addClass("on");
			}
			else{
				$this.css({
					"text-decoration" : "initial"	
				});
				$(this).removeClass();	
			}
			$font_underline.removeClass();
			ifun.ifun_callback();
		});
		
		//倾斜
		$("#font_italic").on("click",function(){
			if($(this).attr("class") != "on"){
				$this.css({
					"font-style" : "italic"	
				});
				$(this).addClass("on");
			}
			else{
				$this.css({
					"font-style" : "normal"	
				});
				$(this).removeClass();	
				ifun.ifun_callback();
			}
		});
		
		//对齐方式
		var $font_alignLeft = $("#font_alignLeft");
		var $font_alignCenter = $("#font_alignCenter");
		var $font_alignRight = $("#font_alignRight");
		var $font_Center = $("#font_Center");
		
		$font_alignLeft.on("click",function(){
			if($(this).attr("class") != "on"){
				$this.css({
					"text-align" : "left"	
				});
				$(this).addClass("on");
			}
			else{
				$this.css({
					"text-align" : "normal"	
				});
				$(this).removeClass();	
			}
			allObj.obj.$element.removeClass("layer-text-center");
			$font_alignCenter.removeClass();
			$font_alignRight.removeClass();
			$font_Center.removeClass();
			ifun.ifun_callback();
		});
		
		//居中对齐
		$font_alignCenter.on("click",function(){
			if($(this).attr("class") != "on"){
				$this.css({
					"text-align" : "center"	
				});
				$(this).addClass("on");
			}
			else{
				$this.css({
					"text-align" : "normal"	
				});
				$(this).removeClass();	
			}
			allObj.obj.$element.removeClass("layer-text-center");
			$font_alignLeft.removeClass();
			$font_alignRight.removeClass();
			$font_Center.removeClass();
			ifun.ifun_callback();
		});
		
		//右对齐
		$font_alignRight.on("click",function(){
			if($(this).attr("class") != "on"){
				$this.css({
					"text-align" : "right"	
				});
				$(this).addClass("on");
			}
			else{
				$this.css({
					"text-align" : "normal"	
				});
				$(this).removeClass();	
			}
			allObj.obj.$element.removeClass("layer-text-center");
			$font_alignCenter.removeClass();
			$font_alignLeft.removeClass();
			$font_Center.removeClass();
			ifun.ifun_callback();
		});
		
		//文本整体居中
		$font_Center.on("click",function(){
			if($(this).attr("class") != "on"){
				allObj.obj.$element.addClass("layer-text-center");
				$(this).addClass("on");
			}
			else{
				allObj.obj.$element.removeClass("layer-text-center");
				$(this).removeClass();	
			}
			$font_alignCenter.removeClass();
			$font_alignLeft.removeClass();
			$font_alignRight.removeClass();
			ifun.ifun_callback();
		});
		
		//字体大小
		$("#font_sizeInput").on("change",function(){
			$this.css({
				"font-size" : $(this).val() + "px"
			});
			ifun.ifun_callback();
		});
		
		//字体行距
		$("#font_lineHeightInput").on("change",function(){
			if($(this).val() != ""){
				$this.css({
					"line-height" : $(this).val() + "px"
				});
			}
			else{
				$this.css({
					"line-height" : "normal"
				});	
			}
			ifun.ifun_callback();
		});
		
		//字体间距
		$("#font_letterSpacingInput").on("change",function(){
			if($(this).val() != ""){
				$this.css({
					"letter-spacing" : $(this).val() + "px"
				});
			}
			else{
				$this.css({
					"line-height" : "normal"
				});	
			}
			ifun.ifun_callback();
		});
		
		//字体颜色
		$("#font_color").on("change",function(){
			$this.css("color",$(this).val().colorHex());	
			ifun.ifun_callback();	
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
	exports.textLayer = function(type){
		textLayer(type);
	};
	
	//暴露 zoomText 方法
//	exports.zoomText = function($this,v){
//		zoomText($this,v);
//	};
	
});