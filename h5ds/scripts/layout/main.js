/**
 * [node工具，公用方法]
 * author: TanShenghu
 * email: tanshenghu@163.com
 * date: 2016-11-01
*/
define(function(require,exports,module){
    var $    = require( '$' ),
    pageMain = {
        production: document.URL.indexOf( 'act.yjsvip.com' )>-1||document.URL.indexOf( 'static.yjsvip.com' )>-1,
        referrer: {member:document.referrer.indexOf('/member/')>0,yjsadmin:document.referrer.indexOf('/yjsAdminService/')>0},
        eleInit: function(){
            var _this = this, type = +$.tsh.getRequest()['type'];
            if( $.tsh.getRequest()['packetId'] ){
                document.title = '红包 - HTML5 在线编辑器';
            }else{
                switch( type ){
                    case 1:document.title = '楼书 - HTML5 在线编辑器';break;
                    case 3:document.title = '海报 - HTML5 在线编辑器';break;
                    case 5:document.title = '活动 - HTML5 在线编辑器';break;
                    case 9:document.title = '集赞 - HTML5 在线编辑器';break;
                    default :document.title = '楼书 - HTML5 在线编辑器';break;
                }
            }
            
            this.popup = $.tsh.popupBox({
                hand: '',
                box: $( '<div class="popBox" id="popBox"></div>' ).appendTo( 'body' ),
                width: 350,
                zIndex: 1500,
                callback: function(box){$('body').addClass('tsh-popshow');typeof _this.popup.callback=='function'&&_this.popup.callback.call(this,box)},
                okfn: function(hand,box){typeof _this.popup.okfn=='function'?_this.popup.okfn.call(this,hand,box):box.Hide()},
                hidefn: function(hand,box){$('body').removeClass('tsh-popshow');typeof _this.popup.hidefn=='function'&&_this.popup.hidefn.call(this,hand,box)}
            });
        },
        alert: function( options ){
            if( typeof options==='string' ){
                options = {content:options}
            }
            
            this.popup.callback = options.callback;
            this.popup.okfn = options.okfn;
            this.popup.hidefn = options.hidefn;
            
            var tpl = '<div class="dialog-title"><label class="titleTag">'+(options.title||'')+'</label><i class="closeMe" title="关闭">&times;</i></div><div class="dialogContent">'+ (typeof options.type=='undefined'?options.content:options.type==0?'<div class="alert-msg">'+options.content+'</div>':'<table class="SYS-Tip-tbl"><tr><th><i class="tipIco Ico_'+options.type+'"></i></th><td><div>'+options.content+'</div></td></tr></table>' ) + '</div><div class="handlerBox"><button class="ui-okBtn">确定</button> <button class="ui-cancel closeMe">取消</button></div>';
            this.popup.html( tpl ).Show();
            
        },
        levels: function( ints, cur, ref ){ // [{"index":"999","ele":"<div></div>"},...]
            // 图层的层级计算
            if( Array.isArray( ints ) ){
                
                if( typeof ref==='undefined' ){
                    ref = 0;
                    ints.map(function(item, i){
                        
                        ref = Math.max(ref, item.index);
                        
                    })
                }
                
                var larr = [];
                ints.forEach(function(item, i){
                    
                    if( item.index==cur ){
                        item.index = ref;
                    }else{
                        item.index -= 1;
                    }
                    
                })
                
            }
            return ints;
            
        },
        init: function(){
            
            this.eleInit();
            
            if(navigator.userAgent.indexOf("Chrome")==-1&&navigator.userAgent.indexOf("Safari")==-1&&navigator.userAgent.indexOf("Firefox")==-1){
                this.alert( {type:3,title:"系统提示",content:"请使用[谷歌,苹果,火狐]其中的一款浏览器!"} );
            }
            
        }
        
    }
    pageMain.init();
    module.exports = pageMain;
})