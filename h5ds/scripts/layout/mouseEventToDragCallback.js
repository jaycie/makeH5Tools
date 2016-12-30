// JavaScript Document
//页面整体参数，暴露出去
define(function(require,exports,module){
	
	var allObj = require('./objConfig');
	var layer = require('./layerObj');
	var ifun = require('./ifunction');
	var picfun = require('./layerObjPic');
	var layerfun = require('./layerObjIfun');
	
	//核心 - 设置参数
	var getAndSetLayerVal = function(type){
		
		allObj.obj.$basic_box.css("display","block");

		//获取layer参数
		switch(ifun.returnLayerTpye()){
			case "layer-pic" : layer.layer.pic(type);break;
			case "layer-text" : layer.layer.text(type);break;
			case "layer-slider" : layer.layer.slider(type);break;
			case "layer-effect" : layer.layer.effect(type);break;
			case "layer-iframe" : layer.layer.iframe(type);break;
			case "layer-form" : layer.layer.form(type);break;
			case "layer-packet" : layer.layer.packet(type);break;
			default:alert("参数出错");break;
		}	
	};
	
	//设置 操作区 的 x 轴，y 轴的 input 参数
	var setLayerPositionVal = function(){
		//console.log(allObj.obj.$layer.css("left"));
		//console.log(allObj.obj.$layer.css("top"));
		var $basicSetBox = $("#basicSetBox"); //新对象
		$basicSetBox.find("input.ctop").val(parseFloat(allObj.obj.$layer.css("top")).toFixed(1));
		$basicSetBox.find("input.cleft").val(parseFloat(allObj.obj.$layer.css("left")).toFixed(1));
	};
	
	//设置zoom的值
	var setZoomVal = function(){
		var $this = allObj.obj.$layer;
		
		//能缩放的只有 图片图层 和 文本图层
		var setPicZoom = function(){
			var v = {
				width : null //缩放只影响宽度	
			};
			v.width = $this.width();
			picfun.zoomPic($this,v);
		};
		
		//文本图层的缩放
		var setTextZoom = function(){
			var v = {
				width : null ,//宽度
				height : null
			};
			v.width = $this.width();
			v.height = $this.height();
			
			//设置参数
			$("#text_box_width").val(v.width);
			$("#text_box_height").val(v.height);
		};
		
		switch(ifun.returnLayerTpye()){
			case "layer-pic": setPicZoom() ;break;
			case "layer-text": setTextZoom() ;break;	
		};
	};
	
	//单独设置 setRotate 的值
	var setRotate = function(){
		var $this = allObj.obj.$layer;
		var v = {
				rotate : null //缩放只影响宽度	
		};
		v.rotate = $this.rotationDegrees();
		layerfun.ifun.rotateLayer($this,v);
	};
	
	//全局回调
	var callback_all = function(type){
		//console.log("执行全局回调");	
		//allObj.obj.$layer = 
		//console.log(allObj.obj.$layer);
		//sameIndex
		//console.log(allObj.obj.$layer.index());
		
		//如果是背景图层，sameIndex = 0
		//console.log(allObj.obj.$layer.index());
		
		//console.log("callback_all 的type属性为：",type);
		
		//如果选择了新的layer对象，且点击的是同一个对象，不再初始化操作
		if(type == "clickLayer" || type == "clickLi"){

			//点击li，去掉背景图层的active //此处可以优化
			$("#layerBg").removeClass("active");
			
			//判断是否点击的是同一个对象
			if( allObj.obj.sameIndex != -1 && allObj.obj.sameIndex == allObj.obj.$layer.index()){
				return ;
			};
			allObj.obj.sameIndex = allObj.obj.$layer.index();
			
			//如果点击的是新对象，初始化操作
			getAndSetLayerVal(type);
		
		}else{ //如果发生了，缩放，旋转，位移，同步操作区数据
			switch(type){
				case "zoom" : setZoomVal();break; //只缩放
				case "rotate" : setRotate();break; //只旋转
			};
		}
		
		//执行全局回调
		ifun.ifun_callback();
		
//		switch(type){
//			case "clickLayer" : getAndSetLayerVal(type);break;
//			case "clickLi" : getAndSetLayerVal(type);break;
//			case "zoom" : null;break; //只缩放
//			case "rotate" : null;break; //只旋转
//			case "move" : null;break; //只位移
//		};
		
	};
	
	//回调函数集合
	exports.fun = {
		//移动位置 - 回调
		callback_position : function(){
			//console.log("图层位置发生变化");
			callback_all("move");
			setLayerPositionVal();
		},
		
		//旋转图层 - 回调
		callback_rotate : function(){
			//console.log("对象发生了旋转");
			callback_all("rotate");
		},
		
		//改变大小 - 回调
		callback_reWidthAndHeight : function(){
			//console.log("对象发生了缩放");
			callback_all("zoom");
		},
		
		//每次点击layer时 - 回调
		callback_click : function(){
			//console.log("每次点击layer时");
			callback_all("clickLayer");
		},
		
		//点击li 图层列表的时候 - 回调
		callback_selectLayerByLi : function($this){
			//allObj.obj.$layer = ifun.returnLayerByIndex($this.index());
			callback_all("clickLi");
		},
		
		//删除图层回调
		callback_delLayerByLi : function(index){
			console.log("删除成功了");
		}
	};
});