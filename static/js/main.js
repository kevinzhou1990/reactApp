var main = document.querySelector("#js-main");
var ctx = main.getAttribute("data-ctx") || '../';
var init = main.getAttribute("data-init");
var initId = main.getAttribute("data-initId");
var flagPwd = main.getAttribute("data-flagPwd");
var pwd = flagPwd === 'true'
  ? true
  : false;
var prj = main.getAttribute("data-prj");
var ver = main.getAttribute("data-ver");
var loginusername = main.getAttribute("data-username");

window.__evn__ = 'dist'; //dev开发环境，dist生产环境
// 线上 测试环境 demo数据改为false
if (location.href.indexOf('newcaresz.com') > 0 || location.href.indexOf('192.168.1.232') > 0) {
  window.__evn__ = 'dist';
}
require.config({
  urlArgs: 'v=' + ver,
  baseUrl: "",
  waitSeconds: 0,
  shim: {
    jquery: {
      exports: "jQuery",
      deps: ['text']
    },
    validate: {
      deps: ['jquery']
    },
    bootstrap: {
      deps: ['jquery'],
      exports: "bootstrap"
    },
    datetimepicker: {
      deps: ['bootstrap'],
      exports: 'datetimepicker'
    },
    "local.datetimepicker": {
      deps: ['datetimepicker']
    },
    KindEditor: {
      exports: 'KindEditor'
    },
    zh_CN: {
      deps: ['KindEditor'],
      exports: 'zh_CN'
    },
    upload: {
      deps: ['jquery']
    },
    ztree: {
      deps: ['jquery']
    },
    autocompleter: {
      deps: ['jquery']
    },
    vendor: {
      deps: ['runtime', 'js/common']
    },
    appEnv: {
      exports: 'appEnv'
    }
  },
  paths: {
    text: ctx + 'static/assets/require/text-2.0.5',
    jquery: ctx + 'static/assets/jquery/jquery-1.9.1.min',
    bootstrap: ctx + 'static/assets/bootstrap/dist/js/bootstrap',
    js: ctx + 'static/js',
    datetimepicker: ctx + 'static/assets/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker',
    zh_CN: ctx + 'static/assets/kinditor/kindeditor-4.1.7/lang/zh_CN',
    KindEditor: ctx + 'static/assets/kinditor/kindeditor-4.1.7/kindeditor-all-min',
    "local.datetimepicker": ctx + 'static/assets/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN',
    "lodash": ctx + "static/assets/lodash/lodash.min",
    upload: ctx + 'static/js/ajaxupload.3.6',
    validate: ctx + 'static/js/jquery.validate',
    autocompleter: ctx + 'static/js/jquery.autocompleter.min',
    message_zh: ctx + 'static/js/messages_zh',
    forge: ctx + 'static/assets/forge/forge.min',
    zTree: ctx + 'static/assets/zTree/js/jquery.ztree.all.min',
    viewer: ctx + 'static/assets/viewerjs/viewer.min',
    "encoding-indexes": ctx + 'static/js/printForm/encoding-indexes',
    encoding: ctx + 'static/js/printForm/encoding',
    loading: ctx + 'static/assets/jquery.mloading-master/src/jquery.mloading',
    runtime: ctx + 'app/' + window.__evn__ + '/runtime',
    vendor: ctx + 'app/' + window.__evn__ + '/vendor',
    appEnv: ctx + 'app/' + window.__evn__ + '/manifest.json'
  }
});

