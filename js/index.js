/**手工客首页**/

//手工好店的切换效果
$(".sg-store-nav li").click(function(){
		var index = $(this).index();
		$(this).siblings().removeClass("selected");
		$(this).addClass("selected");
		$(".sg-store-list").hide();
		$(".sg-store-list").eq(index).show();
	})

//首页焦点图的轮播效果
$(function(){
		var sWidth = $(".sgk-top-l").width();
		var len = $(".sgk-top-l ul li").length;
		var index = 0;
		var picTimer;

		$(".sgk-top-l").hover(function(){
				$(this).find(".pre").stop(true,false).animate({"left":0},300);
				$(this).find(".next").stop(true,false).animate({"right":0},300);
			},function(){
				$(this).find(".pre").stop(true,false).animate({"left":-35+"px"},300);
				$(this).find(".next").stop(true,false).animate({"right":-35+"px"},300);
			})

			//以下代码添加按钮
			/*var btn = "<div class='btn fixed'>";
			for(var i=0; i < len; i++) {
				btn += "<span class='icon'></span>";
			}
			btn += "</div>";
			$(".sgk-top-l").append(btn);*/

			//为小按钮添加鼠标滑入事件，以显示相应的内容
			/*$(".btn span").mouseenter(function() {
				index = $(".btn span").index(this);
				showPics(index);
			}).eq(0).trigger("mouseenter");*/

			//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
			$(".sgk-top-l ul").css({"width":sWidth * (len),'left':'0px'});

			$(".next").click(function(){
					if(index < len-1){
						index ++;
						showPics(index);
					}

				})
			$(".pre").click(function(){
					if(index > 0){
						index--;
						showPics(index);
					}
				})

			//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
			$(".sgk-top-l").hover(function() {
				clearInterval(picTimer);
			},function() {
				picTimer = setInterval(function() {
					showPics(index);
					index++;
					if(index == len) {index = 0;}
				},3000); //此4000代表自动播放的间隔，单位：毫秒
			}).trigger("mouseleave");

			//显示图片函数，根据接收的index值显示相应的内容
			function showPics(index) { //普通切换
				var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
				$(".sgk-top-l ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
				//$(".btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
			}
	})

//手工达人的滚动效果
$(".daren-area").hover(function(){
		get_left();
	},function(){
		$(".control-l,.control-r").hide();
		})
$(function(){
		var width = $(".daren-con").width();
		var left;
		var len = $(".daren-con ul li").length;
		$(".daren-con ul").css("width",width*(len));
		var nowLeft;
		$(".control-r").click(function(){
				left = $(".daren-con ul").css("left");
				nowLeft = parseInt(left)-width;
				if(nowLeft == (-((len-1)*width))){
					$(this).hide();
					$(".control-l").show();
					}else if(nowLeft < '0'){
						$(".control-l").show();
						}
				$(".daren-con ul").stop(true,false).animate({"left":nowLeft+"px"},400);
			})
		$(".control-l").click(function(){
				left = $(".daren-con ul").css("left");
				nowLeft = parseInt(left)+width;
				if(nowLeft == "0"){
					$(this).hide();
					$(".control-r").show();
					}else if(nowLeft > (-((len-1)*width)) ){
						$(".control-r").show();
						}
				$(".daren-con ul").stop(true,false).animate({"left":nowLeft+"px"},400);
			})
	})
//判断现在的位置
function get_left(){
		var left = $(".daren-con ul").css("left");
		var len = $(".daren-con ul li").length;
		var maxPx = (len-1)*-973+"px";
		if(len > 1){
				if(left == "0px"){
						$(".control-r").show();
					}else if(left == maxPx){
						$(".control-l").show();
						}else{
							$(".control-l,.control-r").show();
							}
			}
	}