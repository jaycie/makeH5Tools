//页面整体参数，暴露出去
define(function(require,exports,module){
    var pageMain   = require( './main' ),
          allObj   = require('./objConfig'),
        ifun       = require('./ifunction'),
        addForm    = require( './addForm' ),
        params     = ifun.getParams('parmes'),
        pageType   = ifun.getUrl('type'),
        packetId   = ifun.getUrl('packetId'),
        activeId   = ifun.getUrl('activeId'),
        pageConfig = window.pageConfig;
    
    
    // 添加表单
    new addForm({
        trigger: '#addFormBtn'
    });
    
    //添加图层操作
    var layerAdd = function(){
        
        //自动选中添加的图层
        var clickLast = function(){
            $("#picListUl").find("li").last().trigger("click");
        };
        
        var computeTop = function(){
            return allObj.obj.$cPhoneEdit.find('.wrap').scrollTop() + 10;
        }
        
        //添加图片图层
        // $("#addPicButton").on("click",function(){
        $("#appset_image").on("click",function(){
            var html = allObj.obj._picListUlli;
            html = html.replace("{{typeico}}",'<i class="fa fa-file-picture-o"></i>');
            html = html.replace("{{name}}",'图片图层');    
            $("#picListUl").append(html);
            $("#cPhoneEdit .wrap").append(
            '<div class="layer layer-pic" name="图片图层" realsize="100,100" style=" border:0; top:'+ computeTop() +'px; left:10px; width:100px; height:100px; z-index:'+(allObj.obj.maxZIndex - $("#picListUl li").length)+';">'+
            '   <img class="element" src="">'+
            '</div>');
            clickLast();
        });
        
        //添加文本图层
        var addText = function(id, text, layerName){
            var id = id || ''
              , text = text || '文字内容'
              , layerName = layerName || '文字内容'// 文字图层
              , html = allObj.obj._picListUlli;
            html = html.replace("{{typeico}}",'<i class="fa fa-text-width"></i>');
            html = html.replace("{{name}}",layerName);
            $("#picListUl").append(html);
            $("#cPhoneEdit .wrap").append(
            '<div class="layer layer-text" name="'+layerName+'" style="text-align: left; font-size:24px; top:'+ computeTop() +'px; left: 10px; width: 200px; height: 100px; z-index: '+(allObj.obj.maxZIndex - $("#picListUl li").length)+';">'+
            '    <div class="element"><div class="el-text"'+( id?' id="'+id+'"':'' )+'>'+text+'</div></div>'+
            '</div>');
            clickLast();
        }
        $("#addTextButton").on("click",function(){
            addText();
        });
        $("#mrbm-insertMoney").on("click",function(){
            addText('packetMoney', '6.66', '红包金额');
        });
        $("#mrbm-insertShareMoney").on("click",function(){
            addText('packetShareMoney', '88.88', '分享金额');
        });
        
        //添加特效图层
        $("#addEffectButton").on("click",function(){
            var html = allObj.obj._picListUlli;
            html = html.replace("{{typeico}}",'<i class="fa fa-magic"></i>');    
            html = html.replace("{{name}}",'特效图层');    
            $("#picListUl").append(html);
            $("#cPhoneEdit .wrap").append('<div class="layer layer-effect" name="特效图层" style="top: 0; left: 0; z-index: '+(allObj.obj.maxZIndex - $("#picListUl li").length)+';"></div>');
            clickLast();
        });

        //添加红包图层
        $("#packList").on("click", 'a.user-tpl', function(){
            var li = $(this).closest("li");
            var flow = li.data("flow");
            var tplid = li.data("tplid");
            var html = allObj.obj._picListUlli;

            var packet = $("#picListUl li").find('.fa-suitcase');
            
            if( params && params.aid ){
                
                $.ajax({
                    url: allObj.ajax.url+"findTpl/packet/" + tplid,  //node 接口
                    type:"post",
                    data: {type: pageType, activeId: activeId, packetId: tplid},
                    async:false,
                    dataType:"json",
                    success:function(data){
                        //console.log(data);
                        $("#fixedBox").fadeOut(1000);
                        if(data.success == true){
                            if(data.appHtml != ""){
                                //初始化页面
                                // $("#returnData").html(data.appHtml);
                                pageConfig.cacheDOMData.packetHtml = $( '<div>'+data.appHtml+'</div>' ); // 红包模板
                                
                                require('./iniPageList').iniPageList(false, 'combine');
                                
                                ifun.tipsFadeInAndFadeOut("载入成功!");
                                //绑定鼠标右键方法
                                //!Config.debug && require('./iniMouseRightBtnEvent').iniFun();
                            }else{
                                ifun.tipsFadeInAndFadeOut("载入失败!");
                            }
                        }else{
                            ifun.tipsFadeInAndFadeOut("载入失败!");
                        }
                    }
                });
                window.setLeftHeight = true;
                
                $('#left>.packet').show();
                $(window).trigger('resize');
                
                
            }
            
            if(packet.length>0){
                $("#cPhoneEdit .wrap").find('.layer-packet').attr('data-flow',flow).attr('data-tplid',tplid);
            }else{
                html = html.replace("{{typeico}}",'<i class="fa fa-suitcase"></i>');
                html = html.replace("{{name}}",'红包图层');    
                $("#picListUl").append(html);
                $("#cPhoneEdit .wrap").append('<div class="layer layer-packet" data-flow="'+flow+'"  data-tplid="'+tplid+'" name="红包图层" style="top: 0; left: 0; z-index: '+(allObj.obj.maxZIndex - $("#picListUl li").length)+';"></div>');
            }
            
            // 红包模板 的 挂接
            allObj.obj.$pageListUl.find(':text').each(function(i, ele){
                ele = $(ele);
                var otemp = ele.nextAll('template');
                otemp.html( otemp.html().replace(/data-tplid="\w+"/g, 'data-tplid="' + tplid + '"') );
            })
            
            clickLast();
        });
        
        // 海报 二维码
        $('#scanCode').on('click', function(){
            if( allObj.obj.$cPhoneEdit.find('#layer-scanCode').length ){return;}
            
            var html,sideText,liLen=$("#picListUl li").length;html = sideText = allObj.obj._picListUlli;
            html     = html.replace("{{typeico}}",'<i class="fa fa-qrcode '+(pageMain.referrer.yjsadmin?'':' j-nodel')+'"></i>');
            html     = html.replace("{{name}}",'二维码图层');
            sideText = sideText.replace("{{typeico}}",'<i class="fa fa-file-picture-o'+(pageMain.referrer.yjsadmin?'':' j-nodel')+'"></i>');
            sideText = sideText.replace("{{name}}",'二维码文案');
            html     = $( html );
            pageMain.referrer.yjsadmin||html.find('a.del').hide();
            
            var code = $('<div id="layer-scanCode" class="layer layer-pic j-nodel" name="二维码图层" realsize="100,100" style="border:0px;top:'+computeTop()+'px;left:0px;width:200px;height:200px;z-index:'+(allObj.obj.maxZIndex - liLen - 1)+'"></div>');
            allObj.obj.$cPhoneEdit.find('.wrap').append( code );
            
            sideText = $(sideText);
            pageMain.referrer.yjsadmin||sideText.find('a.del').hide();
            
            var url = (document.URL.indexOf('act.yjsvip.com')>-1 || document.URL.indexOf('src.yjsvip.com')>-1 ? 'https://src.yjsvip.com' : 'https://test.yjsvip.com') + '/img/YJPersonal/index.html?#YJ_louPanDetail?userFrom=1&buildId='+params.bid,
            qrcode  = new QRCode(code[0], {width:'200', height:'200'});
            qrcode.makeCode( url );
            $('#layer-scanCode').find('img').addClass( 'element' );
            
            $("#picListUl").append(html);
            $("#picListUl").append(sideText);
            //$('#addTextButton').trigger('click');
            //allObj.obj.$layer.attr('id', 'layer-scanCode-text').addClass( 'j-nodel' ).css({width:282,height:40}).find('.el-text').text( '长按识别二维码关注楼盘' );
            
            allObj.obj.$cPhoneEdit.find('.wrap').append( '<div id="layer-scanCode-text" class="layer layer-pic j-nodel" name="二维码文案" realsize="100,100" style="border:0px;top:'+computeTop()+'px;left:0px;width:300px;height:23px;z-index:'+(allObj.obj.maxZIndex - liLen - 2)+'"><img class="element" src="//static.yjsvip.com/static/img/scancode_text.png"></div>' );
            
            setTimeout(clickLast,15);
        })
        
        // 添加手机充值模块
        $('#add_phone_pay').on('click', function(){
            
            var liLen = $("#picListUl li").length,
            html      = allObj.obj._picListUlli;
            html      = html.replace("{{typeico}}",'<i class="fa fa-mobile-phone"></i>');
            html      = html.replace("{{name}}",'手机充值模块');
            
            var olayer = $('<div id="phone_pay_box" class="layer layer-pic" name="充值模块" realsize="100,100" style="border:0px;top:'+computeTop()+'px;left:0px;width:180px;height:120px;z-index:'+(allObj.obj.maxZIndex - liLen - 1)+'"><img class="element" src="//img.yjsvip.com/img/myyjs-img/phone_pay.png"></div>');
            allObj.obj.$cPhoneEdit.find('.wrap').append( olayer );

            $("#picListUl").append(html);
            
            clickLast();
            
        })
        
        //添加表单
        $("#addFormButton").on("click",function(){
            var html = allObj.obj._picListUlli;
            var appid = parmes.aid;
            html = html.replace("{{typeico}}",'<i class="iconfont icon-biaodan"></i>');    
            html = html.replace("{{name}}",'表单图层');    
            $("#picListUl").append(html);
            $("#cPhoneEdit .wrap").append('<div class="layer layer-form " name="表单图层" style="top: 20px; left: 20px; width:600px; height:500px; z-index: '+(allObj.obj.maxZIndex - $("#picListUl li").length)+';">'+
            '    <div class="s-form-data element" data-action="'+allObj.actionUrl.form1+'">'+
            '    <input name="appId" class="g-input" type="hidden" value="'+appid+'"/>'+
            '    <div class="s-item"><input name="name" class="g-input" type="text" placeholder="姓名"/></div>'+
            '    <div class="s-item"><input name="tel" class="g-input" type="text" placeholder="电话"/></div>'+
            '    <div class="s-item"><input name="people" class="g-input" type="text" placeholder="来访人数"/></div>'+
            '    <div class="s-item"><input type="button" class="g-submit" value="提交"/></div>'+
            '    </div>'+
            '</div>');
            clickLast();
        });
        
        //添加幻灯片图层
        $("#addSliderButton").on("click",function(){
            var html = allObj.obj._picListUlli;
            html = html.replace("{{typeico}}",'<i class="fa fa-stack-overflow"></i>');    
            html = html.replace("{{name}}",'幻灯片图层');    
            $("#picListUl").append(html);
            $("#cPhoneEdit .wrap").append(
            '<div class="layer layer-slider" name="幻灯片图层" style="top: 0; left: 0; width:640px; height:400px; background-color:#eee; z-index: '+(allObj.obj.maxZIndex - $("#picListUl li").length)+';">'+
            '<ul></ul></div>');
            clickLast();
        });
        $("#addSliderButton").maskWindow({id:"flash_dialog"});

        //添加iframe
        $("#addIframeButton").on("click",function(){
            var html = allObj.obj._picListUlli;
            html = html.replace("{{typeico}}",'<i class="iconfont icon-xinjian"></i>');    
            html = html.replace("{{name}}",'iframe图层');    
            $("#picListUl").append(html);
            $("#cPhoneEdit .wrap").append(
            '<div class="layer layer-iframe" name="iframe图层" style="top: 10px; left: 10px; width: 200px; height: 100px; z-index: '+(allObj.obj.maxZIndex - $("#picListUl li").length)+';">'+
            '    <div class="element"><div class="iframe-hide"></div><iframe src="" style="width:100%; height:100%;" frameborder="0"></iframe></div>'+
            '</div>');
            clickLast();
        });
        
        //复制图层
        $("#copyLayerButton").on("click",function(){
            if(allObj.obj.$layer[0] != undefined){
                
                //如果是背景图层。不可复制
                if( allObj.obj.$layer.selector == "#cPhoneEdit .wrap"){
                    alert("背景图层不可复制！");    
                }
                else{
                    var $picListUl =  $("#picListUl");
                    $picListUl.append($picListUl.find(".active").clone().removeClass("active"));
                    $("#cPhoneEdit .wrap").append(allObj.obj.$layer.clone().css("z-index", (allObj.obj.maxZIndex - $("#picListUl li").length)));        
                    clickLast();
                };
                
            }else{
                alert("请先选择图层！");
            };    
        });
    
    }

    //布局参数 - 入口
    exports.layerAdd = function(){
        layerAdd();
    };
    
});