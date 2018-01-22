(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['lodash'], factory);
    } else if (typeof exports == 'object') {
        module.exports = factory('lodash');
    } else {
        root.Util = factory(root._);
    }
}(this,function(){
    var formTemplate = {};

    function formatDate(dateStr, splitType) {
        if (!dateStr) return '';
        splitType = splitType || '  ';
        var date = new Date(dateStr);
        var arr = [];
        arr.push(date.getFullYear());
        arr.push(date.getMonth() + 1);
        arr.push(date.getDate());
        return arr.join(splitType);
    }
    formTemplate.getFormData = function (data) {
        var dataArr = [
            {
                key:'43000',
                name:'residentName',
                value:data.residentName
            },
            {
                key:'43001',
                name:'residentSexStr',
                value:data.residentSexStr
            },
            {
                key:'43002',
                name:'birthday',
                value:new Date(data.birthday).getFullYear()
            },
            {
                key:'43003',
                name:'birthday',
                value:new Date(data.birthday).getMonth()+1
            },
            {
                key:'43004',
                name:'birthday',
                value:new Date(data.birthday).getDate()
            },
            /*{
                key:'43005',
                name:'birthday',
                value:data.residentNo
            },*/
            {
                key:'43006',
                name:'bloodType',
                value:data.bloodType == 1 ? '√':''
            },
            {
                key:'43007',
                name:'bloodType',
                value:data.bloodType == 2 ? '√':''
            },
            {
                key:'43008',
                name:'bloodType',
                value:data.bloodType == 3 ? '√':''
            },
            {
                key:'43009',
                name:'bloodType',
                value:data.bloodType == 4 ? '√':''
            },
            {
                key:'43010',
                name:'rhType',
                value:data.rhType == 2 ? '√':''
            },
            {
                key:'43011',
                name:'rhType',
                value:data.rhType == 1 ? '√':''
            },
            {
                key:'43012',
                name:'rhType',
                value:data.rhType == 3 ? '√':''
            },
            {
                key:'43013',
                name:'familyDisease',
                value:data.familyDisease.diseFlag == 2 ? '√':''
            },
            {
                key:'43014',
                name:'familyDisease',
                value:data.familyDisease.diseHypertension == 1 ? '√':''
            },
            {
                key:'43015',
                name:'familyDisease',
                value:data.familyDisease.diseDiabetes == 1 ? '√':''
            },
            {
                key:'43016',
                name:'familyDisease',
                value:data.familyDisease.diseCerebralApoplexy == 1 ? '√':''
            },
            {
                key:'43017',
                name:'familyDisease',
                value:data.familyDisease.diseCoronaryHeart == 1 ? '√':''
            },
            {
                key:'43018',
                name:'familyDisease',
                value:data.familyDisease.diseAsthma == 1 ? '√':''
            },
            {
                key:'43019',
                name:'familyDisease',
                value:data.familyDisease.diseCareer == 1 ? '√':''
            },
            {
                key:'43020',
                name:'familyDisease',
                value:data.familyDisease.diseOtherDate == 1 ? '√':''
            },
            {
                key:'43021',
                name:'familyDisease',
                value:data.familyDisease.diseOtherName
            },
            {
                key:'43022',
                name:'familyDisease',
                value:data.duryDescribe
            },
            {
                key:'43023',
                name:'residentAddress',
                value:data.residentAddress
            },
            {
                key:'43024',
                name:'familyPhone',
                value:data.familyPhone
            },
            {
                key:'43025',
                name:'contactsName',
                value:data.contactsName
            },
            {
                key:'43026',
                name:'contactsMobile',
                value:data.contactsMobile
            },
            {
                key:'43027',
                name:'docUnitName',
                value:data.docUnitName
            },
            {
                key:'43028',
                name:'docUnitPhone',
                value:data.docUnitPhone
            },
            {
                key:'43029',
                name:'docDoctor',
                value:data.docDoctor
            },
            {
                key:'43030',
                name:'docDoctorMobile',
                value:data.docDoctorMobile
            },
            {
                key:'43031',
                name:'cardDescribe',
                value:data.cardDescribe
            }
        ];
        return dataArr;
    };
    return formTemplate;
}));