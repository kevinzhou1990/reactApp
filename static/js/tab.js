define([
  "jquery", "js/Util"
], function($, Util) {
  var tab = {},
    $tab = $("#myTabs"),
    $tabContent = $("#myTabContent"),
    $minTabMenuLi = $("#js-tab-menu"),
    $minTabMenu = $("#js-min-tab-menu");
  var arr = []; // 待办列表
  var taskList = {};
  (function() {
    var list = [];
    var state = 0;

    taskList.add = function(task) {
      list.push(task);
      if (state === 0) {
        taskList.run();
      }
    };

    taskList.resolve = function() {
      state = 0;
      taskList.run();
    };

    taskList.run = function() {
      if (list.length > 0) {
        var currentTask = list.shift();
        state = 1;
        currentTask();
      }
    };

  })();

  // tab事件初始化
  $tab.on('show.bs.tab', 'a[data-toggle="tab"]', function(e) {
    // 选中项 移除隐藏
    var id = $(e.currentTarget).attr("aria-controls");
    $tab.find("#tab-li-" + id).removeClass("hide");
  }).on('show.bs.tab', 'a[data-toggle="tab"]', function(e) {
    // 当标签页数量大于5的时候， 显示迷你标签页菜单
    // 把第一个显示的标签页隐藏

    var $lst = $tab.find("> li[role='presentation']");
    if ($lst.size() > 5) {
      $minTabMenuLi.removeClass("hide");
    } else {
      $minTabMenuLi.addClass("hide");
    }

    var visibleLst = $lst.filter(":visible"),
      visibleLstLen = visibleLst.length;

    if (visibleLstLen > 5) {
      var id = $(e.currentTarget).attr("aria-controls");
      if (visibleLst.eq(0).attr("id") === ("tab-li-" + id)) {
        visibleLst.eq(1).addClass("hide");
      } else {
        visibleLst.eq(0).addClass("hide");
      }

    } else {
      var hiddenLst = $lst.filter(":hidden");
      for (var i = 0; i < 5 - visibleLstLen; i++) {
        hiddenLst.eq(i).removeClass("hide");
      }
    }
  }).on('shown.bs.tab', 'a[data-toggle="tab"]', function(e) {
    // 选中项 标签列表标记选中状态
    var id = $(e.currentTarget).attr("aria-controls");
    $minTabMenu.find(">li").removeClass("active");
    $minTabMenu.find("#js-mini-tab-item-" + id).addClass("active");
    $tab.trigger("shown." + id); // 触发显示标签后的回调函数
    // 解决多个页面重复问题
    taskList.resolve();
  });

  // 关闭tab事件
  $tab.on("click", ".js-tab-close", function(e) {
    var id = $(this).parent().attr("aria-controls");
    tab.close(id);
    //    $minTabMenu.find("#js-mini-tab-item-" + id).remove();
    e.stopPropagation();
  });
  // 迷你标签列表
  $minTabMenu.on("click", "> li > a", function(e) {
    // 点击显示相应标签
    var target = $(this).data("target");
    $tab.find("#tab-a-" + target).tab('show');
    //e.stopPropagation();
  }).on("click", ".js-icon-close", function(e) {
    // 关闭标签
    var id = $(this).parent().data("target");
    tab.close(id);
    //    $minTabMenu.find("#js-mini-tab-item-" + id).remove();
    e.stopPropagation();
  });

  tab = {
    add: function(opts) {
      //id, data, html, callback
      var id = opts.id,
        data = opts.data,
        url = opts.url,
        callback = opts.callback,
        fresh = opts.fresh;
      if (!id)
        return false;
      var origan_id = id;
      id = id.replace(/__/g, "");
      id = "__" + id + "__"; // 避免[id]命名重复
      $tab.one("shown." + id, callback);
      var currentTab = $tab.find("#tab-a-" + id);
      if (currentTab.size() === 1) {
        if (fresh) {
          var module_id = $tabContent.find("#" + origan_id).children().first().data('moduleid');
          if (module_id) {
            var __module_id = window.appEnv[module_id];
            delete window['installedModules'][__module_id];
          }
          Util.getHtml(url).done(function(html) {
            $('#' + id).html('<div id="' + origan_id + '">' + html + '<div/>');
            // currentTab.tab("show");
            // arr.push(currentTab);
            if (currentTab.parent().hasClass("active"))
              return false;
            taskList.add(function() {
              currentTab.tab("show");
            });

          }).fail(function() {});
        } else {
          // currentTab.tab("show");
          // arr.push(currentTab);
          if (currentTab.parent().hasClass("active"))
            return false;
          taskList.add(function() {
            currentTab.tab("show");
          });
        }

        return true;
      }

      var tabs = [
        '<li role="presentation" id="tab-li-' + id + '">',
        '<a href="#' + id + '" role="tab" id="tab-a-' + id + '" data-toggle="tab" aria-controls=' + id + ' aria-expanded="true">',
        '<span class="nav-tabs-txt" title="' + data.name + '">' + data.name + '</span><i class="tab-i-close js-tab-close"><i title="关闭" data-id="' + id + '" class="nav-tabs-btn icon-close "></i></i>',
        '</a>',
        '</li>'
      ];
      $tab.find("#js-tab-menu").before(tabs.join(""));
      $minTabMenu.append("<li id='js-mini-tab-item-" + id + "'><a data-target='" + id + "'><span>" + data.name + "</span><i class='icon icon-close js-icon-close'></i></a></li>");
      $(document.body).mLoading("show"); //显示loading组件
      Util.getHtml(url).done(function(html) {
        var contents = [
          '<div role="tabpanel __js-tab-content__" class="tab-pane fade" id=' + id + ' aria-labelledby="' + id + '-tab">',
          '<div id="' + origan_id + '">',
          html,
          '<div/>',
          '</div>'
        ];
        $tabContent.append(contents.join(""));

        taskList.add(function() {
          $tab.find("#tab-a-" + id).tab('show');
        });
        $(document.body).mLoading("hide"); //隐藏loading组件
        // arr.push($tab.find("#tab-a-" + id));
        // $tab.find("#tab-a-" + id).tab('show');
      }).fail(function() {
        common.alert("当前网络不可用，请检查你的网络设置");
        $(document.body).mLoading("hide"); //隐藏loading组件
      });

      return true;
    },
    create: function(id, data, html, callback) {
      var origan_id = id;
      id = id.replace(/__/g, "");
      id = "__" + id + "__"; // 避免[id]命名重复
      var contents = [
        '<div role="tabpanel __js-tab-content__" class="tab-pane fade" id=' + id + ' aria-labelledby="' + id + '-tab">',
        '<div id="' + origan_id + '">',
        html,
        '<div/>',
        '</div>'
      ];
      $tab.one("shown." + id, callback);
      var currentTab = $tab.find("#tab-a-" + id);
      if (currentTab.size() === 1) {
        //更新数据

        $('#' + id).html('<div id="' + origan_id + '">' + html + '<div/>');
        currentTab.tab("show");
        return;
      }
      var tabs = [
        '<li role="presentation" id="tab-li-' + id + '">',
        '<a href="#' + id + '" role="tab" id="tab-a-' + id + '" data-toggle="tab" aria-controls=' + id + ' aria-expanded="true">',
        '<span class="nav-tabs-txt" title="' + data.name + '">' + data.name + '</span><i class="tab-i-close js-tab-close"><i title="关闭" data-id="' + id + '" class="nav-tabs-btn icon-close "></i></i>',
        '</a>',
        '</li>'
      ];
      $tab.find("#js-tab-menu").before(tabs.join(""));
      $tabContent.append(contents.join(""));
      $minTabMenu.append("<li id='js-mini-tab-item-" + id + "'><a data-target='" + id + "'><span>" + data.name + "</span><i class='icon icon-close js-icon-close'></i></a></li>");
      $tab.find("#tab-a-" + id).tab('show');
    },
    close: function(id, callback, defaultOpen) {
      var orgin_id = id = id.replace(/__/g, "");
      id = "__" + id + "__"; // 避免[id]命名重复
      // 删除指定tab，如果被删除的tab的前一个tab存在，显示它；如果不存在，显示被删除tab的后一个tab；
      if (defaultOpen !== false && defaultOpen !== true) {
        defaultOpen = true;
      }
      var closeTabitem = $tab.find("#tab-li-" + id),
        tabItem = closeTabitem.next("[role='presentation']");
      if (!tabItem.size()) {
        tabItem = closeTabitem.prev("[role='presentation']");
      }
      var tabItem_a = tabItem.find("> a");
      closeTabitem.remove();

      var module_id = $tabContent.find("#" + orgin_id).children().first().data('moduleid');
      if (module_id) {
        var __module_id = window.appEnv[module_id];
        delete window['installedModules'][__module_id];
        // delete window['installedModules'][module_id];
      }
      $tabContent.find("#" + id).remove();
      $minTabMenu.find("#js-mini-tab-item-" + id).remove();
      if (defaultOpen) {
        if (tabItem.hasClass("active")) {
          tabItem_a.trigger("show.bs.tab").trigger("shown.bs.tab"); //  触发回调函数 更新tab状态
        } else {
          tabItem_a.tab("show");
        }
      } else {
        $tab.find("li.active > a").trigger("show.bs.tab").trigger("shown.bs.tab"); //  触发回调函数 更新tab状态
      }
      $.isFunction(callback) && callback.call(this, true);
    }
  };

  return tab;

});
