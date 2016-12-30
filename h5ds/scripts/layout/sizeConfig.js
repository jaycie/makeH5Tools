//页面整体参数，暴露出去
define(function(require,exports,module){
	//布局参数
	exports.size = {
		left_width : 184, //左边宽
		right_width : 250, //右边宽
		top_height : 60, //顶部高
		addPage_height : 50,//添加页面的按钮高度
		cPhone_hei : 1038, //cPhone 的高度
		wind_width : $(window).width(),
		wind_height : $(window).height(),
		dataSetHeight : 330+10,//10为间距
		cutOffRule: 10 //分割线的高度
	};
});