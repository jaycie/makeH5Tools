//获取图片素材
define(function(require,exports,module){
    
    var allObj = require('./objConfig'),
    pageConfig = window.pageConfig;
    
    //初始化页面列表区域
    var iniPageList = function(notSpa, combine){
        var $returnData = combine=='combine' ? pageConfig.cacheDOMData.packetHtml : pageConfig.cacheDOMData.appHtml;
        var $coolapp = $returnData.find("#coolapp");
        //pages 对象
        var pages = {
            $pages : $coolapp.find(".page"), //所有的page对象
            num : null, //总共页
            arr : [],
            music : $coolapp.attr("data-music"),//如果没音乐，就是false
            slider : $coolapp.attr("data-slider"),//滑动样式，数字 1 ~ 7
            cayica : $coolapp.attr("data-cayica") //擦一擦 ，没有就是false
        };
        notSpa && NotSPA();
        //遍历对象
        pages.$pages.each(function(i){
            var page = {
                name : $(this).attr("pageName"), //名称、
                content : $(this).html() //内容
            };
            //赋值
            pages.arr.push('<li><span class="number"><em class="ng-binding">'+(i+1)+'</em></span><a href="javascript:void(0)" class="del"><i class="iconfont icon-close"></i></a><div class="dragdiv"><input type="text" value="'+page.name+'" class="name" disabled><template>'+page.content+'</template></div></li>');
        });
        //渲染
        if(combine=='combine'){
            $('#left>.packet ul').html( pages.arr );
        }else{
            allObj.obj.$pageListUl.html(pages.arr);
            var tid = location.search.indexOf('parmes')>=0 && setInterval(function(){
                if( $('#packList [data-tplid="'+ allObj.obj.$cPhoneEdit.find('[data-tplid]').data('tplid') +'"] .user-tpl').trigger('click').closest('li').addClass('current').length ) clearInterval(tid);
            },300)
            
        }
        
        //初始添加音乐的参数
        if(pages.music == "true"){
            var url = $returnData.find(".coolappSong_mobile").attr("src");
            $("#appset_music_val").val(url);
            $("#coolappSong").attr("src",url);
            
            // $('#appset_music_dialog .has-choose').html( '<i>已选择：</i> <span data-src="'+url.replace(/.+music\//ig,'')+'">'+ $('#appset_music_dialog [data-url="'+url.replace(/.+music\/animate\//ig,'')+'"] em').text() +'</span> <i class="iconfont icon-close"></i>' );
            
            //$("#appset_music_switch").addClass("off");
        }else{
            $("#coolappSong")[0].pause();
            $("#soundbox").css("display","none");
            $("#appset_music_switch").addClass("off");
        }
        
    };

    var NotSPA = function(){
        $('body').addClass('not-spa');
    };
    
    //暴露接口
    exports.iniPageList = function(){
        iniPageList.apply(window, [].splice.call(arguments, 0));
    }
    
});