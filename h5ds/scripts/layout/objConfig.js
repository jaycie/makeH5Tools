//页面整体参数，暴露出去
define(function(require,exports,module){
    
    // 页面配置信息
    $.extend(window.pageConfig||(window.pageConfig={}), {
        cacheDOMData: {}
    });
    
    var fontsOption = '';
    [
        {name:'宋体',value:'\\5B8B\\4F53'},
        //{name:'华文彩云',value:'\\534E\\6587\\5F69\\4E91'},
        {name:'华文琥珀',value:'\\534E\\6587\\7425\\73C0'},
        //{name:'隶书',value:'\\96B6\\4E66'},
        {name:'叶根友毛笔行书',value:'叶根友毛笔行书2.0版'},
        //{name:'方正舒体',value:'\\65B9\\6B63\\8212\\4F53'},
        {name:'华文行楷',value:'\\534E\\6587\\884C\\6977'},
        {name:'consolas',value:'Consolas Bold Italic'},
        {name:'Arial',value:'Arial'}
    ].forEach(function(o,i){
        fontsOption += '<option value="'+o.value+'">'+o.name+'</option>';
    })
    
    
    
    //表达提交地址
    var formWeb = $("#coolAppAllData").attr("formWeb");
    
    exports.actionUrl = {
        form1 : formWeb+'/active/addActive'
    };
    exports.ajax = {
        title: '',
        url: '//'+document.domain+'/loushus/',
        userid: $.tsh.getCookie('token')
    }
    //布局参数
    exports.obj = {
        $layer : null,
        $element : null,
        $page : null,
        $aside: $('#left'),
        $cPhone : $("#cPhone"),
        $picListUl : $("#picListUl"),
        $pageListUl : $("#pageListUl"),
        $selectBox : $("#selectBox"),
        $cPhoneEdit : $("#cPhoneEdit"), //编辑区域
        // userAppId : $("#coolAppAllData").attr("data-userappid"), // 用户APP 对应的ID
        maxZIndex : 1000, //layer的z-index 最大参数 1000 - 1
        speed : 200, //缩放拖动的速度
        sameIndex : -1 ,//判断 两次点击的layer 对象，是否是同一对象，删除或者添加图层的时候，设置该值为 -1
        selectImgResourcesLock : 0 ,//如果参数为0，不可以更换主图, 如果参数为1 可换主图， 如果是2，可以更换APP背景,如果是3，可更换擦一擦图片,如果是4，可更换幻灯片的
        $sliderThisImg : null , //对应的幻灯片的对象
        slide : 'var slide = {'+ //默认上下滑动的
                '    outClass_up : "pt-page-moveToTop",'+
                '    inClass_up : "pt-page-moveFromBottom",'+
                '    outClass_down : "pt-page-moveToBottom",'+
                '    inClass_down : "pt-page-moveFromTop"'+
                '}',
        slideNo :1 ,//滑动参数的编号

        $historyRecords : $("#historyRecords"), //操作记录弹窗
        maxRecords : 10, //最大操作记录 50 条

        //鼠标右键
        $mouseRightBox : $(".mouse-right-btn"), //鼠标右键
        $mouseRightBox_page : $("#mouse-right-btn-pagelist"), //鼠标右键 - 页面列表的
        $mouseRightBox_layer : $("#mouse-right-btn-layer"), //鼠标右键 - 图层列表的
        $mouseRightBox_music : $("#mouse-right-btn-music"), //鼠标右键 - 音乐控制
        $mouseRightBox_packet : $("#mouse-right-btn-packet"), //鼠标右键 - 红包控制
        
        //选项卡
        $basic_box: $(".basic_box"),
        $basic : $("#basic"),
        $moreSet : $("#moreSet"),
        $animateSet : $("#animateSet"),
        $functionSet : $("#functionSet"),
        
        //动画效果选择
        $animatesLists : $("#animatesLists"),
        $animateNav : $("#animatesNav"),
        $animatesUl : $("ul.animates-ul"),
        $show_box : $("#show_box"),
        $hidde_box : $("#hidde_box"),
        $other_box : $("#other_box"),
        
        //拓展参数
        $rotate_pageSlider : $("#rotate_pageSlider"),
        $radius_pageSlider : $("#radius_pageSlider"),
        $opacity_pageSlider : $("#opacity_pageSlider"),
        $fuzzy_pageSlider : $("#fuzzy_pageSlider"),
        $sadow_pageSlider : $("#sadow_pageSlider"),
        $borderType : $("#borderType_select"), //边框类型
        $borderPx : $("#borderPx_select"), //边框大小
        $playCount : $("#playCount_select"), //播放次数
        
        //动画参数
        $playTime_pageSlider : $("#playTime_pageSlider"), //播放时间
        $delayTime_pageSlider : $("#delayTime_pageSlider"), //延时播放
        //获取当前的动画状态（自动执行 or 点击执行）
        //animateState : $("#clickAddAnimate").find(".active").data("state"),
        
        //基础参数设置 - 其他参数
        $basicSet_box_other : $(".basicSet_box_other"),
        
        //初始状态 图层 列表
        _picListUlli : ' <li>'+
                      '        <div class="dragdiv">'+
                      '            <div class="eye"><i class="iconfont icon-liulanyanjing" style="display:{{display}}"></i></div>'+
                      '            <div class="info">'+
                      '                {{typeico}}'+
                      '                <input type="text" value="{{name}}" class="name" disabled>'+
                      '                <span></span>'+
                      '                <a href="javascript:void(0)" class="del"><i class="iconfont icon-close"></i></a>'+
                      '            </div>'+
                      '        </div>'+
                      '    </li>',

         //红包显示状态
        _packetTpl : '<ul>'+
                     '   <li id="mrbm-insertMoney"><i class="fa fa-money"></i>获得金额</li>'+
                     '   <li id="mrbm-insertShareMoney"><i class="fa fa-share-square-o"></i>分享金额</li>'+
                     '</ul>',

        // 新增页面
        _newPage : '<a class="l-add-page-button" id="addMbPageButton"><i class="fa fa-plus"></i> 新增页面</a>'+
                   '<a class="l-add-page-button" id="clonePageButton"><i class="fa fa-copy"></i> 复制页面</a>',         
        
        //初始状态的 - 数据框
        _basicSetBox : '<div class="ps-name-bg border-right">'+
                       '    <p class="title">{{typename}}</p>'+
                       '    <p>名称：<input type="text" value="{{name}}" id="setlayerName_val" class="cname"></p>'+
                       '    <p>底色：<input type="color" id="layerBackgroundColor" list="layerBackgroundColor_list" value="{{backgroundcolor}}">'+
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
                       '    </p>'+
                       '</div>'+
                       '<div class="ps-x-y">'+
                       '    <p class="title">图层位置</p>'+
                       '    <p>X轴：<input type="text" class="cleft" value="{{left}}"> px</p>'+
                       '    <p>Y轴：<input type="text" class="ctop" value="{{top}}"> px</p>'+
                       '</div>',
        //背景图层
        _pageBackground : '<div class="picview">'+
                          '    <div class="button">'+
                          '        <a id="changeBackgroundImage"><i class="iconfont icon-ttpodicon2"></i> 更换</a>'+
                          '        <a id="changeBackgroundImageClear"><i class="iconfont icon-icshanchu"></i> 移除</a>'+
                          '    </div>'+
                          '       <img id="picviewImgObj" src="{{url}}" />'+
                          '</div>',
        //图片框
        _basicSetBoxPic : '<div class="ms-pageSlider">'+
                          '      <h5>等比缩放：</h5>'+
                          '      <div class="s-slider" id="zoom_pageSlider" data="minData:0,maxData:200">'+
                          '      <div class="s-sliderBar">'+
                          '            <em class="s-slider-bar"></em>'+
                          '            <i class="s-ico-slider"></i>'+
                          '            </div>'+
                          '        </div>'+
                          '        <input class="slider-input" type="text" value="100">'+
                          '        <span class="unit">%</span>'+
                          '</div><div class="set-wh"><label>图片宽高：</label>宽<input type="text" class="_w">高<input type="text" class="_h"></div>'+
                          '<div class="picview">'+
                              '<div class="button">'+
                              '    <a id="changeLayerImage"><i class="fa fa-refresh"></i> 更换图片</a>'+
                              '    <a id="changeImageClear"><i class="fa fa-trash"></i> 移除图片</a>'+
                              '</div>'+
                          '       <div class="picviewImgObj"><img id="picviewImgObj" src="{{url}}" /></div>'+
                          '</div>',
        //幻灯片
        _basicSetBoxSlider : '<div class="set-slider"><ul id="sliderPicsBoxUl" class="clearfix"></ul><a class="addSlider" id="addSliderBtn"><i class="iconfont icon-tianjia"></i> 添加图片</a></div>',
        //文本框
        _basicSetBoxText :  '<div class="set-layer-size">'+
                            '    <p>宽：<input type="text" class="cleft" id="text_box_width" value="{{box_width}}"> px</p>'+
                            '     <p>高：<input type="text" class="cleft" id="text_box_height" value="{{box_height}}"> px</p>'+
                            '</div>'+
                            '<div class="pw-util">'+
                            '    <a id="font_bold" class="{{font_bold}}"><i class="fa fa-bold"></i></a>'+
                            '    <a id="font_italic" class="{{font_italic}}"><i class="fa fa-italic"></i></a>'+
                            '    <a id="font_underline" class="{{font_underline}}"><i class="fa fa-underline"></i></a>'+
                            '    <a id="font_strikethrough" class="{{font_strikethrough}}"><i class="fa fa-strikethrough"></i></a>'+
                            '    &nbsp;&nbsp;|&nbsp;&nbsp;'+
                            '    <a id="font_alignLeft" class="{{font_alignLeft}}"><i class="fa fa-align-left"></i></a>'+
                            '    <a id="font_alignCenter" class="{{font_alignCenter}}"><i class="fa fa-align-center"></i></a>'+
                            '    <a id="font_alignRight" class="{{font_alignRight}}"><i class="fa fa-align-right"></i></a>'+
                            '    <a id="font_Center" class="{{font_Center}}"><i class="fa fa-navicon"></i></a>'+
                            '    &nbsp;&nbsp;| &nbsp;&nbsp;'+
                            '    <a id="font_size" class="nobg"><i class="fa fa-font"></i></a>'+
                            '    <input class="fontsize" id="font_sizeInput" type="text" value="{{fontsize}}"> px'+
                            '    <a id="font_lineHeight" class="nobg"><i class="fa fa-text-height"></i></a>'+
                            '    <input class="fontsize" id="font_lineHeightInput" type="text" value="{{fontlineHeight}}"> px'+
                            '    <a id="font_letterSpacing" class="nobg"><i class="fa fa-text-width"></i></a>'+
                            '    <input class="fontsize" id="font_letterSpacingInput" type="text" value="{{fontetterSpacing}}"> px'+
                            '    <span class="color-box">颜色：'+
                            '       <input type="color" id="font_color" list="font_color_list" value="{{fontcolor}}">'+
                            '       <datalist id="font_color_list">'+
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
                            '       </datalist>'+
                            '  </span><select id="setPageFont">'+fontsOption+'</select>'+
                            '</div>'+
                            '<div class="text-area" id="textLayerArea"></div>',
    //iframe框
    _basicSetBoxIframe :'<div class="set-layer-size">'+
                            '    <p>宽：<input type="text" class="cleft" id="text_box_width" value="{{box_width}}"> px</p>'+
                            '     <p>高：<input type="text" class="cleft" id="text_box_height" value="{{box_height}}"> px</p>'+
                            '</div>'+
                            '<div class="pw-util">'+
                            '    <input type="text" class="m-input" placeholder="请输入带http或https的网址" id="iframeSrc" />'+
                            '</div>',
    //form框
    _basicSetBoxForm :'<div class="pw-util">'+
                            '    <div class="form-box clearfix">'+
                            '        可选择表单：<br/>'+
                            '        <ul class="select-form clearfix">'+
                            '            <li data-type="g-input"><a href="javascript:;"><i class="iconfont icon-weibaoming"></i><span>报名1</span></a></li>'+
                            '        </ul>'+
                            '    </div>'+
                            '</div>',
    //选择换页的效果    //页面切换的 效果
    slider : {
            //上下平滑
            slide1 : 'var slide = {'+
            '    outClass_up : "pt-page-moveToTop",'+
            '    inClass_up : "pt-page-moveFromBottom",'+
            '    outClass_down : "pt-page-moveToBottom",'+
            '    inClass_down : "pt-page-moveFromTop"'+
            '}',
            //左右平滑
            slide5 : 'var slide = {'+
            '    outClass_up : "pt-page-moveToLeft",'+
            '    inClass_up : "pt-page-moveFromRight",'+
            '    outClass_down : "pt-page-moveToRight",'+
            '    inClass_down : "pt-page-moveFromLeft"'+
            '}',
            //上下放大特效果
            slide2 : 'var slide = {'+
            '    outClass_up : "pt-page-scaleDownUp",'+
            '    inClass_up : "pt-page-scaleUpCenter",'+
            '    outClass_down : "pt-page-scaleDownUp",'+
            '    inClass_down : "pt-page-scaleUpCenter"'+
            '}',
            //左右放大特效果
            slide6 : 'var slide = {'+
            '    outClass_up : "pt-page-scaleDownLeft",'+
            '    inClass_up : "pt-page-scaleUpCenter",'+
            '    outClass_down : "pt-page-scaleDownLeft",'+
            '    inClass_down : "pt-page-scaleUpCenter"'+
            '}',
            //旋转风车
            slide3 : 'var slide = {'+
            '    outClass_up : "pt-page-rotateOutNewspaper",'+
            '    inClass_up : "pt-page-rotateInNewspaper",'+
            '    outClass_down : "pt-page-rotateOutNewspaper",'+
            '    inClass_down : "pt-page-rotateInNewspaper"'+
            '}',
            //上下弹出效果
            slide4 : 'var slide = {'+
            '    outClass_up : "pt-page-rotateCarouselTopOut",'+
            '    inClass_up : "pt-page-rotateCarouselTopIn",'+
            '    outClass_down : "pt-page-rotateCarouselBottomOut",'+
            '    inClass_down : "pt-page-rotateCarouselBottomIn"'+
            '}',
            //左右弹出效果
            slide7 : 'var slide = {'+
            '    outClass_up : "pt-page-rotateCarouselRightOut",'+
            '    inClass_up : "pt-page-rotateCarouselRightIn",'+
            '    outClass_down : "pt-page-rotateCarouselLeftOut",'+
            '    inClass_down : "pt-page-rotateCarouselLeftIn"'+
            '}',
            //3D盒子 左右效果
            slide8 : 'var slide = {'+
            '    outClass_up : "pt-page-rotateCubeRightOut2",'+
            '    inClass_up : "pt-page-rotateCubeRightIn2",'+
            '    outClass_down : "pt-page-rotateCubeLeftOut2",'+
            '    inClass_down : "pt-page-rotateCubeLeftIn2"'+
            '}',
            //3D盒子 上下效果
            slide9 : 'var slide = {'+
            '    outClass_up : "pt-page-rotateCubeTopOut3",'+
            '    inClass_up : "pt-page-rotateCubeTopIn3",'+
            '    outClass_down : "pt-page-rotateCubeDownOut3",'+
            '    inClass_down : "pt-page-rotateCubeDownIn3"'+
            '}'
        }
        
    };
});