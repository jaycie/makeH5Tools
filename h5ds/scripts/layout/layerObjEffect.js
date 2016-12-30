//全局的公用函数
define(function(require,exports,module){
	var allObj = require('./objConfig');
	var ifun = require('./ifunction');
	var lfun = require('./layerObjIfun');
	
	//特效
	var effectHtml = {
		//流星雨
		moveStar :  '<i class="meteor style3" style="left:-160.24px; top:-38.67px; -webkit-animation-delay:2s; -webkit-animation: meteor 2s linear infinite;"></i>'+
					'<i class="meteor style3" style="left:489.10px; top:-57.97px; -webkit-animation-delay:2s; -webkit-animation: meteor 4s linear infinite;"></i>'+
					'<i class="meteor style2" style="left:243.16px; top:-2.25px; -webkit-animation-delay:1s; -webkit-animation: meteor 2s linear infinite;"></i>'+
					'<i class="meteor style2" style="left:193.95px; top:-39.92px; -webkit-animation-delay:2s; -webkit-animation: meteor 2s linear infinite;"></i>'+
					'<i class="meteor style3" style="left:207.38px; top:-65.93px; -webkit-animation-delay:3s; -webkit-animation: meteor 4s linear infinite;"></i>'+
					'<i class="meteor style2" style="left:32.74px; top:-46.92px; -webkit-animation-delay:1s; -webkit-animation: meteor 4s linear infinite;"></i>'+
					'<i class="meteor style3" style="left:359.17px; top:-53.07px; -webkit-animation-delay:1s; -webkit-animation: meteor 3s linear infinite;"></i>'+
					'<i class="meteor style1" style="left:-104.13px; top:-59.52px; -webkit-animation-delay:3s; -webkit-animation: meteor 3s linear infinite;"></i>'+
					'<i class="meteor style3" style="left:50.39px; top:-41.12px; -webkit-animation-delay:1s; -webkit-animation: meteor 3s linear infinite;"></i>'+
					'<i class="meteor style2" style="left:454.27px; top:-5.05px; -webkit-animation-delay:2s; -webkit-animation: meteor 4s linear infinite;"></i>'+
					'<i class="meteor style2" style="left:487.90px; top:-1.41px; -webkit-animation-delay:2s; -webkit-animation: meteor 3s linear infinite;"></i>'+
					'<i class="meteor style2" style="left:-26.12px; top:-72.47px; -webkit-animation-delay:2s; -webkit-animation: meteor 3s linear infinite;"></i>'+
					'<i class="meteor style2" style="left:347.73px; top:-74.57px; -webkit-animation-delay:2s; -webkit-animation: meteor 3s linear infinite;"></i>'+
					'<i class="meteor style2" style="left:-130.31px; top:19.42px; -webkit-animation-delay:1s; -webkit-animation: meteor 4s linear infinite;"></i>'+
					'<i class="meteor style3" style="left:468.83px; top:-51.68px; -webkit-animation-delay:1s; -webkit-animation: meteor 4s linear infinite;"></i>'+
					'<i class="meteor style3" style="left:371.62px; top:-2.64px; -webkit-animation-delay:3s; -webkit-animation: meteor 3s linear infinite;"></i>'+
					'<i class="meteor style4" style="left:487.26px; top:-67.66px; -webkit-animation-delay:1s; -webkit-animation: meteor 2s linear infinite;"></i>'+
					'<i class="meteor style2" style="left:421.05px; top:-67.14px; -webkit-animation-delay:2s; -webkit-animation: meteor 3s linear infinite;"></i>'+
					'<i class="meteor style2" style="left:304.64px; top:2.34px; -webkit-animation-delay:2s; -webkit-animation: meteor 2s linear infinite;"></i>'+
					'<i class="meteor style3" style="left:-40.46px; top:-37.97px; -webkit-animation-delay:2s; -webkit-animation: meteor 2s linear infinite;"></i>',

		//闪耀星
		flashStar : '<i class="star style3" style="left:298.77px; top:162.83px; -webkit-animation-delay:0.01s; -webkit-animation: star 2s linear infinite;"></i>'+
					'<i class="star style1" style="left:463.01px; top:312.34px; -webkit-animation-delay:0.56s; -webkit-animation: star 4s linear infinite;"></i>'+
					'<i class="star style4" style="left:408.42px; top:591.52px; -webkit-animation-delay:0.99s; -webkit-animation: star 2s linear infinite;"></i>'+
					'<i class="star style3" style="left:502.12px; top:337.11px; -webkit-animation-delay:0.79s; -webkit-animation: star 2s linear infinite;"></i>'+
					'<i class="star style4" style="left:129.88px; top:139.08px; -webkit-animation-delay:0.67s; -webkit-animation: star 5s linear infinite;"></i>'+
					'<i class="star style1" style="left:380.31px; top:472.50px; -webkit-animation-delay:0.99s; -webkit-animation: star 2s linear infinite;"></i>'+
					'<i class="star style3" style="left:244.16px; top:114.66px; -webkit-animation-delay:0.82s; -webkit-animation: star 4s linear infinite;"></i>'+
					'<i class="star style2" style="left:572.62px; top:160.67px; -webkit-animation-delay:0.05s; -webkit-animation: star 3s linear infinite;"></i>'+
					'<i class="star style3" style="left:492.02px; top:470.52px; -webkit-animation-delay:0.81s; -webkit-animation: star 4s linear infinite;"></i>'+
					'<i class="star style1" style="left:44.05px; top:389.53px; -webkit-animation-delay:0.14s; -webkit-animation: star 2s linear infinite;"></i>'+
					'<i class="star style1" style="left:306.41px; top:227.65px; -webkit-animation-delay:0.81s; -webkit-animation: star 4s linear infinite;"></i>'+
					'<i class="star style2" style="left:203.19px; top:319.32px; -webkit-animation-delay:0.91s; -webkit-animation: star 5s linear infinite;"></i>'+
					'<i class="star style1" style="left:611.96px; top:201.71px; -webkit-animation-delay:0.31s; -webkit-animation: star 4s linear infinite;"></i>'+
					'<i class="star style3" style="left:345.71px; top:231.26px; -webkit-animation-delay:0.96s; -webkit-animation: star 2s linear infinite;"></i>'+
					'<i class="star style2" style="left:291.78px; top:520.11px; -webkit-animation-delay:0.83s; -webkit-animation: star 3s linear infinite;"></i>'+
					'<i class="star style2" style="left:484.89px; top:169.63px; -webkit-animation-delay:0.26s; -webkit-animation: star 3s linear infinite;"></i>'+
					'<i class="star style2" style="left:481.24px; top:567.91px; -webkit-animation-delay:0.65s; -webkit-animation: star 3s linear infinite;"></i>'+
					'<i class="star style3" style="left:496.94px; top:204.20px; -webkit-animation-delay:0.82s; -webkit-animation: star 1s linear infinite;"></i>'+
					'<i class="star style4" style="left:27.45px; top:431.86px; -webkit-animation-delay:0.13s; -webkit-animation: star 4s linear infinite;"></i>'+
					'<i class="star style1" style="left:356.16px; top:138.32px; -webkit-animation-delay:0.63s; -webkit-animation: star 4s linear infinite;"></i>'+
					'<i class="star style4" style="left:509.15px; top:464.47px; -webkit-animation-delay:0.51s; -webkit-animation: star 2s linear infinite;"></i>'+
					'<i class="star style4" style="left:135.58px; top:91.83px; -webkit-animation-delay:0.66s; -webkit-animation: star 3s linear infinite;"></i>'+
					'<i class="star style2" style="left:141.50px; top:76.28px; -webkit-animation-delay:0.94s; -webkit-animation: star 3s linear infinite;"></i>'+
					'<i class="star style2" style="left:475.50px; top:199.76px; -webkit-animation-delay:0.59s; -webkit-animation: star 3s linear infinite;"></i>'+
					'<i class="star style3" style="left:67.35px; top:500.27px; -webkit-animation-delay:0.80s; -webkit-animation: star 4s linear infinite;"></i>'+
					'<i class="star style4" style="left:281.00px; top:21.70px; -webkit-animation-delay:0.93s; -webkit-animation: star 3s linear infinite;"></i>'+
					'<i class="star style2" style="left:276.73px; top:163.27px; -webkit-animation-delay:0.39s; -webkit-animation: star 2s linear infinite;"></i>'+
					'<i class="star style2" style="left:379.77px; top:8.42px; -webkit-animation-delay:0.68s; -webkit-animation: star 4s linear infinite;"></i>'+
					'<i class="star style2" style="left:364.55px; top:326.05px; -webkit-animation-delay:0.63s; -webkit-animation: star 3s linear infinite;"></i>'+
					'<i class="star style4" style="left:110.20px; top:188.01px; -webkit-animation-delay:0.70s; -webkit-animation: star 4s linear infinite;"></i>',

		//云
		movecloud : '<i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>',

		//下雪
		downsnow :  '<i class="snow style2" style="left:141.19px; top:147.75px; -webkit-animation-delay:2s; -webkit-animation: snow 6s linear infinite;"></i>'+
				'<i class="snow style2" style="left:-169.13px; top:41.95px; -webkit-animation-delay:1s; -webkit-animation: snow 11s linear infinite;"></i>'+
				'<i class="snow style1" style="left:489.74px; top:90.99px; -webkit-animation-delay:2s; -webkit-animation: snow 9s linear infinite;"></i>'+
				'<i class="snow style3" style="left:307.44px; top:90.83px; -webkit-animation-delay:1s; -webkit-animation: snow 8s linear infinite;"></i>'+
				'<i class="snow style2" style="left:86.18px; top:-50.79px; -webkit-animation-delay:1s; -webkit-animation: snow 15s linear infinite;"></i>'+
				'<i class="snow style2" style="left:-112.58px; top:183.52px; -webkit-animation-delay:3s; -webkit-animation: snow 11s linear infinite;"></i>'+
				'<i class="snow style2" style="left:385.81px; top:208.92px; -webkit-animation-delay:1s; -webkit-animation: snow 11s linear infinite;"></i>'+
				'<i class="snow style3" style="left:233.53px; top:114.95px; -webkit-animation-delay:2s; -webkit-animation: snow 14s linear infinite;"></i>'+
				'<i class="snow style3" style="left:336.33px; top:135.35px; -webkit-animation-delay:3s; -webkit-animation: snow 6s linear infinite;"></i>'+
				'<i class="snow style3" style="left:-276.05px; top:-8.17px; -webkit-animation-delay:1s; -webkit-animation: snow 7s linear infinite;"></i>'+
				'<i class="snow style2" style="left:-10.47px; top:30.62px; -webkit-animation-delay:1s; -webkit-animation: snow 6s linear infinite;"></i>'+
				'<i class="snow style2" style="left:428.50px; top:217.27px; -webkit-animation-delay:1s; -webkit-animation: snow 5s linear infinite;"></i>'+
				'<i class="snow style1" style="left:-171.05px; top:106.67px; -webkit-animation-delay:1s; -webkit-animation: snow 14s linear infinite;"></i>'+
				'<i class="snow style2" style="left:360.00px; top:-13.02px; -webkit-animation-delay:2s; -webkit-animation: snow 14s linear infinite;"></i>'+
				'<i class="snow style3" style="left:-25.45px; top:-43.11px; -webkit-animation-delay:3s; -webkit-animation: snow 7s linear infinite;"></i>'+
				'<i class="snow style3" style="left:-130.18px; top:-23.65px; -webkit-animation-delay:1s; -webkit-animation: snow 8s linear infinite;"></i>'+
				'<i class="snow style3" style="left:377.75px; top:158.70px; -webkit-animation-delay:2s; -webkit-animation: snow 14s linear infinite;"></i>'+
				'<i class="snow style2" style="left:-85.42px; top:120.13px; -webkit-animation-delay:2s; -webkit-animation: snow 7s linear infinite;"></i>'+
				'<i class="snow style1" style="left:-71.95px; top:-48.67px; -webkit-animation-delay:1s; -webkit-animation: snow 14s linear infinite;"></i>'+
				'<i class="snow style2" style="left:152.39px; top:-3.57px; -webkit-animation-delay:2s; -webkit-animation: snow 13s linear infinite;"></i>'+
				'<i class="snow style2" style="left:416.88px; top:106.97px; -webkit-animation-delay:2s; -webkit-animation: snow 13s linear infinite;"></i>'+
				'<i class="snow style2" style="left:16.02px; top:18.89px; -webkit-animation-delay:1s; -webkit-animation: snow 10s linear infinite;"></i>'+
				'<i class="snow style3" style="left:408.41px; top:-62.30px; -webkit-animation-delay:2s; -webkit-animation: snow 7s linear infinite;"></i>'+
				'<i class="snow style1" style="left:254.75px; top:30.57px; -webkit-animation-delay:2s; -webkit-animation: snow 14s linear infinite;"></i>'+
				'<i class="snow style4" style="left:161.91px; top:142.91px; -webkit-animation-delay:2s; -webkit-animation: snow 13s linear infinite;"></i>'+
				'<i class="snow style3" style="left:-104.01px; top:-60.52px; -webkit-animation-delay:2s; -webkit-animation: snow 12s linear infinite;"></i>'+
				'<i class="snow style4" style="left:241.77px; top:208.28px; -webkit-animation-delay:3s; -webkit-animation: snow 11s linear infinite;"></i>'+
				'<i class="snow style2" style="left:-150.35px; top:111.75px; -webkit-animation-delay:2s; -webkit-animation: snow 8s linear infinite;"></i>'+
				'<i class="snow style1" style="left:391.62px; top:37.55px; -webkit-animation-delay:3s; -webkit-animation: snow 11s linear infinite;"></i>'+
				'<i class="snow style2" style="left:-257.30px; top:32.77px; -webkit-animation-delay:2s; -webkit-animation: snow 14s linear infinite;"></i>'
	};
	
	/**
	* 图片图层 独有的方法
	*/
	var effectLayer = function(type){
		var $this = allObj.obj.$layer;
		var v = {
			typename : "特效图层",
			name : null,
			top : null, //y轴
			left : null, //x轴
			rotate : null, //旋转角度
			effectName : null, //特效名称
			backgroundColor : null,
			type : type, //点击类型
			layerType : "layer-effect" //图层类型
		};
		
		//赋值
		v.name = $this.attr("name");
		v.top = $this.position().top.toFixed(0);
		v.left = $this.position().left.toFixed(0);
		v.rotate = $this.rotationDegrees();
		v.effectName = $this.attr("class");
		v.backgroundColor = $this.css("background-color");
		
		//
		//console.log(v);
		
		//基础参数数据 拼接 - 渲染
		lfun.ifun.basicDataReplace(v);
		//基础参数
		lfun.ifun.basicSet($this,v);
		
		//去掉其他操作区
		allObj.obj.$basicSet_box_other.css("display","none");
		$("#basicSetBoxEffect").css("display","block");
	
		//初始选项卡
		allObj.obj.$moreSet.css("display","none");
		allObj.obj.$animateSet.css("display","none");
		allObj.obj.$functionSet.css("display","none");
		
		allObj.obj.$basic.trigger("click");
		
		//特效选择 - 操作
		var setEffect = function(effectClassName , str){
			$this.html('<div class="'+effectClassName+'">'+str+'</div>');
			ifun.ifun_callback();
		};
		$("#basicSetBoxEffectUl").on("click","li",function(){
			var effectName = $(this).attr("data");
			console.log(effectName);
			switch(effectName){
				case "movestar": setEffect("effect m-animationBox m-meteorShower", effectHtml.moveStar);break;	
				case "movecloud": setEffect("effect m-animationBox m-animationCloudBg", effectHtml.movecloud);break;	
				case "downsnow": setEffect("effect m-animationBox m-meteorShower", effectHtml.downsnow);break;	
				case "flashstar": setEffect("effect m-animationBox m-meteorShower", effectHtml.flashStar);break;	
			};
		});

		$("#addEffect_dialog").on("click", ".close", function(){ //点击取消，删除当前赋予的特效
			$("#picListUl").find(".active .del").trigger("click");
		})
	};
	
	//返回rotate 角度
	exports.effectLayer = function(type){
		effectLayer(type);
	};
	
});