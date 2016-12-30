//页面整体参数，暴露出去
define(function(require,exports,module){
	var allObj = require('./objConfig');
	var ifun = require('./ifunction');
	var funPlu = require('./functionPlugin');
	var shor = require("./shortcutsSet");
	//var lfun = require('./layerObjIfun');
	//var $layer = allObj.obj.$layer
	//旋转图层
	var rotateLayer = null;
	
	//基础参数 - 数据拼接
	var basicDataReplace = function(v){
		var _basicSetBox = allObj.obj._basicSetBox;
		_basicSetBox = _basicSetBox.replace("{{typename}}",v.typename);
		_basicSetBox = _basicSetBox.replace("{{name}}",v.name);
		_basicSetBox = _basicSetBox.replace("{{backgroundcolor}}",v.backgroundColor.colorHex().indexOf('none')>-1?'#ffffff':v.backgroundColor.colorHex() );
		_basicSetBox = _basicSetBox.replace("{{left}}",v.left);
		_basicSetBox = _basicSetBox.replace("{{top}}",v.top);
		$("#basicSetBox").html(_basicSetBox);
	};
	
	$("#basicSetBoxPic").on('keyup', '._w,._h', function(){
		var $this = $( this ), type = $this.hasClass('_w')?'width':'height';
		allObj.obj.$selectBox.css( type, $this.val() );
		allObj.obj.$layer.css( type, $this.val() ).trigger('imgresize');
	})
	
	//基本参数设置
	var basicSet = function($this,v){
		
		//基本参数-位置设置
		var $basicSetBox = $("#basicSetBox"); //新对象
		var $inputTop = $basicSetBox.find("input.ctop");
		var $inputLeft = $basicSetBox.find("input.cleft");
		
		$inputTop.on("change",function(){
			$this.css("top",$(this).val()+"px");
			allObj.obj.$selectBox.css("top",$(this).val()-2+"px");
			ifun.ifun_callback();
		});

		$inputLeft.on("change",function(){
			$this.css("left",$(this).val()+"px");
			allObj.obj.$selectBox.css("left",$(this).val()-2+"px");
			ifun.ifun_callback();
		});
		
		$('#basicSetBoxPic').find('._w,._h').on("change",function(){
			var _this = $( this );
			$this.css( _this.hasClass('_w')?'width':'height' ,_this.val()+"px");
			allObj.obj.$selectBox.css(_this.hasClass('_w')?'width':'height',_this.val()-2+"px");
			ifun.ifun_callback();
		});
		
		//修改图层名称
		var changeLayerName = function(){
			
			//图层名称设置
			$("#setlayerName_val").on("change",function(){
				var val = $(this).val();
				$("#picListUl .active").find(".name").attr("value",val).val(val);
				allObj.obj.$layer.attr("name",val);
				ifun.ifun_callback();
			});
			
			//修改页面名称
			/*allObj.obj.$picListUl.off("dblclick.changeLayerName").on("dblclick.changeLayerName",".name",function(){
				var $input = $(this);
				$input.removeAttr("disabled").css({
					"background":"#FFF",
					"color":"#000"
				});
			});*/
			
			//修改名称后
			allObj.obj.$picListUl.off("focusout.changeLayerName").on("focusout.changeLayerName",".name",function(){
				$(this).attr("disabled","disabled").removeAttr("style");
				var val = $(this).val();
				$(this).attr("value",val); //修复更名移动后变回原来名字
				$("#setlayerName_val").attr("value",val).val(val);
				allObj.obj.$layer.attr("name",val);
				ifun.ifun_callback();
			});	

		};changeLayerName(); //end //修改图层名称
		
		//快捷键设置
		shor.iniShortcutsLayer($this,$inputTop,$inputLeft);
		
		//如果是 图片 或者 文字图层，背景色 对象 为$element
		if(v.layerType == "layer-pic" || v.layerType == "layer-text"){
			var $element = allObj.obj.$element;	
		}
		else{
			var $element = $this;		
		}
		
		//背景颜色设置
		var $layerBackgroundColor = $("#layerBackgroundColor");
		$layerBackgroundColor.on("change",function(){
			$element.css("background-color",$(this).val().colorHex());
			ifun.ifun_callback();	
		});
		
		//清除背景色
		var $clear_layerBackgroundColor =  $("#clear_layerBackgroundColor");
		$clear_layerBackgroundColor.on("click",function(){
			$layerBackgroundColor.val("#ffffff");
			$element.css("background-color","transparent");
			ifun.ifun_callback();
		});
		
		//初始化完成后，切换到基础设置
		allObj.obj.$basic.trigger("click");
		
	};
	
	//拓展参数设置
	var moreSet = function($this,v){
		//如果是 图片 或者 文字图层，圆角，阴影，边框 对象 为$element
		if(v.layerType == "layer-pic" || v.layerType == "layer-text"){
			var $element = allObj.obj.$element;	
		}
		else{
			var $element = $this;		
		};
		
		//初始化功能插件的显示
		funPlu.iniPluginDom($element);
		
		//设置slider rotate
		var setRotate = function($this,v){
			
			//console.log("拓展参数，设置旋转角度==========");
			
			var $input = allObj.obj.$rotate_pageSlider.next(".slider-input");
			var setCss = function(val){
				$input.val(val);
				$this.css("-webkit-transform","rotate("+val+"deg)");	
				allObj.obj.$selectBox.css("-webkit-transform","rotate("+val+"deg)");	
				ifun.ifun_callback();
			}
			var slider = function(val){
				setCss(val);
			};
			var input = function(val){
				allObj.obj.$rotate_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:val});
				setCss(val);
			};
			var css_val = v.rotate;
			allObj.obj.$rotate_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:css_val});
			$input.val(css_val);
				
		};setRotate($this,v);
		rotateLayer = setRotate;
		
		//设置radius 
		var setRadius = function(){
			var $input = allObj.obj.$radius_pageSlider.next(".slider-input");
			var setCss = function(val){
				$input.val(val);
				$element.css("border-radius",val+"px");	
				ifun.ifun_callback();
			}
			var slider = function(val){
				setCss(val);
			};
			var input = function(val){
				allObj.obj.$radius_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:val});
				setCss(val);
			};
			var css_val = parseInt(v.borderRadius);
			allObj.obj.$radius_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:css_val});
			$input.val(css_val);	
				
		};setRadius();		
		
		//设置透明度
		var setOpacity = function(){
			var $input = allObj.obj.$opacity_pageSlider.next(".slider-input");
			var setCss = function(val){
				$input.val(val);
				$this.css("opacity",val/100);	
				ifun.ifun_callback();
			}
			var slider = function(val){
				setCss(val);
			};
			var input = function(val){
				allObj.obj.$opacity_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:val});
				setCss(val);
			};
			var css_val = parseInt(v.opacity*100);
			allObj.obj.$opacity_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:css_val});
			$input.val(css_val);	
				
		};setOpacity();	
		
		//模糊
		var setFuzzy = function(){
			var $input = allObj.obj.$fuzzy_pageSlider.next(".slider-input");
			var setCss = function(val){
				$input.val(val);
				$this.css("-webkit-filter","blur("+val+"px)");	
				ifun.ifun_callback();
			}
			var slider = function(val){
				setCss(val);
			};
			var input = function(val){
				allObj.obj.$fuzzy_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:val});
				setCss(val);
			};
			var css_val = parseInt(v.filterBlur);
			if(!css_val){
				css_val = 0;
			}
			allObj.obj.$fuzzy_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:css_val});
			$input.val(css_val);	
				
		};setFuzzy();	
		
		//阴影
		var setShadow = function(){
			var $input = allObj.obj.$sadow_pageSlider.next(".slider-input");
			var setCss = function(val){
				$input.val(val);
				$element.css("-webkit-box-shadow","0 0 "+val+"px rgba(0,0,0,0.6)");
				ifun.ifun_callback();	
			}
			var slider = function(val){
				setCss(val);
			};
			var input = function(val){
				allObj.obj.$sadow_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:val});
				setCss(val);
			};
			var css_val = 0;
			if(v.boxShadow != "none"){
				//console.log("===>",v.boxShadow.split(")")[1].split(" ")[3])
				css_val = parseInt(v.boxShadow.split(")")[1].split(" ")[3]);
			}
			allObj.obj.$sadow_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:css_val});
			$input.val(css_val);	
				
		};setShadow();
		
		//初始化边框属性
		var borderType = allObj.obj.$element.css("border-style");
		var borderWidth = parseInt(allObj.obj.$element.css("border-width"));
		$("#borderType_span").attr("data",borderType).html(function(){
			switch(borderType){
				case "none": return "无边框";break;	
				case "solid": return "—— 实线";break;	
				case "dotted": return "......... 点线";break;	
				case "dashed": return "- - -&nbsp; 虚线";break;	
				case "double": return "=== 双线";break;	
			};	
		});	
		$("#borderPx_span").attr("data",borderWidth).html(borderWidth+"px");
		$("#borderColor").val(allObj.obj.$element.css("border-color").colorHex());
		
		
		//边框类型
		var callback_borderType = function(data){
			//console.log(data);
			allObj.obj.$element.css("border-style" , data);
			allObj.obj.$selectBox.css("display","none");
			ifun.ifun_callback();
		}
		allObj.obj.$borderType.donwSelectMt({callback:callback_borderType});
		
		//边框大小
		var callback_borderSize = function(data){
			//console.log(data);
			allObj.obj.$element.css("border-width" , data + "px");
			allObj.obj.$selectBox.css("display","none");
			ifun.ifun_callback();
		}
		allObj.obj.$borderPx.donwSelectMt({callback:callback_borderSize});
		
		//边框颜色
		$("#borderColor").on("change",function(){
			allObj.obj.$element.css("border-color", ($(this).val().colorHex()));		
			ifun.ifun_callback();
		});
				
	};
	
	//动画效果
	var animateSet = function($this,v){
		var $this = allObj.obj.$element;

		//allObj.obj.animateState = autoplay 自动执行

		//动画播放次数
		$("#playCount_data").attr("data",v.playCount).html(v.playCount);//初始播放次数
		var callb = function(data){
			//console.log(data);
			//$this.css("-webkit-animation-iteration-count",data);

			//重置style
			ifun.reSetStyle("-webkit-animation-iteration-count",data,$this);

			// if(allObj.obj.animateState == "autoplay"){
			// 	ifun.reSetStyle("-webkit-animation-iteration-count",data,$this);
			// }else{
			// 	ifun.reSetStyle("-webkit-animation-iteration-count",data,$this);
			// }
			ifun.ifun_callback();
		}
		allObj.obj.$playCount.donwSelectMt({callback:callb});
		
		//设置播放时间
		var setPlayTime = function(){
			var $input = allObj.obj.$playTime_pageSlider.next(".slider-input");
			var setCss = function(val){
				$input.val(val);
				//$this.css("-webkit-animation-duration",val+"s");	
				//重置style
				ifun.reSetStyle("-webkit-animation-duration",val,$this);
				ifun.ifun_callback();
			}
			var slider = function(val){
				setCss(val);
			};
			var input = function(val){
				allObj.obj.$playTime_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:val});
				setCss(val);
			};
			var css_val = parseFloat(v.playTime);
			allObj.obj.$playTime_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:css_val});
			$input.val(css_val);	
				
		};setPlayTime();	
		
		//设置延时播放时间
		var setDelayTime = function(){
			var $input = allObj.obj.$delayTime_pageSlider.next(".slider-input");
			var setCss = function(val){
				$input.val(val);
				//$this.css("-webkit-animation-delay",val+"s");
				//重置style
				ifun.reSetStyle("-webkit-animation-delay",val,$this);
				ifun.ifun_callback();
			}
			var slider = function(val){
				setCss(val);
			};
			var input = function(val){
				allObj.obj.$delayTime_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:val});
				setCss(val);
			};
			var css_val = parseFloat(v.delayTime);
			allObj.obj.$delayTime_pageSlider.sliderMt({slider_callback:slider,input_callback:input,iniData:css_val});
			$input.val(css_val);	
				
		};setDelayTime();
		
		//初始动画名称
		var $animateName = $(".animate-name");
		//初始动画名称
		var elementName = allObj.obj.$element.attr("elementName");
		if(elementName == undefined){
			$animateName.html("无动画");
		}
		else $animateName.html(allObj.obj.$element.attr("elementName"));
		
		//选择动画效果
		var $li = allObj.obj.$animatesLists.find("li");
		var $element = allObj.obj.$element;
		allObj.obj.$animatesLists.off("click").on("click","li",function(){
			//$li.removeClass("active");
			allObj.obj.$selectBox.css("display","none");
			var $this = $(this);
			var data = {
				data : $this.attr("data"),
				name : $this.attr("name")	
			};
			//$this.addClass("active");
			
			//如果是文本图层，看是否有居中属性
			if(v.layerType == "layer-text" && $element.attr("class").indexOf("layer-text-center") != -1){
				$element.removeClass().hide(0);
				var className = "element layer-text-center " + data.data;
			}
			else{
				$element.removeClass().hide(0);
				var className = "element " + data.data;
			}
			$element.addClass(className).attr("elementName",data.name).show(0);
			
			//console.log(allObj.obj.$layer);
			
			//再次初始滚动条参数
			v.playTime = $element.css("-webkit-animation-duration");
			v.delayTime = $element.css("-webkit-animation-delay");
			setDelayTime();
			setPlayTime();
			
			//初始动画名称
			$animateName.html(data.name);
			
			//重新设置style,避免合并css
			ifun.reSetStyle(null,data,$this)
			
			ifun.ifun_callback();
		});	
		
	};
	
	//布局参数 - 入口
	exports.ifun = {
		rotateLayer : function($this,v){ rotateLayer($this,v);}, //旋转图层
		basicSet : function($this,v){ basicSet($this,v);}, //基本参数设置
		moreSet : function($this,v){ moreSet($this,v);},//拓展参数设置
		basicDataReplace : function(v){ basicDataReplace(v);}, //基础参数 数据拼接
		animateSet : function($this,v){ animateSet($this,v);} //动画效果
	};
	
});