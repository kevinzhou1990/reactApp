var main = document.querySelector("#js-main");
var ctx = main.getAttribute("data-ctx") || '../';
var ver = main.getAttribute("data-ver");
require.config({
    urlArgs: 'v=' + ver,
    baseUrl: "",
    waitSeconds: 0,
    shim: {
        jquery: {
            exports: "jQuery"
        }
    },
    paths: {
        jquery: ctx + 'static/assets/jquery/jquery-1.9.1.min',
        js: ctx + 'static/js',
        forge: ctx + 'static/assets/forge/forge.min',
        validate:ctx + 'static/js/jquery.validate',
        messages_zh:ctx + 'static/js/messages_zh'
    }
});
require([
    'jquery',
    'js/security',
    'validate',
    'messages_zh'
], function($, security) {

    $("#loginForm").on("submit", function (e) {
    	if($(this).valid()){
	    	$("#username").val($.trim($("#username").val()));
	        var pwd = $("#passwordstr").val();
	        var username = $("#username").val();
	        var converPwd = security.convertedPassword(pwd);
	        var randomCode = security.random();
	
	        /*localStorage.setItem("randomCode", randomCode);
	        localStorage.setItem("username", username);
	        localStorage.setItem("pwd", security.base64.encode(converPwd));*/
	
	        /**
	         * opts{
				 *    randomCode: 32Byte随机密钥
				 *    username: 登录名
				 *    passowrd: 变换后的密码
				 *  }
	         */
	        var rpwd = security.authStr({
	            randomCode: randomCode,
	            username: username,
	            passowrd: converPwd
	        });
	        console.log(rpwd);
	        //$("#password").val(rpwd);
	        //到后端加密
	        $("#password").val(converPwd);
	        $("#passwordstr").val("******");
    	}
    });
    
    $.validator.addMethod("onlyLetterAndDigit",function(value, element, params){
        var regex=new RegExp('^[a-zA-Z0-9]*$');
        return regex.test(value);
    },"用户名只能是字母和数字");
    
    $('#loginForm').validate({
    	onkeyup:true,
    	rules:{
    		username:{required:true,rangelength:[4,20],onlyLetterAndDigit:true},
    		passwordstr:{required:true,minlength:6,maxlength:32}
    	},
    	messages:{
    		username:{required:"用户名不能为空",rangelength:'用户名长度在4到20位之间'},
    		passwordstr:{required:"密码不能为空",minlength:'密码至少6位',maxlength:'密码最长为32位'}
    	},
        errorPlacement:function(error, element) {
        	error.addClass("control-label");
        	$(element).wrap("<div class='has-error'/>")
            error.insertAfter(element);
        }
    });
});