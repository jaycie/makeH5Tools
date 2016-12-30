//页面整体参数，暴露出去
define(function(require,exports,module){
	var allObj = require('./objConfig');
	var ifun = require('./ifunction');

	var cutPicCtrl = function(){
		$("#flashCtrl").off("click.showFlash").on("click.showFlash", "li", function(e){
			var $this = $(this),
				img = $this.find("img"),
				$target = $(e.target);

			if($target.hasClass("fa-photo")){ //重新选图
				$this.trigger("click.showFlash");
				showDialog($this);
				$this.trigger("click.clickStartMask");
			}else if($target.hasClass("fa-times-circle")){ //删除图片
				showFlash();
				$this.html("<span> + </span>");
			}else{ //点击列表图片 或 ＋
				if($(img).length>0){
					showFlash(img.prop("src"));
				}else{ //add pic
					showDialog($(this));
					$(this).trigger("click.clickStartMask");
				}
			}
			e.stopPropagation();
		});
	};

	var showFlash = function(src){
		var _src = src || '';
		if(!_src){
			$("#flashCtrlShow").html('');
		}else{
			$("#flashCtrlShow").html('<img src="'+_src+'">');
		}
	};

	var addFlashToLayer = function(){
		$("#flash_submit_dialog").off("click.addFlashToLayer").on("click.addFlashToLayer", ".yes", function(){
			var img = $("#flashCtrl").find("img"),
				len = img.length,
				html = "",
				autoPlay = "on",
				autoTime = $("#flashCtrlTimer").find("span").html();
			for(var i=0;i<len;i++){
				html +='<li class="hide"><img src="'+$(img[i]).prop("src")+'" /></li>';
			}

			if($("#flash_submit_dialog").find(".flash-resize").find("a").hasClass("off")){
				autoPlay = "off";
			}

			var resize = $.parseJSON($('.flash-resize').find('input:radio:checked').val()),
				height = 640*resize.h/resize.w;

			allObj.obj.$layer.find("ul").append(html);
			allObj.obj.$layer.height(height).append('<input type="hidden" name="autoPlay" value="'+autoPlay+'"><input type="hidden" name="autoTime" value="'+autoTime+'">');
			ifun.ifun_callback();
		});
	}

	var flashDbClick = function(){ //双击重新选择
		// $(document).on("dblclick.showSubmitDailog", ".layer-slider", function(){
		// 	var $this = $(this);
		// 	showDialog($this);
		// 	$this.trigger("click.clickStartMask");
		// });
	};

	function flashClickYes(){
		// if(arguments[0]==='yes'){

		// }
	};

	function cancelFlash(){
		$("#changeImageClear").trigger("click");
		$(".has-choose").html('');
		$("#picListUl").find("li.active").find("a.del").trigger("click.dellayer");
	}

	function showFlashDialog(type){
		var type = type || '',
			$appset_image_dialog = $("#appset_image_dialog"),
			$yes = $appset_image_dialog.find(".yes");
		if(type){
			$appset_image_dialog.find(".img_resources_box").addClass("flash_resources_box");
			$appset_image_dialog.find(".yes").addClass("flash_submit");
		}else{
			$appset_image_dialog.find(".img_resources_box").removeClass("flash_resources_box");
			$appset_image_dialog.find(".yes").removeClass("flash_submit");
		}
		$("#appset_image_dialog .dialog-cate").find("a").first().trigger("click");
		$appset_image_dialog.off("click.maskWindow").on("click.maskWindow", ".close", function(){
			cancelFlash();
		});
		
		if($yes.hasClass("flash_submit")){
			$appset_image_dialog.off("click.maskBtn").on("click.maskBtn", ".flash_submit", function(){
				var current = $('.flash_resources_box').find('.current'),
					current_len = current.length;
				if(current_len>0){
					if(current_len>6){
						$(".has-choose").html('最多选择 6 张图片');
					}else{
						$(".has-choose").html('');
						if($("#flash_submit").length===0){
							$appset_image_dialog.append('<input type="hidden" id="flash_submit" />');
						}
						
						$("#flash_submit").maskWindow({id:"flash_submit_dialog", center:true, cb:
							function(){
								var _html ='';
								for(var i=0;i<current_len;i++){
									_html +='<li> <img src="'+$(current[i]).find("img").data("src")+'"><a class="del" title="点击删除"><i class="fa fa-times-circle"></i></a><a class="chg" title="点击更换"><i class="fa fa-photo"></i></a></li>';
								}
								for(var j=current_len;j<6;j++){
									_html +='<li> <span>+</span> </li>';
								}
								$("#flashCtrl").find("ul").html(_html);

								cutPicCtrl();
								showFlash($(current[0]).find("img").data("src"));

								$("#flash_submit_dialog").off("click.maskWindow").on("click.maskWindow", ".close", function(){
									cancelFlash();
								});
							}
						});
						$("#flash_submit").trigger("click");
						$appset_image_dialog.hide();
					}	
				}else{
					$(".has-choose").html('请至少选择 1 张图片');
				}
			});
			var interval = setInterval(function(){
				var yesEvt = $._data($("#appset_image_dialog .yes")[0], "events");
				if(yesEvt && yesEvt["click"]){
					$("#appset_image_dialog").find(".yes").off("click.maskBtn");
					clearInterval(interval);
				}
			},100);
		}
	};

	var showDialog = function(dom){
		var $dom = dom || $("#flashAddBtn");
		//图集选择图片
		$dom.maskWindow({id:"appset_image_dialog",center:true, cb:
			function(){
				console.log("now select resource");
				showFlashDialog(true);
				//图集点击选择多张图片
				$(".flash_resources_box").off("click.selectResource").on("click.selectResource", "li", function(){
					var $this = $(this);
					if($this.hasClass("current")){
						$this.removeClass("current");
					}else{
						$this.addClass("current");
					}
				});
				$("#flash_dialog").find(".close").trigger("click");	
			}
		});
	};
	
	//页面事件绑定
	function flashPlayEvent(){

		var flash_ctrl = function(){
			$(document).off("click.flash-resize").on("click.flash-resize", ".flash-resize a", function(e){
				var $this=$(this);
				if($this.hasClass("off")){
					$this.removeClass("off");
					$this.find("i").removeClass("fa-toggle-off").addClass("fa-toggle-on");
					$this.parent().parent().find(".flash-slide").removeClass("flash-slide-off");
				}else{
					$this.addClass("off");
					$this.find("i").removeClass("fa-toggle-on").addClass("fa-toggle-off");
					$this.parent().parent().find(".flash-slide").addClass("flash-slide-off");
				}
			});

			$(document).off("click.flash-slide").on("click.flash-slide", ".flash-slide", function(e){
				var $this = $(this),
					total = $this.width(),
					current = $this.find("p").width(),
					per = total/5,
					next = "";

				if($this.hasClass("flash-slide-off")){
					return;
				}else{
					if($(e.target).hasClass("flash-slide")){
						if(current!==total){
							current += per;
						}
					}else{
						if(current>per){
							current -= per;
						}
					}
					next = current/total;
					$this.find("p").css("width",100*next+"%");
					$("#flashCtrlTimer").find("span").html(5*next);
				}	
			});
		};
		//ini方法
		var iniEvent = (function(){
			showDialog();
			flash_ctrl();
			addFlashToLayer();
			flashDbClick();
		}());
	};

	//暴露接口
	exports.flashPlayEvent = function(){
        flashPlayEvent();
    };
    exports.showFlashDialog = function(type){
    	showFlashDialog(type);
    };
});