var now = { row:1, col:1 }, last = { row:0, col:0};
(function(){
	//如果没幻灯片，直接不运行
	//if(!$(".layer-slider")[0])return;
	
	const towards = { up:1, right:2, down:3, left:4};
	var isAnimating = false;
	
	var $wrap = $(".wrap");
	var data = {
		pageNum : $wrap.length,
		lockSwipeUp : 1 //循环锁
	};
	
	//智能缩放
	//s=window.innerHeight/500;
	//ss=250*(1-s);
	//$('.wrap').css('-webkit-transform','scale('+s+','+s+') translate(0px,-'+ss+'px)');
	
	document.addEventListener('touchmove',function(event){ event.preventDefault(); },false);
	
	$(document).swipeLeft(function(){
		
		if (isAnimating) return;
		last.row = now.row;
		last.col = now.col;
		if (last.row == data.pageNum) {
			now.row = 1;
		}
		else{
			now.row = last.row+1; 
		}
		now.col = 1; 
		pageMove(towards.left);
	
		//如果滑动到最后一页，打开第一页向上的循环滑动
		if(now.row == data.pageNum){
			data.lockSwipeUp = 0;
			//console.log(1);	
		}
	})
	
	$(document).swipeRight(function(){
		if (isAnimating) return;
		last.row = now.row;
		last.col = now.col;
		//如果没打开循环
		if( data.lockSwipeUp == 1){
			if (last.row != 1) {
				now.row = last.row-1; 
				now.col = 1; 
				pageMove(towards.right);
			};
		}
		//打开向上的循环
		else{
			if (last.row == 1) {
				now.row = data.pageNum;
			}
			else{
				now.row = last.row-1; 
			}	
			now.col = 1; 
			pageMove(towards.right);
		};
	})
	
	function pageMove(tw){
		var lastPage = ".page-"+last.row+"-"+last.col,
			nowPage = ".page-"+now.row+"-"+now.col;
		
		switch(tw) {
			case towards.right:
				outClass = slide.outClass_up;
				inClass = slide.inClass_up;
				break;
			case towards.left:
				outClass = slide.outClass_down;
				inClass = slide.inClass_down;
				break;
		}
		isAnimating = true;
		var $nowPage = $(nowPage),
			$lastPage = $(lastPage);
		
		$lastPage.addClass(outClass);
		$nowPage.removeClass("hide").addClass(inClass);
		
		setTimeout(function(){
			$lastPage.removeClass('page-current').removeClass(outClass).addClass("hide");
			$nowPage.addClass('page-current').removeClass(inClass);
			
			isAnimating = false;
		},500);
	}

})();