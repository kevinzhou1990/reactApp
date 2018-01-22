(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['lodash'], factory);
    } else if (typeof exports == 'object') {
        module.exports = factory('lodash');
    } else {
        root.Util = factory(root._);
    }
}(this, function () {
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
                key:'35000',
                name:'residentName',
                value:data.residentName
            },
            {
                key:'35001',
                name:'createDate',
                value:data.atenRecordTime === 2 ? formatDate(data.createDate,'.'):' '
            },
            {
                key:'35002',
                name:'createDate',
                value:data.atenRecordTime === 3 ? formatDate(data.createDate,'.'):' '
            },
            {
                key:'35003',
                name:'createDate',
                value:data.atenRecordTime === 4 ? formatDate(data.createDate,'.'):' '
            },
            {
                key:'35004',
                name:'createDate',
                value:data.atenRecordTime === 5 ? formatDate(data.createDate,'.'):' '
            },
            {
                key:'35005',
                name:'atenGestationalWeeks',
                value:data.atenRecordTime === 2 ? data.atenGestationalWeeks:' '
            },
            {
                key:'35006',
                name:'createDate',
                value:data.atenRecordTime === 3 ? data.atenGestationalWeeks:' '
            },
            {
                key:'35007',
                name:'atenGestationalWeeks',
                value:data.atenRecordTime === 4 ? data.atenGestationalWeeks:' '
            },
            {
                key:'35008',
                name:'atenGestationalWeeks',
                value:data.atenRecordTime === 5 ? data.atenGestationalWeeks:' '
            },
            {
                key:'35009',
                name:'atenChiefComplaint',
                value:data.atenRecordTime === 2 ? data.atenChiefComplaint:' '
            },
            {
                key:'35010',
                name:'atenChiefComplaint',
                value:data.atenRecordTime === 3 ? data.atenChiefComplaint:' '
            },
            {
                key:'35011',
                name:'atenChiefComplaint',
                value:data.atenRecordTime === 4 ? data.atenChiefComplaint:' '
            },
            {
                key:'35012',
                name:'atenChiefComplaint',
                value:data.atenRecordTime === 5 ? data.atenChiefComplaint:' '
            },
            {
                key:'35013',
                name:'createDate',
                value:data.atenRecordTime === 2 ? data.atenWeight:' '
            },
            {
                key:'35014',
                name:'atenWeight',
                value:data.atenRecordTime === 3 ? data.atenWeight:' '
            },
            {
                key:'35015',
                name:'atenWeight',
                value:data.atenRecordTime === 4 ? data.atenWeight:' '
            },
            {
                key:'35016',
                name:'atenWeight',
                value:data.atenRecordTime === 5 ? data.atenWeight:' '
            },
            {
                key:'35017',
                name:'atenBaseHeight',
                value:data.atenRecordTime === 2 ? data.atenBaseHeight:' '
            },
            {
                key:'35018',
                name:'atenBaseHeight',
                value:data.atenRecordTime === 3 ? data.atenBaseHeight:' '
            },
            {
                key:'35019',
                name:'atenBaseHeight',
                value:data.atenRecordTime === 4 ? data.atenBaseHeight:' '
            },
            {
                key:'35020',
                name:'atenBaseHeight',
                value:data.atenRecordTime === 5 ? data.atenBaseHeight:' '
            },
            {
                key:'35021',
                name:'atenAbdominalCircumference',
                value:data.atenRecordTime === 2 ? data.atenAbdominalCircumference:' '
            },
            {
                key:'35022',
                name:'atenAbdominalCircumference',
                value:data.atenRecordTime === 3 ? data.atenAbdominalCircumference:' '
            },
            {
                key:'35023',
                name:'atenAbdominalCircumference',
                value:data.atenRecordTime === 4 ? data.atenAbdominalCircumference:' '
            },
            {
                key:'35024',
                name:'atenAbdominalCircumference',
                value:data.atenRecordTime === 5 ? data.atenAbdominalCircumference:' '
            },
            {
                key:'35025',
                name:'atenBabyPosition',
                value:data.atenRecordTime === 2 ? data.atenBabyPosition:' '
            },
            {
                key:'35026',
                name:'atenBabyPosition',
                value:data.atenRecordTime === 3 ? data.atenBabyPosition:' '
            },
            {
                key:'35027',
                name:'atenBabyPosition',
                value:data.atenRecordTime === 4 ? data.atenBabyPosition:' '
            },
            {
                key:'35028',
                name:'atenBabyPosition',
                value:data.atenRecordTime === 5 ? data.atenBabyPosition:' '
            },
            {
                key:'35029',
                name:'atenHeartRate',
                value:data.atenRecordTime === 2 ? data.atenHeartRate:' '
            },
            {
                key:'35030',
                name:'atenHeartRate',
                value:data.atenRecordTime === 3 ? data.atenHeartRate:' '
            },
            {
                key:'35031',
                name:'atenHeartRate',
                value:data.atenRecordTime === 4 ? data.atenHeartRate:' '
            },
            {
                key:'35032',
                name:'atenHeartRate',
                value:data.atenRecordTime === 5 ? data.atenHeartRate:' '
            },
            {
                key:'35033',
                name:'atenBloodPressureLow',
                value:data.atenRecordTime === 2 ? data.atenBloodPressureLow:' '
            },
            {
                key:'35034',
                name:'atenBloodPressureHeigh',
                value:data.atenRecordTime === 2 ? data.atenBloodPressureHeigh:' '
            },
            {
                key:'35035',
                name:'atenBloodPressureLow',
                value:data.atenRecordTime === 3 ? data.atenBloodPressureLow:' '
            },
            {
                key:'35036',
                name:'atenBloodPressureHeigh',
                value:data.atenRecordTime === 3 ? data.atenBloodPressureHeigh:' '
            },
            {
                key:'35037',
                name:'atenBloodPressureLow',
                value:data.atenRecordTime === 4 ? data.atenBloodPressureLow:' '
            },
            {
                key:'35038',
                name:'atenBloodPressureHeigh',
                value:data.atenRecordTime === 4 ? data.atenBloodPressureHeigh:' '
            },
            {
                key:'35039',
                name:'atenBloodPressureLow',
                value:data.atenRecordTime === 5 ? data.atenBloodPressureLow:' '
            },
            {
                key:'35040',
                name:'atenBloodPressureHeigh',
                value:data.atenRecordTime === 5 ? data.atenBloodPressureHeigh:' '
            },
            {
                key:'35041',
                name:'atenHemoglobin',
                value:data.atenRecordTime === 2 ? data.atenHemoglobin:' '
            },
            {
                key:'35042',
                name:'atenHemoglobin',
                value:data.atenRecordTime === 3 ? data.atenHemoglobin:' '
            },
            {
                key:'35043',
                name:'atenHemoglobin',
                value:data.atenRecordTime === 4 ? data.atenHemoglobin:' '
            },
            {
                key:'35044',
                name:'atenHemoglobin',
                value:data.atenRecordTime === 5 ? data.atenHemoglobin:' '
            },
            {
                key:'35045',
                name:'atenAuxiliaryExamination',
                value:data.atenRecordTime === 2 ? data.atenAuxiliaryExamination:' '
            },
            {
                key:'35046',
                name:'atenAuxiliaryExamination',
                value:data.atenRecordTime === 3 ? data.atenAuxiliaryExamination:' '
            },
            {
                key:'35047',
                name:'atenAuxiliaryExamination',
                value:data.atenRecordTime === 4 ? data.atenAuxiliaryExamination:' '
            },
            {
                key:'35048',
                name:'atenAuxiliaryExamination',
                value:data.atenRecordTime === 5 ? data.atenAuxiliaryExamination:' '
            },
            {
                key:'35049',
                name:'atenClassification',
                value:data.atenRecordTime === 2 ? data.atenClassification === 1 ? 2 : 1:' '
            },
            {
                key:'35050',
                name:'atenClassificationExce',
                value:data.atenRecordTime === 2 ? data.atenClassificationExce : ' '
            },
            {
                key:'35051',
                name:'atenClassificationExce',
                value:data.atenRecordTime === 3 ? data.atenClassification === 1 ? 2 : 1:' '
            },
            {
                key:'35052',
                name:'atenClassificationExce',
                value:data.atenRecordTime === 3 ? data.atenClassificationExce : ' '
            },
            {
                key:'35053',
                name:'atenClassificationExce',
                value:data.atenRecordTime === 4 ? data.atenClassification === 1 ? 2 : 1:' '
            },
            {
                key:'35054',
                name:'atenClassificationExce',
                value:data.atenRecordTime === 4 ? data.atenClassificationExce : ' '
            },
            {
                key:'35055',
                name:'atenClassificationExce',
                value:data.atenRecordTime === 5 ? data.atenClassification === 1 ? 2 : 1:' '
            },
            {
                key:'35056',
                name:'atenClassificationExce',
                value:data.atenRecordTime === 5 ? data.atenClassificationExce : ' '
            },
            {
                key:'35057',
                name:'healthGuide',
                value:data.atenRecordTime === 2 ? data.healthGuide.guidLifeStyle === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35058',
                name:'healthGuide',
                value:data.atenRecordTime === 2 ? data.healthGuide.guidNutrition === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35059',
                name:'healthGuide',
                value:data.atenRecordTime === 2 ? data.healthGuide.guidPsychology === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35060',
                name:'healthGuide',
                value:data.atenRecordTime === 2 ? data.healthGuide.guidSport === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35061',
                name:'healthGuide',
                value:data.atenRecordTime === 2 ? data.healthGuide.guidOtherSelect === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35062',
                name:'healthGuide',
                value:data.atenRecordTime === 2 ? data.healthGuide.guidOther  ? data.healthGuide.guidOther : ' ' : ' '
            },
            {
                key:'35063',
                name:'healthGuide',
                value:data.atenRecordTime === 3 ? data.healthGuide.guidLifeStyle === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35064',
                name:'healthGuide',
                value:data.atenRecordTime === 3 ? data.healthGuide.guidNutrition === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35065',
                name:'healthGuide',
                value:data.atenRecordTime === 3 ? data.healthGuide.guidPsychology === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35066',
                name:'healthGuide',
                value:data.atenRecordTime === 3 ? data.healthGuide.guidSport === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35067',
                name:'healthGuide',
                value:data.atenRecordTime === 3 ? data.healthGuide.guidWound === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35068',
                name:'healthGuide',
                value:data.atenRecordTime === 3 ? data.healthGuide.guidBreastMilk === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35069',
                name:'healthGuide',
                value:data.atenRecordTime === 3 ? data.healthGuide.guidOtherSelect === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35070',
                name:'healthGuide',
                value:data.atenRecordTime === 3 ? data.healthGuide.guidOther  ? data.healthGuide.guidOther : ' ' : ' '
            },
            {
                key:'35071',
                name:'healthGuide',
                value:data.atenRecordTime === 4 ? data.healthGuide.guidLifeStyle === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35072',
                name:'healthGuide',
                value:data.atenRecordTime === 4 ? data.healthGuide.guidNutrition === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35073',
                name:'healthGuide',
                value:data.atenRecordTime === 4 ? data.healthGuide.guidPsychology === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35074',
                name:'healthGuide',
                value:data.atenRecordTime === 4 ? data.healthGuide.guidSport === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35075',
                name:'healthGuide',
                value:data.atenRecordTime === 4 ? data.healthGuide.guidAxue === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35076',
                name:'healthGuide',
                value:data.atenRecordTime === 4 ? data.healthGuide.guidPrevention === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35077',
                name:'healthGuide',
                value:data.atenRecordTime === 4 ? data.healthGuide.guidBreastMilk === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35078',
                name:'healthGuide',
                value:data.atenRecordTime === 4 ? data.healthGuide.guidOtherSelect === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35079',
                name:'healthGuide',
                value:data.atenRecordTime === 4 ? data.healthGuide.guidOther  ? data.healthGuide.guidOther : ' ' : ' '
            },
            {
                key:'35080',
                name:'healthGuide',
                value:data.atenRecordTime === 5 ? data.healthGuide.guidLifeStyle === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35081',
                name:'healthGuide',
                value:data.atenRecordTime === 5 ? data.healthGuide.guidNutrition === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35082',
                name:'healthGuide',
                value:data.atenRecordTime === 5 ? data.healthGuide.guidPsychology === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35083',
                name:'healthGuide',
                value:data.atenRecordTime === 5 ? data.healthGuide.guidSport === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35084',
                name:'healthGuide',
                value:data.atenRecordTime === 5 ? data.healthGuide.guidAxue === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35085',
                name:'healthGuide',
                value:data.atenRecordTime === 5 ? data.healthGuide.guidPrevention === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35086',
                name:'healthGuide',
                value:data.atenRecordTime === 5 ? data.healthGuide.guidBreastMilk === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35087',
                name:'healthGuide',
                value:data.atenRecordTime === 5 ? data.healthGuide.guidOtherSelect === 1 ? '√' : ' ' : ' '
            },
            {
                key:'35088',
                name:'healthGuide',
                value:data.atenRecordTime === 5 ? data.healthGuide.guidOther  ? data.healthGuide.guidOther : ' ' : ' '
            },
            {
                key:'35089',
                name:'atenReferral',
                value:data.atenRecordTime === 2 ? data.atenReferral === 1 ? 2 : 1 : ' '
            },
            {
                key:'35090',
                name:'atenReferral',
                value:data.atenRecordTime === 2 ? data.atenReferralReason : ' '
            },
            {
                key:'35091',
                name:'atenReferral',
                value:data.atenRecordTime === 2 ? data.atenReferralOrg : ' '
            },
            {
                key:'35092',
                name:'atenReferral',
                value:data.atenRecordTime === 3 ? data.atenReferral === 1 ? 2 : 1 : ' '
            },
            {
                key:'35093',
                name:'atenReferral',
                value:data.atenRecordTime === 3 ? data.atenReferralReason : ' '
            },
            {
                key:'35094',
                name:'atenReferral',
                value:data.atenRecordTime === 3 ? data.atenReferralOrg : ' '
            },
            {
                key:'35095',
                name:'atenReferral',
                value:data.atenRecordTime === 4 ? data.atenReferral === 1 ? 2 : 1 : ' '
            },
            {
                key:'35096',
                name:'atenReferralReason',
                value:data.atenRecordTime === 4 ? data.atenReferralReason : ' '
            },
            {
                key:'35097',
                name:'atenReferralOrg',
                value:data.atenRecordTime === 4 ? data.atenReferralOrg : ' '
            },
            {
                key:'35098',
                name:'atenReferral',
                value:data.atenRecordTime === 5 ? data.atenReferral === 1 ? 2 : 1 : ' '
            },
            {
                key:'35099',
                name:'atenReferralReason',
                value:data.atenRecordTime === 5 ? data.atenReferralReason : ' '
            },
            {
                key:'35100',
                name:'atenReferralOrg',
                value:data.atenRecordTime === 5 ? data.atenReferralOrg : ' '
            },
            {
                key:'35101',
                name:'nextVisitDate',
                value:data.atenRecordTime === 2 ? formatDate(data.nextVisitDate,'.') : ' '
            },
            {
                key:'35102',
                name:'nextVisitDate',
                value:data.atenRecordTime === 3 ? formatDate(data.nextVisitDate,'.') : ' '
            },
            {
                key:'35103',
                name:'nextVisitDate',
                value:data.atenRecordTime === 4 ? formatDate(data.nextVisitDate,'.') : ' '
            },
            {
                key:'35104',
                name:'nextVisitDate',
                value:data.atenRecordTime === 5 ? formatDate(data.nextVisitDate,'.') : ' '
            },
            {
                key:'35105',
                name:'nextVisitDate',
                value:''
            },
            {
                key:'35106',
                name:'nextVisitDate',
                value:''
            },
            {
                key:'35107',
                name:'nextVisitDate',
                value:''
            },
            {
                key:'35108',
                name:'nextVisitDate',
                value:''
            },
            {
                key:'35109',
                name:'atenUrineProtein',
                value:data.atenRecordTime === 2 ? data.atenUrineProtein:' '
            },
            {
                key:'35110',
                name:'atenUrineProtein',
                value:data.atenRecordTime === 3 ? data.atenUrineProtein:' '
            },
            {
                key:'35111',
                name:'atenUrineProtein',
                value:data.atenRecordTime === 4 ? data.atenUrineProtein:' '
            },
            {
                key:'35112',
                name:'atenUrineProtein',
                value:data.atenRecordTime === 5 ? data.atenUrineProtein:' '
            }
        ];
        return dataArr;
    };
    return formTemplate;
}));