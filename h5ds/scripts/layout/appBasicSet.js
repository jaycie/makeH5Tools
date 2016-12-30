//APP基础设置
define(function(require,exports,module){
    var ifun = require('./ifunction');
    var allObj = require('./objConfig');
    
    //初始化一些方法
    var iniAppBasicSet = function(){
        
        //初始化快捷操作区域的内容
        var iniBasicSet = function(){
            
            var $coolapp = pageConfig.cacheDOMData.appHtml.find("#coolapp");
            
            //高版本谷歌有效
            if( typeof(_weixinData) == "undefined" ){
                console.log("_weixinData不存在的哦~");
                _weixinData = {
                    name : "freeH5 最强的H5编辑器",
                    describe : "免费，开源，可下载！超级强大，灰常给力！",    
                    img: "/Public/coolapp/images/wx.jpg"
                };
            };
            
            //初始化微信基础参数
            $("#appset_name_val").val(_weixinData.name);
            $("#appset_info_val").html(_weixinData.describe);
            $("#appset_main_pic").attr({
                "src" : _weixinData.img,
                "data-src" : _weixinData.img
            });

            //翻页效果
            //$(".appset_cpage_radio[]")
            var sliderType = $coolapp.attr("data-slider");
            var sliderDire = $coolapp.attr("data-sliderDire");
            var $appset_cpage_ul = $("#appset_cpage_ul");
            $appset_cpage_ul.find("li").removeClass("active");
            $appset_cpage_ul.find("li[data-slider="+sliderDire+"][data-value="+sliderType+"]").addClass("active");
            $("#appset_cpage_dialog").attr({
                "data-sliderType" : sliderType,
                "data-sliderDire" : sliderDire
            });
            
            //整体背景
            var cpageData = {
                color: "inherit",
                repeat : "inherit",
                src : ""
            };
            var $cpageBackgroundRepeat = $("#cpageBackgroundRepeat");
            cpageData.color = $coolapp.css("background-color").colorHex();
            $("#cpageBackgroundColor").val(cpageData.color);
            switch($coolapp.css("background-repeat")){
                case "repeat": { $cpageBackgroundRepeat.find("option[value='repeat']").attr("selected",true); cpageData.repeat = "repeat"; };break;
                case "repeat-x": { $cpageBackgroundRepeat.find("option[value='repeat-x']").attr("selected",true); cpageData.repeat = "repeat-x"; };break;
                case "repeat-y": { $cpageBackgroundRepeat.find("option[value='repeat-y']").attr("selected",true); cpageData.repeat = "repeat-y"; };break;
                case "no-repeat": { $cpageBackgroundRepeat.find("option[value='no-repeat']").attr("selected",true); cpageData.repeat = "no-repeat"; };break;
            };
            //cpageData.src = $coolapp.css("background-image").replace("url(","").replace(")","");
            // console.log($coolapp.css("background-image"));
            cpageData.src = $coolapp.css("background-image").replace(/url\(([^\)]+)\)/gi,'$1').replace(/"/g,"");
            $("#cpageBackgroundImage").attr("src",!cpageData.src||cpageData.src=='none'?'':cpageData.src);
            var cPhoneEditCss = {
                "background-color":cpageData.color,
                "background-repeat":cpageData.repeat
            };
            console.log(cpageData.src);
            if(cpageData.src){
                cPhoneEditCss = {
                    "background-color":cpageData.color,
                    "background-repeat":cpageData.repeat,
                    "background-image": cpageData.src!='none' ? "url('"+cpageData.src+"')" : null
                }
            }
            $("#cPhoneEdit").css(cPhoneEditCss);
            
            //擦一擦
            if($coolapp.attr("data-cayica") == "true"){
                $("#appset_clear_switch").attr("class","switch on")
            };
            
        };iniBasicSet();
        
        //弹窗可拖动
        $(".setWindowBox h1").dragMt({dragParent:true});

        //点击微信主图设置 打开弹窗
        $("#changeAppMainImage").on("click",function(){
            allObj.obj.selectImgResourcesLock = 1;
            $("#resources_btn").trigger("click");
        });
        
        //背景设置
        $("#changeCpageBackgroundImage").on("click",function(){
            allObj.obj.selectImgResourcesLock = 2;    
            $("#resources_btn").trigger("click");
        });
        //移除背景图
        $("#changeCpageBackgroundImageClear").on("click",function(){
            allObj.obj.$cPhoneEdit.css("background-image","");
            $("#cpageBackgroundImage").attr("src","");
        });
        
        //擦一擦设置
        $("#changeCayicaImage").on("click",function(){
            allObj.obj.selectImgResourcesLock = 3;    
            $("#resources_btn").trigger("click");
        });
        //移除擦一擦
        $("#changeCayicaImageClear").on("click",function(){
            $("#cayicaImage").attr("src","");
        });
        
        //背景音乐,擦一擦开关,
        $(".slideSwitch").on("click",".switch",function(){
            if($(this).attr("class").indexOf("off") != -1){
                $(this).removeClass("off");
            }else{
                $(this).addClass("off");    
            };
        });
        
        //设置背景颜色
        $("#cpageBackgroundColor").on("change",function(){
            allObj.obj.$cPhoneEdit.css("background-color", $(this).val().colorHex());
        });
        
        //清除背景色
        $("#clear_cpageBackgroundColor").on("click",function(){
            allObj.obj.$cPhoneEdit.css("background-color","inherit");
            $("#cpageBackgroundColor").val("");    
        });
        
        //设置背景的重复
        $("#cpageBackgroundRepeat").on("change",function(){
            allObj.obj.$cPhoneEdit.css("background-repeat", $(this).val());
        });

        var setAppPageAnimate = (function(){
            //筛选
            var $appset_cpage_dialog = $('#appset_cpage_dialog'),
                num = '',
                val = '',
                switchfun = function(num, val){
                    $appset_cpage_dialog.attr({
                        'data-sliderType' : num,
                        'data-sliderDire' : val
                    });
                },
                $appset_cpage_ul = $('#appset_cpage_ul');

            //切换 － 换页效果
            $appset_cpage_ul.on('click', 'li' ,function(){
                $appset_cpage_ul.find('li').removeClass('active');
                $(this).addClass('active');
                num = $(this).attr('data-value');
                val = $(this).attr('data-slider');
            });

            // 确定切换效果switchfun(num,val)
            $appset_cpage_dialog.on('clik', '.yes', function(e){
                switchfun(num, val);
            }).on('click', '.close', function(event){
                var $appset_cpage_dialog = $('#appset_cpage_dialog'),
                    type = $appset_cpage_dialog.attr('data-sliderType'),
                    dire = $appset_cpage_dialog.attr('data-sliderDire');
                $('#appset_cpage_ul li').removeClass('active');
                $('#appset_cpage_ul li[data-slider="'+dire+'"][data-value="'+type+'"]').addClass('active');
            });
        }());
            
        //筛选
        var switchfun = function(num,val){
            var $appset_cpage_dialog = $("#appset_cpage_dialog");
            $appset_cpage_dialog.attr({
                "data-sliderType":num,
                "data-sliderDire":val
            });
        };
        
        //切换 - 换页效果
        var $appset_cpage_ul = $("#appset_cpage_ul");
        $appset_cpage_ul.on("click","li",function(){
            $appset_cpage_ul.find("li").removeClass("active");
            $(this).addClass("active");
            var num = $(this).attr("data-value");
            var val = $(this).attr("data-slider");
            switchfun(num,val);
        });

    };
    
    //初始化擦一擦
    var iniCayica = function(){
        if($("#cabox")[0]){
            var src = $("#cabox").attr("databgimg");
            $("#cayicaImage").attr("src",src);
        };
    };iniCayica();
    
    //初始化音乐
    var iniAppMusic = function(){

        //音乐开启或者关闭
        /**
        *    声音是全局的
        *    
        */
        var soundPlay = {
            $soundbox : $("#soundbox"),
            $soundinfo : $("#soundinfo"),
            $song : document.getElementById("coolappSong"),
            $coolappSong : $("#coolappSong"),
            
            //声音图标的显示和隐藏
            soundIcoFade : function(str){
                soundPlay.$soundinfo.html(str).fadeIn();
                soundPlay.$soundbox.off("click");//动画结束之前，解除点击事件
                setTimeout(function(){
                    soundPlay.$soundinfo.fadeOut(500);
                    soundPlay.iniBindToggle();//重新绑定点击事件
                },500);
            },
            
            //开启音乐或者关闭音乐
            offOrOnSound : function($this){
                if($this){ //如果有音乐
                    if($this.attr("data") == "on"){
                            $this.removeClass("soundbox").addClass("soundbox-close").attr("data","off");
                            soundPlay.soundIcoFade("关闭");
                            soundPlay.$song.pause();
                    }
                    else{
                        $this.removeClass("soundbox-close").addClass("soundbox").attr("data","on");
                        soundPlay.soundIcoFade("开启");
                        soundPlay.$song.play();
                    }
                }
                else; //没有音乐
            },
            
            //绑定点击事件
            iniBindToggle : function(){
                if(soundPlay.$coolappSong.attr("src") == ""){
                    soundPlay.$soundbox.css("display","none");
                    //return false;
                }
                else{
                    soundPlay.$soundbox.css("display","block");
                }
                soundPlay.$soundbox.click(function(){
                    soundPlay.offOrOnSound($(this));
                })
                .on('dblclick', function(){
                    // 删除音乐
                    $('#appset_music_dialog .has-choose .icon-close').trigger('click');
                    $('#coolappSong').attr('src','')[0].pause();
                    $("#appset_music_val").val( '' );
                    $('#soundbox').hide().attr('data', 'off');
                    
                });
            }
        };    

        //解决音乐不自动播放问题
        //点击第一页面时播放音乐
        function playSoundTouchPageOne(){
            var hander = function(){
                soundPlay.$song.play();
                window.removeEventListener('touchstart', hander, false);
            };
            window.addEventListener('touchstart', hander, false);
        };
        
        //图片加载完后，播放音乐
        function playMp3(){
            if(soundPlay.$song && soundPlay.$coolappSong.attr("src") !== ""){
                soundPlay.$song.play(true);
                setTimeout(function(){
                    $("#soundinfo").fadeOut(500);
                },1000);
            }
            else ;//console.log("没上传音乐哦！");
        };
        
        //初始化音乐绑定事件
        soundPlay.iniBindToggle();
        //自动播放音乐
        playMp3();
        //解决音乐不自动播放的问题
        playSoundTouchPageOne();
        
        //音乐设置
        //默认选择就开启了
        /*
        $("#appset_music_switch").on("click",function(){
            console.log($(this).attr("class"));    
            var classN = $(this).attr("class");
            if(classN.indexOf("off") != -1){
                console.log("开启");    
                soundPlay.$soundbox.css("display","block");
                soundPlay.$song.play();
            }else{
                console.log("关闭");
                $("#appset_music_val").val("");
                soundPlay.$soundbox.css("display","none");
                soundPlay.$song.pause();    
            }
        });
        */
        
        //添加音乐链接
        $("#appset_music_val").on("change",function(){
            soundPlay.$coolappSong.attr("src",$(this).val());
        });
    
        //初始化音乐链接地址
        /*  modify music author:xiezhanggen@gmail.com date:160725
        */
        //setWindowBox-lg 公用切换效果
        var myResource={
            music: "",
            image: ""
        };
        function getMyResource(resource){
            var resource = parseInt(resource) || 1,
                userid = allObj.ajax.userid;
            //需要才加载
            if(resource===1 && myResource.music){
                return;
            }else if(resource===2 && myResource.image){
                return;
            }else{
                if(!userid){
                    alert("请先登录");
                    window.location.href = "/loushus/login"
                    return;
                }
                $.ajax({
                    url:allObj.ajax.url+"getSource",
                    data:{userid:userid, type:resource}, //音乐type:1 图片type:2
                    type:"get",
                    dataType:"json",
                    success:function(data){
                        var d = data.data,
                            len = d.length,
                            html = "";
                        if(resource===1){
                            console.log("我的音乐：",data);
                            if(data.status===200 && len>0){
                                $("#myMusic").find(".no-music").addClass("hidden");
                                myResource.music = data.data;
                                for(var i=0;i<len;i++){
                                    html += '<li data-src="'+d[i].src+'" data-index="'+(i+1)+'">'+d[i].orgName+' <span> <i class="fa fa-close" data-id="'+d[i].id+'"></i></span> <span> <i class="fa fa-play-circle-o"></i></span></li>';
                                }
                                $("#myMusic").find("ul").html(html);
                            }else{
                                $("#myMusic").find(".no-music").removeClass("hidden");
                            }
                        }else{
                            console.log("我的图片：",data);
                            if(data.status===200 && len>0){
                                $("#myImage").find(".no-music").addClass("hidden");
                                myResource.image = data.data;
                                for(var i=0;i<len;i++){
                                    html += '<li><a class="del" data-id="'+d[i].id+'"><i class="fa fa-close"></i></a><img data-src="'+d[i].src+'" src="'+d[i].src+'"><span><i class="fa fa-check-circle"></i></span></li>';
                                }
                                $("#myImage").find("ul").html(html);
                            }else{
                                $("#myImage").find(".no-music").removeClass("hidden");
                            }
                        }
                    }
                });
            }    
        }
        //左侧导航
        $(".dialog-left").on("click", 'li', function(){
            var $this = $(this),
                $right = $this.parent().parent().next();
            $this.parent().find("li").removeClass("current");
            $this.addClass("current");

            if($(this).hasClass("myResource")){
                $right.find(".dialog-cate").addClass("invisible");
                $right.find(".tab-show").addClass("hidden");
                $right.find(".my-resource").removeClass("hidden");
                getMyResource($(this).data("resource"));
            }else{
                $right.find(".dialog-cate").removeClass("invisible");
                $right.find(".tab-show").removeClass("hidden");
                $right.find(".my-resource").addClass("hidden");
            }
        });
        //右侧顶部导航 全局
        $(".dialog-cate").on("click", 'a', function(){
            $(".dialog-cate a").removeClass("current");
            $(this).addClass("current");
        });
        //右侧顶部导航 音乐局部
        $(".tabCtrl").on("click", ".tab-ctrl a", function(){
            var $this = $(this),
                _index = $this.data('index'),
                showDom = $this.parent().next().find("ul");

            //音乐特有
            prevPlayIndex = 0;

            showDom.addClass("hidden");
            $(showDom[_index-1]).removeClass("hidden");

            $(".img_resources_box img").lazyload({ 
                  placeholder : "/member/publicStatic/images/loading.gif",
                effect: "fadeIn"
               });
        });

        //模版 页面切换
        $(".left-tab-ctrl").on("click", "a", function(){
            var $this = $(this),
                _index = $this.data('index'),
                showDom = $("#leftTab").find(".left-tab");

            showDom.removeClass("current");
            $(showDom[_index-1]).addClass("current");
        });
        
        var prevPlayIndex = 0, //上一个播放的序号
            prevListIndex = 0;  //上一个ul

        //点击播放按钮
        $(".dialog-music").on("click", "li i", function(e){  
            if($(this).hasClass("fa-close")){
                var $this = $(this);
                $.ajax({
                    url:allObj.ajax.url+"delSource",
                    data:{userid:allObj.ajax.userid, sourceid:$this.data('id')}, 
                    type:"get",
                    dataType:"json",
                    success:function(data){
                        if(data.status===200){
                            $this.closest('li').remove();
                            if($("#myMusic").find("li").length===0){
                                $("#myMusic").find(".no-music").removeClass("hidden");
                            }
                        }else{
                            alert("网络错误");
                        }
                    }
                });
            }else{  //控制播放
                var $play = $("#tryPlayMusic"),
                    _src = $play.data("src"),
                    $this = $(this),
                    _$this = $(this).parent().parent(),
                    __$this = _$this.parent(),
                    _url = _$this.data("url"),
                    _dir = __$this.data("dir"),
                    src = "";

                if(prevPlayIndex===0){
                    $this.removeClass("fa-play-circle-o").addClass("fa-pause-circle-o");
                }else{
                    if(_$this.data("index") === prevPlayIndex){ //前后两次操作同一个元素
                        if($this.hasClass("fa-play-circle-o")){
                            $this.removeClass("fa-play-circle-o").addClass("fa-pause-circle-o");
                        }else{
                            $this.addClass("fa-play-circle-o").removeClass("fa-pause-circle-o");
                        }
                    }else{
                        $(__$this.find("li")[prevPlayIndex-1]).find(".fa-pause-circle-o").addClass("fa-play-circle-o").removeClass("fa-pause-circle-o");
                        $this.removeClass("fa-play-circle-o").addClass("fa-pause-circle-o");
                    }
                }

                if(prevListIndex!==0 && __$this.data("index")!==prevListIndex){
                    $(__$this.parent().find("ul")[prevListIndex-1]).find(".fa-pause-circle-o").addClass("fa-play-circle-o").removeClass("fa-pause-circle-o");
                }

                prevPlayIndex = _$this.data("index");
                prevListIndex = __$this.data("index");

                if(_$this.data("src")){ //用户上传数据
                    src = _$this.data("src");
                }else{ //原始数据
                    src = _src + "/" + _dir + "/" + _url;
                }
                $play.prop("src", src);

                if($this.hasClass("fa-play-circle-o")){
                    $play[0].pause();
                }else{
                    $play[0].play();
                }

                $("#appset_music_dialog").off("click.stopMusic").on("click.stopMusic", ".close", function(){
                    $play[0].pause();
                });
            }    
            e.stopPropagation();
            
        });

        //点击音乐列表，选中音乐
        $(".dialog-music").on("click", "li", function(){
            var $this = $(this),
                _data = $this.html(),
                data = _data.substr(0, _data.indexOf("<span>")-1),
                src = $this.data("src");

            if(! src){
                src = $this.parent().data("dir") + "/" + $this.data("url")
            }
            $(".dialog-music").find("li").removeClass("current");
            $this.addClass("current");

            $(".has-choose").html('<i>已选择：</i> <span data-src="'+src+'">'+data+'</span> <i class="iconfont icon-close"></i>');
        });
        
        //删除选中音乐
        $(".has-choose").on("click", ".icon-close", function(){
            $(this).parent().html("");
            $(".dialog-music").find("li").removeClass("current");
        });

        //点击确定 插入音乐
        $("#appset_music_dialog").on("click", ".yes", function(){
            var dom = $(".has-choose").find("span"),
                baseUrl = "//static.yjsvip.com/static/loushu/music/",
                src = "";
            if(dom.length>0){
                src = dom.data("src");
                if(src.indexOf("http")===-1){
                    src = baseUrl+src;
                }
                $("#appset_music_val").val( src );
                soundPlay.$coolappSong.attr("src",src);
                soundPlay.$soundbox.css("display","block");
                soundPlay.$song.play();
            }else{
                soundPlay.$coolappSong.attr("src",'');
                soundPlay.$soundbox.css("display","none");
            }
        });

        //鼠标右键控制音乐
        $("#mrbm-change").on("click", function(){
            $("#appset_music").trigger("click");
        });

        $("#mrbm-del").on("click", function(){
            soundPlay.$coolappSong.attr("src",'');
            soundPlay.$soundbox.css("display","none");
        });

        //添加外链
        $("#outLinkMusic_dialog").on("click", ".yes", function(){
            var src = $("#appset_music_val").val();
            if(src.length>5){ //外链应该挺长的吧
                $.ajax({
                    url:allObj.ajax.url+"addSource",
                    data:{userid:allObj.ajax.userid, type:1, src:src}, //音乐type:1 图片type:2
                    type:"post",
                    dataType:"json",
                    success:function(data){
                        $(".my-music").trigger("click");
                        console.log("音乐：",data);
                        if(data.status===200){
                            var _name = src.substr(src.lastIndexOf("/")+1),
                                html = '<li data-src="'+src+'">'+_name+' <span> <i class="fa fa-close"></i></span> <span> <i class="fa fa-play-circle-o"></i></span></li>';
                                
                            $("#myMusic").find(".no-music").addClass("hidden");
                            $("#myMusic").find("ul").prepend(html);
                        }
                    }
                });
            }
        });
        //删除资源
        $(".img_resources_box").on("click", "a.del", function(){
            var $this = $(this),
                id=$this.data("id");

            $.ajax({
                url:allObj.ajax.url+"delSource",
                data:{userid:allObj.ajax.userid, sourceid:id}, 
                type:"get",
                dataType:"json",
                success:function(data){
                    if(data.status===200){
                        $this.parent().remove();
                        console.log("删除资源："+id+" 成功");
                    }else{
                        alert("网络错误");
                    }
                }
            });
        })

        //本地上传
        function uploadResource(type){
            var type = parseInt(type) || 1;
            $("#uploadMusic").trigger("click");
            $('#uploadMusic').on("change", function(){
                console.log("change");
                $("#uploadMusicForm").prop("action", allObj.ajax.url+"upload");

                $.ajaxFileUpload({  //异步上传接口待完善，iframe跨域问题
                    url : allObj.ajax.url+"upload/"+allObj.ajax.userid+"/"+type,
                    secureuri : false,
                    fileElementId : 'uploadMusic', 
                    dataType : 'jsonp',
                    success : function(data, status){  
                        console.log(data);
                        if(type===1){
                            myResource.music="";
                            $("#musicResource").trigger("click");
                        }else{
                            myResource.image="";
                            $("#imageResource").trigger("click");
                        }
                        //iframe上传跨域问题，待优化,优化完无需再请求
                        getMyResource(type);

                        if (typeof (data.error) != 'undefined') {  
                            if (data.error != '') {  
                                console.log(data.error);  
                            } else {  
                                console.log(data.message);  
                            }  
                        }  
                    },  
                    error : function(data, status, e){  
                        console.log(e);  
                    }  
                });  
            });
        }
        $("#uploadMusicBtn").on("click",function(){
            uploadResource(1);
        });
        $("#uploadImageBtn").on("click",function(){
            uploadResource(2);
        });
    };
    
    //暴露接口
    exports.iniAppBasicSet = function(){
        iniAppBasicSet();
        iniAppMusic();
    };
});