// JavaScript Document
//判断手机版本，设置缩放比例 max-width:640px
var phoneScale = 1;
(function(){
	var phoneWidth = parseInt(window.screen.width);
		phoneScale = phoneWidth/640;
	var	ua = navigator.userAgent;
			
	if (/Android (\d+\.\d+)/.test(ua)){
		var version = parseFloat(RegExp.$1);
		// andriod 2.3
		if(version > 2.3){
			document.write('<meta name="viewport" content="width=640, minimum-scale='+phoneScale+', maximum-scale='+phoneScale+', target-densitydpi=device-dpi">');
		// andriod 2.3以上
		}else{
			document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
		}
		
		// 其他系统
	} else {
		//document.write('<meta name="viewport" content="width=640, minimum-scale='+phoneScale+', maximum-scale='+phoneScale+', target-densitydpi=device-dpi">'+'<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName(\'head\')[0]||body).appendChild(createElement(\'script\')).src=\'//bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=\'+~(-new Date()/36e5)];</script>');
               document.write('<meta name="viewport" content="width=640, minimum-scale='+phoneScale+', maximum-scale='+phoneScale+', target-densitydpi=device-dpi">');
	}
	
})();

//微信分享
$(function(){
	
	if (!/Android (\d+\.\d+)/.test(navigator.userAgent)){
		if($("#soundbox")[0])$("#soundbox").trigger("click");
	}
	
	document.title = _weixinData.name;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//检查设备
function checkEquipment(){
	if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
		if(window.location.href.indexOf("?mobile")<0){
			try{
				if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
					//手机
					//console.log("手机设备");
					return "phone";
				}else if(/iPad/i.test(navigator.userAgent)){
					//pad 
					//console.log("pad设备");
					return "pad";
				}else{
					//其他设备
				   //console.log("其他设备");
				   return "other";
				}
			}catch(e){}
		}
	}else{
		//电脑
		//console.log("电脑");	
		return "pc";
	}
};

