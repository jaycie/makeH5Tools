//全局的公用函数
define(function(require,exports,module){

	//布局参数
	exports.animates = {
		/**
		 * [show description]
		 * @进入的动画效果
		 */
		show : '\
			<li data="" name="无动画">无动画</li>\
			<li data="animated bounceIn" name="反弹">反弹</li>\
            <li data="animated bounceInDown" name="下落反弹">下反弹</li>\
            <li data="animated bounceInLeft" name="向左反弹">左反弹</li>\
            <li data="animated bounceInRight" name="向右反弹">右反弹</li>\
            <li data="animated bounceInUp" name="向上反弹">上反弹</li>\
            \
            <li data="animated fadeIn" name="渐显进入">渐显</li>\
            <li data="animated fadeInDown" name="往下渐显进入">下渐显</li>\
            <li data="animated fadeInDownBig" name="往下渐显进入（快）">下渐快</li>\
            <li data="animated fadeInLeft" name="往左渐显进入">左渐显</li>\
            <li data="animated fadeInLeftBig" name="往左渐显进入（快）">左渐快</li>\
            <li data="animated fadeInRight" name="往右渐显进入">右渐显</li>\
            <li data="animated fadeInRightBig" name="往右渐显进入（快）">右渐快</li>\
            <li data="animated fadeInUp" name="往上渐显进入">上渐显</li>\
            <li data="animated fadeInUpBig" name="往上渐显进入（快）">上渐快</li>\
            \
            <li data="animated flip" name="3D翻转">3D翻转</li>\
            <li data="animated flipInX" name="沿X轴翻开">X轴翻开</li>\
            <li data="animated flipInY" name="沿Y轴翻开">Y轴翻开</li>\
            \
            <li data="animated lightSpeedIn" name="光速进入">光速</li>\
            <li data="animated rotateIn" name="旋转进入">旋转</li>\
            \
            <li data="animated rotateInDownLeft" name="从左上弧线进入">左上弧</li>\
            <li data="animated rotateInDownRight" name="从右上弧线进入">右上弧</li>\
            <li data="animated rotateInUpLeft" name="从左下弧线进入">左下弧</li>\
            <li data="animated rotateInUpRight" name="从右下弧线进入">右下弧</li>\
            \
            <li data="animated rollIn" name="滚入">滚入</li>\
            \
            <li data="animated zoomIn" name="放大进入">放大</li>\
            <li data="animated zoomInDown" name="向下放大进入">下放大</li>\
            <li data="animated zoomInLeft" name="向右放大进入">右放大</li>\
            <li data="animated zoomInRight" name="向左放大进入">左放大</li>\
            <li data="animated zoomInUp" name="向上放大进入">上放大</li>\
            \
            <li data="animated slideInDown" name="向下滑入">向下滑</li>\
            <li data="animated slideInLeft" name="向左滑入">向左滑</li>\
            <li data="animated slideInRight" name="向右滑入">向右滑</li>\
            <li data="animated slideInUp" name="向上滑入">向上滑</li>\
            \
            <li data="pt-page-moveFromLeft" name="从左滑入">左滑入</li>\
            <li data="pt-page-moveFromRight" name="从右滑入">右滑入</li>\
            <li data="pt-page-moveFromTop" name="向上滑入">上滑入</li>\
            <li data="pt-page-moveFromBottom" name="向下滑入">下滑入</li>\
            \
            <li data="pt-page-scaleUp" name="变大（渐显）">变大</li>\
            <li data="pt-page-scaleUpDown" name="大变正常-渐显">大变正</li>\
            \
            <li data="pt-page-flipInBottom" name="向上翻转-渐显">上翻转</li>\
            <li data="pt-page-flipInLeft" name="向左翻转-渐显">左翻转</li>\
            \
            <li data="pt-page-rotateInNewspaper" name="旋转-渐显">旋转</li>\
            \
            <!-- pull -->\
            <li data="pt-page-rotatePullRight" name="右翻入-渐显">右翻入</li>\
            <li data="pt-page-rotatePullLeft" name="左翻入-渐显">左翻入</li>\
            <li data="pt-page-rotatePullTop" name="上翻入-渐显">上翻页</li>\
            <li data="pt-page-rotatePullBottom" name="下翻入-渐显">下翻入</li>\
            \
            <li data="pt-page-rotateCarouselLeftIn" name="右变大-显示">右变大</li>\
            <li data="pt-page-rotateCarouselRightIn" name="左变大-显示">左变大</li>\
            <li data="pt-page-rotateCarouselTopIn" name="往上变大-显示">上变大</li>\
            <li data="pt-page-rotateCarouselBottomIn" name="往下变大-显示">下变大</li>\
            \
            <li data="pt-page-rotateSlideIn" name="向左滑入-渐显">左滑入</li>',
        /**
         * [hidde description]
         * @ 离开的动画效果
         */
		hide : '\
			<li data="" name="无动画">无动画</li>\
			<li data="animated bounceOut" name="弹出">弹出</li>\
            <li data="animated bounceOutDown" name="往下弹出">往下弹</li>\
            <li data="animated bounceOutLeft" name="往左弹出">往左弹</li>\
            <li data="animated bounceOutRight" name="往右弹出">往右弹</li>\
            <li data="animated bounceOutUp" name="往上弹出">往上弹</li>\
            \
            <li data="animated fadeOut" name="渐渐消失">渐消失</li>\
            <li data="animated fadeOutDown" name="往下渐渐消失">往下渐</li>\
            <li data="animated fadeOutDownBig" name="往下渐渐消失（快）">往下快</li>\
            <li data="animated fadeOutLeft" name="往左渐渐消失">往左渐</li>\
            <li data="animated fadeOutLeftBig" name="往左渐渐消失（快）">往左快</li>\
            <li data="animated fadeOutRight" name="往右渐渐消失">往右渐</li>\
            <li data="animated fadeOutRightBig" name="往右渐渐消失（快）">往右快</li>\
            <li data="animated fadeOutUp" name="往上渐渐消失">往上渐</li>\
            <li data="animated fadeOutUpBig" name="往上渐渐消失（快）">往上快</li>\
            \
            <li data="animated flipOutX" name="沿X轴翻出">X轴翻出</li>\
            <li data="animated flipOutY" name="沿Y轴翻出">Y轴翻出</li>\
            \
            <li data="animated lightSpeedOut" name="光束离开">光束离</li>\
            <li data="animated rotateOut" name="旋转消失">旋转隐</li>\
            \
            <li data="animated rotateOutDownLeft" name="从左上弧线离开">左上弧</li>\
            <li data="animated rotateOutDownRight" name="从右上弧线离开">右上弧</li>\
            <li data="animated rotateOutUpLeft" name="从左下弧线离开">左下弧</li>\
            <li data="animated rotateOutUpRight" name="从右下弧线离开">右下弧</li>\
            \
            <li data="animated hinge" name="掉链子">掉链子</li>\
            <li data="animated rollOut" name="滚出">滚出</li>\
            \
            <li data="animated zoomOut" name="缩小离开">缩小</li>\
            <li data="animated zoomOutDown" name="向下缩小离开">下缩小</li>\
            <li data="animated zoomOutLeft" name="向左缩小离开">左缩小</li>\
            <li data="animated zoomOutRight" name="向右缩小离开">右缩小</li>\
            <li data="animated zoomOutUp" name="向上缩小离开">上缩小</li>\
            \
            <li data="animated slideOutDown" name="向下滑出">下滑出</li>\
            <li data="animated slideOutLeft" name="向左滑出">左滑出</li>\
            <li data="animated slideOutRight" name="向右滑出">右滑出</li>\
            <li data="animated slideOutUp" name="向上滑出">上滑出</li>\
            \
            <li data="pt-page-moveToLeft" name="从左滑出">左滑出</li>\
            <li data="pt-page-moveToRight" name="从右滑出">右滑出</li>\
            <li data="pt-page-moveToTop" name="向上滑出">上滑出</li>\
            <li data="pt-page-moveToBottom" name="向下滑出">下滑出</li>\
            \
            <li data="pt-page-fade" name="渐隐藏">渐隐藏</li>\
            \
            <li data="pt-page-moveToLeftFade" name="从左滑出-渐隐">向左滑</li>\
            <li data="pt-page-moveToRightFade" name="从右滑出-渐隐">从右滑</li>\
            <li data="pt-page-moveToTopFade" name="向上滑出-渐隐">向上滑</li>\
            <li data="pt-page-moveToBottomFade" name="向下滑出-渐隐">向下滑</li>\
            \
            <li data="pt-page-moveToLeftEasing" name="向左滑出-Easing">向左滑</li>\
            <li data="pt-page-moveToRightEasing" name="向右滑出-Easing">向右滑</li>\
            <li data="pt-page-moveToTopEasing" name="向上滑出-Easing">向上滑</li>\
            <li data="pt-page-moveToBottomEasing" name="向下滑出-Easing">向下滑</li>\
            \
            <li data="pt-page-scaleDown" name="缩小（渐隐）">缩小</li>\
            <li data="pt-page-scaleDownUp" name="正常变大-渐隐">变大</li>\
            <li data="pt-page-scaleDownCenter" name="居中缩小-渐隐">中缩小</li>\
            <li data="pt-page-scaleUpCenter" name="变大-渐隐">变大2</li>\
            \
            <li data="pt-page-rotateRightSideFirst" name="向左压缩变小（渐隐）">左缩小</li>\
            <li data="pt-page-rotateLeftSideFirst" name="向右压缩变小-渐隐">右缩小</li>\
            <li data="pt-page-rotateTopSideFirst" name="向下压缩变小-渐隐">下缩小</li>\
            <li data="pt-page-rotateBottomSideFirst" name="向上压缩变小-渐隐">上缩小</li>\
            \
            <li data="pt-page-flipOutRight" name="向右翻转（渐隐）">右翻转</li>\
            <li data="pt-page-flipOutTop" name="向下翻转-渐隐">下翻转</li>\
            \
            <li data="pt-page-rotateFall" name="掉落下去">掉落下去</li>\
            \
            <li data="pt-page-rotateOutNewspaper" name="旋转-渐隐">旋转</li>\
            \
            <li data="pt-page-moveFromLeftFade" name="从左滑入-渐隐藏">向左滑</li>\
            <li data="pt-page-moveFromRightFade" name="从右滑入-渐隐藏">从右滑</li>\
            <li data="pt-page-moveFromTopFade" name="向上滑入-渐隐藏">向上滑</li>\
            <li data="pt-page-moveFromBottomFade" name="向下滑入-渐隐藏">向下滑</li>\
            \
            <!-- push -->\
			<li data="pt-page-rotatePushLeft" name="左翻页-渐隐">左翻页</li>\
            <li data="pt-page-rotatePushRight" name="右翻页-渐隐">右翻页</li>\
            <li data="pt-page-rotatePushTop" name="上翻页-渐隐">上翻页</li>\
            <li data="pt-page-rotatePushBottom" name="下翻页-渐隐">下翻页</li>\
			\
			<!-- carousel -->\
            <li data="pt-page-rotateCarouselLeftOut" name="左缩小-渐隐">左缩小</li>\
            <li data="pt-page-rotateCarouselRightOut" name="右缩小-渐隐">右缩小</li>\
            <li data="pt-page-rotateCarouselTopOut" name="往上变大-渐隐">上变大</li>\
            <li data="pt-page-rotateCarouselBottomOut" name="往下变大-渐隐">下变大</li>\
            \
			<!-- side -->\
            <li data="pt-page-rotateSlideOut" name="向左滑出-渐隐">左滑出</li>',
        /**
         * [other description]
         * @其他动画
         */
		other : '\
			<li data="" name="无动画">无动画</li>\
            <li data="animated bounce" name="抖动">抖动</li>\
            <li data="animated flash" name="闪动">闪动</li>\
            <li data="animated pulse" name="停顿">停顿</li>\
            <li data="animated rubberBand" name="弹性">弹性</li>\
            <li data="animated shake" name="摇一摇">摇一摇</li>\
			<li data="animated swing" name="摇摆">摇摆</li>\
            <li data="animated tada" name="嘚瑟">嘚瑟</li>\
            <li data="animated wobble" name="摆动">摆动</li>\
            <li data="animated rollOneCount" name="旋转（快>慢）">旋转</li>\
            <li data="animated rollInfinite" name="匀速转动">匀速转</li>\
            \
            <li data="pt-page-moveIconUp" name="渐入渐出（循环）">渐入出</li>\
            <li data="pt-page-moveCircle" name="弹性下落">弹下落</li>'
	}
});