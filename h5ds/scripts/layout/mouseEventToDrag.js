// JavaScript Document
define(function(require,exports,module){
    
    var allObj = require('./objConfig');
    var callback = require('./mouseEventToDragCallback');// 图层的拖动，旋转，缩放 的回调函数,选择li 时的回调
    
    var ifun     = require('./ifunction'),
        pageType = ifun.getUrl('type'),
        noLoushus= pageType==3||pageType==5||pageType==9; // 非楼书， 即 活动 与 海报
    
    //拖动图层 - 改变大小，旋转
    var $cPhone = allObj.obj.$cPhone;
    var clickMark = 0;
    
    var isMaxBtm = function( layer ){
        var max = 0, curTop = parseFloat(layer.css('top')), maxEle = layer, eMax = 0;
        
        layer.parent().children('.layer').each(function(i, ele){
            
            ele = $( ele );
            var it = parseFloat(ele.css('top')), sumH = it + ele.outerHeight( true );
            if( max <= sumH ){
                max = sumH;
            }
            if( eMax <= it ){
                maxEle = ele;
            }
            
        })
        
        return {maxTop: max, maxEle: maxEle, curTop: curTop, isMax: curTop>=max, showScroll: curTop-layer.parent().scrollTop()+layer.outerHeight()>=layer.parent().height() }
    }
    
    $cPhone.on("mousedown.layer",".layer",function(e){
        
        clickMark = 1;//排除点击背景的事件
        allObj.obj.$layer = $(this);
        
        var owrap = allObj.obj.$cPhoneEdit.find('.wrap');
        if( noLoushus ){
            owrap.css({'overflow-y':'auto', 'overflow-x':'hidden', position: 'relative'});
            if( !owrap.find('.item-box').length ){
                owrap.append( '<div class="item-box" style="width:1px;overflow:hidden;margin-left:-50px;"></div>' );
            }
        }else{
            owrap.find('.item-box').remove();
            allObj.obj.$cPhoneEdit.find('.wrap').css({'overflow-y':'', 'overflow-x':'', position: ''});
        }
        
        //禁止某个 图层的拖动，旋转，缩放
        var stopEvent = {
            move : true,
            zoom : true,
            rotate : true,
            zoomXOnly : false, //只缩放x轴
            zoomYOnly : false, //只缩放y轴
            moveYOnly : false, //只移动y轴
        };
        var disableFun = function(){
            //一些特定的情况下，应该禁止图层的编辑
            var disable = {
                pic : allObj.obj.$layer.attr("class").indexOf("layer-pic"),//如果是图片图层，只支持缩放x轴
                effect : allObj.obj.$layer.attr("class").indexOf("layer-effect"), //如果是特效图层，不支持旋转，缩放，拖动
                slider : allObj.obj.$layer.attr("class").indexOf("layer-slider"), //如果是幻灯片，不允许缩放，旋转， 只能移动y轴位置
                formt : allObj.obj.$layer.attr("class").indexOf("layer-form") //如果是form，高度自动，宽度可调
            };
            //如果是图片图层
            if( disable.pic != -1){
                stopEvent.zoomXOnly = true;
            }
            //如果是特效图层
            if( disable.effect != -1){
                stopEvent.zoom = false; //不允许缩放
                stopEvent.move = false; //不允许移动
            }
            //如果是幻灯片图层
            if( disable.slider != -1){
                //stopEvent.zoom = false;
                stopEvent.rotate = false;
                stopEvent.moveYOnly = true;
                stopEvent.zoomYOnly = true;
            }
            //如果是表单图层
            if( disable.formt != -1){
                //stopEvent.zoom = false;
                stopEvent.rotate = false;
                //stopEvent.zoomXOnly = true;
                //stopEvent.zoomYOnly = true;
            }
        };disableFun();
        //console.log(stopEvent.zoom);
        
        var scale = parseFloat($cPhone.css("-webkit-transform").split("(")[1].split(",")[0]); 
        var $picListUl = allObj.obj.$picListUl; //图层列表
        
        //通过z-index 设置图层列表 active
        var setPicListActive = function(){
            var zIndex = allObj.obj.$layer.css("z-index");
            var oCur = $picListUl.find("li").removeClass("active").eq(allObj.obj.maxZIndex - zIndex - 1).addClass("active");
            // 文字图层
            if( allObj.obj.$layer.hasClass('layer-text') ){
                oCur.find(':text').val( allObj.obj.$layer.find('.el-text').text() );
            }
        };setPicListActive();
        
        
        //拖动时的对象的一些位置点
        var set = {
            x_start : null,
            y_start : null,
            x_move : null,
            y_move : null,
            x_end : null,
            y_end : null,
            p_x : null,
            p_y : null    
        }
        
        //获取对象的原始位置，尺寸，参数
        var thisObj = {
            top : null,
            left : null,
            width : null,
            height : null,
            zIndex : null,
            padding : 4, //外框距离
            rotate : null, //旋转参数
            borderWidth : null //边框宽度
        };
        
        /**
        *    拖动对象
        *    拖动后，执行回调函数 callback_position
        */
        var dragLayer = function(callback_position){
            
            //get
            thisObj.top = parseInt(allObj.obj.$layer.css("top"));
            thisObj.left = parseInt(allObj.obj.$layer.css("left"));
            thisObj.width = allObj.obj.$layer.width();
            thisObj.height = allObj.obj.$layer.height();
            thisObj.zIndex = allObj.obj.$layer.css("z-index");
            thisObj.rotate = allObj.obj.$layer.css("-webkit-transform");
            
            allObj.obj.$element = allObj.obj.$layer.find(".element");
            if(allObj.obj.$element.css("border-width") != undefined){
                thisObj.borderWidth = parseInt(allObj.obj.$element.css("border-width"));
            }
            else{
                thisObj.borderWidth = 0;    
            }
            
            //console.log("外框的参数：",thisObj);
            //set
            allObj.obj.$selectBox.css({
                "top" : noLoushus ? thisObj.top - thisObj.padding/2 - 1 -allObj.obj.$cPhoneEdit.find('.wrap').scrollTop() : thisObj.top - thisObj.padding/2 - 1,
                "left" : thisObj.left - thisObj.padding/2 - 1,
                "width" : thisObj.width + thisObj.padding + thisObj.borderWidth*2 + 3,
                "height" : thisObj.height + thisObj.padding + thisObj.borderWidth*2 + 3,
                "display" : "block",
                "z-index" : thisObj.zIndex,
                "-webkit-transform" : thisObj.rotate
            });
            if(stopEvent.move == false){ return false};//禁止拖动，缩放，移动
            
            //获取初始点
            set.x_start = e.pageX;
            set.y_start = e.pageY;
            
            //当前位置
            set.p_x = parseFloat(allObj.obj.$layer.css("left"))*scale;
            set.p_y = parseFloat(allObj.obj.$layer.css("top"))*scale;
            
            $(document).on("mousemove.layer",function(e){
                e.preventDefault();
                //对象的位置
                if(stopEvent.moveYOnly == true){
                    set.x_move = 0;
                }else {
                    set.x_move = e.pageX - set.x_start;
                }
                set.y_move = e.pageY - set.y_start;
                
                allObj.obj.$layer.css({
                    "top" : (set.y_move + set.p_y)/scale,
                    "left" : (set.x_move + set.p_x)/scale
                });
                
                //位框位置 位框，跟随拖动效果
                thisObj.top = parseInt(allObj.obj.$layer.css("top"));
                thisObj.left = parseInt(allObj.obj.$layer.css("left"));
                allObj.obj.$selectBox.css({
                    "top" : noLoushus ? thisObj.top-thisObj.padding/2 - 1 - allObj.obj.$cPhoneEdit.find('.wrap').scrollTop() : thisObj.top-thisObj.padding/2 - 1,
                    "left" : thisObj.left-thisObj.padding/2 - 1
                });
                
                if( noLoushus ){
                    var setH   = parseFloat(allObj.obj.$layer.css('top'))+allObj.obj.$layer.outerHeight(true),
                        maxVal = isMaxBtm( allObj.obj.$layer ),
                        owrap  = allObj.obj.$cPhoneEdit.find('.wrap');
                    owrap.find('.item-box').css( 'height', maxVal.maxTop );
                    
                    isMaxBtm( allObj.obj.$layer ).showScroll && owrap.scrollTop( setH - owrap.height() + 5 );
                    
                }
                
                
            }).on("mouseup.layer",function(){
                $(this).off("mousemove.layer mouseup.layer");
                //alert("图层位置发生变化");
                if( set.x_move != null && set.y_move != null ){
                    callback_position();
                }
            });    
        };
        dragLayer(callback.fun.callback_position);
        
        /**
        *    旋转对象
        *    拖动后，执行回调函数 callback_rotate
        */
        //位框的旋转 - 对象的旋转
        var layerRotate = function(callback_rotate){
            $("#selectBoxRotate").off("mousedown.selectBoxRotate").on("mousedown.selectBoxRotate",function(e){
                if(stopEvent.rotate == false){ return false};//禁止拖动，缩放，移动
                clickMark = 1;//排除点击背景的事件
                var setRotate = {
                    x_start : null,
                    y_start : null,
                    rotate : null
                };
                setRotate.x_start = e.pageX;
                setRotate.y_start = e.pageY;
                
                allObj.obj.$layer.css("-webkit-transform","rotate("+0+"deg)");
                allObj.obj.$selectBox.css("-webkit-transform","rotate("+0+"deg)");
                
                $(document).on("mousemove.selectBoxRotate",function(e){
                    e.preventDefault();
                    setRotate.rotate = (e.pageY  - setRotate.y_start)/2;
                    allObj.obj.$layer.css("-webkit-transform","rotate("+setRotate.rotate+"deg)");
                    allObj.obj.$selectBox.css("-webkit-transform","rotate("+setRotate.rotate+"deg)");
                }).on("mouseup.selectBoxRotate",function(){
                    $(this).off("mousemove.selectBoxRotate mouseup.selectBoxRotate");
                    //alert("对象发生了旋转")
                    callback_rotate();
                    //否则 - 没发生旋转
                });;
            });    
        };
        layerRotate(callback.fun.callback_rotate);
        
        /**
        *    缩放对象
        *    拖动后，执行回调函数 callback_reWidthAndHeight
        */
        //位框的缩放 - 对象缩放
        var layerReWidthAndHeight = function(callback_reWidthAndHeight){
            allObj.obj.$selectBox.off("mousedown.SelectMinToMax").on("mousedown.SelectMinToMax","span",function(e){
                if(stopEvent.zoom == false){ return false;};//禁止拖动，缩放，移动
                clickMark = 1;//排除点击背景的事件
                var setSpan = {
                    x_start : null,
                    y_start : null,
                    x_move : null,
                    y_move : null,
                    moveX : null,
                    moveY : null
                };
                
                //重新获取尺寸
                thisObj.width = allObj.obj.$layer.width();
                thisObj.height = allObj.obj.$layer.height();
                
                setSpan.x_start = e.pageX;
                setSpan.y_start = e.pageY;
                
                //点中shift ，等比缩放
                var zoomXOnlyBox = null;
                $(document).off("keydown.zoom").on("keydown.zoom",function(e){
                    var ev = window.event || e;
                    var code = ev.keyCode || ev.which;    
                    if(code == 16){
                        //按住了shift键
                        zoomXOnlyBox = stopEvent.zoomXOnly;
                        stopEvent.zoomXOnly = true;    
                    }
                }).off("keyup.zoom").on("keyup.zoom",function(){
                    stopEvent.zoomXOnly = zoomXOnlyBox;    
                });
                
                //拖动缩放
                //console.log(allObj.obj.$layer);
                $(document).on("mousemove.MinToMax",function(e){
                    e.preventDefault();
                    setSpan.x_move = e.pageX - setSpan.x_start;
                    setSpan.y_move = e.pageY - setSpan.y_start;
                    
                    //等比缩放
                    if(stopEvent.zoomXOnly == true){
                        setSpan.moveY = thisObj.height*setSpan.x_move/allObj.obj.speed;
                        setSpan.moveX = thisObj.width*setSpan.x_move/allObj.obj.speed;
                    }
                    else if(stopEvent.zoomYOnly == true){ //只变高度，宽度固定
                        setSpan.moveY =    setSpan.y_move;
                        setSpan.moveX = 0;
                    }
                    else{
                        setSpan.moveY =    setSpan.y_move;
                        setSpan.moveX = setSpan.x_move;
                    }
                    
                    allObj.obj.$selectBox.css({
                        "width" :　thisObj.width + setSpan.moveX + thisObj.padding + thisObj.borderWidth*2 + 3,
                        "height" : thisObj.height + setSpan.moveY + thisObj.padding + thisObj.borderWidth*2 + 3
                    });
                    allObj.obj.$layer.css({
                        "width" :　thisObj.width + setSpan.moveX ,
                        "height" : thisObj.height + setSpan.moveY    
                    });
                    
                }).on("mouseup.MinToMax",function(){
                    $(this).off("mousemove.MinToMax mouseup.MinToMax");
                    //allObj.obj.$layer = allObj.obj.$layer;
                    //alert("对象发生了缩放");
                    if( setSpan.x_move != null ){
                        callback_reWidthAndHeight();
                    }
                    // 缩放之后重新计算高度
                    var maxVal = isMaxBtm( allObj.obj.$layer ),
                        owrap  = allObj.obj.$cPhoneEdit.find('.wrap');
                    owrap.find('.item-box').css( 'height', maxVal.maxTop );
                });
                
            }).on("mouseup.SelectMinToMax",function(){
                $(this).off("mousedown.SelectMinToMax mouseup.SelectMinToMax");
            });
        };
        layerReWidthAndHeight(callback.fun.callback_reWidthAndHeight);
        
        //每次都要执行该步骤 ， 全局回调
        callback.fun.callback_click(allObj.obj.$layer);
        
    }).on("mouseup.layer",".layer",function(){
        //$(this).css("position",'absolute');
    });
    
    //$cPhone 点击事件
    $cPhone.on("click.cPhone",function(e){
        if(clickMark == 0){
            $("#selectBox").css('display','none');//隐藏选择框
            //console.log($(this));
        }

        clickMark = 0;//释放控制
    });
    
    $cPhone.on('imgresize', '.layer-pic', function(){
        
        if( noLoushus ){
            var setH   = parseFloat(allObj.obj.$layer.css('top'))+allObj.obj.$layer.outerHeight(true),
                maxVal = isMaxBtm( allObj.obj.$layer ),
                owrap  = allObj.obj.$cPhoneEdit.find('.wrap').css({'overflow-y':'auto', 'overflow-x':'hidden', position: 'relative'});
            if( !owrap.find('.item-box').length ){
                owrap.append( '<div class="item-box" style="width:1px;overflow:hidden;margin-left:-50px;"></div>' );
            }
            owrap.find('.item-box').css( 'height', maxVal.maxTop );
            
            isMaxBtm( allObj.obj.$layer ).showScroll && owrap.scrollTop( setH - owrap.height() + 5 );
            
        }
        
    })

});
