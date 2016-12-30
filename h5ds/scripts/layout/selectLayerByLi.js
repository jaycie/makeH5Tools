// JavaScript Document
//通过 li 图层列表 来选择图层
define(function(require,exports,module){
    var allObj = require('./objConfig');
    var cback = require('./mouseEventToDragCallback');// 图层的拖动，旋转，缩放 的回调函数,选择li 时的回调
    var delButtonLock = 0;
    
    //选择图层
    function selectLayerByLi(callback){
        //选择图层 - li 标签
        allObj.obj.$picListUl.on("click.selectLayerByLi","li",function(){
            
            if(delButtonLock == 1){ //如果点击del 按钮 ， 无法选中图层
                delButtonLock = 0;
                return false;
            }
            var objLi = {
                $this : $(this),
                index : null,
                $cPhone : allObj.obj.$cPhone,
                $layers : null,
                layerType : null,
                zIndex : null
            }; 
            
            //点击后添加底色
            $("#picListUl li").removeClass("active");
            objLi.$this.addClass("active");
            //点击li，去掉背景图层的active
            $("#layerBg").removeClass("active");
            
            //获取参数
            objLi.index = objLi.$this.index();
            
            //匹配到z-index = objLi.zIndex 的layer
            objLi.zIndex = allObj.obj.maxZIndex - objLi.index - 1;
            objLi.$layers = objLi.$cPhone.find(".layer");
            
            //调试动态添加layer 后，是否动态添加
            //console.log(objLi.$layers);
            //console.log(objLi.zIndex);
            
            //获取layer类型
            //objLi.layerType = objLi.$layers.attr("class").replace("layer","").replace(" ","");
            
            //findZIndexLayer 找到对应的z-index 的 layer 对象
            var findZIndexLayer = function(){
                objLi.$layers.each(function(){
                    var $this = $(this);
                    if( $this.css("z-index") == objLi.zIndex ){
                        allObj.obj.$layer = $this;//找到后，赋值全局layer对象
                    }
                });
            };findZIndexLayer();
    
            //重置select 
            var reSetSelect = function(){
                //获取对象的原始位置，尺寸，参数
                var thisObj = {
                    top : null,
                    left : null,
                    width : null,
                    height : null,
                    zIndex : null,
                    padding : 4, //外框距离
                    rotate : null //旋转参数
                };
                
                //get
                thisObj.top = parseInt(allObj.obj.$layer.css("top"));
                thisObj.left = parseInt(allObj.obj.$layer.css("left"));
                thisObj.width = allObj.obj.$layer.width();
                thisObj.height = allObj.obj.$layer.height();
                thisObj.zIndex = allObj.obj.$layer.css("z-index");
                thisObj.rotate = allObj.obj.$layer.css("-webkit-transform");
                
                //set
                allObj.obj.$selectBox.css({
                    "top" :　thisObj.top - thisObj.padding/2 - allObj.obj.$layer.parent().scrollTop(),
                    "left" : thisObj.left - thisObj.padding/2,
                    "width" : thisObj.width + thisObj.padding,
                    "height" : thisObj.height + thisObj.padding,
                    "display" : "block",
                    "z-index" : thisObj.zIndex,
                    "-webkit-transform" : thisObj.rotate
                });    
                
            };reSetSelect();
            
            //console.log(objLi.index);
            //console.log(objLi.layerType);
            
            callback(objLi.$this);
        });
    }
    
    //删除图层
    function delLayerByLi(callback){
        //选择图层 - li 标签
        allObj.obj.$picListUl.on("click.dellayer","a.del",function(){
            delButtonLock = 1;
            var $thisLi = $(this).parent().parent().parent();
            var thisIndex = $thisLi.index();
            
            //删掉图层 -  列表
            allObj.obj.$picListUl.find("li").eq(thisIndex).remove();
            $("#picviewImgObj").attr("src","");
            
            allObj.obj.$moreSet.css("display","none");
            allObj.obj.$animateSet.css("display","none");
            allObj.obj.$functionSet.css("display","none");
            allObj.obj.$basic_box.css("display","none");
            
            //删掉对应的图层
            allObj.obj.$cPhone.find(".layer").each(function(){
                var $this = $(this);
                if( $this.css("z-index") == (allObj.obj.maxZIndex - thisIndex - 1) ){
                    allObj.obj.$selectBox.css("display","none");
                    $this.remove();//找到后，删除layer对象
                }
            });
            
            //重新获取对象，重置 z-index
            allObj.obj.$cPhone.find(".layer").each(function(index){
                var $this = $(this);
                if( $this.css("z-index") < (allObj.obj.maxZIndex - thisIndex - 1) ){
                    var zindex = $this.css("z-index");
                    $this.css("z-index",parseInt(zindex)+1);
                }
            });
            
            //重置 点击锁
            allObj.obj.sameIndex = -1;
            
            callback(thisIndex);

            //选中另外的对象
            thisIndex-1<0 ? thisIndex=0 : thisIndex--;
            var $info = $('#picListUl').find('li').eq(thisIndex);
            $info.trigger('click');
            
            //点击删除 更新数据
            require('./ifunction').ifun_callback();
        });
    }
    
    //暴露接口
    exports.selectLayerByLi = function(){
        selectLayerByLi(cback.fun.callback_selectLayerByLi);
        delLayerByLi(cback.fun.callback_delLayerByLi);
    }
    
});