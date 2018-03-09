//返回弹出层始终位于浏览器中间的的位置
function top_div_css(className){
	var top = ($(window).height() - $("."+className).height())/2;   
    var left = ($(window).width() - $("."+className).width())/2;   
    var scrollTop = $(document).scrollTop();   
    var scrollLeft = $(document).scrollLeft(); 
	var left_css=left+scrollLeft;
	var top_css=top+scrollTop;
	var css_arr=Array(left_css,top_css);
	return css_arr;
	}
	
//显示页面的背景的遮罩层	
function show_black_bg(className){
	$(className).css({width:$(document).width()+"px",height:$(document).height()+"px"});
	$(className).show();
	}
//倒计时方法
function changeTime(){
			var html = $(".time").html();
			if(html != 1){
					$(".time").html(html-1);
				}else{
					$("#over,.register-success-layer").hide();
					}
			
		}
function alert_login() {
				show_black_bg("#over");
				$('#ret_url').val(window.location.href);
				var css_arr = top_div_css("login-layer");
				$.get('/index.php?a=getToken', '', function(msg) {
					$("#login_token").attr("value", msg);
				})
				//获取编辑头像的编辑器
				$(".login-layer").css({
					"left": css_arr[0],
					"top": css_arr[1]
				}).fadeIn();
				$(".login-close").click(function() {
					$(".login-layer,#over").hide();
				})
			}

			var step = 0

			function title_show() {
				step++
				if(step == 3) {
					step = 1
				}
				if(step == 1) {
					document.title = '【新消息】' + $('#title').val()
				}
				if(step == 2) {
					document.title = '【　　　】' + $('#title').val()
				}
				t = setTimeout("title_show()", 500);
			}

			function check_email(c) {
				if(c == 1) {
					$('#lable_email').html('请输入手工客帐号');
					$('#lable_email').fadeIn();
					return false;
				}
				$('#lable_email').html('');
				var email = $('#username').val();
				if(check_status(email, 'email')) {
					var patten = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
					if(patten.test(email)) {
						$('#lable_email').html('请稍候……');
						$.post('/index.php?m=User&a=check_api', {
							'type': 'email',
							'content': email
						}, function(msg) {
							if(msg.done) {
								if(msg.code == '-6') {
									$('#lable_email').html('<font color="green">√</font>');
									$('#check_email').val(true);
									return false;
								} else {
									$('#lable_email').html('您还未注册，请先注册后登录');
									$('#check_email').val(false);
								}
							} else {
								$('#lable_email').html('网络故障！请稍后重试');
								$('#check_email').val(false);
								return false;
							}
						}, 'json');
						return email;
					} else {
						$.post('/index.php?m=User&a=check_api', {
							'type': 'nickname',
							'content': email
						}, function(msg) {
							if(msg.done) {
								if(msg.code == '-3') {
									$('#lable_email').html('<font color="green">√</font>');
									$('#check_email').val(true);
									return false;
								} else {
									$('#lable_email').html('此用户尚未注册，请先注册后登录');
									$('#check_email').val(true);
								}
							} else {
								$('#lable_email').html('网络故障！请稍后重试');
								$('#check_email').val(false);
								return false;
							}
						}, 'json');
						return false;
					}
				}
			}

			function check_status(model, types) {
				if(model.replace(/\s/g, "") == '') {
					$('#lable_' + types).html('必填');
					$('#lable_' + types).fadeIn();
					$('#check_agree').val(true);
					return false; //必填
				} else {
					return true;
				}
			}

			function check_password(c) {
				if(c == 1) {
					$('#lable_password').html('请输入您的密码');
					$('#lable_password').fadeIn();
					return false;
				}
				$('#lable_password').html('');
				var password = $('#password').val();
				if(password.length < 6 || password.length > 20) {
					$('#lable_password').html('密码在6-20个字符之间');
					$('#check_password').val(false);
					$('#lable_password').fadeIn();
					return false;
				} else {
					$('#check_password').val(true);
					return password;
				}
			}

			function userlogin() {
				var user = $('username').val();
				$.post('/index.php?m=Login&a=login', {
					'username': $('#username').val(),
					'password': $('#password').val()
				}, function(msg) {
					if(msg.done) {
						$('#form1').hide();
						$('#status').html('登录成功，欢迎您' + msg.username);
						window.location.href = msg.ret_url;
					} else {
						$('#status').html('用户名密码不匹配');
					}
				}, 'json')
			}

			function sgk_search() {
				var sgk_word = $("#sgk_word").val();
				if(sgk_word != "") {
					sgk_word = encodeURI(sgk_word);
					if('Index' == 'Fair') {
						location.href = "/index.php?m=Fair&a=search&search=" + sgk_word + "&p=1"
					} else {
						location.href = "/index.php?m=Search&word=" + sgk_word;
					}

				}
			}

			function sgk_search_tab(e) {
				if(e.keyCode == 13)
					sgk_search();
			}
			//获取url中的参数
			function getUrlParam(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
				var r = window.location.search.substr(1).match(reg); //匹配目标参数
				if(r != null) return unescape(r[2]);
				return null; //返回参数值
			}
			$(function() {
				$(".haveLogin .h").hover(function() {
					$(this).find("ul").show();
				}, function() {
					$(this).find("ul").hide();
				})

				$(".ewm").hover(function() {
					$("#erweima").fadeIn(300);
				}, function() {
					$("#erweima").fadeOut(300);
				})

				$("#header_mypm").hover(function() {
					$(this).addClass('on');
				}, function() {
					$(this).removeClass('on');
				})
				$(".header_course").hover(function() {
					$(this).find("ul").show();
					$(this).find(".xiala").css({
						"transform": "rotate(180deg)",
						'transition': '-moz-transform 0.4s ease-in-out 0s'
					});
				}, function() {
					$(this).find("ul").hide();
					$(this).find(".xiala").css({
						"transform": "rotate(0deg)",
						'transition': '-moz-transform 0.4s ease-in-out 0s'
					});
				})
			})
			$('#select_time').hover(function() {
				$(this).children('.select').show();
			}, function() {
				$(this).children('.select').hide();
			});
			var cate_id = '0';

			function pin_url(genre, tag_id, jj) {
				genre = Number(genre);
				var url = "/index.php?m=Category&cate_id=" + cate_id;
				$.each($("input[class=select]"), function(n, m) {
					var vals = "";
					var data = $(this).val();
					var data_arr = data.split(":");
					var key = data_arr[0];
					var val = data_arr[1];
					if(n == genre) {
						if(val == "0") {
							vals = tag_id;
						} else {
							var val_arr = val.split("_");
							var if_yse = 0;
							var new_val = "";
							for(var i = 0; i < val_arr.length; i++) {
								if(val_arr[i] == tag_id) {
									if_yse = 1;
								}
								if(jj == -1) {
									if(val_arr[i] != tag_id) {
										if(new_val == "") {
											new_val = val_arr[i];
										} else {
											new_val += "_" + val_arr[i];
										}
									}
								}
							}
							if(if_yse == 1) {
								if(jj == -1) {
									vals = new_val;
								} else {
									vals = val;
								}
							} else {
								vals = val + "_" + tag_id;
							}
						}
					} else {
						if(val != "0") {
							vals = val;
						}
					}
					if(genre == 6 && n == 6 && jj == 1) {
						vals = tag_id;
					}
					if(genre == 7 && n == 7 && jj == 1) {
						vals = tag_id;
					}
					if(vals != "") {
						url += "&" + key + "=" + vals;
					}
				});
				return url;
			}

			function selected(genre) {
				genre = Number(genre);
				var data = $("input[class=select]").eq(genre).val();
				if(data != null) {
					var data_arr = data.split(":");
					var key = data_arr[0];
					var val = data_arr[1];
					var $val = new Array();
					if(val != "0") {
						var val_arr = val.split("_");
						for(var i = 0; i < val_arr.length; i++) {
							var obj = $("a[only=" + val_arr[i] + "_" + genre + "]");
							obj.parent().addClass("on");
							obj.next().show();
						}
						$(".more-li").eq(genre).find("i").addClass("icon-jian");
						$(".more-cate-item").eq(genre).show();
					}
				}
			}
			//选择分类时，出现边框和关闭的效果
			$.each($(".more-cate-list li a"), function(n, m) {
				selected($(this).attr("genre"));
				$(this).click(function() {
					var val = $(this).attr("val");
					var genre = $(this).attr("genre");
					location.href = pin_url(genre, val, 1);
					return false;
				});
			});
			$(function() {
				//点击关闭的效果
				$(".more-cate-list li i").click(function() {
					var val = $(this).attr("val");
					var genre = $(this).attr("genre");
					location.href = pin_url(genre, val, -1);
				});
				//点击选项，显示相应的内容
				$(".more-li").click(function() {
					var index = $(this).index();
					var obj = $(".more-cate-item").eq(index - 1);
					var display = obj.css("display");
					if(display == "none") {
						obj.show();
						$(this).find("i").addClass("icon-jian");
					} else {
						obj.hide();
						$(this).find("i").removeClass("icon-jian");
					}
				});
			})