require([
  "jquery",
  "js/common",
  "js/menu",
  "js/dialog",
  'js/security',
  'text!appEnv',
  'js/backspace',
  'validate',
  'autocompleter',
  'message_zh',
  "datetimepicker",
  "local.datetimepicker",
  'loading',
  'runtime',
  'vendor'
], function($, common, menu, Dialog, security, appEnv, backspace) {

  //实现对字符码的截获，keypress中屏蔽了这些功能按键
  document.onkeypress = backspace;
  //对功能按键的获取
  document.onkeydown = backspace;
  window.appEnv = JSON.parse(appEnv);
  localStorage.setItem('__user__', $('#__user__').val());
  localStorage.setItem('__transportKey__', $('#__transportKey__').val());
  localStorage.setItem('__username__', $('#__username__').val());
  $.validator.addMethod('checkPwd', function(value, element) {
    var flag = common.Util.checkPwd(value);
    return flag
      ? false
      : true;
  }, '您的密码不能是接连的数字或字母,且不能是相同的数字或字母，请重新设置');

  // 重写validate的require方法
  $.validator.methods.required = function(value, element, param) {

    // Check if dependency is met
    if (!this.depend(param, element)) {
      return "dependency-mismatch";
    }
    if (element.nodeName.toLowerCase() === "select") {

      // Could be an array for select-multiple or a string, both are fine this way
      var val = $(element).val();
      return val && val.length > 0;
    }
    if (this.checkable(element)) {
      return this.getLength(value, element) > 0;
    }
    return value.trim().length > 0;
  };

  window.common = common;
  if (pwd) {
    setTimeout(function() {
      //			  $("#js-update-pwd").click();
    }, 100);
  }

  if (!pwd && init) {
    common.alert("请初始化卫生服务站。", function() {
      common.createTab({
        uri: prj + '/serviceStation/update/' + initId,
        data: {
          name: '修改社区卫生站'
        },
        key: 'newServiceStation'
      });
    });
  }
  $(document).ready(function() {
    common.tree('#js-menu');
  });

  function logout() {
    window.location.href = ctx + "logout";
  }
  //打开消息中心
  $('a#js-msgCenter').on('click', function() {
    common.createTab({
      uri: prj + '/msgCenter',
      data: {
        name: '通知中心'
      },
      key: 'msgCenter'
    });
    $(this).find('.msgCount').text('');
  });

  common.getHtml(ctx + "changePwd").done(function(htmlStr) {
    $("#js-update-pwd").on("click", function() {

      var dialog = new Dialog({
        content: htmlStr,
        title: '修改密码',
        buttons: [
          {
            name: "确认",
            callback: function() {

              //$self.find("#js-submit").on('click',function(e){
              if ($self.valid()) {
                common.fetch({
                  url: ctx + 'changePwd',
                  type: 'POST',
                  data: $self.serialize(),
                  dataType: "json",
                  success: function(data) {
                    if (data.ret_code == 1) {
                      common.alert(data.ret_msg, logout);
                    } else {
                      common.alert(data.ret_msg);
                    }
                  }
                });
              }
              //});

            },
            clazz: "btn btn-primary"
          }, {
            name: "取消",
            callback: function() {
              if (!pwd) {
                this.hide();
              }
            },
            clazz: "btn btn-default"
          }
        ]
      });
      dialog.show({
        backdrop: pwd
          ? 'static'
          : ''
      });
      // 修改密码
      var $self = $("#changePwd-form");
      $self.find("#oldPasswordstr").on('keyup', function() {
        var converPwd = security.convertedPassword($(this).val());
        var randomCode = security.random();
        var rpwd = security.authStr({randomCode: randomCode, username: loginusername, passowrd: converPwd});

        $self.find("#oldPassword").val(rpwd);
      });

      $self.find("#passwordstr").on('keyup', function() {
        // common.Util.checkPwd($(this).val());
        $self.find("#password").val(security.transferPassword($(this).val()));
      });
      $self.validate({
        rules: {
          oldPasswordstr: {
            required: true
          },
          passwordstr: {
            required: true,
            minlength: 8,
            checkPwd: true
          },
          chkpassword: {
            required: true,
            equalTo: "#passwordstr"
          }
        },
        messages: {
          chkpassword: {
            equalTo: "两次输入的密码不相同"
          },
          passwordstr: {
            required: "密码不能为空",
            minlength: "密码不能少于八位字符"
          }
        },
        errorPlacement: function(error, element) {
          error.addClass("control-label");
          $(element).wrap("<div class='has-error'/>");
          error.insertAfter(element);
        }

      });
    });
  });

  // 全局超时跳转
  $.ajaxSetup({
    contentType: "application/x-www-form-urlencoded;charset=utf-8",
    complete: function(XMLHttpRequest, textStatus) {
      //通过XMLHttpRequest取得响应头，sessionstatus，
      var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");
      if (sessionstatus == "timeout") {
        //如果超时就处理 ，指定要跳转的页面
        alert("登录超时，请重新登录后操作。");
        window.location.href = "/login";
      }
    }
  });

  common.getHtml(ctx + "firstChangePwd").done(function(htmlStr) {

    if (pwd) {

      var dialog1 = new Dialog({
        content: htmlStr,
        title: '修改密码',
        buttons: [
          {
            name: "确认",
            callback: function() {
              if ($self.valid()) {
                common.fetch({
                  url: ctx + 'firstChangePwd',
                  type: 'POST',
                  data: $self.serialize(),
                  dataType: "json",
                  success: function(data) {
                    if (data.ret_code == 1) {
                      common.alert(data.ret_msg, logout);
                    } else {
                      common.alert(data.ret_msg);
                    }
                  }
                });
              }
            },
            clazz: "btn btn-primary"
          }
        ]
      });
      dialog1.show({
        backdrop: pwd
          ? 'static'
          : ''
      });
      // 修改密码
      var $self = $("#firstChangePwd-form");

      $self.find("#passwordstr").on('keyup', function() {
        $self.find("#password").val(security.transferPassword($(this).val()));
      });
      $self.validate({
        rules: {
          passwordstr: {
            required: true,
            minlength: 8,
            checkPwd: true
          },
          chkpassword: {
            required: true,
            equalTo: "#passwordstr"
          }
        },
        messages: {
          chkpassword: {
            equalTo: "两次输入的密码不相同"
          },
          passwordstr: {
            required: "密码不能为空",
            minlength: "密码不能少于八位字符"
          }
        },
        errorPlacement: function(error, element) {
          error.addClass("control-label");
          $(element).wrap("<div class='has-error'/>");
          error.insertAfter(element);
        }

      });
    }

  });

});
