//JavaScript Document
//初始化页面
define(function(require,exports,module){
    var $        = require( '$' );
    var pageMain = require( './main' );
    require( 'library/libs/uploadify/jquery.uploadify.min' );
    require( '/member/publicStatic/appRes/js/qrcode.min' );
    require( '/member/publicStatic/h5ds/scripts/library/jquery.lazyload.min' );
    // 为了解决因zepto倒置的js报错的问题
    $.fn.swipeUp = function(){};$.fn.swipeDown = function(){};$.fn.swipeLeft = function(){};$.fn.swipeRight = function(){};
    
    //初始化页面
    var Config = {
        debug : false  //本地开发模式，默认鼠标右键事件
      ,    NotSPA: false  //非单页应用
      , title: ''
    };
    
    var Url = document.URL;
    var ifun = require('./ifunction');
    var allObj = require('./objConfig');
    var params = ifun.getParams('parmes');
    var tplId = ifun.getUrl('tplId');
    var packetId = ifun.getUrl('packetId');
    var activeId = ifun.getUrl('activeId');
    var pageType = parseInt(ifun.getUrl('type'));
    var pageConfig = window.pageConfig;
    var defaultNullTpl = '<div class="not-spa" id="coolapp" onselectstart="return true;" ondragstart="return false;" data-sliderDire="updown" data-music="false" data-slider="9" data-cayica="false" style="background-repeat:repeat;background-color:none;"><div class="page page-1-1 page-current" pagename="未命名"><div class="wrap" style="background-color:transparent;background-repeat:repeat;background-size:auto;background-position:0% 0%;"></div></div></div>';
    //1楼书  3海报  5活动 
    if(pageType===3 || pageType===5 || pageType===9){
        Config.NotSPA = true;
    }
    
    // 退出 按钮
    var exit = $('#exit');
    if( Url.indexOf('act.yjsvip.com')>-1 ){
        exit.attr( 'href', 'https://www.yjsvip.com' + exit.attr('href').trim() );
    }
    
    var iniCoolAppPage = function(ifun){
        var allObj = require('./objConfig');
        var shor = require("./shortcutsSet"); //快捷键
        var flashPlayEvent = require('./flashPlayEvent'); //图片图集动画相关

        (function(){
            var nameData={};
            if(params.aid){    
                nameData={"id":params.aid};
            }else if(tplId){
                nameData={"tplId":tplId};
            }else{
                nameData = '';
            }
            if(!Config.title && nameData){
                $.ajax({
                    url:allObj.ajax.url+"getAppName",
                    data:nameData,
                    dataType:"json",
                    type:"get",
                    async: false,
                    success:function(_data){
                        if(_data.status===200){
                            Config.title = _data.data&&_data.data[0] ? _data.data[0].appName : '';
                        }
                    }
                });
            }
        }());
        
        //红包模版
        if(packetId){
            $("#mouse-right-btn-packet").html(allObj.obj._packetTpl);
            $("#getPacket").on("click", function(e){
                e.preventDefault();
                allObj.obj.$mouseRightBox_packet.css({
                    "left" : e.pageX-30,
                    "top" : e.pageY+30
                }).show();
            });
        }else{
            $("#getPacket").showWindow({id:"packList_dialog",center:true,cb:function(){
                require('./upLoadMoban').loadPacketTpl();
            }});
        }

        //初始化动画列表
        var animateAll = require("./animates"); //动画
        $("#show_box").html(animateAll.animates.show);
        $("#hidde_box").html(animateAll.animates.hide);
        $("#other_box").html(animateAll.animates.other);
        $("#clickAnimate_show").html(animateAll.animates.other);
        $("#clickAnimate_hide").html(animateAll.animates.other);
        $("#clickAnimate_other").html(animateAll.animates.other);

        //全局快捷键
        shor.iniShortcuts();

        //初始化布局
        require('./layout').initPage(Config.NotSPA);
        
        // 设置网格
        var divide = function( num ){ // 解决seajs正则bug
            return 1/num;
        },
        setLineGrid = (function(){
            var $lineGrid = $('#lineGrid'),
                data = eval('('+$lineGrid.attr("data-set")+')'),
                shtml = '';
            for(var i=0;i<data.x;i++){
                shtml +='<span class="lx" style="top:'+(1036*divide(data.x))*(i+1)+'px"></span>';
            }
            for(var j=0;j<data.x;j++){
                shtml +='<span class="ly" style="left:'+(1036*divide(data.y))*(j+1)+'px"></span>';
            }
            $lineGrid.html(shtml);
        }());
        
        //初始化页面列表
        require('./iniPageList').iniPageList(Config.NotSPA);
        
        //隐藏操作区 - 选项卡
        //初始选项卡
        allObj.obj.$moreSet.css("display","none");
        allObj.obj.$animateSet.css("display","none");
        allObj.obj.$functionSet.css("display","none");
        
        //初始化拖动效果
        var picListChange = function(start,end){
            ifun.picListChange(start,end);
        }
        allObj.obj.$pageListUl.dragListMt({callback:null, xfloat:8, liheight:28, yfloat:10});
        allObj.obj.$picListUl.dragListMt({callback:picListChange, xfloat:0, liheight:20, yfloat:10});
        
        //初始化 - 放大缩小效果
        require('./toMaxOrToMin').toMaxOrToMin();
        
        //初始化 - 隐藏左边页面列表
        require('./hideLeft').hideLeft();
        
        //初始化 - 分割线拖动
        require('./cutOffRule').cutOffRule();
    
        //初始化 - 页面列表的事件
        require('./pageListEvent').pageListEvent();
        
        //选择图层 - li标签
        require('./selectLayerByLi').selectLayerByLi();

        //图片图集动画相关
        flashPlayEvent.flashPlayEvent();
        
        //初始化 - 拖动，放大，位移，旋转 事件
        require('./mouseEventToDrag');

        //动画类型切换（自动执行 or 点击执行）
        // $("#clickAddAnimate").on("click","span",function(){
        //     $(this).siblings().removeClass('active');
        //     $(this).addClass('active');
        //     allObj.obj.animateState = $(this).data("state");
        // });
        
        //页面参数/选择/设置/初始化   初始数据-> 渲染内容 -> 显示出来
        var $rdsHead = $("#rdsHead");
        $rdsHead.on("click","a",function(){
            var $this = $(this);
            var $rdsBody = $("#rdsBody");
            $rdsHead.find("a").removeClass("active");
            $this.addClass("active");
            
            //获取ID值
            var id = $this.attr("id");
            var class_name = id+"_box"; 
            
            //分布判断
            $rdsBody.find(".hidden").hide(0);
            $rdsBody.find("."+class_name).show(0);
        });
        
        //APP 设置 快捷菜单 
        var appSetDrag = function(){
            var box = {
                $this : $("#appSet"),
                $i : $("#appSetHide"),
                h2Hei : 35,
                hei : null
            };
            box.hei = box.$this.height();
            //拖动
            box.$this.dragMt();
            
            box.$i.on("click",function(){
                if(box.$this.data("mark") == null){
                    box.$this.animate({
                        "height" : box.h2Hei
                    });
                    box.$this.data("mark",1);
                    $(this).removeClass("fa-minus").addClass("fa-chevron-down");
                }
                else{
                    box.$this.animate({
                        "height" : box.hei
                    });
                    box.$this.data("mark",null);
                    $(this).removeClass("fa-chevron-down").addClass("fa-minus");
                }
            });
        };
        appSetDrag();
        
        //点击页面区域，隐藏一些功能
        $(document).on('click.clear',function(e){
            var e = e || window.event; //浏览器兼容性
            var elem = e.target || e.srcElement;
            //console.log("",elem.id);
            if(elem.id == "center"){
                allObj.obj.$selectBox.css('display','none'); //点击的不是div或其子元素
                return;
            }
        });
        
        //点眼睛
        allObj.obj.$picListUl.on("click.eye",".eye",function(e){
            var $i = $(this).find("i");
            var index = $(this).parent().parent().index();
            var $this = ifun.returnLayerByIndex(index);
            e.stopPropagation();
            if($i.is(":hidden")){
                $this.css("display","block");
                $i.css("display","inline-block");    
            }
            else{
                $this.css("display","none");
                $i.css("display","none");    
                allObj.obj.$selectBox.css('display','none');
            }
            ifun.ifun_callback();
        });
        
        //layerAdd
        //初始化 - 添加图层操作
        require('./layerAdd').layerAdd();
        
        //动画效果选择
        allObj.obj.$animateNav.on("click","li",function(){
            var $this = $(this);
            var data = "#"+$this.attr("data")+"_box";
            //导航
            allObj.obj.$animateNav.find("li").removeClass("active");
            $this.addClass("active");
            //菜单
            allObj.obj.$animatesUl.addClass("hidden");
            $(data).removeClass("hidden");
        });
        
        //播放本页动画
        $("#seePlay").on("click",function(){
            allObj.obj.$selectBox.css("display","none");
            allObj.obj.$cPhoneEdit.hide(0).show(0);    
        });
        
        //标线
        $("#seeLine").on("click",function(){
            var $lineGrid = $("#lineGrid");
            if($lineGrid.css("display") == "none"){
                $lineGrid.css("display","block");
            }else{
                $lineGrid.css("display","none");
            }
        });

//         //操作记录
//         $("#historyData").on("click",function(){
//             if(allObj.obj.$historyRecords.is(':visible')){
//                 allObj.obj.$historyRecords.hide();
//             }else{
//                 allObj.obj.$historyRecords.show();
//             }
//         });
//
//         //操作记录还原
//         allObj.obj.$historyRecords.on('click', 'a', function(event) {
//             allObj.obj.$selectBox.hide();
//             allObj.obj.$cPhoneEdit.html($(this).data("html"));
//             allObj.obj.$historyRecords.hide();
//             ifun.ifun_callback(); //还原后，重新记录数据
//         });
        
        //打开素材库
        //保存APP的参数
        var appset_info_back = function(str){

            var urlPath = $("#coolAppAllData").attr("urlPath");
            if(str == "yes"){
                var data = {
                    name : $("#appset_name_val").val(),
                    describe : $("#appset_info_val").val(),
                    img : $("#appset_main_pic").attr("src")
                };
                //console.log(data);
                $('#appset_main_pic').attr('data-src',data.img);
                $.ajax({
                    type:"post",
                    url:urlPath+"/app/updateAppsInfo",
                    dataType:"JSON",
                    data:{"appId":params.aid,"title":data.name,"description":data.describe,"coverPicture":data.img},
                    success: function(msg){
                        console.log(msg);
                        if(msg == true){
                            ifun.tipsFadeInAndFadeOut("设置成功！");    
                        }
                    }
                });
            }else{
                var $appset = $('#appset_main_pic');
                $appset.attr('src',$appset.attr('data-src'));
            }
        };
        $("#resources_btn").showWindow({id:"resources",center:false});
        $("#appset_name").showWindow({id:"appset_name_dialog",center:true});
        $("#appset_info").showWindow({id:"appset_info_dialog",center:true,callback:appset_info_back});
        $("#appset_cpage").showWindow({id:"appset_cpage_dialog",center:true});
        $("#appset_appbg").showWindow({id:"appset_appbg_dialog",center:true});
        $("#appset_clear").showWindow({id:"appset_clear_dialog",center:true});

        $("#function_add_animate_btn").showWindow({id:"setAnimate_clear_dialog",center:true});

        //音乐
        $("#appset_music").maskWindow({id:"appset_music_dialog",center:true,cb:function(){
            $("#appset_music_dialog .dialog-cate").find("a").first().trigger("click");
        }});
        $("#addOutLinkMusicButton").maskWindow({id:"outLinkMusic_dialog",center:true});
        //图片
        $("#appset_image").maskWindow({id:"appset_image_dialog",center:true, cb:function(){
            flashPlayEvent.showFlashDialog();
        }});
 
        //历史记录弹窗
        var $getHistoryCoolApp = $("#getHistoryCoolApp");
        var $getHistory_dialog_ul = $("#getHistory_dialog_ul");
        var urlPath = $("#coolAppAllData").attr("urlPath");
        $getHistoryCoolApp.showWindow({id:"getHistory_dialog",center:true});
        $getHistoryCoolApp.on("click",function(){
            var urlBase = allObj.ajax.url+"findAppHistory/",
                url = urlBase+"appId/"+params.aid;
            if(ifun.getUrl('tplId')){
                url = urlBase+"/tplId/"+ifun.getUrl('tplId');
            }
            $.ajax({
                url:url, 
                type:"post",
                async:false,
                dataType:"jsonp",
                beforeSend: function(){
                    $("#getHistory_dialog_ul").html("数据加载中...");
                },
                success:function(d){
                    var data = d.data;
                    console.log(data);
                    if(data != null){
                        var xhtml = "";
                        for(i in data){
                            xhtml+='<li>历史记录：'+data[i].createTime+'<a class="returnHistory" href="javascript:void(0)" data-id="'+data[i].trackId+'">还原记录</a></li>';    
                        };
                        $("#getHistory_dialog_ul").html(xhtml);
                        $("#getHistory_dialog").center();
                    }
                    
                }
            });    
        });

        //添加特效
        $("#addEffectButton").showWindow({id:"addEffect_dialog",center:true});
        
        
        //还原历史记录
        $getHistory_dialog_ul.on("click",".returnHistory",function(){
            var trackId = $(this).attr("data-id");
            $("#getHistory_dialog .close").trigger("click");
            $.ajax({
                url:allObj.ajax.url+"restoreAppHistory/"+params.aid+"/"+trackId,  //node 接口
                type:"post",
                async:false,
                // data: {appId:params.aid,trackId:trackId},
                data: {type: pageType},
                dataType:"jsonp",
                beforeSend: function(){
                    //$("#getHistory_dialog_ul").html("数据加载中...");
                    $("#fixedBox").fadeIn(1000);
                    $("#infoBox").html("还原中...").fadeIn(1000);
                },
                success:function(data){
                    //console.log(data);
                    if(data.status == "1"){
                        $("#returnData").html(data.appHtml);
                        pageConfig.cacheDOMData.appHtml = $( '<div>'+data.appHtml+'</div>' );
                        //初始化页面列表
                        require('./iniPageList').iniPageList();
                        //默认选中第一个
                        $("#pageListUl li").eq(0).trigger("click");
                        
                        ifun.tipsFadeInAndFadeOut("还原成功");
                        
                    }else{
                        ifun.tipsFadeInAndFadeOut("还原失败！");
                    }
                    $("#fixedBox").fadeOut(1000);
                    $("#infoBox").fadeOut(1000);
                    
                }
            });
        });

        //绑定上传图片的方法
        require('./upLoadImgs').uploadImgs();
        
        //选择背景图层 - li标签
        require('./layerObjBackground').backgroundLayer();
    
        //选择素材
        ifun.bindSelectImgResources();
        
        //初始化 - APP基本设置方法
        require('./appBasicSet').iniAppBasicSet();
    
        //初始化完成 选择第一个page
        $("#pageListUl li").eq(0).trigger("click");
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //功能 模块的方法
        require("./functionPlugin").iniPluginAction();
        
        //保存APP
        require('./appSave').appSave(Config.NotSPA);
        
        //绑定鼠标滚动事件
        $("#rdsBody").on("mousewheel","input[type=text]",function(event, delta) {
            event.preventDefault(); //阻止默认事件
            //console.log(event, delta);
            var $this = $(this);
            var val = $this.val()||0;
            if(delta == 1){ //往上滑动
                val++;
            }else{ //往下滑动
                if(val > 0){
                    val--;
                }
            }
            $this.val(val).trigger("change");
       });
        
    }; //页面初始化
    
    $("#fixedBox").fadeIn(1000);
    $("#infoBox").html("载入中...").fadeIn(1000);
    
    $(function(){
        //执行方法
        
        if(tplId || packetId){ //创建模版,渲染以模版优先，保存已项目优先
            //ajax 获取服务器数据 ，页面列表 - 渲染
            var _url = allObj.ajax.url+"findTpl/";
            if(tplId){
                _url += "tpl/"+tplId;
            }else{
                _url += "packet/"+packetId
            }
            $.ajax({
                url:_url,  //node 接口
                type:"post",
                data: {type: packetId ? 3 : pageType, activeId: activeId, packetId: packetId},
                async:false,
                dataType:"json",
                success:function(data){
                    //console.log(data);
                    $("#fixedBox").fadeOut(1000);
                    if(data.success == true){
                        if( data.appHtml == "" || data.appHtml.indexOf('class="wrap')==-1 ){
                            console.log("载入失败,使用默认的空模板!");
                            data.appHtml = defaultNullTpl;
                        }
                        //初始化页面
                        $("#returnData").html(data.appHtml);
                        pageConfig.cacheDOMData.appHtml = $( '<div>'+data.appHtml+'</div>' );
                        iniCoolAppPage(ifun);
                        ifun.tipsFadeInAndFadeOut("载入成功!");
                        //绑定鼠标右键方法
                        !Config.debug && require('./iniMouseRightBtnEvent').iniFun();

                    }else{
                        ifun.tipsFadeInAndFadeOut("载入失败!");
                    }
                }
            });    
        }else if(params && params.aid && params.bid){
            //ajax 获取服务器数据 ，页面列表 - 渲染
            $.ajax({
                url:allObj.ajax.url+"findOneApp",  //node 接口
                type:"post",
                async:false,
                data: {bid:params.bid, aid:params.aid, type: pageType},
                dataType:"json",
                success:function(data){
                    //console.log(data);
                    $("#fixedBox").fadeOut(1000);
                    if(data.success == true){
                        if( data.appHtml == "" || data.appHtml.indexOf('class="wrap')==-1 ){
                            console.log("载入失败,使用默认的空模板!");
                            data.appHtml = defaultNullTpl;
                        }
                        //初始化页面
                        $("#returnData").html(data.appHtml);
                        pageConfig.cacheDOMData.appHtml = $( '<div>'+data.appHtml+'</div>' );
                        iniCoolAppPage(ifun);
                        ifun.tipsFadeInAndFadeOut("载入成功!");
                        //绑定鼠标右键方法
                        !Config.debug && require('./iniMouseRightBtnEvent').iniFun();

                    }else{
                        ifun.tipsFadeInAndFadeOut("载入失败!");
                    }
                }
            });    
        }else{
            console.log('error params');
        }
    });
    
});