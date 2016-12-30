//快捷键设置
define(function(require,exports,module){
    var pageMain = require( './main' ),
        allObj   = require('./objConfig'),
        ifun     = require('./ifunction'),
        pageType = parseInt(ifun.getUrl('type'));
    
    //ini 快捷键
    var iniFun = function(){
        var win_hei = $(window).height();
        
        //拖动数据交换
        var changeDiv = function(start_index , end_index , $thisUl){
            var $li = $thisUl.find("li");
            var len = $li.length;
            var div = null;
            
            if(end_index >= len){
                alert("移层失败，已经是最底层了");
                return false;
            }
            if(end_index < 0){
                alert("移层失败，已经是顶层了");
                return false;
            }
            //数据交换
            if(start_index != end_index){
                div = $li.eq(start_index).prop('outerHTML');
                $li.eq(start_index).replaceWith($li.eq(end_index).prop('outerHTML'));
                $li.eq(end_index).replaceWith(div);
            }
            
            return true;
        };
        
        //鼠标右键注册
        var layerMouseRightEvent = function(e, bol){
            $(this).on('contextmenu',function(e){
                return false;
            });
            if(3 == e.which){
                e.preventDefault();
                //console.log("改名字，上移，下移，复制",e.pageX);
                
                pageMain.referrer.yjsadmin||$('#mrbl-del,#mrbl-copy')[allObj.obj.$layer.hasClass('j-nodel')||bol==true?'hide':'show']();
                
                allObj.obj.$mouseRightBox_layer.css({
                    "left" : e.pageX+10,
                    "top" : (win_hei - e.pageY) < 200 ? e.pageY - 150 : e.pageY+10
                }).show();
            }
        };
        allObj.obj.$picListUl.on("mouseup.rightclick2","li",function(e){
            layerMouseRightEvent(e, !!$(this).find('.j-nodel').length);
        });
        allObj.obj.$cPhone.on("mouseup.rightclick",".layer",function(e){
            layerMouseRightEvent(e);
        });
        
        //阻止默认的右键事件
        $(document).on("mouseup.iniMouseRightBtnEvent",function(e){
            $(this).on('contextmenu',function(e){  
                return false;  
            });
            if(3 != e.which){
                allObj.obj.$mouseRightBox.hide();
            }
        });
        
        //注册右键的事件 - pageList
        allObj.obj.$pageListUl.on("mouseup","input.name",function(e){
            //鼠标右键
            if(3 == e.which){  
                //console.log("改名字，上移，下移，复制",e.pageX);
                
                allObj.obj.$mouseRightBox_page.css({
                    "left" : e.pageX+10,
                    "top" : (win_hei - e.pageY) < 200 ? e.pageY - 150 : e.pageY+10
                }).show();
            }
        });
        
        //页面列表的 - 右键方法
        var mouseRightBtnEvent_page = function(){
            
            //图层的鼠标右键菜单 - 事件绑定 - 复制图层
            var $clonePageButton = $("#clonePageButton");
            $("#mrbp-copy").on("click",function(){
                $clonePageButton.trigger("click");
            });
            
            //上移一层
            $("#mrbp-prev").on("click",function(){
                var $thisUl = $("#pageListUl");
                var num = $thisUl.find(".active").index();
                if(changeDiv(num,(num-1),$thisUl)){
                    ifun.ifun_callback();//运行完后保存数据
                }
            });
            
            //下移一层
            $("#mrbp-next").on("click",function(){
                var $thisUl = $("#pageListUl");
                var num = $thisUl.find(".active").index();
                if(changeDiv(num,(num+1),$thisUl)){
                    ifun.ifun_callback();//运行完后保存数据
                }
            });
            
            //删除图层
            $("#mrbp-del").on("click",function(){
                $("#pageListUl").find(".active .del").trigger("click");
            });
            
            //重新命名图层
            $("#mrbp-rename").on("click",function(){
                $("#pageListUl").find(".active .name").trigger("dblclick");
            });

            //保存为模板
            var saveAsMoban = function(file){
                var $fixedBox = $("#fixedBox");
                var $infoBox = $("#infoBox");
                
                $.ajax({
                    url: allObj.ajax.url+'saveSingleTemplate',
                    type: 'POST',
                    data: {file : file, type: pageType},
                    beforeSend:function(){
                        $infoBox.html("保存中...").fadeIn(1000);
                    }
                })
                .done(function(msg) {
                    console.log(msg);
                    if(msg){
                        $infoBox.html("保存成功！");
                        $fixedBox.fadeOut(500);
                        $infoBox.fadeOut(1000);
                        $("#allMobanType").find("li").eq(0).removeAttr("data-lock");
                    }else{
                        $infoBox.html("保存失败！");
                        $fixedBox.fadeOut(500);
                        $infoBox.fadeOut(1000);
                    }
                })
                .fail(function() {
                    console.log("保存模板出错！");
                })
                .always(function() {
                    //console.log("complete");
                });
            }
            $("#mrbp-saveMoban").on("click",function(){
                var shtml = $("#pageListUl").find(".active input").nextAll('template').html();
                $("#fixedBox").fadeIn(1000);
                html2canvas($("#cPhoneEdit")[0], {  
                  allowTaint: false,  
                  taintTest: false, 
                  onrendered: function(canvas) {  
                      canvas.id = "saveMobanCanvas";
                      //console.log(canvas);
                      //生成base64图片数据  
                      var dataUrl = canvas.toDataURL("image/jpeg",0.2); 
                      saveAsMoban(dataUrl);
                      //document.body.appendChild(newImg);
                      //$fileList.val(newImg);
                    }
                });
            });
            
        };mouseRightBtnEvent_page();
        
        //图层列表的 - 右键方法
        var mouseRightBtnEvent_layer = function(){
            
            //图层的鼠标右键菜单 - 事件绑定 - 复制图层
            var $copyLayerButton = $("#copyLayerButton");
            $("#mrbl-copy").on("click",function(){
                $copyLayerButton.trigger("click");
            });

            //置顶
            $("#mrbl-top").on("click",function(){
                var $thisUl = $("#picListUl");
                var num = $thisUl.find(".active").index();
                if(changeDiv(num,0,$thisUl)){
                    ifun.picListChange(num,0);
                    ifun.ifun_callback();//运行完后保存数据
                }
            });

            //置底
            $("#mrbl-bottom").on("click",function(){
                var $thisUl = $("#picListUl");
                var num = $thisUl.find(".active").index();
                var max = $thisUl.find('li').length;
                if(changeDiv(num,max-1,$thisUl)){
                    ifun.picListChange(num,max-1);
                    ifun.ifun_callback();//运行完后保存数据
                }
            });
            
            //上移一层
            $("#mrbl-prev").on("click",function(){
                var $thisUl = $("#picListUl");
                var num = $thisUl.find(".active").index();
                if(changeDiv(num,(num-1),$thisUl)){
                    ifun.picListChange(num,(num-1));
                    ifun.ifun_callback();//运行完后保存数据
                }
            });
            
            //下移一层
            $("#mrbl-next").on("click",function(){
                var $thisUl = $("#picListUl");
                var num = $thisUl.find(".active").index();
                if(changeDiv(num,(num+1),$thisUl)){
                    ifun.picListChange(num,(num+1));
                    ifun.ifun_callback();//运行完后保存数据
                }
            });
            
            //删除图层
            $("#mrbl-del").on("click",function(){
                $("#picListUl").find(".active .del").trigger("click");
            });
            
            //重新命名图层
            $("#mrbl-rename").on("click",function(){
                $("#picListUl").find(".active .name").trigger("dblclick");
            });
            
        };mouseRightBtnEvent_layer();
        
        
        var delMusic = (function(){
            $("#soundbox").on("mouseup",function(e){
                //鼠标右键
                if(3 == e.which){  
                    e.preventDefault();
                    allObj.obj.$mouseRightBox_music.css({
                        "left" : e.pageX+10,
                        "top" : (win_hei - e.pageY) < 200 ? e.pageY - 150 : e.pageY+10
                    }).show();
                }
            });
        }());
    };
    
    //iniShortcuts
    exports.iniFun = function(){
        iniFun();
    };
    
});