//该代码只在PC端执行
//如果在电脑端，执行该方法
$(function(){
	
	if(checkEquipment() == "pc"){
		
		//获取随机数
		function getRandom(n){
			return (Math.floor(Math.random()*n+1));
		}

		$("body").css({
			"background-image":"url(https://www.yjsvip.com/img/publicStatic/appRes/appbg/"+getRandom(5)+".jpg)" //随机数1~5
		});
		
		//加入自定义的样式
		var bodyHtml = $("body").html();
		console.log(window.location.href);
		$("body").html('<div class="pc-body">\
							<div class="pc-qrcode">\
								<p>扫一扫，分享给朋友！</p>\
								<p id="qrcode_c"></p>\
								<p>我也要做一个  <a target="_blank" href="#" >"立即制作"</a></p>\
								<div class="bdsharebuttonbox">\
									<a href="#" class="bds_more" data-cmd="more"></a>\
									<a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>\
									<a href="#" class="bds_huaban" data-cmd="huaban" title="分享到花瓣"></a>\
									<a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>\
									<a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>\
									<a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>\
									<a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>\
									<a href="#" class="bds_tieba" data-cmd="tieba" title="分享到百度贴吧"></a>\
								</div>\
								<div style="float:left; margin-top:20px; width:200px; font-size:12px; background:#fff; border-radius:5px; padding:5px;color:#666;">'+window.location.href+'</div>\
							</div>\
							<a href="javascript:void(0)" class="pc_pageBtn" id="pc_nextPage"><br/>下<br/>一<br/>页</a>\
							<a href="javascript:void(0)" class="pc_pageBtn" id="pc_prevPage"><br/>上<br/>一<br/>页</a>\
							<div class="pc-viewBox">'+bodyHtml+'</div>\
						</div>');
		$(".page-current").removeClass("hide");
		
		
		//载入二维码生成器
		var qrcode_c = document.getElementById("qrcode_c");
		if(qrcode_c){  
			var thisURL = window.location.href;    
			var qrcode = new QRCode(qrcode_c, {  
				width : 140,  
				height : 140  
			});  
			qrcode.makeCode(thisURL);  
		};
		
		
		//上下滑动
		if(sideWipeType == "updown"){
			//绑定滑动事件
			$("#pc_nextPage").bind("click",function(e){
				$(document).trigger("swipeUp");	
			});
			$("#pc_prevPage").bind("click",function(e){
				$(document).trigger("swipeDown");	
			});
			
			$(document).bind("keydown",function(e){
				if(e.keyCode == 38){
					$(this).trigger("swipeDown");		
				}
				if(e.keyCode == 40){
					$(this).trigger("swipeUp");		
				}
			});
		}else{ //左右切换
			//绑定滑动事件
			$("#pc_nextPage").bind("click",function(e){
				$(document).trigger("swipeLeft");	
			});
			$("#pc_prevPage").bind("click",function(e){
				$(document).trigger("swipeRight");	
			});
			
			$(document).bind("keydown",function(e){
				if(e.keyCode == 37){
					$(this).trigger("swipeRight");		
				}
				if(e.keyCode == 39){
					$(this).trigger("swipeLeft");		
				}
			});
		}
	};		
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///图片加载
	//APP参数
	var setApp = {
		$loadnum : $("#loadnum"), //加载的进度条
		$loading : $("#loading"), //加载的动画
		$img : $("#coolapp").find("img"),
		$page1 : $(".page-1-1"), //第一页动画重置 时 会用到
		limit : 5, // 限制一次加载的图片个数
		delayTime : 100 //加载完成后，延迟0.1秒后播放动画
	};
	
	//加载完成，重显第一页动画
	var loadComplate = function(){
		setApp.$loading.css("display","none");
		//重新执行显示第一页动画
		setApp.$page1.addClass("hide");
		setTimeout(function(){
			setApp.$page1.removeClass("hide");
		},setApp.delayTime);	
	};
	
	//如果等待超过5秒，不再加载图片,直接显示
	setTimeout(function(){
		if(setApp.$loading.css("display") == "block"){
			loadComplate();
		}
	},5000);
	
	//加载剩余的图片
	var loadOtherImgs = function(){
		//二次图片加载处理
		for(i=setApp.limit; i<setApp.$img.length; i++){
			var img_b = new Image();
			if(img_b.complete){}
			else{
				img_b.onload = function(){};
			}
			img_b.src = setApp.$img.eq(i).attr("src");
		};
		
		//加载背景图片
		var $wrap = $(".wrap");
		$wrap.each(function(index, element) {
			var src = $(this).css("background-image");
            if(src != "none"){
				var img_c = new Image();			
				if(img_c.complete){}
				else{
					img_c.onload = function(){};
				}
				img_c.src = src.split("(")[1].split(")")[0];
			};
        });
	};
	
	//最多一次加载5张
	if(setApp.$img.length < setApp.limit){ 
		setApp.limit = setApp.$img.length;
	};
	
	//图片预加载.....
	//如果没图片
	if(setApp.limit == 0){
		loadComplate();
	}else{//如果有图片
		
		//开始运行预加载
		var num = 0;
		for(var i=0; i< setApp.limit; i++){
			var tempImg  = new Image();
			if(tempImg.complete){
				num = setApp.limit;
			}else{
				tempImg.onload = function(){
					 num++;
					 setApp.$loadnum.html((num/setApp.limit*100).toFixed(0)+"%");
				};
			}
			tempImg.src = setApp.$img.eq(i).attr("src");
			
		};
		
		//启用队列等待 0.5s 一次监测
		var imgLoadFun = function(){
			var setTimeMark = setInterval(function(){
				if(num == setApp.limit){
					loadComplate();//清空数组一，释放内存
					loadOtherImgs(); //加载剩余的图片
					clearInterval(setTimeMark);
				}	
			},500);	
		};imgLoadFun();
	
	};	
	
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     Zepto.js
//     (c) 2010-2014 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.
;(function($){
  var touch = {},
    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
    longTapDelay = 750,
    gesture

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  function isPrimaryTouch(event){
    return (event.pointerType == 'touch' ||
      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
      && event.isPrimary
  }

  function isPointerEventType(e, type){
    return (e.type == 'pointer'+type ||
      e.type.toLowerCase() == 'mspointer'+type)
  }
  
  //判断是否是手机
  var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i) ? true: false;
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i) ? true: false;
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true: false;
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i) ? true: false;
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
		}
  };
  
 // console.log(isMobile.any());

  $(document).ready(function(){
    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

    if ('MSGesture' in window) {
      gesture = new MSGesture()
      gesture.target = document.body
    }

    $(document)
      .bind('MSGestureEnd', function(e){
        var swipeDirectionFromVelocity =
          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
        if (swipeDirectionFromVelocity) {
          touch.el.trigger('swipe')
          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
        }
      })
      .on('touchstart MSPointerDown pointerdown mousedown', function(e){
        if((_isPointerType = isPointerEventType(e, 'down')) &&
          !isPrimaryTouch(e)) return
		  //console.log(e);
        firstTouch = !isMobile.any() ? e : e.touches[0]
		//console.log(_isPointerType);
        if (e.touches && e.touches.length === 1 && touch.x2) {
          // Clear out touch movement data if we have it sticking around
          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
          touch.x2 = undefined
          touch.y2 = undefined
        }
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = $('tagName' in firstTouch.target ?
          firstTouch.target : firstTouch.target.parentNode)
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = firstTouch.pageX
        touch.y1 = firstTouch.pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
        // adds the current touch contact for IE gesture recognition
        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
      })
      .on('touchmove MSPointerMove pointermove mousemove', function(e){
        if((_isPointerType = isPointerEventType(e, 'move')) &&
          !isPrimaryTouch(e)) return
        
        firstTouch = !isMobile.any() ? e : e.touches[0];
        cancelLongTap()
        touch.x2 = firstTouch.pageX
        touch.y2 = firstTouch.pageY

        deltaX += Math.abs(touch.x1 - touch.x2)
        deltaY += Math.abs(touch.y1 - touch.y2)
      })
      .on('touchend MSPointerUp pointerup mouseup', function(e){
        if((_isPointerType = isPointerEventType(e, 'up')) &&
          !isPrimaryTouch(e)) return
        cancelLongTap()

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

          swipeTimeout = setTimeout(function() {
            touch.el.trigger('swipe')
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
            touch = {}
          }, 0)

        // normal tap
        else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap')
              event.cancelTouch = cancelAll
              touch.el.trigger(event)

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.trigger('doubleTap')
                touch = {}
              }

              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null
                  if (touch.el) touch.el.trigger('singleTap')
                  touch = {}
                }, 250)
              }
            }, 0)
          } else {
            touch = {}
          }
          deltaX = deltaY = 0

      })
      // when the browser window loses focus,
      // for example when a modal dialog is shown,
      // cancel all ongoing events
      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll)
  })

  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown','doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
  })
})(Zepto);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
*	主要的函数逻辑在这里写入
*	app 参数设置
*/
$(function(){	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	//音乐
	//初始化音乐
	var iniAppMusic = function(){
		//如果没音乐，直接跳过
		if(!document.getElementById("coolappSong")){
			return false;
		};
		
		//音乐开启或者关闭
		/**
		*	声音是全局的
		*	
		*/
		var soundPlay = {
			$soundbox : $("#soundbox"),
			$soundinfo : $("#soundinfo"),
			$song : document.getElementById("coolappSong"),
			
			//声音图标的显示和隐藏
			soundIcoFade : function(str){
				soundPlay.$soundinfo.html(str).css("display","block");
				soundPlay.$soundbox.off("click");//动画结束之前，解除点击事件
				setTimeout(function(){
					soundPlay.$soundinfo.css("display","none");
					soundPlay.iniBindToggle();//重新绑定点击事件
				},1000);
			},
			
			//开启音乐或者关闭音乐
			offOrOnSound : function($this){
				if($this){ //如果有音乐
					if($this.attr("data") == "on"){
							$this.removeClass("soundbox").addClass("soundbox-close").attr("data","off");
							soundPlay.soundIcoFade("关闭");
							soundPlay.$song.pause();
					}
					else{
						$this.removeClass("soundbox-close").addClass("soundbox").attr("data","on");
						soundPlay.soundIcoFade("开启");	
						soundPlay.$song.play();
					}
				}
				else; //没有音乐
			},
			
			//绑定点击事件
			iniBindToggle : function(){
				if($("#coolappSong").attr("src") == ""){
					soundPlay.$soundbox.css("display","none");
					return false;
				}
				else{
					soundPlay.$soundbox.css("display","block");
				}
				soundPlay.$soundbox.click(function(){
					soundPlay.offOrOnSound($(this));
				});	
			}
		};	

		//解决音乐不自动播放问题
		//点击第一页面时播放音乐
		function playSoundTouchPageOne(){
			var hander = function(){
				soundPlay.$song.play();
				window.removeEventListener('touchstart', hander, false);
			};
			window.addEventListener('touchstart', hander, false);
		};
		
		//图片加载完后，播放音乐
		function playMp3(){
			if(soundPlay.$song){
				soundPlay.$song.play(true);
				setTimeout(function(){
					$("#soundinfo").css("display","none");
				},1000);
			}
			else ;//console.log("没上传音乐哦！");
		};
		
		//初始化音乐绑定事件
		soundPlay.iniBindToggle();
		//自动播放音乐
		playMp3();
		//解决音乐不自动播放的问题
		playSoundTouchPageOne();
		
		//音乐设置
		$("#appset_music_switch").on("click",function(){
			console.log($(this).attr("class"));	
			var classN = $(this).attr("class");
			if(classN.indexOf("off") != -1){
				console.log("开启");	
				soundPlay.$soundbox.css("display","block");
				soundPlay.$song.play();
			}else{
				console.log("关闭");
				soundPlay.$soundbox.css("display","none");
				soundPlay.$song.pause();	
			}
		});
		
	};iniAppMusic();
	
	//客户端提取 url 的值，然后渲染到页面上 - 该代码是APP上的
	$(".element").each(function(index, element) {
		var a = $(this).data("url");
		if(a != undefined){
			$(this).attr("onclick","javascript:window.open('"+a+"')");	
		}
	});

});

