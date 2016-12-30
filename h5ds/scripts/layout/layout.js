//布局
define(function(require,exports,module){
    var ifun     = require('./ifunction'),
        c        = require('./sizeConfig'),
        allObj   = require('./objConfig'),
        pageType = ifun.getUrl('type')||1,
        isParam  = location.search.indexOf('parmes')>0;
    
    //设置初始参数
    var setCenterDiv = function(notSpa){
        if(notSpa){
            c.size.addPage_height=0;
        }else{
            // 目前只有楼书工具才有多页功能
            pageType==1 && $("#newPageAdd").html( allObj.obj._newPage );
        }
        var centerWid = c.size.wind_width - c.size.left_width - c.size.right_width;
        var centerHei = c.size.wind_height - c.size.top_height;
        var marCenterVal = 0;
        if( isParam && window.setLeftHeight==true ){ marCenterVal = c.size.wind_height*0.35; }
        
        $("#center").width(centerWid).height(centerHei);
        $("#left").height(c.size.wind_height - c.size.top_height);
        $("#pageList").height(c.size.wind_height - c.size.top_height - c.size.addPage_height - (pageType==1?80:0) - marCenterVal );
        $("#showStyle").height(c.size.wind_height - c.size.top_height - c.size.addPage_height - 35 - marCenterVal );
        $("#right").height(c.size.wind_height - c.size.top_height);
        $("#picList").height(c.size.wind_height - c.size.dataSetHeight - c.size.top_height - c.size.addPage_height - c.size.cutOffRule + 70);
        //设置cPhone
        //$("#cPhone").center2({top: c.size.cPhone_top+'px'});
        //console.log("centerHei",centerHei);
        var scale = centerHei/1600;
        $("#cPhone").css({
            '-webkit-transform': 'scale('+scale+')',
            'transform': 'scale('+scale+')'
        }).center2({top: (centerHei-c.size.cPhone_hei*scale)/2+'px'});
    };
    
    //当浏览器大小变化时
    $(window).resize(function () {
        c.size.wind_width = $(window).width(),
        c.size.wind_height = $(window).height()
        setCenterDiv();
    });
    
    //暴露接口
    exports.initPage = function(notSpa){
        setCenterDiv(notSpa);
    }
    
});