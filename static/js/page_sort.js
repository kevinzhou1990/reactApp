/**
 * Created by Administrator on 2017/5/20.
 * @instance 排序函数，提供向上移动，向下移动，添加的功能
 * @del  删除当前行
 */
define(['jquery'],function($){
    'use strict';
    var page_sort = {};
    page_sort.instances = function($ele,type){
        /*
        * @ $ele 参数，当前点击的图标
        * @ type 参数，使用类型，为table，form，默认是form
        * */
        var _this = this;
        if($ele.hasClass('icon-up') || $ele.hasClass('icon-down')){
            return up_down($ele,type);
        }else if($ele.hasClass('icon-add')){
            add($ele);
        }
    };
    page_sort.del = function(ele){
        /*
        * @ ele 参数，当前点击的图标
        * */
        // fun(ele);
        var tar_obj = $(ele).parents('.sort_wrap');
        if(tar_obj.index() === 0){
            tar_obj.next().find('.icon-up').remove();
        }
        if(tar_obj.parent().find('.sort_wrap').length === (tar_obj.index()-0+1)){
            tar_obj.prev().append('<i class="icon icon-add"></i>');
            tar_obj.prev().find('.icon-down').remove();
        }
        if(tar_obj.parent().find('.sort_wrap').length === 1){
            tar_obj.find('input').val('');
            tar_obj.find('input[name=ids]').val('0');
        }else{
            tar_obj.remove();
        }
    };
    function up_down (ele,type){
        var target_obj = ele.parents('.sort_wrap'),
            _obj = target_obj.clone(true),
            pre_obj = $(target_obj).prev(),
            next_obj = $(target_obj).next(),
            next_index = $(next_obj).index(),
            index = $(target_obj).index(),
            pre_index = pre_obj.index(),
            alen = target_obj.parent().find('.sort_wrap').length,
            sort_id = [];
        if(ele.hasClass('icon-up')){
            if(pre_index === 0){
                $('<i class="icon icon-up"></i>').insertBefore(pre_obj.find('.icon-down'));
                _obj.find('.icon-up').remove();
            }
            if((index-0+1) === alen){
                _obj.find('.icon-add').remove();
                pre_obj.find('.icon-down').remove();
                type === 'form' ? $('<i class="icon icon-add"></i>').insertAfter(pre_obj.find('.icon-del')) : '';
                $('<i class="icon icon-down"></i>').insertBefore(_obj.find('.icon-del'));
            }
            $(_obj).insertBefore(pre_obj);
            target_obj.remove();
            sort_id.push($(_obj).attr('data-sortid'),$(_obj).next().attr('data-sortid'));
        }else{
            if((next_index - 0 + 1) === alen){
                next_obj.find('.icon-add').remove();
                $('<i class="icon icon-down"></i>').insertAfter(next_obj.find('.icon-up'));
                _obj.find('.icon-down').remove();
                type === 'form' ? _obj.append('<i class="icon icon-add"></i>') : '';
            }
            if(index === 0){
                $('<i class="icon icon-up"></i>').insertBefore(_obj.find('.icon-del'));
                next_obj.find('.icon-up').remove();
            }
            $(_obj).insertAfter(next_obj);
            target_obj.remove();
            sort_id.push($(_obj).attr('data-sortid'),$(_obj).prev().attr('data-sortid'));
        }
        return sort_id;
    }
    function add(ele){
        var len = ele.parents('.sort_wrap').parent().find('.sort_wrap').length,
        tar_obj = '<div class="form-inline sort_wrap" data-optype="update">'+
            '<input type="text" class="form-control" name="name"><input type="hidden" name="ids" value="0"><i class="icon icon-up"></i><i class="icon icon-del"></i><i class="icon icon-add"></i>'
            +'</div>';
        $(tar_obj).insertAfter(ele.parents('.sort_wrap'));
        $('<i class="icon icon-down"></i>').insertAfter(ele.parents('.sort_wrap').find('.icon-up'));
        ele.parents('.sort_wrap').find('.icon-add').remove();
    }
    return page_sort;
});