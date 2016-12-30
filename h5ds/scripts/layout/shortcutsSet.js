//快捷键设置
define(function(require,exports,module){
    var pageMain = require( './main' ),
        allObj   = require('./objConfig'),
        ifun     = require('./ifunction');
    
    //ini 快捷键
    var iniShortcuts = function(){
        $(document).off("keydown.shortcuts").on("keydown.shortcuts",function(e){
            var ev = window.event || e;
            var code = ev.keyCode || ev.which;
            
            //ctrl+s 保存APP
            if( ev.ctrlKey && code == 83){
                ev.preventDefault();
                $("#saveCoolApp").trigger("click");
            };    
            
            //ctrl+p 刷新动画
            if( ev.ctrlKey && code == 80){
                ev.preventDefault();
                $("#seePlay").trigger("click");
            };
            
            //禁用F5刷新
            if( code == 116){
                ev.preventDefault();
                $("#seePlay").trigger("click");
            };    

            //回退操作
            // if( ev.ctrlKey && code == 90){
            //     var $a = $("#historyRecords").find('a');
            //     var n = allObj.obj.$historyRecords.data('renum')||$a.length;
            //     $a.eq(n).trigger('click');
            //     n-=2;
            //     if(n < 0){
            //         n = 0;
            //     }
            //     allObj.obj.$historyRecords.data('renum',n);
            // };
            
        });
    };
    
    //初始 移动layer 快捷键  —— 选择图层的前提
    var iniShortcutsLayer = function($this,$inputTop,$inputLeft){
        var top;
        var left;
        
        $(document).off("keydown.moves").on("keydown.moves",function(e){
            
            var ev = window.event || e;
            var code = ev.keyCode || ev.which;
            var active = $("#picListUl .active");
            
            //del 删除layer
            if(code == 46 && ( pageMain.referrer.yjsadmin || active.find(".j-nodel").length==0) ){
                active.find(".del").trigger("click");
                ifun.ifun_callback();
            };
            
            //ctrl+c 复制Layer
            if( ev.ctrlKey && code == 67){
                $("#copyLayerButton").trigger("click");
                ifun.ifun_callback();
            };
            
            //上，下，左，右 移动Layer
            if( code == 37 || code == 38 || code == 39 || code == 40){
                ev.preventDefault();
                top = parseInt(allObj.obj.$layer.css("top"));
                left = parseInt(allObj.obj.$layer.css("left"));
                
                if(ev.ctrlKey){
                    switch(code){
                        case 38: top-=10 ;break;    //上
                        case 40: top+=10 ;break;    //下
                        case 39: left+=10 ;break;     //右
                        case 37: left-=10 ;break;     //左
                    };    
                } 
                else {
                    switch(code){
                        case 38: top-- ;break;    //上
                        case 40: top++ ;break;    //下
                        case 39: left++ ;break;     //右
                        case 37: left-- ;break;     //左
                    };
                }
                $this.css({
                    "top":top+"px",
                    "left":left+"px"
                });
                $inputTop.val(top);
                $inputLeft.val(left);
                
                allObj.obj.$selectBox.css({
                    "top":top-3+"px",
                    "left":left-3+"px"
                });
                ifun.ifun_callback();    
            }; //END if
            
        });

    };
    
    //初始化功能库 的操作
    exports.iniShortcutsLayer = function($this,$inputTop,$inputLeft){
        return iniShortcutsLayer($this,$inputTop,$inputLeft);
    };
    
    //iniShortcuts
    exports.iniShortcuts = function(){
        return iniShortcuts();
    };
    
});