//地图方法
$(function(){
	
	//地图BOX缩放
//	var phoneWidth = parseInt(window.screen.width),phoneScale = phoneWidth/640;
//	$("#coolapp_map").css({
//		"-webkit-transform":"scale("+1/0.6+")",
//		"left":(-640*(1-phoneScale)/2)+"px",	
//		"top":(-640*(1-phoneScale)/2)+"px"
//	});
	
	//关闭地图
	var $coolapp_map = $("#coolapp_map");
	$(".coolapp_map_close").on("click",function(){
		$(this).parent().removeClass("coolapp_map_show");
		$coolapp_map.html("");
		setTimeout(function(){
			$(".coolapp_map").css("display","none");	
		},800);
	});
	
	//阻止浏览器冒泡事件
	$coolapp_map.on("mousedown mousemove touchmove",function(e){
		e.stopPropagation();
	});
	
});

//切换到指定页面
function jumpToPage(num,_this){
	
	var thisIndex = $(_this).parents(".page").index()+1;
	var nowPage = ".page-"+num+"-1",
		lastPage = ".page-"+thisIndex+"-1";
	
	now.row = num;
	now.col = 1;
	
	if(thisIndex == num){
		return false;	
	}else if(thisIndex < num){
		outClass = slide.outClass_up;
		inClass = slide.inClass_up;
	}else{
		outClass = slide.outClass_down;
		inClass = slide.inClass_down;	
	}
	
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		
		isAnimating = false;
	},500);
};

