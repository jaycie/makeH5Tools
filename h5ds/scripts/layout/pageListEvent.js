//页面整体参数，暴露出去
define(function(require,exports,module){
    var pageMain   = require( './main' ),
        allObj     = require('./objConfig'),
        ifun       = require('./ifunction'),
        pageConfig = window.pageConfig;
    
    //页面事件绑定
    function pageListEvent(){
        
        //删除页面
        var delPage = function(){
            allObj.obj.$aside.on("click","li a.del",function(e){
                e.stopPropagation();
                if($(this).parent().next()[0]){
                    $(this).parent().next().trigger('click');
                }else{
                    if($(this).parent().prev()[0]){
                        $(this).parent().prev().trigger('click');
                    }else{
                        allObj.obj.$cPhoneEdit.find('.wrap').empty();
                    }
                }

                var $pageListUl = $("#pageListUl"),
                    current = parseInt($(this).prev().children('em').html())-1;

                $(this).parent().remove();

                // 更改页码
                var len = $pageListUl.find('li').length;
                for(var i=current;i<len;i++){
                    var _dom = $($pageListUl.find('li')[i]).children('span').children('em'),
                        _domVal = _dom.html();
                    _dom.html(_domVal-1);
                }
                
            });
        };
        
        //选择页面
        var selectPage = function(){
            
            //点击页面列表 - 点击后，自动选中背景图层
            allObj.obj.$aside.on("click.selectPageListUl",".pageList li",function(){

                //操作记录滞空
                allObj.obj.$historyRecords.html("");

                $(this).addClass("active").siblings().removeClass('active');
                allObj.obj.$page = $(this); //选中的页面对象
                //allObj.obj.$layer = null; //切换页面后，清空$layer 对象
                allObj.obj.sameIndex = -1;
                
                //隐藏操作区 - 选项卡
                //初始选项卡
                allObj.obj.$moreSet.css("display","none");
                allObj.obj.$animateSet.css("display","none");
                allObj.obj.$functionSet.css("display","none");
                
                //初始化 可视区域
                var data = $(this).find("input").nextAll('template').html();
                allObj.obj.$cPhoneEdit.html(data);
                
                //初始化 图层列表
                //console.log(allObj.obj.$cPhoneEdit.html());
                var iniPicListUlli = function(){
                    //初始化个数
                    var $layers = allObj.obj.$cPhoneEdit.find(".layer");
                    var arr = [];
                    $layers.each(function(){
                        var $this = $(this), curId = $this.attr( 'id' );
                        var layer = {
                            name : $this.hasClass('layer-text') ? $this.find('.el-text').text() : $this.attr("name"),
                            type : $this.attr("class"),
                            onClick : $this.attr("onClick"),
                            display : $this.css("display"),
                            zIndex : $this.css("z-index")
                        };
                        
                        //判断类型
                        if(layer.type.indexOf("layer-pic") != -1){
                            layer.type = pageMain.referrer.yjsadmin ? '<i class="fa fa-file-picture-o"></i>' : '<i class="fa '+( curId=='layer-scanCode'?'fa-qrcode j-nodel':curId=='layer-scanCode-text'?'fa-file-picture-o j-nodel':'fa-file-picture-o' )+'"></i>';
                        }
                        else if(layer.type.indexOf("layer-text") != -1){
                            layer.type = '<i class="fa fa-text-width"></i>';
                        }
                        else if(layer.type.indexOf("layer-effect") != -1){
                            layer.type = '<i class="fa fa-magic"></i>';
                        }
                        else if(layer.type.indexOf("layer-slider") != -1){
                            layer.type = '<i class="fa fa-stack-overflow"></i>';
                        }
                        else if(layer.type.indexOf("layer-iframe") != -1){
                            layer.type = '<i class="iconfont icon-xinjian"></i>';
                        }
                        else if(layer.type.indexOf("layer-form") != -1){
                            layer.type = '<i class="fa fa-stack-overflow"></i>';
                        }
                        else if(layer.type.indexOf("layer-packet") != -1){
                            layer.type = '<i class="fa fa-suitcase"></i>';
                        }
                        else alert("什么鬼类型？没找到！");
                        
                        //是否显示
                        if(layer.display == "none"){
                            layer.display = "none";
                        }else{
                            layer.display = "inline-block";
                        }
                        
                        //初始参数
                        var _picListUlli = allObj.obj._picListUlli;
                        _picListUlli = _picListUlli.replace("{{name}}",layer.name);
                        _picListUlli = _picListUlli.replace("{{typeico}}",layer.type);
                        _picListUlli = _picListUlli.replace("{{display}}",layer.display);
                        arr[(allObj.obj.maxZIndex - layer.zIndex - 1)] = _picListUlli;
                        
                    });
                    
                    //渲染页面
                    allObj.obj.$picListUl.html(arr);
                    allObj.obj.$selectBox.css('display','none'); //点击的不是div或其子元素
                    
                    // 不能删除的特殊图层处理
                    allObj.obj.$picListUl.find('.j-nodel').each(function(){
                        $(this).nextAll('a.del').hide();
                    })
                    
                };iniPicListUlli();
                
                //初始化 该页参数
                allObj.obj.$layer = $("#cPhoneEdit .warp");
                $("#layerBg").trigger("click");
                
            });
            
        };
        
        //复制页面
        var clonePage = function(){
            $("#clonePageButton").on("click",function(){
                var $pageListUl = $("#pageListUl");
                var $active = $pageListUl.find('.active');
                if($active[0] != undefined){
                    //复制到最后图层
                    // var pageNum = $pageListUl.find('li').length;
                    // $pageListUl.append($pageListUl.find(".active").clone().removeClass("active"));
                    // $("#pageListUl").find("li").last().trigger("click");
                    // $pageListUl.find(".active").children('span').children('em').html(pageNum+1);

                    // 复制到下一个图层
                    var current = parseInt($active.children('span').children('em').html());
                    $active.after($active.clone().removeClass('active'));
                    $active.next().trigger('click');

                    //更改页码
                    var pageNum = $pageListUl.find('li').length;
                    for(var i=current;i<pageNum;i++){
                        $($pageListUl.find('li')[i]).children('span').children('em').html(i+1);
                    }
                }else{
                    alert("请先选中页面，再复制！");
                }
            });
        };

        //添加页面 - 该方法只执行一次
        var addPage = function(){
            var loadMoBan = require('./upLoadMoban');
            loadMoBan.uploadAdminMoban();
            //打开模板库
            var $addMbPageButton = $("#addMbPageButton");
            $addMbPageButton.length && $addMbPageButton.showWindow({
                id:"pageTemplate",
                center:false,
                cb: function(){
                    //加载模板分类,模板
                    loadMoBan.upLoadMoban();
                }
            });
            
            //点击li事件
            $(".addNewPageBoxUl").on("click","li",function(){
                var $this = $(this);
                var pHtml = $this.attr("data-html"),
                    len = $("#pageListUl li").length+1;
                //添加空白页
                if(pHtml == "blank"){
                    $("#pageListUl").append('<li><div class="dragdiv"><span class="number"><em class="ng-binding">'+len+'</em></span><input type="text" value="未命名" class="name" disabled><template><div class="wrap" style="background-color:#fff;"></div></template></div><a href="javascript:void(0)" class="del"><i class="iconfont icon-close"></i></a></li>');
                }
                else{
                    $("#pageListUl").append("<li><div class='dragdiv'><span class='number'><em class='ng-binding'>"+len+"</em></span><input type='text' value='未命名' class='name' disabled><template>"+pHtml+"</template></div><a href='javascript:void(0)' class='del'><i class='iconfont icon-close'></i></a></li>");
                }
                $("#pageListUl").find("li").last().trigger("click");
                $("#pageTemplate a.close").trigger("click"); //关闭弹窗
            });    
            
            $("#fixedBox").on("click",function(){
                $("#pageTemplate a.close").trigger("click"); //关闭弹窗    
            });
        };
        
        //修改页面名称
        var changePageName = function(){
            //修改页面名称
            $("#pageListUl").off("dblclick.changePageName").on("dblclick.changePageName",".name",function(){
                var $input = $(this);
                $input.removeAttr("disabled").css({
                    "background":"#FFF",
                    "color":"#222430",
                    "border": "1px dashed #03a9f4"
                });
                $input.focus();
            });
            
            //修改名称后
            $("#pageListUl").off("focusout.changePageName").on("focusout.changePageName",".name",function(){
                $(this).attr("disabled","disabled").removeAttr("style");
                $(this).attr("value",$(this).val());
            });    
        };changePageName();
        
        //ini方法
        var iniEvent = function(){
            //绑定方法
            delPage();
            selectPage();
            addPage();
            clonePage();
        };iniEvent();
    }
        
    //暴露接口
    exports.pageListEvent = function(){
        pageListEvent();
    }
});