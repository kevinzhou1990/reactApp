/**
 * 用于新增体检活动
 * **/
define(['jquery'],function($){
    'use strict';
    var newExamination = {};
    newExamination.add = function(ele){
        var htmlstr = '<div class="form-inline sort_wrap" data-optype="update">'+
            '<input type="text" class="form-control" name="doctor_arr" placeholder="请输入医师姓名">'+
            '<i class="icon icon-del"></i><i class="icon icon-add"></i>'+
            '</div>';
        $(ele).parent().parent().append(htmlstr);
        $(ele).remove();
    };
    newExamination.del = function(ele){
        var divele = $(ele).parent();
        var len = divele.parent().find('.sort_wrap').length;
        if((divele.index()-0+1) === len){
            divele.prev().append('<i class="icon icon-add"></i>');
        }
        if(len === 1){
        	divele.find('input').val('');
        }else{
        	divele.remove();
        }
    };
    return newExamination;
});