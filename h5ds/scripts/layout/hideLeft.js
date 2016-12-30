// JavaScript Document
//左边页面列表隐藏显示
define(function(require,exports,module){
	var c = require('./sizeConfig');
	
	//左边隐藏，显示 - 点击按钮
	var hideLeft = function(){
		$("#hideLeftButton").click(function(){
			var data = $(this).attr("data");
			var $left = $("#left");
			var $center = $("#center");
			if(data == "hide"){
				$left.animate({left:-(c.size.left_width)+"px"});	
				$center.css({
					width : c.size.wind_width - c.size.right_width,
					left:0	
				});
				$(this).attr("data","show").html(">");
			}
			else{
				$left.animate({left:0});
				$center.css({
					width : c.size.wind_width - c.size.left_width - c.size.right_width,
					left : c.size.left_width
				});
				$(this).attr("data","hide").html("<");
			}
		});	
	};
	
	//暴露接口
	exports.hideLeft = function(){
        hideLeft();
    }
});