//地图
function showMap(_this){
	
	var $coolapp_map = $(".coolapp_map");
	$("#coolapp_map").html("");
	$coolapp_map.css("display","block")
	
	setTimeout(function(){
		$coolapp_map.addClass("coolapp_map_show");
	},0);
	
	var str = $(_this).attr("data-set");
	
	if(str == undefined){
		alert("地图数据有错！");
		return false;		
	}
	var arr = str.split(",");
	var set = {
		lng : arr[0], //经度
		lat : arr[1], //纬度
		name : arr[2] //名称
		//title : arr[3] //标题
		//info : arr[4] //描述
	};
	
	$coolapp_map.find(".title").html(set.name);
	
	setTimeout(function(){
		//传入 ID,point,title,info, width, height, zoom 
		// 地图ID,地图坐标，信息框标题，信息框描述，信息框宽，信息框高，地图缩放
		var map = new BMap.Map("coolapp_map");  
		//初始化地图
		map.centerAndZoom(new BMap.Point(set.lng, set.lat), 16);  
		
		//创建标注 - 点
		var marker = new BMap.Marker(new BMap.Point(set.lng, set.lat));   
		map.addOverlay(marker);

		//添加缩放控件 
//		var zoomControl=new BMap.ZoomControl();  
//		map.addControl(zoomControl);
	},500);
	
	//alert(parseFloat($(window).css("-webkit-transform").split("(")[1].split(",")[0]));
}

