//全局的公用函数
define(function(require,exports,module){
	var allObj = require('./objConfig');
	var ifun = require('./ifunction');
	var lfun = require('./layerObjIfun');
	
	/**
	* 幻灯片图层 独有的方法
	*/
	var sliderLayer = function(type){
		var $this = allObj.obj.$layer;
		var v = {
			typename : "幻灯片",
			name : null,
			top : null, //y轴
			left : null, //x轴
			backgroundColor : null,
			type : type, //点击类型
			layerType : "layer-slider", //图层类型
			pics : [] //幻灯片图组
		};
		
		//赋值
		v.name = $this.attr("name");
		v.top = $this.position().top.toFixed(0);
		v.left = $this.position().left.toFixed(0);
		v.backgroundColor = $this.css("background-color");
		$this.find("li").each(function(){
			v.pics.push('<li><i class="iconfont icon-close"></i>'+$(this).html()+'</li>');	
		});
		
		
		//
		console.log(v);
		
		//基础参数数据 拼接 - 渲染
		lfun.ifun.basicDataReplace(v);
		
		//基础参数 - 操作
		lfun.ifun.basicSet($this,v);
		
		//渲染幻灯片操作区
		var _basicSetBoxSlider = allObj.obj._basicSetBoxSlider;
		//_basicSetBoxSlider = _basicSetBoxSlider.replace("/{{url}}/g",v.url);
		
		allObj.obj.$basicSet_box_other.css("display","none");
		$("#basicSetBoxSlider").html(_basicSetBoxSlider).css("display","block");
		var $sliderPicsBoxUl = $("#sliderPicsBoxUl");
		//初始化图集
		$sliderPicsBoxUl.html(v.pics);
		
		//添加幻灯片
		$("#addSliderBtn").off("click.addSliderBtn").on("click.addSliderBtn",function(){
			$sliderPicsBoxUl.append('<li><i class="iconfont icon-close"></i><img src="" /></li>');
			allObj.obj.$layer.find("ul").append('<li class="hide"><img src="" /></li>');
			ifun.ifun_callback();
		});
		
		//换图
		$sliderPicsBoxUl.off("click.sliderChangePic").on("click.sliderChangePic","li",function(){
			allObj.obj.selectImgResourcesLock = 4;
			$("#resources_btn").trigger("click");
			allObj.obj.$sliderThisImg = $(this).find("img");
		});
		
		//删除图片
		$sliderPicsBoxUl.off("click.sliderDelPic").on("click.sliderDelPic","i",function(e){
			e.stopPropagation();
			var $thisPic = $(this).parent();
			$thisPic.remove();
			allObj.obj.$layer.find("li").eq($thisPic.index()).remove();
			ifun.ifun_callback();
		});

		//初始选项卡
		allObj.obj.$moreSet.css("display","none");
		allObj.obj.$animateSet.css("display","none");
		allObj.obj.$functionSet.css("display","none");	
		
		allObj.obj.$basic.trigger("click");
	};
	
	//返回rotate 角度
	exports.sliderLayer = function(type){
		sliderLayer(type);
	};
	
});