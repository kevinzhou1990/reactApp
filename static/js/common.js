define([
  "jquery", "js/tab", "js/Util", "js/dialog", "bootstrap"
], function($, tab, Util, Dialog) {
  "use strict";
  var common = {};
  common.tab = tab;
  common.fetch = Util.fetch;
  common.Util = Util;
  common.dialog = '';

  $(document.body).on("keydown", function(e) {
    if (e.keyCode === 13 && e.target.nodeName.toLocaleLowerCase() != 'textarea') {
      e.preventDefault()
      e.stopPropagation();
    }
  });

  /*
   * 确认弹窗
   * opts: {
   *    content： 内容
   *    success： 确认回调
   * }
   * */
  common.confirm = function(opts) {
    opts = opts || {};
    var dialog = new Dialog({
      content: opts.content || "",
      buttons: [
        {
          name: "确认",
          callback: opts.success || function() {},
          clazz: "btn btn-primary"
        }, {
          name: "取消",
          callback: function() {
            this.hide();
          },
          clazz: "btn btn-default"
        }
      ]
    });
    dialog.show();
  }

  /*
   * 确认弹窗
   * content 内容
   * */
  common.alert = function(content, callback, opts) {
    content = content || "";
    opts = opts || {};
    var dialog = new Dialog({
      content: content,
      callback: callback,
      buttons: [
        {
          name: "确认",
          callback: function() {
            this.hide();
          },
          clazz: "btn btn-default"
        }
      ]
    });
    dialog.show(opts);
  };

  common.markModal = function(content, callback, tag) {
    content = content || "";
    tag = tag || '';
    if (!common.dialog) {
      common.dialog = new Dialog({content: content, callback: callback, buttons: []});
    }
    if (tag) {
      common.dialog.show({backdrop: 'static'})
    } else {
      common.dialog.hide();
      common.dialog = '';
    }
  };

  // 创建tab
  /**
   * @param
   *  opts: {
   *    uri: 页面地址
   *    key: tab唯一标示
   *    data: {
   *      name: tab名字
   *    }
   *  }
   *
   *  example:
   var opts = {
        uri: 'seminarList',
        data: {name: '新增研讨会'},
        key: 'seminarList',
        callback: function(){} 回调函数
      }
   common.createTab(opts)
   */
  common.createTab = function(opts) {
    var uri = opts.uri;
    if (window.__evn__ === 'dev') {
      uri = uri && uri.replace(/\/dist\//, '/dev/');
    }
    common.tab.add({
      url: uri,
      id: opts.key,
      data: opts.data,
      fresh: (function() {
        if (typeof opts.fresh === 'undefined') {
          return true;
        }
        return opts.fresh;
      })(),
      callback: opts.callback || function() {
        // console.log(+new Date(), opts.key, opts.data.name, "标签页成功打开")
      }
    });
  };
  //关闭tab页签
  /*
   * ID: 编号
   * callback： 回调函数
   * defaultOpen： 是否打开新的标签（false：不打开； true：打开）; 默认打开；
   * */
  common.closeTab = function(id, callback, defaultOpen) {
    common.tab.close(id, callback, defaultOpen);
  };

  // 菜单
  common.tree = function(menu) {

    var animationSpeed = 500;
    $(document).on('click', menu + ' li a', function(e) {
      //Get the clicked link and the next element
      var $this = $(this);
      var data = $this.data();
      var parent = $this.parent();
      var checkElement = $this.next();
      var id = data.key && data.key.replace(/__/g, "");
      id = "__" + id + "__"; // 避免[id]命名重复
      var currentTab = $("#myTabs #tab-a-" + id);

      //Check if the next element is a menu and is visible
      if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
        //Close the menu
        checkElement.slideUp(animationSpeed, function() {
          parent.removeClass('menu-open');
        } //If the menu is not visible
        );
      } else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
        //Open the target menu and add the menu-open class
        checkElement.slideDown(animationSpeed);
        parent.addClass('menu-open');
      }

      $(menu + " li").removeClass("active");
      $this.parentsUntil(menu, 'li').addClass("active");
      //if this isn't a link, prevent the page from being redirected
      if (checkElement.is('.treeview-menu')) {
        e.preventDefault();
      }

      common.createTab({
        uri: data.uri,
        key: data.key,
        data: data,
        fresh: (function() {
          if (data && JSON.stringify(data) != '{}' && currentTab.size() == 0)
            return true;
          return false;
        })()
      });
    });
  };

  /**
   * 加载页面
   * @param opts
   *  opts: {
   *     container: '页面容器ID'
   *     url      : '待装入 HTML 网页网址'
   *     data:    : '发送至服务器的 key/value 数据'
   *     callback : '载入成功时回调函数'
   *  }
   */
  common.load = function(opts) {
    var container = opts.container;
    common.fetch({
      url: opts.url,
      data: opts.data,
      type: 'GET',
      dataType: 'html',
      success: function(html) {
        $("#" + container).html(html);
        if (typeof opts.callback === 'function')
          opts.callback();
        }
      ,
      error: function() {
        common.alert("网络错误");
      }
    });
    // $("#" + container).load(opts.url, opts.data, opts.callback);
  };

  common.download = function(opts) {
    var url = opts.url;
    var type = opts.type || "get";
    common.fetch({
      url: url,
      type: type,
      success: function() {
        window.location = url;
      }
    });
  };

  /**
   * 重新加载
   * @param opts
   * opts{
   *  url: '请求地址'
   *  data：'提交数据'
   *  cnt: '页面容器id'
   * }
   * @returns {*}
   */
  common.post = function(opts) {

    var url = opts.url; //'${ctx}/post'
    var data = opts.data; //$("#js-form").serialize();
    var modal = opts.modal;
    var dataType = opts.dataType || "text";

    var promise = $.Deferred();
    common.fetch({
      url: url,
      type: "post",
      data: data,
      dataType: dataType,
      success: function(data) {

        if (data === "success" || data.ret_code == 1) {
          if (modal) {
            modal.off('hidden.bs.modal.submit');
            modal.on('hidden.bs.modal.submit', function(e) {
              promise.resolve(data);
            });
            modal.modal("hide");
          } else {
            promise.resolve(data);
          }
        } else {
          promise.resolve(data);
        }
      },
      error: function(error) {
        promise.reject(error);
      }
    });

    return promise;
  }

  common.getJSONPromise = function(opts) {
    var promise = $.Deferred();
    common.fetch({
      url: opts.url,
      dataType: "JSON",
      type: "get",
      success: function(result) {
        promise.resolve(result);
      },
      error: function(err) {
        promise.resolve([]);
      }
    });
    return promise;
  };

  common.getTimeStr = function() {
    return new Date().getTime();
  };

  common.getHtml = Util.getHtml;

  return common;
});
