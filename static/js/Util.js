(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory(require('jquery'));
  } else {
    // 浏览器全局变量(root 即 window)
    root.Util = factory(root.jQuery);
  }
}(this, function($) {

  var Util = {};
  Util.demo = false;
  Util.formatDate = function(dateStr, splitType) {
    if (!dateStr) return '';
    splitType = splitType || '-';
    var date = new Date(dateStr);
    var arr = [];
    arr.push(date.getFullYear());
    arr.push(date.getMonth() + 1);
    arr.push(date.getDate());
    return arr.join(splitType);
  }

  // 页面js错误
  window.onerror = function(msg, url, line) {
    try {
      throw new Error('[msg:' + msg + ',url:' + url + ',line:' + line + ']');
    } catch (error) {
      console.log('页面JS错误\n' + error.stack);
    }
    return false;
  };

  Util._param = {};
  Util.cvt = function(num) {
    var ch = '';
    switch (num) {
      case 0:
        ch = '零';
        break;
      case 1:
        ch = '一';
        break;
      case 2:
        ch = '二';
        break;
      case 3:
        ch = '三';
        break;
      case 4:
        ch = '四';
        break;
      case 5:
        ch = '五';
        break;
      case 6:
        ch = '六';
        break;
      case 7:
        ch = '七';
        break;
      case 8:
        ch = '八';
        break;
      case 9:
        ch = '九';
        break;
      default:
        ch = '零';
        break;
    }
    return ch;
  };
  Util.data = function(name, data, ctx) {
    ctx = ctx || Util._param;
    if (data) {
      ctx[name] = data;
    }
    return ctx[name];
  }

  Util.defaultValue = function() {
    return '无';
  }

  Util.value = function(value) {
    return value || '无';
  };

  // ajax 设置
  Util.ajaxSettings = {
    type: 'POST'
    //contentType: 'application/json; charset=utf-8',
    //dataType: 'json'
  };

  Util.param = function(uri) {
    uri = uri || '';
    var paramStr = uri.substring(uri.indexOf('?') + 1);
    var paramArr = paramStr.split('&');
    var paramObj = {};
    var temp = [];
    paramArr.forEach(function(item) {
      temp = item.split('=');
      paramObj[temp[0]] = temp[1];
    });
    return paramObj;
  }
  // ajax请求2次封装
  Util.fetch = function(settings) {
    var opts = $.extend({}, Util.ajaxSettings, settings, {
      success: function() {},
      error: function() {}
    });
    var deferred = {};
    if (opts.url.indexOf("?") > 0) {
      opts.url += ('&ver=' + +new Date());
    } else {
      opts.url += ('?ver=' + +new Date());
    }
    console.log('===============请求接口开始===============\n');
    console.log('请求接口：' + opts.url + '\n');
    console.log('参数：' + opts.data + '\n');
    $(document.body).mLoading({mask: false});//显示loading组件
    if (Util.demo) {
      // 用本地数据
      deferred = $.Deferred();
      $.ajax({
        url: opts.demoUrl || '',
        dataType: 'json',
        success: function(result) {
          deferred.resolve(result);
        },
        error: function(xhr, errorType, error) {
          if (errorType === 'parsererror') {
            deferred.reject(JSON.stringify('json解析失败！'));
          }
          deferred.reject(JSON.stringify(error.stack));
        }
      });
    } else {
      deferred = $.ajax(opts);
    }

    deferred.done(function(data) {
      console.log('响应数据：' + JSON.stringify(data) + '\n');
      console.log('===============请求接口结束===============\n');
      $(document.body).mLoading("hide");//隐藏loading组件
    }).done(settings.success).fail(function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('响应失败：' + textStatus + ', ' + errorThrown + '\n');
      console.log('===============请求接口结束===============\n');
      $(document.body).mLoading("hide");//隐藏loading组件
    }).fail(settings.error);

    return deferred;
  };

  Util.getHtml = function(uri) {
    return common.fetch({
      url: uri,
      dataType: "html",
      type: 'get',
      success: function (data) {
//        console.log(data)
      },
      error: function (error) {
        console.log("获取页面失败", uri);
      }
    });
  };

  Util.checkPwd = function(strPwd){
        //全部重复
      var str_len = strPwd.length;
      var _reg = new RegExp('([0-9a-zA-Z])\\1{'+(str_len-1)+'}','g');
      var flag = true;
      if(!_reg.test(strPwd)){
        //是否为连续数字或连续字母
          var strPwdLen = strPwd.length;
          for(var i = 0;i < strPwdLen; i++){
              if(i){
                  var charCodeCurrent = strPwd[i].charCodeAt(0),charCodePrev = strPwd[i-1].charCodeAt(0);
                  console.log(Math.abs(charCodeCurrent - charCodePrev));
                  if(Math.abs(charCodeCurrent - charCodePrev) === 1){
                      flag = flag & true;
                  }else{
                      flag = flag & false;
                  }
              }else{
                  continue;
              }
          }
      }
      return flag;
  };

  return Util;

}));
