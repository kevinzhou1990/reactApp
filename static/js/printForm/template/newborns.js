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
        console.log(data);
        var dataArr = [
            {
                key:'39000',
                name:'residentName',
                value:data.residentName
            },
            {
                key:'39001',
                name:'residentSex',
                value:data.residentSex == '男' ? 1 : data.residentSex == '女' ? '2' : 9
            },
            {
                key:'39002',
                name:'residentBirthday',
                value:formatDate(data.residentBirthday,'-')
            },
            {
                key:'39003',
                name:'residentCard',
                value:data.residentCard
            },
            {
                key:'39004',
                name:'residentAddr',
                value:data.residentAddr
            },
            {
                key:'39005',
                name:'neonFatherName',
                value:data.neonFatherName
            },
            {
                key:'39006',
                name:'neonFatherCareer',
                value:data.neonFatherCareer
            },
            {
                key:'39007',
                name:'neonFatherMobile',
                value:data.neonFatherMobile
            },
            {
                key:'39008',
                name:'neonFatherBirthday',
                value:formatDate(data.neonFatherBirthday,'-')
            },
            {
                key:'39009',
                name:'neonMotherName',
                value:data.neonMotherName
            },
            {
                key:'39010',
                name:'neonMotherCareer',
                value:data.neonMotherCareer
            },
            {
                key:'39011',
                name:'neonMotherMobile',
                value:data.neonMotherMobile
            },
            {
                key:'39012',
                name:'neonMotherBirthday',
                value:formatDate(data.neonMotherBirthday,'-')
            },
            {
                key:'39013',
                name:'neonBirthWeek',
                value:data.neonBirthWeek
            },
            {
                key:'39014',
                name:'neonMotherGestation',
                value:data.neonMotherGestation === 1 ? data.neonMotherHypertension === 1 ? 2 : data.neonMotherBloodPress === 1 ? 3 : data.neonMotherGestationOther ? 4 : ' ' : 1
            },
            {
                key:'39015',
                name:'neonMotherGestationOther',
                value:data.neonMotherGestationOther
            },
            {
                key:'39016',
                name:'neonMidwifery',
                value:data.neonMidwifery
            },
            {
                key:'39017',
                name:'neonMidwifery',
                value:data.neonBirthSc
            },
            {
                key:'39018',
                name:'neonMidwifery',
                value:''
            },
            {
                key:'39019',
                name:'neonBirthCondition',
                value:data.neonBirthCondition
            },
            {
                key:'39024',
                name:'neonAsphyxiaNeonatorum',
                value:data.neonAsphyxiaNeonatorum === 1 ? 2 : 1
            },
            {
                key:'39025',
                name:'neonApgarScore1',
                value:data.neonApgarScore1
            },
            {
                key:'39026',
                name:'neonApgarScore5',
                value:data.neonApgarScore5
            },
            {
                key:'39028',
                name:'neonAbnormal',
                value:data.neonAbnormal === 1 ? 2 : 1
            },
            {
                key:'39029',
                name:'neonAbnormalDescribe',
                value:data.neonAbnormalDescribe
            },
            {
                key:'39030',
                name:'neonUnhs',
                value:data.neonUnhs
            },
            {
                key:'39035',
                name:'neonDiseaseScreening',
                value:data.neonDiseaseScreening === 1 ? 1 : data.neonDiseaseNegative === 1 ? 2 : data.neonDiseaseHypothyroidism === 1 ? 3 : data.neonDiseasePku === 1 ? 4 : data.neonDiseaseScreeningDescribe ? 5 : ''
            },
            {
                key:'39041',
                name:'neonDiseaseScreeningDescribe',
                value:data.neonDiseaseScreeningDescribe
            },
            {
                key:'39042',
                name:'neonWeight',
                value:data.neonWeight
            },
            {
                key:'39043',
                name:'neonCurrentWeight',
                value:data.neonCurrentWeight
            },
            {
                key:'39044',
                name:'neonHeight',
                value:data.neonHeight
            },
            {
                key:'39045',
                name:'neonFeedingMode',
                value:data.neonFeedingMode
            },
            {
                key:'39049',
                name:'neonFeedingAmount',
                value:data.neonFeedingAmount
            },
            {
                key:'39050',
                name:'neonFeedingTimes',
                value:data.neonFeedingTimes
            },
            {
                key:'39051',
                name:'neonVomit',
                value:data.neonVomit === 1 ? 2 : data.neonVomit === 2 ? 1 : ' '
            },
            {
                key:'39052',
                name:'neonShit',
                value:data.neonShit
            },
            {
                key:'39053',
                name:'neonShitTimes',
                value:data.neonShitTimes
            },
            {
                key:'39054',
                name:'neonTemperature',
                value:data.neonTemperature
            },
            {
                key:'39055',
                name:'neonHeartRate',
                value:data.neonHeartRate
            },
            {
                key:'39056',
                name:'neonBreathingRate',
                value:data.neonBreathingRate
            },
            {
                key:'39057',
                name:'neonComplexion',
                value:data.neonComplexion
            },
            {
                key:'39058',
                name:'neonComplexionDescribe',
                value:data.neonComplexionDescribe
            },
            {
                key:'39059',
                name:'neonIctericSite',
                value:data.neonIctericSite
            },
            {
                key:'39060',
                name:'neonBregmatic1',
                value:data.neonBregmatic1
            },
            {
                key:'39061',
                name:'neonBregmatic2',
                value:data.neonBregmatic2
            },
            {
                key:'39062',
                name:'neonFeature',
                value:data.neonFeature
            },
            {
                key:'39063',
                name:'neonFeatureDescribe',
                value:data.neonFeatureDescribe
            },
            {
                key:'39064',
                name:'neonEye',
                value:data.neonEye === 1 ? 2 : data.neonEye === 2 ? 1 : ''
            },
            {
                key:'39065',
                name:'neonEyeDescribe',
                value:data.neonEyeDescribe
            },
            {
                key:'39066',
                name:'neonLimbMobility',
                value:data.neonLimbMobility === 1 ? 2 : data.neonLimbMobility === 2 ? 1 : ''
            },
            {
                key:'39067',
                name:'neonLimbMobilityDescribe',
                value:data.neonLimbMobilityDescribe
            },
            {
                key:'39068',
                name:'neonEarApperance',
                value:data.neonEarApperance === 1 ? 2 : data.neonEarApperance === 2 ? 1 : ''
            },
            {
                key:'39069',
                name:'neonEarApperanceDescribe',
                value:data.neonEarApperanceDescribe
            },
            {
                key:'39070',
                name:'neonNeckMass',
                value:data.neonNeckMass === 1 ? 2 : data.neonNeckMass === 2 ? 1 : ''
            },
            {
                key:'39071',
                name:'neonNeckMassDescribe',
                value:data.neonNeckMassDescribe
            },
            {
                key:'39072',
                name:'neonNose',
                value:data.neonNose === 1 ? 2 : data.neonNose === 2 ? 1 : ''
            },
            {
                key:'39073',
                name:'neonNose',
                value:data.neonNoseDescribe
            },
            {
                key:'39074',
                name:'neonSkin',
                value:data.neonSkin
            },
            {
                key:'39075',
                name:'neonSkinDescribe',
                value:data.neonSkinDescribe
            },
            {
                key:'39076',
                name:'neonMouth',
                value:data.neonMouth === 1 ? 2 : data.neonMouth === 2 ? 1 : ''
            },
            {
                key:'39077',
                name:'neonMouthDescribe',
                value:data.neonMouthDescribe
            },
            {
                key:'39078',
                name:'neonAnus',
                value:data.neonAnus === 1 ? 2 : data.neonAnus === 2 ? 1 : ''
            },
            {
                key:'39079',
                name:'neonAnusDescribe',
                value:data.neonAnusDescribe
            },
            {
                key:'39080',
                name:'neonAuscultation',
                value:data.neonAuscultation === 1 ? 2 : data.neonAuscultation === 2 ? 1 : ''
            },
            {
                key:'39081',
                name:'neonAuscultationDescribe',
                value:data.neonAuscultationDescribe
            },
            {
                key:'39082',
                name:'neonChest',
                value:data.neonChest === 1 ? 2 : data.neonChest === 2 ? 1 : ''
            },
            {
                key:'39083',
                name:'neonChestDescribe',
                value:data.neonChestDescribe
            },
            {
                key:'39084',
                name:'neonAbdominalPalpation',
                value:data.neonAbdominalPalpation === 1 ? 2 : data.neonAbdominalPalpation === 2 ? 1 : ''
            },
            {
                key:'39085',
                name:'neonAbdominalPalpationDescribe',
                value:data.neonAbdominalPalpationDescribe
            },
            {
                key:'39086',
                name:'neonSpine',
                value:data.neonSpine === 1 ? 2 : data.neonSpine === 2 ? 1 : ''
            },
            {
                key:'39087',
                name:'neonSpineDesribe',
                value:data.neonSpineDesribe
            },
            {
                key:'39088',
                name:'neonExternalGenitalia',
                value:data.neonExternalGenitalia === 1 ? 2 : data.neonExternalGenitalia === 2 ? 1 : ''
            },
            {
                key:'39089',
                name:'neonExternalGenitaliaDescribe',
                value:data.neonExternalGenitaliaDescribe
            },
            {
                key:'39090',
                name:'neonUmbilicalCord',
                value:data.neonUmbilicalCord
            },
            {
                key:'39091',
                name:'neonUmbilicalCordDescribe',
                value:data.neonUmbilicalCordDescribe
            },
            {
                key:'39092',
                name:'neonReferral',
                value:data.neonReferral === 1 ? 2 : data.neonReferral === 2 ? 1 : ''
            },
            {
                key:'39093',
                name:'neonReferralReson',
                value:data.neonReferralReson
            },
            {
                key:'39094',
                name:'neonReferralOrg',
                value:data.neonReferralOrg
            },
            {
                key:'39104',
                name:'createDate',
                value:new Date(data.createDate).getFullYear()
            },
            {
                key:'39105',
                name:'createDate',
                value:new Date(data.createDate).getMonth()+1
            },
            {
                key:'39106',
                name:'createDate',
                value:new Date(data.createDate).getDate()
            },
            {
                key:'39107',
                name:'nextVisitAddress',
                value:data.nextVisitAddress
            },
            {
                key:'39108',
                name:'nextVisitDate',
                value:new Date(data.nextVisitDate).getFullYear()
            },
            {
                key:'39109',
                name:'nextVisitDate',
                value:new Date(data.nextVisitDate).getMonth()+1
            },
            {
                key:'39110',
                name:'nextVisitDate',
                value:new Date(data.nextVisitDate).getDate()
            },
            {
                key:'39111',
                name:'visitDoctor',
                value:data.visitDoctor
            }
        ];
        var healthGuide_key = ['39095','39096','39097','39098','39099'],healthGuide_valueA = [],healthGuide_valueB = [];
        data.healthGuide.guidNeonatalCare === 1 ? healthGuide_valueA.push(1) : healthGuide_valueB.push('');
        data.healthGuide.guidAxue === 1 ? healthGuide_valueA.push(2) : healthGuide_valueB.push('');
        data.healthGuide.guidPrevention === 1 ? healthGuide_valueA.push(3) : healthGuide_valueB.push('');
        data.healthGuide.guidWound === 1 ? healthGuide_valueA.push(4) : healthGuide_valueB.push('');
        data.healthGuide.guidMouth === 1 ? healthGuide_valueA.push(5) : healthGuide_valueB.push('');
        var healthGuide_value = healthGuide_valueA.concat(healthGuide_valueB);
        for(var idx = 0;idx < healthGuide_key.length; idx++){
            dataArr.push({
                key:healthGuide_key[idx],
                name:'healthGuide',
                value:healthGuide_value[idx]
            });
        }
        return dataArr;
    };
    return formTemplate;
}));