//幻灯片
$(function(){
	//如果没幻灯片，直接不运行
	if(!$(".layer-slider")[0])return;
	const towards_slide = { up:1, right:2, down:3, left:4};
	var isAnimating = false;
	var $slider = $(".layer-slider");
	var slider_slide = {	
		outClass_up : "pt-page-moveToRight",	
		inClass_up : "pt-page-moveFromLeft",	
		outClass_down : "pt-page-moveToLeft",	
		inClass_down : "pt-page-moveFromRight"
	};
	
	$slider.each(function(index, element) {
		var now = { row:1, col:1 }, last = { row:0, col:0};
		var autoPlay = $(this).find("input[name='autoPlay']").val();
		var $sliderChild =  $(this).find("li");
		var pageNum = $sliderChild.length;
		
		$sliderChild.eq(0).removeClass("hide").addClass('page-current');
		
		//左滑事件绑定
        $(this).swipeLeft(function(e){
			//阻止冒泡
			e.stopPropagation();
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;
			if (last.row == pageNum) {
				now.row = 1;
			}
			else{
				now.row = last.row+1; 
			}
			now.col = 1; 
			pageMove(towards_slide.left,$sliderChild,now,last);
		});
		
		//右滑事件绑定
		$(this).swipeRight(function(e){
			//阻止冒泡
			e.stopPropagation();
			
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;

			//打开向上的循环
			if (last.row == 1) {
				now.row = pageNum;
			}
			else{
				now.row = last.row-1; 
			}	
			now.col = 1; 
			pageMove(towards_slide.right,$sliderChild,now,last);
		});
		

		if(autoPlay==='on'){
			setInterval(function(){
				if (isAnimating) return;
				last.row = now.row;
				last.col = now.col;
				if (last.row == pageNum) {
					now.row = 1;
				}
				else{
					now.row = last.row+1; 
				}
				now.col = 1; 
				pageMove(towards_slide.left,$sliderChild,now,last);
			},1000*parseInt($(this).find("input[name='autoTime']").val()));
		}
    });
	
	function pageMove(tw,$sliderChild,now,last){
		var $lastPage = $sliderChild.eq(last.row - 1);
			$nowPage = $sliderChild.eq(now.row - 1);
		
		switch(tw) {
			case towards_slide.right:
				outClass = slider_slide.outClass_up;
				inClass = slider_slide.inClass_up;
				break;
			case towards_slide.left:
				outClass = slider_slide.outClass_down;
				inClass = slider_slide.inClass_down;
				break;
		}
		isAnimating = true;
		$nowPage.removeClass("hide");
		
		$lastPage.addClass(outClass);
		$nowPage.addClass(inClass);
		
		setTimeout(function(){
			$lastPage.removeClass('page-current');
			$lastPage.removeClass(outClass);
			$lastPage.addClass("hide");
			//$nowPage.find("img").addClass("hide");
			
			$nowPage.addClass('page-current');
			$nowPage.removeClass(inClass);
			//$nowPage.find("img").removeClass("hide");
			
			isAnimating = false;
		},500);
	}
});

//表单提交
$(document).on('click',".g-submit", function(event) {
	event.stopPropagation();
	var $parent = $(this).closest('.s-form-data');
	var actionUrl = $parent.attr("data-action");
	var data = {};
	$parent.find(".g-input").each(function(index, el) {
		var name = $(this).attr("name");
		if(data[name]==undefined){
			data[name] = $(this).val();
		}
	});

	console.log(actionUrl);
	console.log(data);

	$.ajax({
		url: actionUrl,
		type: 'post',
		dataType: 'json',
		data: data,
		success:function(msg) {
			console.log(msg);
			if(msg.msg=="ok"){
				alert("提交成功");
			}
		}
	});
});
