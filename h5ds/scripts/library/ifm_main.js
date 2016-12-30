/**
 * [node工具生成的静态文件 -> 公用方法]
 * author: TanShenghu
 * email: tanshenghu@163.com
 * date: 2016-11-11
*/
function getUrl(param){var reg=new RegExp("(^|&)" + param + "=([^&]*)(&|$)"),r=window.location.search.substr(1).match(reg);if (r != null) return unescape(r[2]);return null;}
var pageMain = {
    qrcode: function(){
        // var resetHeight=function(){var h=0;$(".item-box").siblings(".layer").each(function(){var e=$(this);h=Math.max(h,Math.max(parseFloat(e.css('top')||0),e.offset().top)+Math.max(parseFloat(e.css('height')||0),e.height()));});$(".item-box").height(h);}
        var resetHeight=function(){var h=0;$(".item-box").siblings(".layer").each(function(){var e=$(this);h=Math.max(h,e.offset().top+e.height());});$(".item-box").height(h);}
        if(getUrl("qrcode")){
            $("body").css({position:"relative",height:$(".item-box").height()+18});var _url=getUrl("qrcodeText")||"https://www.yjsvip.com/",codePicBox=$("#layer-scanCode").empty();if(codePicBox.width()<180){codePicBox.css({width:180,height:180});}var qrcode = new QRCode(codePicBox[0],{width:codePicBox.width(), height:codePicBox.height()});qrcode.makeCode(_url);
        }else{
            $("#layer-scanCode,#layer-scanCode-text").remove();
        }
        resetHeight();
    },
    init: function(){
        // 海报二维码
        if( location.pathname.indexOf('/haibao/')>0 ){
            this.qrcode();
        }
        
    }
}
pageMain.init();

self.ifmLoad=typeof self.ifmLoad==="function"?self.ifmLoad:function(){};(parent.ifmLoad||self.ifmLoad).call(self,document.body);