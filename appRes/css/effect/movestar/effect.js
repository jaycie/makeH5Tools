$(function(){
	var set = {
		starCount: 30,
		meteorCount: 20	
	}
	var c, e, f, g, h, i = "";	
	
	for (var j = 0; j < set.meteorCount; j++){
		c = (800 * Math.random() - 280).toFixed(2), 
		e = (100 * Math.random() - 80).toFixed(2), 
		g = (.5 + 2.5 * Math.random()).toFixed(), 
		h = (1.2 + 2.8 * Math.random()).toFixed(),
		f = Math.round(1 + 3 * Math.random()), 
		i += '<i class="meteor style' + f + '" style="left:' + c + "px; top:" + e + "px; -webkit-animation-delay:" + g + "s; -webkit-animation: meteor " + h + 's linear infinite;"></i>';
	}
	$(".m-animationBox").html(i);
});	