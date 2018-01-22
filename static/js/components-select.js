define([
    'jquery'
],function($){
    "use strict";
/*
* select 多选，
* setting:带符号jQuery选择器
* setting.remainNumber:剩余户数
* */
    function Select(setting, flag){

        var _self = this;
        var $obj = $(setting),
            $lf = $obj.find('.select-left'),
            $right = $obj.find('.select-right'),
            $opt = $obj.find('.select-opt');
        _self.flag = flag || false;
        $.extend(_self,{
            remainObj:$obj.find('#select-remain'),
            source:$lf,
            target:$right,
            opt:$opt,
            remainNumber:0
        });
        _self.remainObj.size() &&  _self.remain();
        _self.bindEvent();
        _self.target.attr('data-selected',_self.getSelectValue().join(','));

    }
    $.extend(Select.prototype,{
        bindEvent:function(){
            this.opt.find('.add').on('click',function(){
                if(this.source.find('option:selected').length){
                	var selectValue = this.getSelectValue();
                    if(this.remainObj.length){
                        if(this.remainNumber > 0){
                            //if(this.flag){
                              var _selected = this.source.find('option:selected');
                              _selected.each(function(index, item){
                                var value = item.value;
                                if(selectValue.indexOf(value) < 0){
                                  this.target.append("<option value='"+ value +"'>"+ item.text +"</option>");
                                }
                              }.bind(this));
                           /* }else{
                              this.target.append(this.source.find('option:selected'));
                            }*/

                            this.remain('add');
                        }
                    }else{
                    	var _selected = this.source.find('option:selected');
                        _selected.each(function(index, item){
                          var value = item.value;
                          if(selectValue.indexOf(value) < 0){
                            this.target.append("<option value='"+ value +"'>"+ item.text +"</option>");
                          }
                        }.bind(this));
//                        this.target.append(this.source.find('option:selected'));
                    }
                }
                var str_var = this.getSelectValue().join(',');
                this.target.attr('data-selected',str_var);
            }.bind(this));
            this.opt.find('.del').on('click',function(){
                if(this.remainObj.length){
                    if(this.remainNumber < 200){
                        /*this.source.append(*/this.target.find('option:selected').remove()/*)*/;
                        this.remain('del');
                    }
                }else{
                    /*this.source.append(*/this.target.find('option:selected').remove()/*)*/;
                }
                var str_var = this.getSelectValue().join(',');
                this.target.attr('data-selected',str_var);
            }.bind(this));
        },
        //计算剩余户数
        remain:function(tag){
            var op = tag ? tag : 'add';
            var targetNumber = this.target.get(0).options.length;
            op == 'add' ? this.remainNumber = 200 - targetNumber : this.remainNumber = 200 - parseInt(targetNumber);
            this.remainObj.text('还剩余'+this.remainNumber+'户');
        },
        getSelectValue:function(){
            var arrValue = [];
            var chosed = this.target.get(0).options;
            $.each(chosed,function (index,el) {
                arrValue.push($(el).val());
            })
            return arrValue;
        }
    });
    return Select;
});