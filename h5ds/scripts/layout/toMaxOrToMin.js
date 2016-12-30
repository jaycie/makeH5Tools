//画布缩放功能
define(function(require,exports,module){
	//缩放功能
	var toMaxOrToMin = function(){
		var $cPhone = $("#cPhone");
		var scale = parseFloat($cPhone.css("-webkit-transform").split("(")[1].split(",")[0]);
		
		//to max
		var toMax = function(){
			$cPhone.css({
				"-webkit-transform" : "scale("+(scale+0.1)+")"
			});
			scale+=0.1;
			if(scale >= 2){
				scale=2;	
			}	
		};
		
		//to min
		var toMin = function(){
			$cPhone.css({
				"-webkit-transform" : "scale("+(scale-0.1)+")"
			});
			scale-=0.1;
			if(scale <= 0.2){
				scale=0.2;	
			}	
		};
		
		$("#seeMin").on("click",function(){
			toMin();
		});
		$("#seeMax").on("click",function(){
			toMax();
		});	
		$("#seeDefault").on("click",function(){
			$cPhone.css({
				"-webkit-transform" : "scale("+1+")"
			});
			scale=1;
		});	
		
		//快捷键
		$(window).keydown(function(event){
			if(event.ctrlKey && event.keyCode){
				switch(event.keyCode) {
					case 187: toMax();break;
					case 189: toMin();break;
				}
			}	
		});	
	};
	
	//暴露接口
	exports.toMaxOrToMin = function(){
        toMaxOrToMin();
    }
	
});