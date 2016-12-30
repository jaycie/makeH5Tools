// JavaScript Document
$(function(){
	/* 图片擦除功能 */
	function tapClipImg(){
		var canvas = document.getElementById("cas"),ctx = canvas.getContext("2d");
		var x1,y1,a=60,timeout,totimes = 100,jiange = 30; //a为画笔的宽度
		var $cabox = document.getElementById("cabox");
		canvas.width = $cabox.clientWidth;
		canvas.height = $cabox.clientHeight;
		canvasOffsetLeft = $(canvas).offset().left;
		canvasOffsetTop = $(canvas).offset().top;
		
		var fadeout = function(ele, opacity, speed) { 
			if (ele) { 
				var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity || 100; 
				v < 1 && (v = v * 100); 
				var count = speed / 1000; 
				var avg = (100 - opacity) / count; 
				var timer = null; 
				timer = setInterval(function() { 
					if (v - avg > opacity) { 
						v -= avg; 
						setOpacity(ele, v); 
					} else { 
						clearInterval(timer); 
					} 
				}, 500); 
			} 
		} 
		
		var setOpacity = function(ele, opacity) { 
			if (ele.style.opacity != undefined) { 
			//兼容FF和GG和新版本IE 
			ele.style.opacity = opacity / 100; 
			
			} else { 
			//兼容老版本ie 
			ele.style.filter = "alpha(opacity=" + opacity + ")"; 
			} 
		} 
		
		//通过修改globalCompositeOperation来达到擦除的效果,效率要高的多
		var tapClip = function(){
			var hastouch = "ontouchstart" in window?true:false,
				tapstart = hastouch?"touchstart":"mousedown",
				tapmove = hastouch?"touchmove":"mousemove",
				tapend = hastouch?"touchend":"mouseup";
				
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.lineWidth = a*2;
			ctx.globalCompositeOperation = "destination-out";
			
			canvas.addEventListener(tapstart , function(e){
				clearTimeout(timeout)
				e.preventDefault();
			
				x1 = hastouch?e.targetTouches[0].pageX:e.clientX-canvasOffsetLeft;
				y1 = hastouch?e.targetTouches[0].pageY:e.clientY-canvasOffsetTop;
				
				ctx.save();
				ctx.beginPath()
				ctx.arc(x1,y1,1,0,2*Math.PI);
				ctx.fill();
				ctx.restore();
				
				canvas.addEventListener(tapmove , tapmoveHandler);
				canvas.addEventListener(tapend , function(){
					canvas.removeEventListener(tapmove , tapmoveHandler);
					timeout = setTimeout(function(){
						var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
						var dd = 0;
						for(var x=0;x<imgData.width;x+=jiange){
							for(var y=0;y<imgData.height;y+=jiange){
								var i = (y*imgData.width + x)*4;
								if(imgData.data[i+3] >0){
									dd++
								}
							}
						}
						//console.log("dd",dd);//dd表示剩余区域的大小
						if(dd/(imgData.width*imgData.height/(jiange*jiange))<0.5){
							//canvas.className = "noOp";
							//擦完后显示出来
							canvas.className = "noOp";
							//擦完后显示出来
							var wait=setInterval(function(){
								clearInterval(wait);
								document.getElementById("cabox").style.display="none";
							},100);
							//$cabox.remove();
							
//							var $current = $(".page-current");
//							$current.hide();
//							var wait=setTimeout(function(){
//								clearInterval(wait);
//								$cabox.remove();
//								$current.show(); 
//							},1);
						}
					},totimes)
				});
				
				function tapmoveHandler(e){
					e.stopPropagation(); //阻止冒泡
					clearTimeout(timeout)
					e.preventDefault();
					x2 = hastouch?e.targetTouches[0].pageX:(e.clientX-canvasOffsetLeft)/0.5;
					y2 = hastouch?e.targetTouches[0].pageY:(e.clientY-canvasOffsetTop)/0.5;
					
					ctx.save();
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
					ctx.restore();
					
					x1 = x2;
					y1 = y2;
				}
			})
		}
		
		var img = new Image();
		img.src = $cabox.getAttribute("dataBgImg");
		img.onload = function(){
			ctx.drawImage(img,0,0,canvas.width,canvas.height)
			//ctx.fillRect(0,0,canvas.width,canvas)
			tapClip();
			$(".loading").css("display","none");
		}
	}

	//调用擦一擦
	tapClipImg();	
});