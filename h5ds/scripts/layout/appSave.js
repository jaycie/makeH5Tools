//页面整体参数，暴露出去
define(function(require,exports,module){
    var pageMain  = require( './main' ),
        allObj    = require('./objConfig'),
        ifun      = require('./ifunction'),
        viewLock  = 0, //如果是0，就不促发预览
        fileName  = '',
        tplId     = ifun.getUrl("tplId"),
        packetId  = ifun.getUrl("packetId"),
        activeId  = ifun.getUrl('activeId'),
        params    = ifun.getParams('parmes'),
        pageType  = ifun.getUrl('type'),
        $fixedBox = $("#fixedBox"),
        $infoBox  = $("#infoBox"),
        postForm  = function( type, request ){
        
        if(type == "save"){
            
            //保存APP
            $.post(allObj.ajax.url+"saveHtml", request, function( res ){
                if(res && res.status===200){
                    pageMain.alert({
                        title: '系统提示',
                        type: 3,
                        content: '保存成功!'
                    });
                    viewLock = 1;
                    fileName = res.url;
                }else{
                    pageMain.alert({
                        title: '系统提示',
                        type: 3,
                        content: '保存失败!'
                    });
                }
            })

        }else if(type == "publish"){
            // $infoBox.html("发布中...").show();
            //发布APP
            $.post(allObj.ajax.url+"publishApp", request, function( res ){
                if(res && res.status===200){
                    // $infoBox.html("发布成功！");
                    // $fixedBox.fadeOut(500);
                    // $infoBox.fadeOut(1000);
                    pageMain.alert({
                        title: '系统提示',
                        type: 3,
                        content: '发布成功!'
                    });
                    viewLock = 1;
                    fileName = res.url;
                }else{
                    pageMain.alert({
                        title: '系统提示',
                        type: 3,
                        content: '发布失败!'
                    });
                }
            })
            
        }
        
    },
    ofcs = {
        type_1: function(){
            
        },
        type_3: function( req ){
            
            // 海报模板操作 二维码 要求必选
            if( !/\sid=(["'])layer-scanCode\1\s/mg.test(req.html) ){
                // 运维后台 与 商户后台 操作
                if( pageMain.referrer.yjsadmin ){
                    return confirm('海报模板未配置二维码\n您确定要保存?');
                }else{
                    pageMain.alert({
                        title: '系统提示',
                        type: 2,
                        content: $.tsh.getRequest()['tplId'] ? '海报模板,请您选择二维码再操作!' : '您的海报页面,没有选配二维码!'
                    });
                    return false;
                }
                
            }
            
        },
        type_5: function(){
            
        }
    };
    
    //添加图层操作
    var appSave = function(notSpa){
            
            //保存APP
            $("#saveCoolApp,#publishCoolApp").on("click",function(){
                
                if( packetId && !activeId && !pageMain.referrer.yjsadmin ){
                    pageMain.alert({
                        title: '系统提示',
                        type: 3,
                        content: '您目前无权限修改红包模板!'
                    });
                    return;
                }
                
                //获取 微信参数 - 设置的参数
                //app参数
                var data = {
                    name : "",
                    describe : "最强大的HTML5在线编辑器",
                    img : "",
                    music : "",
                    slideDirection : "updown", //默认上下滑动
                    backgroundColor : "inherit",//背景颜色，默认是无
                    backgroundRepeat : "inherit",//背景平铺，默认
                    backgroundImg : "",//背景图片，默认
                    cayica : ""
                },
                curPackTpl = $('#packList>.current'),
                staticHost = pageMain.production ? '//static.yjsvip.com' : '//test.yjsvip.com';
                
                var nameData={};
                if(params.aid){
                    nameData={"id":params.aid};
                }else if(tplId){
                    nameData={"tplId":tplId};
                }else{
                    nameData = '';
                }
                if(!allObj.ajax.title && nameData){
                    $.ajax({
                        url:allObj.ajax.url+"getAppName",
                        data:nameData,
                        dataType:"json",
                        type:"get",
                        async: false,
                        success:function(_data){
                            if(_data.status===200){
                                var _appName = _data.data && _data.data[0] ? _data.data[0].appName : '';
                                data.name = _appName;
                                allObj.ajax.title = _appName;
                            }    
                        }
                    });
                }else{
                    data.name = allObj.ajax.title;
                }
                    
                
                //设置描述
                data.describe = $("#appset_info_val").val();
                
                //图片设置
                data.img = $("#appset_main_pic").attr("src");
                
                //音乐
                // if($("#appset_music_switch").attr("class").indexOf("off") == -1){
                //     data.music = $("#appset_music_val").val();
                // };
                data.music = $("#appset_music_val").val();
                
                // fuck 二维码层级计算 商户自己操作二维码的,还要做些无聊的特殊处理。。。
                var layerScanCode = $('#layer-scanCode'), layerScanCodeText = $('#layer-scanCode-text');
                if( !pageMain.referrer.yjsadmin&&(pageType==3 && layerScanCode.length && layerScanCode.css('zIndex')!=allObj.obj.maxZIndex-1 || layerScanCodeText.css('zIndex')!=allObj.obj.maxZIndex-2) ){
                    
                    var asidePLi = allObj.obj.$picListUl.find('li').eq( allObj.obj.maxZIndex-layerScanCode.css('zIndex')-1 ),
                        asideTLi = allObj.obj.$picListUl.find('li').eq( allObj.obj.maxZIndex-layerScanCodeText.css('zIndex')-1 ),
                        firstLi  = allObj.obj.$picListUl.find('li').first();
                    firstLi.find('.fa-qrcode.j-nodel').length||firstLi.before( asidePLi );
                    asidePLi.next('.fa-file-picture-o.j-nodel').length||asidePLi.after( asideTLi );

                    layerScanCode.css( 'zIndex', allObj.obj.maxZIndex-1 );
                    layerScanCodeText.css( 'zIndex', allObj.obj.maxZIndex-2 );
                    layerScanCode.siblings('.layer').not('#layer-scanCode-text').each(function(i,ele){
                        ele = $( ele );
                        ele.css('zIndex', ele.css('zIndex')-2);
                    })
                    
                    ifun.ifun_callback();
                }
                
                //滑动方向
                var $appset_cpage_dialog = $("#appset_cpage_dialog");
                data.slideDirection = $appset_cpage_dialog.attr("data-sliderDire");
                if(data.slideDirection == "updown"){ //上下滑动
                    //var arrowV ="";
                    var sliderJS = '<script>var sideWipeType = "updown";</script><script src="'+staticHost+'/member/publicStatic/appRes/js/index_updown.js"></script>';
                    var sliderDire = 'updown';
                }
                else{
                    //上下切换
                    //var arrowV = '-webkit-transform: rotate(-90deg)';
                    var sliderJS = '<script>var sideWipeType="leftRight";</script><script src="'+staticHost+'/member/publicStatic/appRes/js/index_leftright.js"></script>';
                    var sliderDire = 'leftright';
                };
                
                //发布的时候，根据设置，重置参数
                switch($appset_cpage_dialog.attr("data-sliderType")){
                    case "1": { allObj.obj.slide = allObj.obj.slider.slide1; allObj.obj.slideNo = 1;};break;
                    case "2": { allObj.obj.slide = allObj.obj.slider.slide2; allObj.obj.slideNo = 2;};break;
                    case "3": { allObj.obj.slide = allObj.obj.slider.slide3; allObj.obj.slideNo = 3;};break;
                    case "4": { allObj.obj.slide = allObj.obj.slider.slide4; allObj.obj.slideNo = 4;};break;
                    case "5": { allObj.obj.slide = allObj.obj.slider.slide5; allObj.obj.slideNo = 5;};break;
                    case "6": { allObj.obj.slide = allObj.obj.slider.slide6; allObj.obj.slideNo = 6;};break;
                    case "7": { allObj.obj.slide = allObj.obj.slider.slide7; allObj.obj.slideNo = 7;};break;
                    case "8": { allObj.obj.slide = allObj.obj.slider.slide8; allObj.obj.slideNo = 8;};break;
                    case "9": { allObj.obj.slide = allObj.obj.slider.slide9; allObj.obj.slideNo = 9;};break;
                };
                
                //app背景色
                var $cPhoneEdit = $("#cPhoneEdit");
                data.backgroundColor = $cPhoneEdit.css("background-color");
                
                //app背景重复
                data.backgroundRepeat = $cPhoneEdit.css("background-repeat");
                
                //背景图片
                // console.log($cPhoneEdit.css("background-image"));
                if ($cPhoneEdit.css("background-image") !== "none") {
                    data.backgroundImg = $cPhoneEdit.css("background-image").replace(/url\(([^\)]+)\)/gi, "$1").replace(/"/g, "");
                }
                
                //擦一擦
                if($("#appset_clear_switch").attr("class").indexOf("off") == -1){
                    data.cayica = $("#cayicaImage").attr("src");
                };
                
                //擦一擦
                var caImgHtml = "";
                var caImgHtml_data = "false";
                if(data.cayica != ""){
                    caImgHtml = '<div class="cabox" id="cabox" dataBgImg="'+data.cayica+'"><canvas id="cas"></canvas></div>'+
                                '<script src="'+staticHost+'/member/publicStatic/appRes/js/caimg.js"></script>';
                    caImgHtml_data = "true";
                };
                //音乐
                var musicHtml = "";
                var musicHtml_data = "false";
                if(data.music != ""){
                    musicHtml = '<div class="soundbox" id="soundbox" data="on"><em class="c1"></em><em class="c2"></em><div class="soundico"></div><audio id="coolappSong" class="coolappSong_mobile" style="display:none; visibility:hidden;" src="'+data.music+'" loop></audio></div><div class="soundinfo" id="soundinfo">关闭</div>';
                    musicHtml_data = "true";
                };
                
                var html = "";
                var notSpaCls = notSpa ? 'class="not-spa"' : '';
                // var protocol = location.protocol+'//';
                var dealHtml = function( box ){
                    var _html = '';
                    _html+='<!DOCTYPE html>';
                    _html+='<html lang="zh-cn" class="no-js">';
                    _html+='<head>';
                    //_html+='<meta http-equiv="Content-Type">';
                    //_html+='<meta content="text/html; charset=utf-8">';
                    _html+='<meta charset="utf-8">';
                    _html+='<meta name="format-detection" content="telephone=no">';
                    _html+='<meta name="format-detection" content="email=no">';
                    _html+='<title>'+data.name+'</title>';
                    _html+='<script>document.domain="yjsvip.com";</script>';
    //              _html+='<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">';
                    _html+='<link rel="stylesheet" href="'+staticHost+'/member/publicStatic/appRes/css/effect/style.css">';
                    _html+='<link rel="stylesheet" href="'+staticHost+'/member/publicStatic/appRes/css/animations.css">';
                    _html+='<link rel="stylesheet" href="'+staticHost+'/member/publicStatic/appRes/css/animate.css">';
                    _html+='<script src="'+staticHost+'/member/publicStatic/appRes/js/zepto.min.js"></script>';
                    _html+='<script src="'+staticHost+'/member/publicStatic/appRes/js/touch.js"></script>';
                    _html+='</head>';
                    _html+='<body>';
                    _html+='<div class="loading" id="loading"><div class="load2"></div>已加载:<span id="loadnum"></span></div>';
                    _html+='<!--wrapStart--><div '+notSpaCls+' id="coolapp" onselectstart="return true;" ondragstart="return false;" data-sliderDire="'+sliderDire+'" data-music="'+musicHtml_data+'" data-slider="'+allObj.obj.slideNo+'" data-cayica="'+caImgHtml_data+'" style="'+ ( data.backgroundImg&&data.backgroundImg!='none'? 'background-image:url('+data.backgroundImg+');' : '' ) +'background-repeat:'+data.backgroundRepeat+'; background-color:'+data.backgroundColor.colorHex()+';">';
                            $( box ? box : "#pageListUl li" ).each(function(index, element){
                                var $input = $(this).find("input");
                                _html+='<div class="page page-'+(index+1)+'-1 '+(index==0?'page-current':'hide')+'" pagename="'+$input.val()+'">'+$input.nextAll('template').html()+'</div>';
                            });
                    _html+='</div><!--wrapEnd-->';
                    //箭头
            //        _html+='<div id="arrowV" class="arrow_v" style="'+arrowV+'"><p class="move"></p></div>'+
            //                '<div id="arrowH" class="arrow_h f-hide">'+
            //                '    <span class="arrow_l"></span>'+
            //                '    <span class="arrow_r"></span>'+
            //                '</div>';
                    //音乐
                    _html+= musicHtml;
                    _html+='<div class="coolapp_map"><a class="coolapp_map_close" href="javascript:;">关闭</a><div class="coolapp_map_title"><i class="ico"></i><span class="title">地点名称</span><span class="bg"></span></div><div id="coolapp_map"></div></div>';
                    _html+='<script src="'+staticHost+'/member/publicStatic/appRes/js/qrcode.min.js"></script>' + caImgHtml + '<script>var _weixinData={name:"'+ data.name+'",describe:"'+data.describe+'",img:"'+data.img+'"};'+ allObj.obj.slide +'</script>' + sliderJS + (pageType==9?'<script src="//static.yjsvip.com/static/js/praise/praise.js"></script>':'')+'<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script><script src="'+staticHost+'/member/publicStatic/h5ds/scripts/library/ifm_main.js"></script></body></html>';
                    
                    // 对css3的兼容处理，有些奇芭的手机不支持标准属性
                    _html = _html.replace(/(?:-webkit-)?(transform|transition)(.+?;|$)/ig,'-webkit-$1$2$1$2');
                    
                    return _html;
                    
                    //   <script src="//api.map.baidu.com/getscript?v=1.4&ak=&services=&t=20150522093217"></script>
                    
                }
                
                html = dealHtml();
                //$("#html").html('<pre>'+html+'</pre>');

                var app      = $(this).attr("data-app");
                
                var postData = {};

                if(typeof params==='object' && params.aid && params.bid){  //保存已项目优先
                    postData = {"aid":params.aid, "bid":params.bid, "html":html};
                }else if(tplId){
                    postData = {"tid":tplId, "html":html}
                }else if(packetId){
                    postData = {"packetId":packetId, "activeId":activeId, "html":html}
                }
                
                $.extend( postData, {type: pageType} );
                
                if( (ofcs['type_'+pageType] && typeof ofcs['type_'+pageType]==='function' && ofcs['type_'+pageType].call( app, postData ))===false )return false;
                
                postForm( app, postData );
                
                if( params && params.aid && curPackTpl.length ){
                    html = dealHtml( '#left>.packet .pageList li' );
                    postForm( app, {"packetId":curPackTpl.data('tplid'), "activeId":params.aid, "html":html} );
                }
                
                
            });
    };
    
    //预览APP
    var viewApp = function(){
        
        $("#viewCoolApp").showWindow({id:"previewApp"});
        
        //预览APP
        $("#viewCoolApp").on("click",function(){
            var postData = {};

            if(typeof params==='object' && params.aid && params.bid){  //保存已项目优先
                postData = {"aid":params.aid, "bid":params.bid, url:fileName};
            }else if(tplId){
                postData = {"tid":tplId, url:fileName}
            }else if(packetId){
                postData = {"packetId":packetId, "activeId":activeId, url:fileName}
            }
            
            $.extend( postData, {type: pageType} );
            
            $.ajax({
                url:allObj.ajax.url+"previewApp", 
                type:"post",
                async:false,
                data: postData,
                dataType:"json",
                success:function(data){
                    
                    //var tempwindow = window.open('about:blank');
                    //tempwindow.location=data.app_path;
                    //$("#fixedBox").fadeIn(500);
                    $("#previewAppIframe").attr("src",data.appHtml);
                    
                    //绑定事件
                    $("#fixedBox").off("click.previewApp").on("click.previewApp",function(){
                        $("#previewApp .close").trigger("click");
                    });

                    $("#previewApp .close").on('click', function(){ //关闭预览同时关闭音乐
                        var dom = $('body',parent.document).find('#previewAppIframe').contents().find('#soundbox');
                        dom.attr('data')==='on' && dom.trigger('click');
                    })
                    
                }
            });    
            //$("#saveCoolApp").trigger("click");
            //进入循环队列
//            var set = setInterval(function(){
//                if(viewLock == 1){
//                    clearInterval(set);
//                    viewLock = 0;
//                    console.log("只执行一次");
//                    $.ajax({
//                        url:"/UserApp/previewApp",
//                        type:"post",
//                        async:false,
//                        data: {id:params.aid},
//                        dataType:"json",
//                        success:function(data){
//                            console.log("==>",data);
//                            //var tempwindow = window.open('about:blank');
//                            //tempwindow.location=data.app_path;
//                            $fixedBox.fadeIn(500);
//                            $("#previewAppIframe").attr("src",data.app_path);
//                            
//                        }
//                    });    
//                };    
//            },500);
        });    
    };
    
    //布局参数 - 入口
    exports.appSave = function(notSpa){
        appSave(notSpa);
        viewApp();
    };
    
});