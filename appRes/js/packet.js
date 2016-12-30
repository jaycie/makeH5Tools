/*!
 * jQuery packet Plugin v1.0.1
 * author:xiezhanggen@gmail.com
 */
 "use strict";
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var host = location.protocol+'//'+location.hostname+'/'
      , $packetMoney = $("#packetMoney")
      , $packetShareMoney = $("#packetShareMoney")
      , storeId = 'PACKETdata'
      , TAG = 'Packet Info:'
      , scale = $(window).width()/640
      , hasPacket = -1  //－1未请求接口； 0请求了接口，但是没有红包信息； 1有红包信息
      , tpl = {
            tips: '<div id="PACKETtips" style="position:absolute;right:20px;bottom:20px;width:80px;height:80px;cursor:pointer;"><img src="http://10.0.0.9/packet.png?v"></div>'
          , mask: '<div id="PACKETmask" style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:9980;background-color:#000;opacity:0.4;"></div>'
          , close: '<div class="PACKETclose" style="position:absolute;top:-30px;right:-30px;font-size:24px;">X</div>'
      };

    function log(val){
        window.console && console.log(TAG+JSON.stringify(val));
    }

    function getUrl(param){
        var reg = new RegExp("(^|&)"+ param +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    function getType(){
        return getUrl('type');
        //5活动 3海报 1楼书  
    }

    function getId(){
        return getUrl('activeId');
    }

    function checkPacket(){
        if(hasPacket === -1){
            $.ajax({
                url:host+"loushus/getPacket",
                data:{typeId:getType(), id:getId()},
                type:"post",
                dataType:"jsonp",
                async: false,
                success:function(data){
                    if(data.status === 200){
                        if(data.show === true){
                            $("body").append('<div id="'+storeId+'" style="display:none">'+data.tpl+'</div>');
                            $("#"+storeId).find('.wrap').css({
                                'transform': 'scale('+scale+')'
                            });
                            $("#"+storeId).find('.layer-pic').append(tpl.close);
                            hasPacket = 1;
                            return 1
                        }else{
                            hasPacket = 0;
                            return 0;
                        }  
                    }
                }
            });
        }else{
            return hasPacket;
        }      
    }

    function _modalPosition(){
        var $show = $('#PACKETshow')
          , left = (1-scale)*$show.find('.layer-pic').width()*scale;
        $show.find('.wrap').css("marginLeft",'-'+left+'px');
    }

    var config = $.packet = function () {
        var $mask = $("#PACKETmask")
          , $show = $("#PACKETshow");
        checkPacket();
        if(checkPacket()===1){
            $("body").append(tpl.tips);
        }else{
            log('没有红包信息');
            return;
        }

        $("#PACKETtips").off("click.PACKET").on("click.PACKET", function(){
            //显示遮罩
            if($mask.length===0){
                $("body").append(tpl.mask);
            }else{
                $mask.show();
            }
            //显示第一个页面
            if($show.length===0){
                $('body').append('<div id="PACKETshow" style="z-index:9990;position:absolute;left:0;top:0;width:100%;height:100%;">'+$('#'+storeId).find('.page-1-1').html()+'</div>');
                _modalPosition();
            }else{
                $show.show();
            } 
        }); 
        
        // $(".PACKETclose").off("click.PACKET").on("click.PACKET", function(e){
        //     $mask.hide();
        //     $show.empty();
        //     e.stopPropagation();
        // });


        // return {
        //     showMoney: function(m, s){
        //         checkPacket();
        //         log($packetMoney.html());
        //             $packetMoney.html(m);
        //             $packetShareMoney.html(s);
        //         $("#PACKETshow").html($('#'+storeId).find('.page-2-1').html());
        //         _position();    
        //     },
        //     setMoney: function(val){
        //         if(checkPacket()===1){
        //             $packetMoney.html(val);
        //         }
        //     },
        //     setShareMoney: function(val){
        //         if(checkPacket()===1){
        //             $packetShareMoney.html(val);
        //         }
        //     }
        // };
    };

    config.defaults = {};
}));