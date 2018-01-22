define([
  "jquery",
  "lodash",
  "bootstrap"
], function ($, _, Bootstrap) {


  var htmlStr = [];
  htmlStr.push('<div class="modal fade modal-alert" tabindex="-1" role="dialog">');
  htmlStr.push('  <div class="modal-dialog" role="document">');
  htmlStr.push('    <div class="modal-content">');
  htmlStr.push('      <div class="modal-header">');
  htmlStr.push('        <h4 class="modal-title"><%= title%></h4>');
  htmlStr.push('      </div>');
  htmlStr.push('      <div class="modal-body">');

  htmlStr.push('        <div class=""><%= content%></div>');


  htmlStr.push('      </div>');
  htmlStr.push('      <div class="modal-footer">');


/*  htmlStr.push('        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
  htmlStr.push('        <button type="button" class="btn btn-primary">Save changes</button>');*/

  htmlStr.push('      </div>');
  htmlStr.push('    </div>');
  htmlStr.push('  </div>');
  htmlStr.push('</div>');


  var defaultSettings = {
    title: "操作提示",
    content: "这里放内容",
    buttons: [
      {
        name: "确认",
        callback: function(){},
        clazz: "btn btn-default"
      },
      {
        name: "取消",
        callback: function(){},
        clazz: "btn btn-primary"
      }
    ]
  };

  function Dialog(opts) {
    this.settings = $.extend({}, defaultSettings, opts);
    var template = _.template(htmlStr.join(""));
    this.$el = $(template(this.settings));
    this.initBtns();
    this.$el.on('hidden.bs.modal', function (e) {
      this.$el.remove();
        if (this.settings.callback && _.isFunction(this.settings.callback))
            this.settings.callback.call(this);
    }.bind(this))
    $(document.body).append(this.$el);
  }

  $.extend(Dialog.prototype, {
    show: function(opts){
      opts = opts || {};
      this.$el.modal({
        backdrop: opts.backdrop || true,
        keyboard: false,
        show: true
      });
    },
    hide: function(){
      this.$el.modal('hide')
    },
    initBtns: function(){
      var self = this;
      var temp = {};
      var footer = this.$el.find(".modal-footer");
      _.forEach(this.settings.buttons, function(item, index){
        temp = $("<button type='button'/>")
        temp.addClass(item.clazz || "btn btn-default");
        temp.on("click", item.callback.bind(self) || function(){});
        temp.html(item.name || "button");
        footer.append(temp);
      });
    }
  });
  return Dialog;

});