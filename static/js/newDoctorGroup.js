/**
 * Created by Administrator on 2017/6/28.
 */
define(['jquery','lodash'],function($,_){
    "use strict";
    var newDoctorGroup;
    newDoctorGroup = (function () {
        //静态私有属性方法
        var sethouse = [], dry = {}, houseNumber = {},arr_officer=[];

        function bindEvent(tarobj) {
            //健康管理师点击事件
            tarobj.find('#drylist').on('click', 'li', function () {
                $(this).addClass('active').siblings().removeClass('active');
                tarobj.find('#js_chousehouse').removeClass('hide');
                dry.id = $(this).attr('data-id');
                generHouseNo(tarobj.find('#netHouseList'),houseNumber,dry.id);
            });
            //勾选住户事件
            tarobj.find('.js_houselist').on('click', '.house input', function (e) {
                var _checked = tarobj.find('#netHouseList .unit input[type="checkbox"]:checked');
                var target = tarobj.find('#chousedHouse');
                var data = getHouse(this);
                tarobj.find('#js_houseCount').text(_checked.length);
                if($(this).parents('li').index() == 0){
                    if($(this).prop('checked')){
                        $(this).parents('li').parent().find('input').prop('checked',true);
                    }else{
                        $(this).parents('li').parent().find('input').prop('checked',false);
                    }
                }
                generHouse(target, data);
                tarobj.find('#js_chousehouse').show();
            });
            //添加健康管理师以及网格住户事件
            tarobj.find('#add_dry').on('click', function () {
                var _checked = tarobj.find('#netHouseList .house input[type="checkbox"]:checked');
                var houseNoId = [],officerId = tarobj.find('#drylist li.active').attr('data-id'),
                    officerName = tarobj.find('#drylist li.active').text();
                if (!officerId) {
                    alert('请选择健康管理师');
                    return false;
                }
                if (_checked.length === 0) {
                    alert('健康管理师未分配住户');
                    return false;
                }
                $.each(_checked, function (idx, ele) {
                    houseNoId.push($(ele).val());
                });
                //将选中的住户id添加到数组中，预备提交的时候获取
                if(sethouse.length > 0){
                    var index;
                	for(var i = 0;i<sethouse.length;i++){
                        index = sethouse[i].officerId == officerId ? i : '';
                    }
                    if(index != ''){
                        var arr_houseNo = sethouse[i].houseNo.split(',');
                        houseNoId.concat(arr_houseNo);
                        houseNoId = _.uniq(houseNoId);
                        sethouse[i].houseNo = houseNoId.join(',')
                    }else{
                        var officer = {officerId:officerId,houseNo:houseNoId.join(',')};
                        sethouse.push(officer);
                    }
                }else{
                	sethouse.push({officerId:officerId,houseNo:houseNoId.join(',')})
                }
                //在健康管理师数组中去除已经添加的住户的健康管理师
                var idx = '';
                $.each(arr_officer,function(index,obj){
                    if(obj.id == officerId){
                        idx = index;
                    }
                });
                arr_officer.splice(idx,1);
                _addTag(houseNoId,officerId);
                generHouseNo(tarobj.find('#netHouseList'),houseNumber);
                //更改界面显示
                var srt_tr = '<tr><td>' + tarobj.find('#drylist li.active').text() + '</td><td class="js_count">' + _checked.length + '</td>' +
                    '<td class="optCol"><a class="modify" href="" data-toggle="modal" data-id="'+officerId+'" data-target="#modal_doctorGroup">修改</a>' +
                    '<a class="del" href="" data-id="'+officerId+'" data-name="'+officerName+'">删除</a></td></tr>';
                tarobj.find('table#assigned_officer tbody').append(srt_tr);
                tarobj.find('#drylist li.active').remove();
                tarobj.find('#js_chousehouse #js_houseCount').text('0');
                tarobj.find('#js_chousehouse #chousedHouse').html('');
                tarobj.find('#js_chousehouse').addClass('hide');
            });
            //移除网格住户事件
            tarobj.on('click', '#js_delHouse', function () {
                $(this).parents('#chousedHouse').find('p').remove();
                tarobj.find('#js_houseCount').text('0');
                tarobj.find('#netHouseList .house input[type=checkbox]').prop('checked', false);
            });
            //删除已经分配住户的健康管理师
            tarobj.on('click','td.optCol a.del',function(e){
                var officerId = $(this).attr('data-id');
                var checked_house = [],officer = {id:officerId,name:$(this).attr('data-name')};
                for(var i = 0;i<sethouse.length;i++){
                    if(officerId == sethouse[i].officerId){
                        checked_house = sethouse[i].houseNo.split(',');
                        _addTag(checked_house,officerId,1);
                        sethouse.splice(i,1);
                    }
                }
                arr_officer.push(officer);
                generHouseNo(tarobj.find('#netHouseList'),houseNumber);
                generOfferUl(tarobj.find('#drylist'),arr_officer);
                $(this).parents('tr').remove();
                return false;
            });
            //全选住户功能
            tarobj.on('click','p input',function(){
                var officerId = tarobj.find('#drylist li.active').attr('data-id');
                var _p = $(this).parent();
                var _checkbox = _p.parent().find('input[type=checkbox]');
                var target = tarobj.find('#chousedHouse'),data;
                tarobj.find('#js_houseCount').text(_p.parents('#netHouseList').find('.house input[type=checkbox]:checked').length);
                if($(this).prop('checked')){
                    _p.parent().find('.build.tree-wrap').show(500);
                    $.each(_checkbox,function(idx,ele){
                        if(!$(ele).prop('disabled')){
                            $(ele).prop('checked',true);
                        }
                    });
                    if(!$(this).parents('#modal_doctorGroup').length){
                        data = getHouse(this);
                        tarobj.find('#js_houseCount').text(_p.parents('#netHouseList').find('.house input[type=checkbox]:checked').length);
                        generHouse(target, data);
                        tarobj.find('#js_chousehouse').show();
                    }
                }else{
                    _checkbox.prop('checked',false);
                    if(!$(this).parents('#modal_doctorGroup').length){
                        tarobj.find('#js_houseCount').text(_p.parents('#netHouseList').find('.house input[type=checkbox]:checked').length);
                        data = getHouse(this);
                        generHouse(target, data);
                    }
                }
            });
            tarobj.on('click','.tree-wrap > p span',function(){
                var _this = this;
                $(_this).parent().parent().find('>.tree-wrap').toggle(500,function(){
                    $(_this).next().hasClass('icon-rote') ? $(_this).next().removeClass('icon-rote') : $(_this).next().addClass('icon-rote');
                });
            });
        }

        //修改方法入口
        function modify(target,officerid){
            generHouseNo(target,houseNumber,officerid);
            bindEvent(target);
        }
        //生成选中的门牌号的P元素
        function generHouse(tarobj, data) {
            var str_html = '', district = data.district, arr_html = [];
            if (!district) {
                return false;
            }
            for (var i = 0; i < district.length; i++) {
                for (var j = 0; j < district[i].buildingList.length; j++) {
                    for (var k = 0; k < district[i].buildingList[j].unitList.length; k++) {
                        var house = [];
                        for(var l = 0; l < district[i].buildingList[j].unitList[k].houseList.length; l++){
                            house.push(district[i].buildingList[j].unitList[k].houseList[l].house);
                        }
                        var str_house = '<p>'+ district[i].name + district[i].buildingList[j].name + district[i].buildingList[j].unitList[k].name + house.join() + '</p>';
                        arr_html.push(str_house)
                    }
                }
            }
            str_html = arr_html.join('');
            str_html += '<a class="btn btn-default" id="js_delHouse">移除已分配的网格住户</a>';
            tarobj.html(str_html);
        }

        //获取选中的门牌号，并组装数据
        function getHouse(_checked) {
            var houseNumber = {};
            var chkobj = $(_checked);
            var treeObj = chkobj.parents('div.js_houselist').find('.district');
            var district = [];
            $.each(treeObj,function(idx,ele){
                var obj_district = {
                    name:$(ele).children('p').text(),
                    buildingList:[]
                };
                if($(ele).find('li input[type=checkbox]:checked').length != 0){
                	$.each($(ele).find('.build.tree-wrap'),function(index,element){
                        var obj_build = {
                            name:$(element).children('p').text(),
                            unitList:[]
                        };
                        $.each($(element).find('.unit.tree-wrap'),function(unindex,unelement){
                            var obj_unit = {
                                name:$(unelement).children('p').text(),
                                houseList:[]
                            };
                            $.each($(unelement).find('li input[type=checkbox]:checked'),function(id,el){
                                var hs = {id:$(el).val(),house:$(el).parent().text(),hecadreUid:dry.id};
                                obj_unit.houseList.push(hs);
                            });
    						if($(unelement).find('li input[type=checkbox]:checked').length !== 0){
    							obj_build.unitList.push(obj_unit);                 	
    						}
                        });
                        obj_district.buildingList.push(obj_build);
                    });
                }
                district.push(obj_district);
            });
            houseNumber.district = district;
            return houseNumber;
        }

        //生成健康管理师UL
        function generOfferUl(targetObj, officer) {
            if (officer) {
                var str_li = [];
                for (var i = 0; i < officer.length; i++) {
                    str_li.push('<li class="" data-id="' + officer[i].id + '"><i class="icon icon-radio icon-chose"></i>' + officer[i].name + '</li>');
                }
                targetObj.html(str_li.join(''));
            }
        }

        //生成门牌号树
        function generHouseNo(targetObj, houseNumber,officerid) {
            if (!houseNumber) {
                return false;
            }
            var arr_district = [];
            for (var i = 0; i < houseNumber.length; i++) {
                //小区
                var dis = [];
                for (var j = 0; j < houseNumber[i].buildingList.length; j++) {
                    //栋
                    var arr_build = [];
                    for (var k = 0; k < houseNumber[i].buildingList[j].unitList.length; k++) {
                        //单元
                        var arr_ul = [];
                        for (var l = 0; l < houseNumber[i].buildingList[j].unitList[k].houseList.length; l++) {
                            var officer = houseNumber[i].buildingList[j].unitList[k].houseList[l].hecadreUid ?
                                houseNumber[i].buildingList[j].unitList[k].houseList[l].hecadreUid : '';
                            var str_label = '<label><input type="checkbox" title="" value="' +
                                +houseNumber[i].buildingList[j].unitList[k].houseList[l].id
                                + '">'+ houseNumber[i].buildingList[j].unitList[k].houseList[l].house + '</label>';
                            if(officer == officerid){
                                str_label = '<label><input type="checkbox" title="" value="' +
                                    +houseNumber[i].buildingList[j].unitList[k].houseList[l].id
                                    + '" checked="checked">'+ houseNumber[i].buildingList[j].unitList[k].houseList[l].house + '</label>';
                            }
                            if(officer!=''&&officer!=officerid){
                                str_label = ''
                            }
                            var str_li = '<li class="pull-left">'+str_label+'</li>';
                            if(str_label){
                                arr_ul.push(str_li);
                            }
                        }
                        if(arr_ul.length){
                            var ul_arr = [],index = 0;
                            while(index < arr_ul.length){
                                ul_arr.push(arr_ul.slice(index,index+=9));
                            }
                            var str_uls = '';
                            ul_arr.forEach(function(its){
                                str_uls+='<ul class="house clearfix tree-wrap">'+its.join('')+ '</ul>';
                            });
                            var str_ul = '<div class="unit tree-wrap"><p><input type="checkbox" title=""/><span>'
                                + houseNumber[i].buildingList[j].unitList[k].name + '</span><i class="icon-sanjiao"></i></p>' +
                                str_uls+ '</div>';
                            arr_build.push(str_ul);
                        }
                    }
                    if(arr_build.length){
                        var str_build = '<div class="build tree-wrap"><p><input type="checkbox" title=""/><span>' + houseNumber[i].buildingList[j].name + '</span><i class="icon-sanjiao"></i></p>' + arr_build.join('') + '</div>';
                        dis.push(str_build);
                    }
                }
                var str_dis = '<div class="district tree-wrap"><p><input type="checkbox" title=""/><span>' + houseNumber[i].name + '</span><i class="icon-sanjiao"></i></p>' + dis.join('') + '</div>';
                if(dis.length){
                    arr_district.push(str_dis);
                }
            }
            var str_district = arr_district.join('');
            targetObj.html(str_district);
        }

        //弹窗保存住户网格
        function dialogCh(target,trobj){
            var o = target;
            o.off('click','.btn.confirm');
            o.on('click','.btn.confirm',function(){
                var checked = o.find('.house input[type=checkbox]:checked');
                var houseNo = [];
                $.each(checked,function(index,ele){
                    houseNo.push($(ele).val());
                });
                var officerId = target.attr('data-id');
                var idx = '';
                if(sethouse.length > 0){
                	for(var i = 0;i<sethouse.length;i++){
                		if(sethouse[i].officerId == officerId){
                			idx = i;
                        }
                    }
                	if(idx !==''){
                        _addTag(sethouse[idx].houseNo.split(','),officerId,true);
                        sethouse[idx].houseNo = houseNo.join(',');
                	}else{
                		sethouse.push({officerId:officerId,houseNo:houseNo.join(',')});
                	}
                }else{
                	sethouse.push({officerId:officerId,houseNo:houseNo.join(',')});
                }
                _addTag(houseNo,officerId);
                trobj.find('td.js_count').text(checked.length);
            });
            o.off('click','.house input');
            o.on('click','.house input',function(){
                var chk = [];
                chk.push($(this).val());
                if(!$(this).prop('checked')){
                    _addTag(chk);
                }
            });
        }
        //更改原始json数组，选中的住户添加健康管理师标识或者删除
        function _addTag(checked,officerid,optag){
            $.each(checked,function(idx,ele){
                for (var i = 0; i < houseNumber.length; i++) {
                    //小区
                    for (var j = 0; j < houseNumber[i].buildingList.length; j++) {
                        //栋
                        for (var k = 0; k < houseNumber[i].buildingList[j].unitList.length; k++) {
                            //单元
                            for (var l = 0; l < houseNumber[i].buildingList[j].unitList[k].houseList.length; l++) {
                                if(houseNumber[i].buildingList[j].unitList[k].houseList[l].id == ele){
                                    optag ? houseNumber[i].buildingList[j].unitList[k].houseList[l].hecadreUid = ''
                                        : houseNumber[i].buildingList[j].unitList[k].houseList[l].hecadreUid = officerid;
                                }
                            }
                        }
                    }
                }
            });
        }

        //构造函数
        function _newDoctorGroup(settings) {
            var _this = this;
            var officerUl = settings.assign.find('#drylist');
            var houseNumberDiv = settings.assign.find('#netHouseList');
            /***
             * settings.assign：健康管理师网格用户分配所在的目标DIV的jquery对象；
             * settings.officer:健康管理师数据，json数组；
             * settings.houseNumber:门牌号，json数组；
             * settings.officerHouse:已经选过网格的健康管理师，json数组，可以为空
             * ***/
            sethouse = settings.officerHouse || [];
            dry = {};
            arr_officer = settings.officer||[];
            houseNumber = settings.houseNumber;
            generOfferUl(officerUl,arr_officer);
            generHouseNo(houseNumberDiv,houseNumber);
            bindEvent(settings.assign);

            //构造函数安全模式，避免创建时候丢掉new关键字
            if (_this instanceof _newDoctorGroup) {
                //共有属性, 方法
                _this.getHouse = function () {
                    return sethouse;
                };
                //修改健康管理师关联住户
                _this.modifyOfficer = function(target,trobj,officerid){
                    //参数为健康管理师关联的用户
                    modify(target.find('#distristHouse'),officerid);
                    dialogCh(target,trobj);
                }
            } else {
                return new _newDoctorGroup(settings);
            }
        }

        //静态共有属性方法
        /*_newDoctorGroup.prototype = {

         };*/
        return _newDoctorGroup;
    })();
    return newDoctorGroup;
});
