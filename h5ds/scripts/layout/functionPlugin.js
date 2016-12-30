//全局函数调用
function jumpToPage(){};
function showMap(){};
function showMovie(){};

//功能函数 库
define(function(require,exports,module){
	var allObj = require('./objConfig');
	var ifun = require('./ifunction');
	
	//初始jumppage列表参数
	var iniJumpPage = function(){

		$("#function_add_jumppage_ul").off("click.jumppage").on("click.jumppage","li",function(){
			
			//设置值
			$("#function_add_jumppage_val").val("jumpToPage("+$(this).html()+",this)");
			
			//设置样式
			$("#function_add_jumppage_ul li").removeClass("active");
			$(this).addClass("active");
			
		});	
	};
	
	//初始功能块 DOM 元素
	var iniPluginDom = function($element){
		
		//高级功能初始化 - 如果有高级功能
		if($element.data("name") != undefined){
			var name = $element.data("name");
			var $function_list = $("#function_list");
			var $function_list_li = $function_list.find("li");
			
			//全局初始化可见的函数
			var iniDisplayFun = function(name){
				$function_list_li.css("display","none").removeClass("active");
				$("#function_add_"+name+"_btn").css("display","block").addClass("active");
			};
			
			//全局赋值函数
			var iniValFun = {
				url : function(name){
					//赋值
					$("#function_add_url_val").val( $element.data("url") ); // &apos; 单引号的转义处理。主要为红包调用外部方法而处理
					//渲染
					iniDisplayFun(name);	
				},	
				map : function(name){
					//赋值
					//...
					var str = $element.data("set");
					if(str != undefined){
						str = str.split(",");
						var lng = str[0];//经度
						var lat = str[1];//纬度
						//var area = str[2];//地址
						$("#function_add_map_val").val(str[2]).attr("data-opt",lng+','+lat);		
					}
					
					//渲染
					iniDisplayFun(name);
				},	
				call : function(name){
					//赋值
					$("#function_add_call_val").val(($element.data("url")));
					//渲染
					iniDisplayFun(name);		
				},	
				message : function(name){
					//赋值
					$("#function_add_message_val").val(($element.data("url")));
					//渲染
					iniDisplayFun(name);
				},	
				movie : function(name){
					
				},	
				share : function(name){},
				jumppage : function(name){
					//赋值
					iniJumpPage();//初始列表
					//渲染
					iniDisplayFun(name);	
				}
			};
			
			//功能分类
			switch(name){
				case "url" : iniValFun.url("url") ;break;
				case "map" : iniValFun.map("map") ;break;
				case "call" : iniValFun.call("call") ;break;
				case "message" : iniValFun.message("message") ;break;
				case "movie" : iniValFun.movie("movie") ;break;
				case "share" : iniValFun.share("share") ;break;
				case "jumppage" : iniValFun.jumppage("jumppage") ; break;
			};
			
		}
		else{
			var $function_list = $("#function_list");
			var $function_list_li = $function_list.find("li");
			$function_list_li.css("display","block").removeClass("active");
		};
		
	};
	
	//功能模块 初始化
	var iniPluginAction = function(){
		
		//操作对象
		var $function_list = $("#function_list");
		var $function_list_li = $function_list.find("li");
		
		//文本框的添加模式 - 通用方法 - 适：url,call,message,movie
		function function_add_onlyInput(key){
			var $btn = $("#function_add_"+key+"_btn");
			
			var function_add_callback = function(str){
				console.log(str);
				//如果确认添加
				if(str == "yes"){
					var val = $("#function_add_"+key+"_val").val();
					
					switch(key){
						case "url" :{
						 	allObj.obj.$element.attr("data-url",val);
						 	allObj.obj.$element.attr("data-name","url");
						 };break;
						case "call" : {
							allObj.obj.$element.attr("data-url","tel:"+val);
							allObj.obj.$element.attr("data-name","url");
						};break;
						case "message" : {
							allObj.obj.$element.attr("data-url","sms:"+val);
							allObj.obj.$element.attr("data-name","url");
						};break;
					};
					
					$function_list_li.css("display","none").removeClass("active");
					$btn.css("display","block").addClass("active");
					ifun.ifun_callback();
	
				};
			};
			$btn.find(".btn").showWindow({id:"function_add_"+key+"_dialog",center:true,callback:function_add_callback});
		};
		
		//添加jumppage方法
		function function_add_jumppage(key){
			
			iniJumpPage();//初始页面参数
			
			var $btn = $("#function_add_"+key+"_btn");
			var function_add_callback = function(str){
				//console.log(str);
				//如果确认添加
				if(str == "yes"){
					var val = $("#function_add_"+key+"_val").val();
					
					switch(key){
						case "jumppage" : { allObj.obj.$element.attr("onClick",val); } ;break;
					};
					
					allObj.obj.$element.attr("data-name",key);
					$function_list_li.css("display","none").removeClass("active");
					$btn.css("display","block").addClass("active");
					ifun.ifun_callback();
	
				};
			};
			
			//初始页面列表
			$btn.find(".btn").on("click",function(){
				var jHtml = "";
				var pageLen = $("#pageListUl li").length;
				for(i=0; i<pageLen; i++){
					jHtml+="<li>"+(i+1)+"</li>";
				}
				$("#function_add_jumppage_ul").html(jHtml);	
				
				//初始样式
				var onClickData = allObj.obj.$element.attr("onClick");
				if(onClickData != undefined){
					var index = onClickData.split(",")[0].split("(")[1];
					$("#function_add_jumppage_ul li").removeClass("active").eq(index - 1).addClass("active");
					$("#function_add_jumppage_val").val(onClickData);
				}
			});
			$btn.find(".btn").showWindow({id:"function_add_"+key+"_dialog",center:true,callback:function_add_callback});
		};
		
		//添加地图方法
		function function_add_Map(key){
			var $btn = $("#function_add_"+key+"_btn");
			var $val = $("#function_add_map_val");
			
			//初始化百度地图
			//传入 ID,point,title,info, width, height, zoom 
			// 地图ID,地图坐标，信息框标题，信息框描述，信息框宽，信息框高，地图缩放
			var set = {
				lng : 0,//经度
				lat : 0,//纬度
				zoom : 16, //地图缩放
				area : "成都" //
			};
			var map = new BMap.Map("function_set_map");  
		
			map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
			map.addControl(new BMap.NavigationControl()); //左上角，添加默认缩放平移控件
			
			//自动定位
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
					map.addOverlay(mk);
					map.panTo(r.point);
					//alert('您的位置：'+r.point.lng+','+r.point.lat);
					set.lng = r.point.lng;
					set.lat = r.point.lat; 	
				}
				else {
					alert('自动定位失败!'+this.getStatus());
				}        
			},{enableHighAccuracy: true});
			
			if($val.data("opt") != undefined){
				var str = $val.data("opt").split(",");
				set.lng = str[0]; 
				set.lat	= str[1];
			}
			//初始化地图
			map.centerAndZoom(new BMap.Point(set.lng, set.lat), set.zoom); 
			
			//添加定位控件
			var geolocationControl = new BMap.GeolocationControl();
			geolocationControl.addEventListener("locationSuccess", function(e){
				// 定位成功事件
				var address = '';
				address += e.addressComponent.province;
				address += e.addressComponent.city;
				address += e.addressComponent.district;
				address += e.addressComponent.street;
				address += e.addressComponent.streetNumber;
				//alert("当前定位地址为：" + address);
			});
			geolocationControl.addEventListener("locationError",function(e){
				// 定位失败事件
				alert(e.message+"请允许浏览器定位！");
			});
			map.addControl(geolocationControl);
			
			//单击获取点击的经纬度
			map.addEventListener("click",function(e){
				//设置经纬度
				set.lng = e.point.lng;
				set.lat = e.point.lat;
				map.clearOverlays(); //清除其他点
				//创建标注 - 点
				var marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));   
				map.addOverlay(marker);
				//初始化地图
				//map.centerAndZoom(new BMap.Point(e.point.lng, e.point.lat), 16);    
			});
			
			//检索
			$("#searchMap").on("click",function(){
				var result = $("#function_add_map_val").val();
				
				if(result.indexOf(",") != -1){
					alert('请勿输入“,”等特殊符号！');
					return false;
				};
				
				var local = new BMap.LocalSearch(map, {
					renderOptions:{map: map}
				});
				local.search(result);
				
				var point = map.getCenter();
				set.lng = point.lng;
				set.lat = point.lat;
				set.area = result;
				//map.centerAndZoom(new BMap.Point(e.point.lng, e.point.lat), 16);    
				
			});
			
			
			var function_add_callback = function(str){
				//console.log(str);
				//如果确认添加
				if(str == "yes"){
					var val = $("#function_add_"+key+"_val").val();
					
					//console.log(set);

					allObj.obj.$element.attr({
						"data-name" : "map",
						"onclick" :'showMap(this)',
						"data-set" : set.lng+','+set.lat+','+set.area
					});

					$function_list_li.css("display","none").removeClass("active");
					 $btn.css("display","block").addClass("active");
					ifun.ifun_callback();
	
				};
			};
			 $btn.find(".btn").showWindow({id:"function_add_"+key+"_dialog",center:true,callback:function_add_callback});
		};
		
		//添加视频
		function function_add_movie(key){
			var $btn = $("#function_add_"+key+"_btn");
			
			var function_add_callback = function(str){
				console.log(str);
				//如果确认添加
				if(str == "yes"){
					var val = $("#function_add_"+key+"_val").val();

					allObj.obj.$element.attr({
						"data-url" : val,
						"data-name" : "movie",
						"onclick" :'showMovie(this)'
					});

					$function_list_li.css("display","none").removeClass("active");
					$btn.css("display","block").addClass("active");
					ifun.ifun_callback();
				};
			};
			$btn.find(".btn").showWindow({id:"function_add_"+key+"_dialog",center:true,callback:function_add_callback});
		}

		//添加超链接
		function_add_onlyInput("url");
		
		//添加一键拨号
		function_add_onlyInput("call");
		
		//添加一键发短信 sms
		function_add_onlyInput("message");
		
		//添加视频连接
		function_add_movie("movie");
		
		//添加页面跳转
		function_add_jumppage("jumppage");
		
		//添加地图
		function_add_Map("map");
		
		//删除功能
		$function_list.on("click",".del",function(e){
			$function_list_li.css("display","block").removeClass("active");
			
			var $this = $(this);
			var dataFun = $this.attr("data-fun");
			
			//功能函数集
			var allFun = {
				//超链接
				url : function(){
					//url 滞空
					allObj.obj.$element.removeAttr("data-url").removeAttr("data-name");
					$("#function_add_url_val").val("http://");
				},
				call : function(){
					//call 滞空
					allObj.obj.$element.removeAttr("data-url").removeAttr("data-name");
					$("#function_add_call_val").val("");
				},
				message : function(){
					//message 滞空
					allObj.obj.$element.removeAttr("data-url").removeAttr("data-name");
					$("#function_add_message_val").val("");	
				},
				delfun : function(cname){
					//删除功能	
					allObj.obj.$element.removeAttr("data-name");
					allObj.obj.$element.removeAttr("onClick");
				},
				movie : function(){
					//删除视频
					allObj.obj.$element.removeAttr("data-url").removeAttr("data-name");
					allObj.obj.$element.removeAttr("onClick");
				}
			};
			
			//功能分类
			switch(dataFun){
				case "url" : allFun.url() ;break;
				case "map" : { allFun.delfun("map"); allObj.obj.$element.removeAttr("data-set"); };break;
				case "call" : allFun.call() ;break;
				case "message" : allFun.message() ;break;
				case "movie" : allFun.movie() ;break;
				case "share" : allFun.share() ;break;
				case "jumppage" : allFun.delfun("jumppage") ;break;
			};
			
			//阻止冒泡
			e.stopPropagation();
		});	
		
		
	};
	

	//选择图层后，初始化 功能库 插件的 DOM
	exports.iniPluginDom = function($element){
		return iniPluginDom($element);	
	};
	
	//初始化功能库 的操作
	exports.iniPluginAction = function(){
		return iniPluginAction();
	};
	
	
});