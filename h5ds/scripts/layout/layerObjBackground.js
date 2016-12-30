//全局的公用函数
define(function(require,exports,module){
    var allObj = require('./objConfig');
    var ifun = require('./ifunction');
    var lfun = require('./layerObjIfun');
    
    /**
    * 背景层
    */
    var backgroundLayer = function(){

        //点击背景 - li
        $("#layerBg").on("click",function(){
            
            var v = {
                typename : "背景图层",
                name : "背景图层",
                layerType : "background-layer" ,//图层类型
                backgroundImage : null,
                backgroundColor : null,
                backgroundRepeat : null    
            };
            
            //判断是否点击了背景图层,如果是背景图层，重复点击，只执行一次
            //如果点击的是同一个对象，不再初始化操作
            if( allObj.obj.sameIndex != -1 && allObj.obj.sameIndex == -2){
                return ;
            };
            allObj.obj.sameIndex = -2;
                
            $("#picListUl li").removeClass("active");
            $(this).addClass("active");
            allObj.obj.$layer = allObj.obj.$cPhoneEdit.find(".wrap");
            
            //背景参数渲染 。。。。
            v.backgroundImage = allObj.obj.$layer.length==0 ? '' : allObj.obj.$layer.css("background-image").replace(/url\(([^\)]+)\)/gi,'$1').replace(/"/g,"");
            v.backgroundColor = allObj.obj.$layer.length==0 ? '' : allObj.obj.$layer.css("background-color");
            v.backgroundRepeat = allObj.obj.$layer.length==0 ? '' : allObj.obj.$layer.css("background-repeat");
            
            //console.log(v);
            
            //基础参数数据 拼接 - 渲染
            //lfun.ifun.basicDataReplace(v);
            var bgHtml = '    <div class="page-background-set"><h5>底&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：</h5><input type="color" id="layerBackgroundColor" list="layerBackgroundColor_list" value="{{backgroundcolor}}">'+
                       '            <datalist id="layerBackgroundColor_list">'+
                       '                <option>#FFFFFF</optison>'+
                       '                <option>#000000</optison>'+
                       '                <option>#ffe600</optison>'+
                       '                <option>#bff800</optison>'+
                       '                <option>#7ff201</optison>'+
                       '                <option>#40f200</optison>'+
                       '                <option>#18f218</optison>'+
                       '                <option>#03ce65</optison>'+
                       '                <option>#00a3a2</optison>'+
                       '                <option>#0469df</optison>'+
                       '                <option>#2540ff</optison>'+
                       '                <option>#4d25ff</optison>'+
                       '                <option>#7a14f3</optison>'+
                       '                <option>#be0dbf</optison>'+
                       '                <option>#f10d58</optison>'+
                       '                <option>#ff330e</optison>'+
                       '                <option>#ff6b01</optison>'+
                       '                <option>#ffb202</optison>'+
                       '                <option>#00c0ff</optison>'+
                       '                <option>#1ba1cd</optison>'+
                       '            </datalist>'+
                       '             <a id="clear_layerBackgroundColor">清除</a>'+
                       '    </div><div class="page-background-set">'+
                       '    <h5>背景模式：</h5>'+
                       '    <div class="s-select" id="backgroundRepeat_select">'+
                       '         <span placeholder="选择下拉" data="cover" id="playCount_data">平铺</span>'+
                       '         <i class="fa fa-sort-desc"></i>'+
                       '         <ul>'+
                       '             <li data="repeat">平铺</li>'+
                       '             <li data="cover">铺满</li>'+
                       '             <li data="repeat-x">延X轴平铺</li>'+
                       '             <li data="repeat-y">延Y轴平铺</li>'+
                       '             <li data="no-repeat">不重复</li>'+
                       '         </ul>'+
                       '    </div></div>';
            bgHtml = bgHtml.replace("{{backgroundcolor}}", v.backgroundColor.colorHex().indexOf('none')>-1?'#ffffff':v.backgroundColor.colorHex() );
            $("#basicSetBox").html(bgHtml);
            
            var html = allObj.obj._pageBackground;
            //html = html.replace("{{backgroundcolor}}",v.backgroundColor.colorHex());
            if(!/\.jpg|\.png|\.gif/.test(v.backgroundImage)){v.backgroundImage='none';}  //非图片格式
            html = html.replace("{{url}}",v.backgroundImage == "none" ? "":v.backgroundImage);
            html = html.replace("{{backgroundrepeat}}",v.backgroundRepeat);
            
            allObj.obj.$basicSet_box_other.css("display","none");
            $("#pageBackground").html(html).css("display","block");
            allObj.obj.$selectBox.css('display','none'); //点击的不是div或其子元素
            allObj.obj.$basic.trigger("click");
            
            //改变背景色
            var $layerBackgroundColor = $("#layerBackgroundColor");
            $layerBackgroundColor.on("change",function(){
                allObj.obj.$layer.css("background-color",($(this).val().colorHex()));
                ifun.ifun_callback();
            });
            //清除背景色
            var $clear_layerBackgroundColor =  $("#clear_layerBackgroundColor");
            $clear_layerBackgroundColor.on("click",function(){
                $layerBackgroundColor.val("#ffffff");
                allObj.obj.$layer.css("background-color","transparent");
                ifun.ifun_callback();
            });
            
            //背景模式
            var callback_background = function(data){
                //console.log(data);
                if(data==='cover'){
                    allObj.obj.$layer.css({
                        "background-size":"cover",
                        "background-position":"50% 50%"
                    });
                }else{
                    allObj.obj.$layer.css({
                        "background-repeat": data,
                        "background-size":"auto",
                        "background-position":"0 0"
                    });
                }
                allObj.obj.$selectBox.css("display","none");
                ifun.ifun_callback();
            }
            $("#backgroundRepeat_select").donwSelectMt({callback:callback_background});
            
            //更换图片
            // $("#changeBackgroundImage").showWindow({id:"resources",center:false});
            var _Bg;
            $("#changeBackgroundImage").maskWindow({id:"appset_image_dialog",center:true, cb:function(){
                _Bg = allObj.obj.$cPhoneEdit.find('.wrap').css('background-image');
                require('./flashPlayEvent').showFlashDialog();
            },cancel:function(){
                _Bg = _Bg&&_Bg!='none'?_Bg:'';
                var _bgImg;
                _Bg?_Bg.replace(/\("([^"']+)"\)/gi, function(a,b){_bgImg=b;return b}):'';
                allObj.obj.$cPhoneEdit.find('.wrap').css( 'background-image', _Bg );
                $('#picviewImgObj').attr( 'src', _bgImg?_bgImg:'' );
                
            }});
            
            //清除背景图片
            $("#changeBackgroundImageClear").on("click",function(){
                $("#picviewImgObj").attr("src","");
                allObj.obj.$layer.css("background-image","");
            });
            
            ifun.ifun_callback();
            
            //初始选项卡
            allObj.obj.$moreSet.css("display","none");
            allObj.obj.$animateSet.css("display","none");
            allObj.obj.$functionSet.css("display","none");
            
        });
    };
    
    //返回rotate 角度
    exports.backgroundLayer = function(){
        backgroundLayer();
    };
    
});