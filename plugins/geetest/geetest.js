    var geetestObj = null; // gee对象
    var is_verify = $('#is_verify').val(); // 是否需要验证 1 需要 0 不需要
    var verifyed   = $('#is_verify').val(); // 验证通过 1 未验证 0 已经验证
    var handlerEmbed = function (captchaObj) {
        // 将验证码加到id为captcha的元素里，同时会有三个input的值：geetest_challenge, geetest_validate, geetest_seccode
        captchaObj.appendTo("#embed-captcha");
        captchaObj.onReady(function () {
            $(".gee_wait").removeClass('show').addClass("hidden");
        });
        captchaObj.onSuccess(function(){
            geetestObj = captchaObj;
            verifyed = 0;
            $(".gee_notice").removeClass('show').addClass("hidden");
        })
    };
    if(is_verify){
        $.ajax({
            // 获取id，challenge，success（是否启用failback）
            url: "/index.php?m=Geetest&a=startCaptcha&type=pc&t=" + (new Date()).getTime(), // 加随机数防止缓存
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {
                // 参数1：配置参数
                // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    product: "float", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                    offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                }, handlerEmbed);
            }
        });
    }else{
        $(".gee_wait").removeClass('show').addClass("hidden");
    }