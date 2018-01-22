/**
 * Created by Administrator on 2017/6/26.
 */
define(['jquery'],function($){
    "use strict";
    /***
     * districtSetting.target:目标元素，jquery对象；必须
     * districtSetting.districtName:小区名称，string；必须
     * districtSetting.build:楼栋，string；可选
     * districtSetting.unit:单元，number；可选
     * districtSetting.floor:楼层数，number；必填
     * districtSetting.houseNumber:单层户数，number；必填
     * districtSetting.startNo:起始编号，string；必填
     * districtSetting.callback：回调函数
     * ***/
    function GenerateHouseNo(districtSetting){
        var _self = this;
        var district = '';
        var unit = districtSetting.unit ? districtSetting.unit : 1,floor = districtSetting.floor ? districtSetting.floor : 1,houseNumber = districtSetting.houseNumber;
        if(districtSetting.districtName){
            district = '<p>小区/建筑物名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+districtSetting.districtName+'</p>';
        }
        var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var unitstr = district+'<div>';
        for(var i = 0;i < unit;i++){
            var build = '';
            build = districtSetting.build ? districtSetting.build : '';
            var str_unit = '';
            if(unit === 1){
                str_unit = '<tr data-type="unit"><td colspan="2"><span>'+build+'</span>' +
                    '<input type="text" placeholder="" value=""></td></tr>';
            }else{
                str_unit = '<tr data-type="unit"><td colspan="2"><span>'+build+'</span>' +
                    '<input type="text" placeholder="" value="'+(i+1)+'单元"></td></tr>';
            }
            unitstr += '<table class="table table-bordered">' +
                '<tbody>' + str_unit;
            for(var j = 0;j < floor;j++){
                var trHtml = '<tr data-type="houseNumber"><td class="col-sm-2">'+(j+1)+'楼</td><td><ul class="clearfix">';
                for(var k = 0;k < houseNumber;k++){
                    var startNo = districtSetting.startNo,disnumber='',reg = /^[0-9]{3,}/g,regA = /^[0-9]*[A-Z]$/g,regr = /^[A-Z][0-9]*$/g;
                    //兼容城中村，当单元和楼层数都为1时，编号按输入依次自增
                    if(unit == 1&&floor == 1){
                        disnumber = parseInt(startNo)+k
                    }else{
                        //带楼层的三位数字编号，一楼的第一位数字为1，二楼的第一位数字为2，以此类推，中间数字通常为0，0之后的数字则为具体的门牌自增编号，例：101、102、103、104、105、…..1024
                        if(reg.test(startNo)){
                            var fnu =   k+(startNo%100) < 10 ? ('0'+(k+(startNo%100))) : k+(startNo%100);
                            if(Math.floor(parseInt(startNo)/100) < 1){
                                disnumber = (j+Math.floor(parseInt(startNo)/100)+1)+''+fnu;
                            }else{
                                disnumber = (j+Math.floor(parseInt(startNo)/100))+''+fnu;
                            }
                        }else if(regA.test(startNo)){
                            //带字母的两位编号，通常以数字开头，数字代表具体楼层，字母则代表具体的自增门牌号按26位字母升序自增，例：1A、1B、1C、2A、2B、2C、3A、3B、3C
                            var no = (alphabet.indexOf(startNo.charAt(startNo.length - 1)) + k);
                            disnumber = j+Math.floor(parseInt(startNo)) + alphabet[no];
                        }else if(startNo.indexOf('-') >-1){
                            //以横线“-”分隔的编号，横线左侧为楼栋号或其他编号，横线右侧则为具体的自增编号，如有多楼层从第2层开始，字母后带上具体的楼层数，1层则不带，例：A33-1、A33-2、A33-3、A233-1、A233-2、A233-3、A333-1、A333-2、A433-1、A433-2
                            if(j === 0){
                                disnumber = (startNo.split('-')[0])+'-'+(parseInt(startNo.split('-')[1])+k);
                            }else{
                                disnumber = (startNo.split('-')[0]+(j+1))+'-'+(parseInt(startNo.split('-')[1])+k);
                            }

                        }else if(regr.test(startNo)){
                            //字母开头的数字组合，字母后的第一位数字代表楼层数，末尾数字则代表自增编号，例：A1101、A1102、A2101、A2102、A3101、A3102、A3103
                            var np = new RegExp(/[0-9]*$/g).exec(startNo)[0];
                            var ap = new RegExp(/^[A-Z]*/g).exec(startNo)[0];
                            var n = (parseInt(np.charAt(0))+j);
                            n += (parseInt(np.substring(1,np.length))+k) < 10 ? '0'+(parseInt(np.substring(1,np.length))+k) : ''+(parseInt(np.substring(1,np.length))+k);
                            disnumber = ap + n;
                        }else{
                            //不属于以上规则
                            common.alert('请按规则填写');
                            return false;
                        }
                    }
                    /*var str = districtSetting.startNo;
                    var char = parseInt(str.charAt(str.length - 1));
                    var slflag = str.indexOf('-');
                    var disnumber = '';
                    if(slflag>0){
                        var identifierArr = str.split('-');
                        identifierArr[1] = parseInt(identifierArr[1])+k;
                        disnumber = identifierArr.join('-');
                    }else{
                        if(isNaN(char)){
                            var no = (alphabet.indexOf(str.charAt(str.length - 1)) + k);
                            disnumber = j+Math.floor(parseInt(str)) + alphabet[no];
                        }else{
                            var fnu =   k+char < 10 ? ('0'+(k+char)) : k+char;
                            if(Math.floor(parseInt(str)/100) < 1){
                                disnumber = (j+Math.floor(parseInt(str)/100)+1)+''+fnu;
                            }else{
                                disnumber = (j+Math.floor(parseInt(str)/100))+''+fnu;
                            }
                            //兼容城中村，当单元和楼层数都为1时，编号按输入依次自增
                            if(unit == 1&&floor == 1){
                                disnumber = parseInt(str)+k;
                            }
                        }
                    }*/
                    trHtml += '<li class="pull-left"><input type="text" value="'+disnumber+'">' +
                        '<a href="#" class="del">删除</a><a href="#" class="js-add">添加</a></li>';
                }
                trHtml+='</ul>' +
                    '<ul class="clearfix"><li class="pull-left">' +
                    '<a href="javascript:void(0)" class="del_floor">删除整层</a></li>' +
                    '</ul></td></tr>';
                unitstr+=trHtml;
            }
            unitstr += '</tbody></table>';
        }
        unitstr += '</div>';
        $.extend(_self,districtSetting);
        _self.render($(districtSetting.target.get(0)),unitstr)
        _self.bindEvent();
        // _self.render()
    }
    $.extend(GenerateHouseNo.prototype,{
        bindEvent:function(){
            var _ = this;
            $(_.target.get(0)).on('click','a.del',function(){
                $(this).parent().remove();
            }).bind(_);
            $(_.target.get(0)).on('click','a.js-add',function(){
                var house = '<li class="pull-left"><input type="text" value=""><a href="#" class="del">删除</a><a href="#" class="js-add">添加</a></li>';
                $(house).insertAfter($(this).parent());
            }).bind(_);
            $(_.target.get(0)).on('click','a.del_floor',function(){
                $(this).parents('tr').remove();
            }).bind(_);
        },
        render:function(target,htmlstr){
            target.html(htmlstr)
        }
    });
    return GenerateHouseNo;
});