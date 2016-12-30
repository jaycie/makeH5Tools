// JavaScript Document
//分割线 拖动
define(function(require,exports,module){
	function cutOffRule(){
		//拖动分割线
		$("#cutOffRule").on("mousedown",function(e){
			var $picList = $("#picList");
			var $rdsBody = $("#rdsBody");
			var $dataSet = $("#dataSet");
			var $this = $(this);
			var set = {
				picList_hei : $picList.height(),
				rdsBody_hei : $rdsBody.height(),
				p_hei : null,
				r_hei : null,
				y_start : null,
				y_end : null,
				y_move : null,
				header : 30, //tab栏 高度
				minHeight : 100, //最小高度
				top_start : null,
				top_move : null
			};
			
			set.y_start = e.pageY;
			set.top_start = $this.position().top;
			
			//移动事件
			$(document).on("mousemove.cutOffRule",function(e){
				set.y_move = set.y_start - e.pageY;
				set.p_hei = set.picList_hei + set.y_move;
				set.r_hei = set.rdsBody_hei - set.y_move;
				
				//最小参数
				if( set.p_hei < set.minHeight){
					set.p_hei = set.minHeight
					return;
				}
				if(set.r_hei < set.minHeight){
					set.r_hei = set.minHeight
					return;
				}
				//重新设置位置
				$picList.height(set.p_hei);
				$rdsBody.height(set.r_hei);
				$dataSet.height(set.r_hei+set.header);
			}).on("mouseup.cutOffRule",function(){
				$(this).off("mousemove.cutOffRule mouseup.cutOffRule");	
			});
	
		});
	}
	
	//暴露接口
	exports.cutOffRule = function(){
        cutOffRule();
    }
});