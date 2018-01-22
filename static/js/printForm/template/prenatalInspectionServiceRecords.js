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
                key:'34000',
                name:'residentName',
                value:data.residentName
            },
            {
                key:'34001',
                name:'createDate',
                value:new Date(data.createDate).getFullYear()
            },
            {
                key:'34002',
                name:'createDate',
                value:new Date(data.createDate).getMonth()+1
            },
            {
                key:'34003',
                name:'createDate',
                value:new Date(data.createDate).getDate()
            },
            {
                key:'34004',
                name:'gestationalWeeksRecord',
                value:data.gestationalWeeksRecord
            },
            {
                key:'34005',
                name:'residentAge',
                value:data.residentAge
            },
            {
                key:'34006',
                name:'anteHusbandName',
                value:data.anteHusbandName
            },
            {
                key:'34007',
                name:'anteHusbandAge',
                value:data.anteHusbandAge
            },
            {
                key:'34008',
                name:'anteHusbandMobile',
                value:data.anteHusbandMobile
            },
            {
                key:'34009',
                name:'antePregnancyTime',
                value:data.antePregnancyTime
            },
            {
                key:'34010',
                name:'anteDelivery',
                value:data.anteDelivery.toString()
            },
            {
                key:'34011',
                name:'anteCesarean',
                value:data.anteCesarean.toString()
            },
            {
                key:'34012',
                name:'anteMenstruationLast',
                value:data.anteMenstruationLast ? new Date(data.anteMenstruationLast).getFullYear():'-'
            },
            {
                key:'34013',
                name:'anteMenstruationLast',
                value:data.anteMenstruationLast ? new Date(data.anteMenstruationLast).getMonth()+1:'-'
            },
            {
                key:'34014',
                name:'anteMenstruationLast',
                value:data.anteMenstruationLast ? new Date(data.anteMenstruationLast).getDate():'-'
            },
            /*{
                key:'34015',
                name:'anteLastUnknow',
                value:new Date(data.anteMenstruationLast).getDate()
            }*/
            {
                key:'34016',
                name:'anteExpectedDate',
                value:new Date(data.anteExpectedDate).getFullYear()
            },
            {
                key:'34017',
                name:'anteExpectedDate',
                value:new Date(data.anteExpectedDate).getMonth()+1
            },
            {
                key:'34018',
                name:'anteExpectedDate',
                value:new Date(data.anteExpectedDate).getDate()
            },
            {
                key:'34037',
                name:'anteGynaecologyOperation',
                value:data.anteGynaecologyOperation === 1 ? 2 : 1
            },
            {
                key:'34038',
                name:'anteGynaecologyOperationDescribe',
                value:data.anteGynaecologyOperationDescribe
            },
            {
                key:'34039',
                name:'pregancyHistory',
                value:data.pregancyHistory.pregAbortion.toString()
            },
            {
                key:'34040',
                name:'pregancyHistory',
                value:data.pregancyHistory.pregStillbirth.toString()
            },
            {
                key:'34041',
                name:'pregancyHistory',
                value:data.pregancyHistory.pregStillbirth1.toString()
            },
            {
                key:'34042',
                name:'pregNeonatalDeath',
                value:data.pregancyHistory.pregNeonatalDeath === 1 ? '有' : data.pregancyHistory.pregNeonatalDeath === 2 ? '无' : ''
            },
            {
                key:'34043',
                name:'pregBirthDefects',
                value:data.pregancyHistory.pregBirthDefects === 1 ? '有' : '无'
            },
            {
                key:'34044',
                name:'anteHight',
                value:data.anteHight
            },
            {
                key:'34045',
                name:'anteWeight',
                value:data.anteWeight
            },
            {
                key:'34046',
                name:'bodyMassIndex',
                value:data.bodyMassIndex
            },
            {
                key:'34047',
                name:'bloodPressureLow',
                value:data.bloodPressureLow
            },
            {
                key:'34110',
                name:'bloodPressureHigh',
                value:data.bloodPressureHigh
            },
            {
                key:'34048',
                name:'anteHeartExce',
                value:data.anteHeartExce === 1 ? 2 : 1
            },
            {
                key:'34049',
                name:'anteHeartDescribe',
                value:data.anteHeartDescribe
            },
            {
                key:'34050',
                name:'anteLungsExce',
                value:data.anteLungsExce === 1 ? 2 : 1
            },
            {
                key:'34051',
                name:'anteLungsDescribe',
                value:data.anteLungsDescribe
            },
            {
                key:'34052',
                name:'gynaecology',
                value:data.gynaecology.gynaVulva === 1 ? 2 : 1
            },
            {
                key:'34053',
                name:'gynaecology',
                value:data.gynaecology.gynaVulvaExce
            },
            {
                key:'34054',
                name:'gynaecology',
                value:data.gynaecology.gynaVagina === 1 ? 2 : 1
            },
            {
                key:'34055',
                name:'gynaecology',
                value:data.gynaecology.gyanVaginaExce
            },
            {
                key:'34056',
                name:'gynaecology',
                value:data.gynaecology.gynaCervical === 1 ? 2 : 1
            },
            {
                key:'34057',
                name:'gynaecology',
                value:data.gynaecology.gynaCervicalExce
            },
            {
                key:'34058',
                name:'gynaecology',
                value:data.gynaecology.gynaPalace === 1 ? 2 : 1
            },
            {
                key:'34059',
                name:'gynaecology',
                value:data.gynaecology.gynaPalace
            },
            {
                key:'34060',
                name:'gynaecology',
                value:data.gynaecology.gynaEnclosure === 1 ? 2 : 1
            },
            {
                key:'34061',
                name:'gynaecology',
                value:data.gynaecology.gynaEnclosureExce
            },
            {
                key:'34062',
                name:'instrumentCheck',
                value:data.instrumentCheck.bloodHgb
            },
            {
                key:'34063',
                name:'instrumentCheck',
                value:data.instrumentCheck.bloodWbc
            },
            {
                key:'34064',
                name:'instrumentCheck',
                value:data.instrumentCheck.bloodPlt
            },
            {
                key:'34065',
                name:'instrumentCheck',
                value:data.instrumentCheck.bloodOther
            },
            {
                key:'34066',
                name:'instrumentCheck',
                value:data.instrumentCheck.urinePro
            },
            {
                key:'34067',
                name:'instrumentCheck',
                value:data.instrumentCheck.urineGlu
            },
            {
                key:'34068',
                name:'instrumentCheck',
                value:data.instrumentCheck.urineKet
            },
            {
                key:'34069',
                name:'instrumentCheck',
                value:data.instrumentCheck.urineBld
            },
            {
                key:'34070',
                name:'instrumentCheck',
                value:data.instrumentCheck.urineOther
            },
            {
                key:'34071',
                name:'instrumentCheck',
                value:data.instrumentCheck.bloodType === 1 ? 'A型' : data.instrumentCheck.bloodType === 2 ? 'B型' : data.instrumentCheck.bloodType === 3 ? 'AB型' : data.instrumentCheck.bloodType === 4 ? 'O型' : '不详'
            },
            {
                key:'34072',
                name:'instrumentCheck',
                value:data.instrumentCheck.bloodRh === 1 ? 'RH阳性' : data.instrumentCheck.bloodRh === 2 ? 'RH阴性' : '不详'
            },
            {
                key:'34073',
                name:'instrumentCheck',
                value:data.instrumentCheck.bloodGlucose1
            },
            {
                key:'34074',
                name:'instrumentCheck',
                value:data.instrumentCheck.liverXqgbzam
            },
            {
                key:'34075',
                name:'instrumentCheck',
                value:data.instrumentCheck.liverXqgczam
            },
            {
                key:'34076',
                name:'instrumentCheck',
                value:data.instrumentCheck.liverBdb
            },
            {
                key:'34077',
                name:'instrumentCheck',
                value:data.instrumentCheck.liverZdhs
            },
            {
                key:'34078',
                name:'instrumentCheck',
                value:data.instrumentCheck.liverJhdhs
            },
            {
                key:'34079',
                name:'instrumentCheck',
                value:data.instrumentCheck.kidneyXqjs
            },
            {
                key:'34083',
                name:'instrumentCheck',
                value:data.instrumentCheck.vaginalSecretionOther
            },
            {
                key:'34084',
                name:'instrumentCheck',
                value:data.instrumentCheck.vaginalCleanlinessLevel
            },
            {
                key:'34085',
                name:'instrumentCheck',
                value:data.instrumentCheck.surfaceAntigen
            },
            {
                key:'34086',
                name:'instrumentCheck',
                value:data.instrumentCheck.surfaceAntibody
            },
            {
                key:'34087',
                name:'instrumentCheck',
                value:data.instrumentCheck.eAntigen
            },
            {
                key:'34088',
                name:'instrumentCheck',
                value:data.instrumentCheck.eAntibody
            },
            {
                key:'34089',
                name:'instrumentCheck',
                value:data.instrumentCheck.coreAntibody
            },
            {
                key:'34090',
                name:'instrumentCheck',
                value:data.instrumentCheck.syphilisFalg === 1 ? 2 : 1
            },
            {
                key:'34091',
                name:'instrumentCheck',
                value:data.instrumentCheck.hivFlag === 1 ? 2 : 1
            },
            {
                key:'34092',
                name:'instrumentCheck',
                value:data.instrumentCheck.bUltrasonography
            },
            {
                key:'34093',
                name:'anteAssessmentFlag',
                value:data.anteAssessmentFlag === 1 ? 2 : 1
            },
            {
                key:'34094',
                name:'anteAssessmentExce',
                value:data.anteAssessmentExce
            },
            {
                key:'34101',
                name:'anteReferralFlag',
                value:data.anteReferralFlag === 1 ? 2 : 1
            },
            {
                key:'34102',
                name:'anteReferralReason',
                value:data.anteReferralReason
            },
            {
                key:'34103',
                name:'anteReferralHospital',
                value:data.anteReferralHospital
            },
            {
                key:'34104',
                name:'nextVisitDate',
                value:new Date(data.nextVisitDate).getFullYear()
            },
            {
                key:'34105',
                name:'nextVisitDate',
                value:new Date(data.nextVisitDate).getMonth()+1
            },
            {
                key:'34106',
                name:'nextVisitDate',
                value:new Date(data.nextVisitDate).getDate()
            },
            {
                key:'34107',
                name:'anteVisitDoctor',
                value:''
            },
            {
                key:'34108',
                name:'kidneyXnsd',
                value:data.instrumentCheck.kidneyXnsd
            }
            /*,
            {
                key:'34019',
                name:'anteExpectedDate',
                value:new Date(data.anteExpectedDate).getDate()
            }*/
        ];
        //既往史
        var familyDisease_key = ['34019','34020','34021','34022','34023','34024','34025'],
            familyDisease_valueA = [],familyDisease_valueB = [];
        for(var i in data.familyDisease){
            var disease_value = data.familyDisease[i];
            switch (i){
                case 'diseFlag':
                    disease_value === 1 ? familyDisease_valueB.push(' ') : familyDisease_valueA.push(1);
                    break;
                case 'diseHeart':
                    disease_value === 1 ? familyDisease_valueA.push(2) : familyDisease_valueB.push(' ');
                    break;
                case 'diseKidneyDisease':
                    disease_value === 1 ? familyDisease_valueA.push(3) : familyDisease_valueB.push(' ');
                    break;
                case 'diseLiverDisease':
                    disease_value === 1 ? familyDisease_valueA.push(4) : familyDisease_valueB.push(' ');
                    break;
                case 'diseHypertension':
                    disease_value === 1 ? familyDisease_valueA.push(5) : familyDisease_valueB.push(' ');
                    break;
                case 'diseAnemia':
                    disease_value === 1 ? familyDisease_valueA.push(6) : familyDisease_valueB.push(' ');
                    break;
                case 'diseDiabetes':
                    disease_value === 1 ? familyDisease_valueA.push(7) : familyDisease_valueB.push(' ');
                    break;
                case 'diseOther':
                    disease_value === 1 ? familyDisease_valueA.push(8) : familyDisease_valueB.push(' ');
                    break;
            }
        }
        var familyDisease_value = familyDisease_valueA.concat(familyDisease_valueB);
        var familyDisease_valueobj = [];
        for(var idx = 0;idx<familyDisease_key.length;idx++){
            familyDisease_valueobj.push({
                key:familyDisease_key[idx],
                name:'familyDisease',
                value:familyDisease_value[idx]
            });
        }
        dataArr = dataArr.concat(familyDisease_valueobj);
        dataArr.push({
            key:'34026',
            name:'diseohter',
            value:data.familyDisease.diseOtherName
        });
        //家族史
        var geneticDisease_key = ['34027','34028','34029'],geneticDisease_valueA = [],
            geneticDisease_valueB = [];
        for(var item in data.geneticDisease){
            switch (item){
                case 'geneFlag':
                    data.geneticDisease[item] === 1 ? geneticDisease_valueA.push(1) : geneticDisease_valueB.push(' ');
                    break;
                case 'mentalDisease':
                    data.geneticDisease[item] === 1 ? geneticDisease_valueA.push(2) : geneticDisease_valueB.push(' ');
                    break;
                case 'geneMentalDescribe':
                    data.geneticDisease[item] ? geneticDisease_valueA.push(3) : geneticDisease_valueB.push(' ');
                    break;
            }
        }
        var geneticDisease_value = geneticDisease_valueA.concat(geneticDisease_valueB);
        if(!geneticDisease_valueA.length){
            geneticDisease_value[0] = '-'
        }
        var geneticDisease_valueObj = [];
        for(var indx = 0; indx < geneticDisease_value.length; indx ++){
            geneticDisease_valueObj.push({
                key:geneticDisease_key[indx],
                name:'geneticDisease',
                value:geneticDisease_value[indx]
            });
        }
        if(data.geneticDisease.geneMentalDescribe){
            geneticDisease_valueObj.push({
                key:'34030',
                name:'geneticDisease',
                value:data.geneticDisease.geneMentalDescribe
            });
        }else{
            geneticDisease_valueObj.push({
                key:'34030',
                name:'geneticDisease',
                value:' '
            });
        }
        dataArr = dataArr.concat(geneticDisease_valueObj);
        //个人史
        var exposureHistory_key = ['34031','34032','34033','34034','34035'],exposureHistory_valueA = [],
            exposureHistory_valueB = [];
        for(var itm in data.exposureHistory){
            switch (itm){
                case 'expoSmoking':
                    data.exposureHistory[itm] === 1 ? exposureHistory_valueA.push(1) : exposureHistory_valueB.push(' ');
                    break;
                case 'expoDrink':
                    data.exposureHistory[itm] === 1 ? exposureHistory_valueA.push(2) : exposureHistory_valueB.push(' ');
                    break;
                case 'expoDrug':
                    data.exposureHistory[itm] === 1 ? exposureHistory_valueA.push(3) : exposureHistory_valueB.push(' ');
                    break;
                case 'expoPoison':
                    data.exposureHistory[itm] === 1 ? exposureHistory_valueA.push(4) : exposureHistory_valueB.push(' ');
                    break;
                case 'expoRadial':
                    data.exposureHistory[itm] === 1 ? exposureHistory_valueA.push(5) : exposureHistory_valueB.push(' ');
                    break;
                case 'expoOther':
                    data.exposureHistory[itm] ? exposureHistory_valueA.push(6) : exposureHistory_valueB.push(' ');
                    break;
            }
        }
        var exposureHistory_valueobj = [],exposureHistory_value = exposureHistory_valueA.concat(exposureHistory_valueB);
        if(!exposureHistory_valueA.length){
            exposureHistory_value[0] = '-'
        }
        for(var ixd in exposureHistory_key){
            exposureHistory_valueobj.push({
                key:exposureHistory_key[ixd],
                name:'exposureHistory',
                value:exposureHistory_value[ixd]
            });
        }
        var expsobj = {
            key:'34036',
            name:'expoOther',
            value:data.exposureHistory.expoOther
        };
        exposureHistory_valueobj.push(expsobj);
        dataArr = dataArr.concat(exposureHistory_valueobj);
        //阴道分泌物
        var vaginalSecretion_key = ['34080','34081','34082'],
            vaginalSecretion_value_A = [],vaginalSecretion_value_B = [],
            vaginalSecretion_obj = [];
        data.instrumentCheck.vaginalSecretionExce === 1 ? vaginalSecretion_value_A.push(1):vaginalSecretion_value_B.push('') ;
        data.instrumentCheck.vaginalSecretionTrichomonad === 1 ? vaginalSecretion_value_A.push(2):vaginalSecretion_value_B.push('');
        data.instrumentCheck.vaginalSecretionAlbicans === 1 ? vaginalSecretion_value_A.push(3):vaginalSecretion_value_B.push('');
        data.instrumentCheck.vaginalSecretionOther ? vaginalSecretion_value_A.push(4):vaginalSecretion_value_B.push('');
        var vaginalSecretion_value = vaginalSecretion_value_A.concat(vaginalSecretion_value_B);
        for(var ix = 0;ix<vaginalSecretion_key.length;ix++){
            vaginalSecretion_obj.push({
                key:vaginalSecretion_key[ix],
                name:'vaginalSecretion',
                value:vaginalSecretion_value[ix]
            });
        }
        dataArr = dataArr.concat(vaginalSecretion_obj);
        //保健指导
        var healthGuide_key = ['34095','34096','34097','34098','34099'],healthGuide_valueA = [],healthGuide_valueB = [];
        data.healthGuide.guidLifeStyle === 1 ? healthGuide_valueA.push(1):healthGuide_valueB.push(' ');
        data.healthGuide.guidPsychology === 1 ? healthGuide_valueA.push(2):healthGuide_valueB.push(' ');
        data.healthGuide.guidNutrition === 1 ? healthGuide_valueA.push(3):healthGuide_valueB.push(' ');
        data.healthGuide.guidTeratogenic === 1 ? healthGuide_valueA.push(4):healthGuide_valueB.push(' ');
        data.healthGuide.guidPrenatalScreening === 1 ? healthGuide_valueA.push(5):healthGuide_valueB.push(' ');
        data.healthGuide.guidOtherSelect === 1 ? healthGuide_valueA.push(6):healthGuide_valueB.push(' ');
        var healthGuide_value = healthGuide_valueA.concat(healthGuide_valueB),healthGuide_obj = [];
        for(var ixe = 0;ixe<healthGuide_key.length;ixe++){
            healthGuide_obj.push({
                key:healthGuide_key[ixe],
                name:'healthGuide',
                value:healthGuide_value[ixe]
            });
        }
        healthGuide_obj.push({
            key:'34100',
            name:'healthGuide',
            value:data.healthGuide.guidOther
        });
        dataArr = dataArr.concat(healthGuide_obj);
        return dataArr;
    };
    return formTemplate;
}));