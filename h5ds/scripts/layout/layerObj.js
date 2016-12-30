//页面整体参数，暴露出去
define(function(require,exports,module){
	var allObj = require('./objConfig');
	var ifun = require('./ifunction');
	
	//布局参数 - 入口
	exports.layer = {
		pic : function(type){ require('./layerObjPic').picLayer(type)},  //图片图层
		text : function(type){ require('./layerObjText').textLayer(type)}, //文字图层
		effect : function(type){ require('./layerObjEffect').effectLayer(type)}, //效果图层
		slider : function(type){ require('./layerObjSlider').sliderLayer(type)}, //幻灯片图层
		iframe : function(type){ require('./layerObjIframe').iframeLayer(type)}, //iframe图层
		form : function(type){ require('./layerObjForm').formLayer(type)}, //表单图层
		
		packet : function(type){ require('./layerObjEffect').effectLayer(type)} //特效图层 待优化
	};
	
});