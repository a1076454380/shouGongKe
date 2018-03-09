$(function(){
	$('.picList li').click(function(){
		var item_id = $(this).parent().attr('item_id'); //获取圈子的ID
		var lenth = $(this).parent().find('li').length; //获取图片的数量
		var index = $(this).index(); //判断鼠标点击的位置
		var imgSrc;
		var str1='';
		var str2='';
		$(this).parent().hide();
		var html="<div class='picDetail-"+item_id+" picDetail'><div class='fixed'><p class='shouqi fense' onclick='shouqi("+item_id+");'>收起</p></div><ul class='picBox' id='picBox_"+item_id+"' onclick='listGo("+item_id+",event)' onmousemove='pagex("+item_id+",event)'>";
		for(var i=0; i<lenth; i++){
			var className = '';
			if(index == i){
				className = " class='on'";
			}
			imgSrc = $(this).parent().find('li').eq(i).children('img').attr('src');
			imgSrc2 = imgSrc.replace('@!w_h_153','@!w_478');
			str1 += "<li"+className+"><img src='"+imgSrc2+"' width='478' /></li>";
			str2 += "<li><a"+className+" onclick='showPic("+i+","+item_id+")'><img src='"+imgSrc+"' width='54' height='54' /></a></li>";
		}
		html = html+str1+"</ul>";
		html += "<div class='picLitBox fixed'><a href='javascript:' class='leftBtn' onclick='btnGo(1,"+item_id+");'></a><div class='picListBox'><ul class='picLitList fixed'>";
		html = html+str2+"</ul></div><a href='javascript:' class='rightBtn' onclick='btnGo(2,"+item_id+");'></a></div></div>";
		$(this).parent().parent().append(html);
	})
})
//点击收起效果
function shouqi(item_id){
	$('.picDetail-'+item_id).siblings('.picList').show();
	$('.picDetail-'+item_id).remove();
}
//点击显示大图
function showPic(num,item_id){
	var len = $('.picDetail-'+item_id+' .picBox li').length;
	$('.picDetail-'+item_id+' .picBox li').hide().eq(num).show();
	$('.picDetail-'+item_id+' .picLitList li a').removeClass('on');
	$('.picDetail-'+item_id+' .picLitList li').eq(num).find('a').addClass('on');
}
//左右按钮点击效果
function btnGo(type,item_id){
	var len = $('.picDetail-'+item_id+' .picLitList li').length;
	if(len < 8){
		return;
	}else{
		var obj = $('.picDetail-'+item_id).find('.picLitList');
		$position = parseInt(obj.css('left'));
		if(type == 1){
			if($position == 0){
				return;
			}else{
				obj.animate({'left':'0px'});
			}
		}else{
			if($position == 0){
				obj.animate({'left':'-'+((len-7)*63)+'px'});
			}else{
				return;
			}
		}
	}
}
//删除手工圈
function circle_del(circle_item_id){
	var cate_id = $('#cate_id').val();
	var url = '/index.php?m=HandCircle&a=del';
	$.get(url,{'cate_id':cate_id,'circle_item_id':circle_item_id},function(data){
		if(data.res == 1){
			$('#circle_'+circle_item_id).remove();
		}else{
			alert('删除失败');
		}
	},'json');
}
//显示评论列表
function getComment(circle_item_id){
	var obj = $('#circle_'+circle_item_id).find('.cMessageBox');
	if(obj.is(':hidden')){
		obj.slideDown(100);
	}else{
		obj.slideUp(100);
	}
}
//举报
function report(circle_id,type){
	alert('举报成功，我们会尽快处理！');
}
//删除评论
function comment_del(circle_item_id,comment_id){
	if(window.confirm('确认要删除此条评论吗？')){
		var cate_id = $('#cate_id').val();
		var url = '/index.php?m=HandCircle&a=commentDel';
		$.get(url,{'cate_id':cate_id,'circle_item_id':circle_item_id,'comment_id':comment_id},function(data){
			if(data.res == 1){
				$('#comment_'+comment_id).remove();
			}else{
				alert('删除失败');
			}
		},'json');
	}
}
//发评论
function comment(circle_item_id,uid,comment_id){
	var obj;
	if(uid == ''){
		obj = $('#cMsgBtn_'+circle_item_id).prev('.InputBox');
	}else{
		obj = $('#replay_'+comment_id).find('input');
	}
	var content = obj.val();
	if(content == ''){
		alert('亲，评论内容不能为空');
	}else{
		var url = '/index.php?m=HandCircle&a=comment';
		$.post(url,{'circle_item_id':circle_item_id,'content':content,'to_uid':uid},function(data){
			if(data.res == 1){
				obj.val('');
				var str = '';
				if(data.to_uid != undefined){
					str = "&nbsp;回复&nbsp;<a href='/user/"+data.to_uid+".html' class='fense'>"+data.to_uname+"</a>";
				}
				var html = "<div class='cMessageList fixed' id='comment_"+data._id+"'>" +
				"<div class='cMessAvatar fl'>" +
					"<a href='#'><img src='/index.php?m=User&a=avatar&uid="+data.uid+"&size=middle' width='30' height='30'></a>" +
				"</div>" +
					"<div class='cMessInfo fl'>" +
					"<p><a href='/user/"+data.uid+".html' class='fense'>"+data.uname+"</a>" +str+
					"："+data.content+"</p>" +
					"<div class='cMessMan hui-one'><span>"+data.add_time+"</span>" +
					"<p><a href=\"javascript:comment_del('"+data.circle_item_id+"','"+data._id+"')\" class='del'>删除</a><a href=\"javascript:replay('"+data._id+"')\">回复</a></p>" +
					"</div></div>" +
					"<div class='cReplayBox fl' id='replay_"+data._id+"' style='display:none'>" +
					"<input class='InputBox InputReplayBox' placeholder='请输入评论内容' type='text' />" +
					"<a href=\"javascript:comment('"+data.circle_item_id+"','"+data.uid+"','"+data._id+"')\" class='cMsgBtn cMsgBtn01 cMsgBtn02'>评论</a>" +
					"<span><img src='/public/images/handCircle/icon2.gif'></span>" +
					"</div></div>";
					$('#circle_'+circle_item_id).find('.msgMark').after(html);
			}else if(data.res == -1){
				alert('含有敏感词');
			}else if(data.res == -2){
				alert_login();
			}else{
				alert('评论失败');
			}
		},'json');
	}
}
//回复评论
function replay(comment_id){
	$('.cReplayBox').hide();
	$('#replay_'+comment_id).show();
}
//赞操作
function laud(circle_item_id,page){
	var url = '/index.php?m=HandCircle&a=laud';
	$.get(url,{'circle_item_id':circle_item_id},function(data){
		if(data.res == 1){
			if(page == 'index'){
				var obj = $('#laudNum_'+circle_item_id);
				if(data.type == 2){
					$('#zanText_'+circle_item_id).html('赞');
					obj.html(obj.html()-1);
				}else{
					$('#zanText_'+circle_item_id).html('取消赞');
					obj.html(parseInt(obj.html())+1);
				}
			}else{
				var obj = $('#laud_num');
				if(data.type == 2){
					$('#zan_bn').html('赞');
					obj.html(obj.html()-1);
				}else{
					$('#zan_bn').html('已赞');
					obj.html(parseInt(obj.html())+1);
				}
			}
		}else if(data.res == -1){
			alert_login();
		}
	},'json');
}
//收藏操作
function collect(circle_item_id,page){
	var url = '/index.php?m=HandCircle&a=collect';
	$.get(url,{'circle_item_id':circle_item_id},function(data){
		if(data.res == 1){
			if(page == 'index'){
				var obj = $('#collectNum_'+circle_item_id);
				if(data.type == 2){
					$('#collectText_'+circle_item_id).html('收藏');
					obj.html(obj.html()-1);
				}else{
					$('#collectText_'+circle_item_id).html('取消收藏');
					obj.html(parseInt(obj.html())+1);
				}
			}else{
				var obj = $('#collect_num');
				if(data.type == 2){
					$('#collect_bn').html('收藏');
					obj.html(obj.html()-1);
				}else{
					$('#collect_bn').html('已收藏');
					obj.html(parseInt(obj.html())+1);
				}
			}
		}else if(data.res == -1){
			alert_login();
		}
	},'json');
}
function pagex(item_id,event){
		var obj = $('#picBox_'+item_id);
		var offset = obj.offset();
		var relativeX = (event.pageX - offset.left);
		if(relativeX > 239){
			obj.css('cursor',"url('http://img.t.sinajs.cn/t6/style/images/common/pic_next.cur'),auto");
		}else{
			obj.css('cursor',"url('http://img.t.sinajs.cn/t6/style/images/common/pic_prev.cur'),auto");
		}
}
function listGo(item_id,event){
	var obj = $('#picBox_'+item_id);
	var offset = obj.offset();
	var relativeX = (event.pageX - offset.left);
	var index;
	var length = obj.next('.picLitBox').find('.picLitList li').length;
	index = obj.next('.picLitBox').find('.picLitList li a.on').parent().index();
	if(relativeX > 239){
		index++;
		if(index < length){
			showPic(index,item_id);
			if(index >= 4 && length > 7){
				$('.picDetail-'+item_id).find('.picLitList').animate({'left':'-'+((length-7)*63)+'px'});
			}
		}
	}else{
		index--;
		if(index > -1){
			showPic(index,item_id);
			if(index <= 4 && length > 7){
				$('.picDetail-'+item_id).find('.picLitList').animate({'left':'0px'});
			}
		}
	}
}


