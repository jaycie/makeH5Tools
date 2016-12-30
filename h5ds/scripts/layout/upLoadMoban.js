//获取图片素材
define(function(require,exports,module){
    var pageMain    = require( './main' ),
        allObj      = require('./objConfig'),
        ifun        = require('./ifunction'),
        params      = ifun.getParams('parmes'),
        pageType    = ifun.getUrl('type'),
        packetId    = ifun.getUrl('packetId'),
        pageConfig  = window.pageConfig,
        upLoadMoban = function(){
        //绑定切换事件
        //加载模板库
        var $addNewOthermoban = $("#addNewOthermoban");
        //默认点击第一个
        
        $("#allMobanType").on("click","li",function(){
            var $this = $(this);
            $("#allMobanType li").removeClass("active");
            $this.addClass("active");
            var id = $(this).attr("data-id");
            
            //右边区域
            var $mobanUl = $(".mobanUl");
            $mobanUl.css("display","none");
            $mobanUl.eq($this.index()).css("display","block");
            
            if($(this).attr("data-lock") == undefined){
                $mobanUl.css("display","none");
                $(this).attr("data-lock","lock");
                //只第一新增页面去查找
                if($("#addNewOthermoban").find("ul").length < $("#allMobanType").find("li").length){
                    //刷新数据
                    $.ajax({
                        url:allObj.ajax.url+"findSimpleTemplateByType", 
                        data:{"typeId":id},
                        dataType:"json",
                        type:"post",
                        success:function(data){
                            console.log(data);
                            if(data.length == 0){ 
                                var xhtml = '<li data-html="blank"><i class="fa fa-plus-square"></i><span>空白页面</span></li>';
                            }else {
                                var xhtml = '<li data-html="blank"><i class="fa fa-plus-square"></i><span>空白页面</span></li>';
                                for(i in data){
                                    xhtml+= "<li data-html='"+data[i].html+"'><img src='"+data[i].fileUrl+"' /></li>";    
                                }
                            }
                            $addNewOthermoban.append('<ul class="mobanUl">'+xhtml+'</ul>');
                        }
                    }); //end ajax
                }
                    
            }
        });
        
        //第一次进来 之前并未获获取模板分类的时候
        if($("#allMobanType").find("li").length===0){
            $.ajax({
                url:allObj.ajax.url+"findSimpleType", 
                type:"post",
                async:false,
                dataType:"json",
                success:function(d){
                    var data = d.data;
                    var html="";
                    if(data!=null)
                        $.each(data,function(i){
                            if(i == 0){
                                html+="<li class='active' data-id='"+data[i].id+"'>"+data[i].typeName+"</li>";
                            }else{
                                html+="<li data-id='"+data[i].id+"'>"+data[i].typeName+"</li>";
                            }
                        });
                    $("#allMobanType").html(html);
                    $("#allMobanType .active").trigger("click");
                }
            });
        }
    };

    var uploadAdminMoban = function(){
        $(".choose-style").on("click", function(e){
            var dom = $(this).find("ul");
            if(e.target.nodeName.toLowerCase()==="li"){
                var $this = $(e.target),
                    id = $this.data('id');

                sendAjax(id, '', pageType);
                $this.parent().find("li").removeClass("current");
                $this.addClass('current');
                dom.removeClass("current");

                $(this).find("span").html($this.html());
            }else{
                dom.toggleClass("current");
            }
            e.stopPropagation();
        });

        $("#showStyle").on("click", "li", function(){
            var tplId = $(this).data("tplid");
            pageMain.alert({
                type: 4,
                title: '系统提示',
                content: '更换模板会清空您页面操作的内容,您确定要更换模板内容吗?',
                okfn: function(hand,box){
                    box.Hide();
                    $.ajax({
                        url:allObj.ajax.url+"findTpl/tpl/"+tplId, 
                        type:"post",
                        data: {type: pageType},
                        success:function(data){
                            if(data.success == true){
                                if(data.appHtml != ""){
                                    $("#returnData").html(data.appHtml);
                                    pageConfig.cacheDOMData.appHtml = $( '<div>'+data.appHtml+'</div>' );
                                    //初始化页面列表
                                    require('./iniPageList').iniPageList();
                                    //默认选中第一个
                                    $("#pageListUl li").eq(0).trigger("click");
                                    require('./ifunction').tipsFadeInAndFadeOut("加载成功");
                                }
                            }
                        }
                    });
                    
                }
            })
            
        });

        var init = (function(){
            
            sendAjax( '', '', packetId?2:pageType, '' ); // 请求左侧的模板
            
            params&&params.aid ? sendAjax('', pageType==3?'2':'1', 2, $("#packList")) : ''; // 预加载 请求红包模板
            
            // 如果是海报页面只能先转后拆
            if( pageType==3 ){
                $('#packList_dialog .packet-flow [data-flow="2"]').siblings('a').hide();
            }else{
                $('#packList_dialog .packet-flow [data-flow="1"]').siblings('a').hide();
            }
            
            //获取风格列表
            $.ajax({
                url:allObj.ajax.url+"getStyleList",
                type:"post",
                data: {type: packetId?2:pageType},
                success:function(_data){
                    var html="",
                        data = _data.data;
                    if(_data.status===200){
                        html +='<li data-id="">全部风格</li>';
                        for(var i=0,len=data.length;i<len;i++){
                            html +='<li data-id="'+data[i].id+'">'+data[i].name+'</li>';
                        }
                        $("#showStyleList").html(html);
                    }    
                }
            });
        }());
    }

    var sendAjax = function(formateId, flowId, type, dom){
        var flowId = flowId || '',
            type = type || 1,
            //type = pageType || 1,
            $dom = dom || $("#showStyle");
        $.ajax({
            url:allObj.ajax.url+"getTpl",
            data:{flowId:flowId, type:type, formateId:formateId},
            type:"post",
            success:function(_data){
                var html="",
                    data = _data.data;
                if(_data.status===200){
                    var len = data.length;
                    if(len>0){
                        for(var i=0;i<len;i++){
                            var img = decodeURIComponent(data[i].firstPageImg);
                            if(img !== "null"){
                                if(dom){
                                    html +='<li data-flow="'+data[i].flow+'" data-tplid="'+data[i].id+'"><img src="//img.yjsvip.com/'+img+'"><div class="layer-mask"><a href="/loushus/index?packetId='+data[i].id+'&activeId='+params.aid+'" target="_blank">预览</a><a class="user-tpl" href="javascript:void(0)">应用</a></div></li>';
                                }else{
                                    html +='<li title="'+data[i].name+'" data-tplid="'+data[i].id+'"><img src="//img.yjsvip.com/'+img+'"></li>';
                                }
                            }
                        }
                    }
                    $dom.html(html);
                }    
            }
        });
    }

    var loadPacketTpl = function(){
        var dom = $("#packList");
        if(dom.find('li').length===0){
            //sendAjax('', '', 3, dom);
            sendAjax('', pageType==3?'2':'1', 2, dom);
        }
        dom.off('click.userTpl').on("click.userTpl", 'a.user-tpl', function(){
            $("#packList_dialog").fadeOut(300,function(){
                $("#packList_dialog").off("click");
                $("#fixedBox").css({"display":"none"});
            });
            dom.find('li').removeClass('current');
            $(this).closest('li').addClass('current');
        });

        $(".packet-flow").off("click.chooseFlow").on("click.chooseFlow", 'a', function(){
            var flow = parseInt($(this).data("flow"));
            sendAjax('', flow, 2, dom);
        })
        
    }
    
    //暴露接口
    exports.upLoadMoban = function(){
        upLoadMoban();
    }

    exports.uploadAdminMoban = function(){
        uploadAdminMoban();
    }

    exports.loadPacketTpl = function(styleId, type, dom){
        loadPacketTpl();
    }
    
});