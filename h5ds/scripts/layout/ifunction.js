//全局的公用函数
define(function(require,exports,module){
    var allObj = require('./objConfig');
    
    var getUrl = function(param){
        var reg = new RegExp("(^|&)"+ param +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    };

    var pageType = getUrl('type'),
        noLoushus= pageType==3||pageType==5||pageType==9; // 非楼书， 即 活动 与 海报
    
    //提示框
    var tipsFadeInAndFadeOut = function(str){
        var $infoBox = $("#infoBox");
        $infoBox.html(str).fadeIn(500);    
        setTimeout(function(){
            $infoBox.fadeOut(500);    
        },1000);    
    };

    //通过遍历z-index ,获取 $layer 对象
    var returnLayers = function(){
        var arr = [];
        allObj.obj.$cPhone.find(".layer").each(function(){
            var reData = {
                $this : null
            };
            var $this = $(this);
            reData.$this = $this;
            //reData.zIndex = parseInt($this.css("z-index"));
            arr.push(reData);
        });    
        return arr;
    };
    
    //核心方法 - 数据同步
    var dataSynchronization = function(){

        //数据过滤
        var $cPhoneEdit = $("#cPhoneEdit");
        //数据过滤
        var $wrap = $cPhoneEdit.find(".wrap");
        //获取wrap的style
        var style = $wrap.attr("style")||'';
        var image = style.replace(/.*background[^;"]+url\(([^\)]+)\).*/gi,'$1').replace(/"/g,"");
        var color = ($wrap.css("background-color")||'').colorHex();
        var repeat = $wrap.css("background-repeat"),
            bgSize = $wrap.css("background-size"),
            bgPos = $wrap.css("background-position");

        var Css = 'background-color:'+color+';';
        Css += (/\.jpg|\.jpeg|\.gif|\.png|\.bmp/ig.test(image) ? 'background-image:url('+image+');' : '' );
        Css += 'background-repeat:'+repeat+';';
        Css += 'background-size:'+bgSize+';';
        Css += 'background-position:'+bgPos+';';
        
        // 去掉编辑功能
        $wrap.find('[contenteditable]').removeAttr('contenteditable');
        
        var sHtml = '<div class="wrap" style="'+ Css +'">'+$wrap.html()+'</div>';
        
        // 特殊处理
        if( noLoushus ){
            if( allObj.obj.$page.find("input").val().indexOf('\u7EA2\u5305')<0 ){
                Css += 'overflow-x:hidden;overflow-y:auto;position:relative;';
                sHtml = '<div class="wrap" style="'+ Css +'">'+$wrap.html()+'</div>';
            }else{
                $wrap.find('.item-box').remove();
            }
        }
        
        allObj.obj.$page.find("input").nextAll('template').html( sHtml );
        
        
        // 图片宽高回显设置
        var oimg = allObj.obj.$layer.find('img');
        $("#basicSetBoxPic").find('._w').val( oimg.width() ).end().find('._h').val( oimg.height() );
        
        
        //生成一条操作记录
        // var nowLen = allObj.obj.$historyRecords.data("num")||0;
        // if(nowLen < allObj.obj.maxRecords){
        //     allObj.obj.$historyRecords.data("num",nowLen+1).append($('<a>'+new Date().toLocaleTimeString()+' 操作记录</a>').data('html', sHtml));
        // }else{
        //     $("#historyRecords a").first().remove();
        //     allObj.obj.$historyRecords.append($('<a>'+new Date().toLocaleTimeString()+' 操作记录</a>').data('html', sHtml));
        // }

    };
    
    //每次操作后，执行的回调函数
    var ifun_callback = function(){
        console.log("数据同步！");
        dataSynchronization();
    };
    
    //拖动 图层 后  交换 数据 - 回调函数 callback
    var picListChange = function(start_index,end_index){
        //alert(start_index)
        if(start_index == end_index) return ;
        
        var change = {
            $layers : allObj.obj.$cPhone.find(".layer"),
            $layer_start : null,
            $layer_end : null
        };
        
        var arr = returnLayers();
        
        for(var i=0,l=arr.length;i<l;i++){
            var data = eval(arr[i]);
            var zindex = parseInt(data.$this.css("z-index"));
            var eq = parseInt(allObj.obj.maxZIndex - zindex - 1);
            var startZindex = parseInt(allObj.obj.maxZIndex - start_index - 1)
            
            //如果往下拖
            if(end_index > start_index){
                if( eq > start_index && eq <= end_index){
                    data.$this.css("z-index", zindex + 1);
                }
                if(zindex == startZindex){
                    data.$this.css("z-index",allObj.obj.maxZIndex - end_index - 1);
                }
            }
            //如果往上拖
            else{
                if( eq < start_index && eq >= end_index){
                    data.$this.css("z-index", zindex - 1);
                }
                if(zindex == startZindex){
                    data.$this.css("z-index",allObj.obj.maxZIndex - end_index - 1);
                }
            }
        };
        
        //同步数据
        ifun_callback();
    };
    
    //设置style，不合并style
    var reSetStyle = function(str,data,$this){
        var el = {};
        var styleStr = "";
        el.delayTime = allObj.obj.$element.css("-webkit-animation-delay").replace("s","");
        el.playTime = allObj.obj.$element.css("-webkit-animation-duration").replace("s","");
        el.playCount = allObj.obj.$element.css("-webkit-animation-iteration-count");
        el.backgroundColor = allObj.obj.$element.css("background-color");
        el.borderRadius = allObj.obj.$element.css("border-radius");
        el.boxShadow = allObj.obj.$element.css("-webkit-box-shadow");
        el.border = allObj.obj.$element.css("border");
        
        //如果传入的str 为空，那么初始化不需要data
        if(str == null){
            styleStr+='-webkit-animation-delay:'+el.delayTime+'s;';
            styleStr+='-webkit-animation-duration:'+el.playTime+'s;';
            styleStr+='-webkit-animation-iteration-count:'+el.playCount+';';
            styleStr+='background-color:'+el.backgroundColor+';';
            styleStr+='border-radius:'+el.borderRadius+';';
            styleStr+='-webkit-box-shadow:'+el.boxShadow+';';
            styleStr+='border:'+el.border+';';
            
        }else{
        
            //设置延迟
            if(str.indexOf("delay") != -1){
                styleStr+='-webkit-animation-delay:'+data+'s;';
                styleStr+='-webkit-animation-duration:'+el.playTime+'s;';
                styleStr+='-webkit-animation-iteration-count:'+el.playCount+';';
                styleStr+='background-color:'+el.backgroundColor+';';
                styleStr+='border-radius:'+el.borderRadius+';';
                styleStr+='-webkit-box-shadow:'+el.boxShadow+';';
                styleStr+='border:'+el.border+';';
            };
            
            //设置播放次数
            if(str.indexOf("count") != -1){
                styleStr+='-webkit-animation-delay:'+el.delayTime+'s;';
                styleStr+='-webkit-animation-duration:'+el.playTime+'s;';
                styleStr+='-webkit-animation-iteration-count:'+data+';';
                styleStr+='background-color:'+el.backgroundColor+';';
                styleStr+='border-radius:'+el.borderRadius+';';
                styleStr+='-webkit-box-shadow:'+el.boxShadow+';';
                styleStr+='border:'+el.border+';';
            };
            
            //设置播放时间
            if(str.indexOf("duration") != -1){
                styleStr+='-webkit-animation-delay:'+el.delayTime+'s;';
                styleStr+='-webkit-animation-duration:'+data+'s;';
                styleStr+='-webkit-animation-iteration-count:'+el.playCount+';';
                styleStr+='background-color:'+el.backgroundColor+';';
                styleStr+='border-radius:'+el.borderRadius+';';
                styleStr+='-webkit-box-shadow:'+el.boxShadow+';';
                styleStr+='border:'+el.border+';';
            };
        }

        allObj.obj.$element.attr("style",styleStr);
    };
    
    //选择素材
    var bindSelectImgResources = function(){
        //选择素材
        $(".imgResourcesBox").off("click.selectSucai").on("click.selectSucai","li",function(){
            var $this = $(this).find("img");
            var src = $this.attr("_src") || $this.data("src");
            
            console.log("选择素材");
            console.log(allObj.obj.selectImgResourcesLock);
            
            //如果打开弹窗，更换主图,就不往下面走了
            if( allObj.obj.selectImgResourcesLock == 1){
                $("#appset_main_pic").attr("src",src);
                //关闭弹窗
                $("#resources").hide();
                allObj.obj.selectImgResourcesLock = 0;
                return;
            };
            
            //如果打开弹窗，更换APP背景图,就不往下面走了
            if( allObj.obj.selectImgResourcesLock == 2){
                $("#cpageBackgroundImage").attr("src",src);
                //关闭弹窗
                allObj.obj.$cPhoneEdit.css("background-image","url("+src+")");
                $("#resources").hide();
                ifun_callback();
                allObj.obj.selectImgResourcesLock = 0;
                return;
            };
            
            //如果打开弹窗，擦一擦效果,就不往下面走了
            if( allObj.obj.selectImgResourcesLock == 3){
                $("#cayicaImage").attr("src",src);
                //关闭弹窗
                $("#resources").hide();
                ifun_callback();
                allObj.obj.selectImgResourcesLock = 0;
                return;
            };
            
            //如果是幻灯片
            if( allObj.obj.selectImgResourcesLock == 4){
                //幻灯片咯
                allObj.obj.$sliderThisImg.attr("src",src);
                allObj.obj.$layer.find("li").eq(allObj.obj.$sliderThisImg.parent().index()).find("img").attr("src",src);
                ifun_callback();
                //关闭弹窗
                $("#fixedBox").trigger("click");
                allObj.obj.selectImgResourcesLock = 0;
                return;
            };
            
            //特效图层不适用，幻灯片不适用
            if( allObj.obj.$layer != null && (allObj.obj.$layer[0] != undefined && allObj.obj.$layer.attr("class").indexOf("layer-pic") != -1 || allObj.obj.$layer.attr("class").indexOf("wrap") != -1) ){
                var lock = 0;
                $("#picviewImgObj").attr("src",src);
                
                //如果是背景图层
                if( allObj.obj.$layer.attr("class").indexOf("wrap") != -1){
                    lock = 1;
                    allObj.obj.$layer.css("background-image", "url("+src+")");
                    
                }else{
                    
                    var realsize = $this.attr("realsize"),
                        oimg = allObj.obj.$layer.find("img").attr("src",src)[ 0 ],
                        reW  = parseFloat( allObj.obj.$layer.css('width') ),
                        reH  = oimg.naturalHeight * reW / oimg.naturalWidth;
                    allObj.obj.$layer.attr("realsize",realsize)
                    .css({ height: reH });
                    
                    if(realsize){
                        allObj.obj.$layer.width(realsize.split(",")[0]);
                        allObj.obj.$layer.height(realsize.split(",")[1]);    
                    }
                }
                ifun_callback();
                allObj.obj.sameIndex = -1;
                
                if(lock == 1){
                    $("#layerBg").trigger("click");
                }
                
            };
                
            //关闭弹窗
            allObj.obj.$selectBox.css("display","none");
            $("#resources a.close").trigger("click");
    
        });    
        
        $("#fixedBox").on("click",function(){
            $("#resources a.close").trigger("click");    
        });
        
    };

    //通过传入图层的 index 值， 返回对应的 $layer
    var returnLayerByIndex = function(index){
        var eq = allObj.obj.maxZIndex - index - 1;
        var $this = null;
        //console.log(eq);
        allObj.obj.$cPhone.find(".layer").each(function(){
            if(eq == $(this).css("z-index") ){
                $this = $(this);
            }    
        });
        //console.log($this);
        return $this;
    };
    
    //返回 rotate 角度 - 插件不准确 - 暂时没用的函数
    var rotationDegrees = function($this){
         var matrix = $this.css("-webkit-transform");
         var angle = 0;
         if(typeof matrix === 'string' && matrix !== 'none') {
              var values = matrix.split('(')[1].split(')')[0].split(',');
              angle = values[0];
         }
         return angle;
    };
    
    //返回对应图层的类型
    var returnLayerTpye = function(){
        var className = allObj.obj.$layer.attr("class");
        if( className.indexOf("layer-pic") != -1){
            return "layer-pic";
        }
        else if( className.indexOf("layer-text") != -1){
            return "layer-text";
        }
        else if( className.indexOf("layer-slider") != -1){
            return "layer-slider";
        }
        else if( className.indexOf("layer-effect") != -1){
            return "layer-effect";
        }
        else if( className.indexOf("layer-iframe") != -1){
            return "layer-iframe";
        }
        else if( className.indexOf("layer-form") != -1){
            return "layer-form";
        }else if( className.indexOf("layer-packet") != -1){
            return "layer-packet";
        }else{
            alert("没这个类型！");
        }
    };

    //返回最新的 $layers 对象
    exports.returnLayers = function(){
        return returnLayers();    
    };
    
    //返回最新的 $layer 对象
    exports.returnLayerByIndex = function(index){
        return returnLayerByIndex(index);
    };
    
    //返回对应图层的类型
    exports.returnLayerTpye = function(){
        return returnLayerTpye();
    };
    
    //返回rotate 角度
    exports.rotationDegrees = function($this){
        return rotationDegrees($this);
    };
    
    //每次参数发送变化  - 全局回调
    exports.ifun_callback = function(){
        ifun_callback();
    };
    
    //绑定素材选择方法
    exports.bindSelectImgResources = function(){
        bindSelectImgResources();
    };
    
    //重置style
    exports.reSetStyle = function(str,data,$this){
        reSetStyle(str,data,$this);    
    };
    
    //提示
    exports.tipsFadeInAndFadeOut = function(str){
        tipsFadeInAndFadeOut(str);    
    };
    
    //拖动图层列表，对数据进行交换
    exports.picListChange = function(start,end){
        picListChange(start,end);    
    };

    //获取地址栏参数
    exports.getUrl = function(param){
        return getUrl(param);
    };

    exports.getParams = function(param){
        var p = getUrl(param),
            aid = null,
            bid = null;
        if(p){
            aid = parseInt(p.substr(0, p.indexOf(","))),
            bid = parseInt(p.substr(p.indexOf(",")+1));
        }
        return {
            aid: aid,
            bid: bid
        }
    };
});
