(function(root,factory){
    if(typeof define == 'function' && define.amd){
        define(['lodash'],factory);
    }else if(typeof exports == 'object'){
        module.exports = factory('lodash');
    }else{
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
    function turn_value(str){
        return str == 1 ? 2 : 1;
    }
    function jageStr(str){
        if(str.indexOf('日')== -1){
            return false;
        }else{
            return true;
        }
    }
    function deathRes(num){
        switch(num){
            case 1:
                return 1;
                break;
            case 2:
                return 2;
                break;
            case 3:
                return 3;
                break;
            case 4:
                return 5;
                break;
            case 5:
                return 6;
                break;
            case 6:
                return 4;
                break;
            case 7:
                return 7;
                break;
            case 8:
                return 8;
                break;
        }
    }
    formTemplate.getFormData = function(data){
        var dataArr = [
            {
                key:'32000',
                name:'residentName',
                value:data.residentName
            },
            {
                key:'32001',
                name:'mentvDeathDate',
                value:new Date(data.createDate).getFullYear()
            },
            {
                key:'32002',
                name:'mentvDeathDate',
                value:new Date(data.createDate).getMonth()+1
            },
            {
                key:'32003',
                name:'mentvDeathDate',
                value:new Date(data.createDate).getDate()
            },
            {
                key:'32004',
                name:'mentvLostReason',
                value:data.mentvLostReason
            },
            {
                key:'32005',
                name:'mentvDeathDate',
                value:data.mentvDeathDate ? new Date(data.mentvDeathDate).getFullYear() : ''
            },
            {
                key:'32006',
                name:'mentvDeathDate',
                value:data.mentvDeathDate?new Date(data.mentvDeathDate).getMonth()+1:''
            },
            {
                key:'32007',
                name:'mentvDeathDate',
                value:data.mentvDeathDate?new Date(data.mentvDeathDate).getDate():''
            },
            {
                key:'32008',
                name:'mentvBodyDeath',
                value:deathRes(data.mentvBodyDeath)
            },
            {
                key:'32009',
                name:'mentvDeathReason',
                value:data.mentvDeathReason
            },
            {
                key:'32010',
                name:'mentvDanger',
                value:data.mentvDanger - 1
            },
            {
                key:'32024',
                name:'mentvInsight',
                value:data.mentvInsight
            },
            {
                key:'32025',
                name:'mentvSleepCondition',
                value:data.mentvSleepCondition
            },
            {
                key:'32026',
                name:'mentvDietSituation',
                value:data.mentvDietSituation
            },
            {
                key:'32027',
                name:'mentvPersonalLifestyle',
                value:data.mentvPersonalLifestyle
            },
            {
                key:'32028',
                name:'mentvHousework',
                value:data.mentvHousework
            },
            {
                key:'32029',
                name:'mentvProductWork',
                value:data.mentvProductWork == 1 ? 1 : data.mentvProductWork == 2 ? 2 : data.mentvProductWork == 3 ? 3 : data.mentvProductWork == 4 ? 9 : ''
            },
            {
                key:'32030',
                name:'mentvLearn',
                value:data.mentvLearn
            },
            {
                key:'32031',
                name:'mentvSocialCommun',
                value:data.mentvSocialCommun
            },
            {
                key:'32032',
                name:'dangaMildTrouble',
                value:data.dangerousAct.dangaMildTrouble.toString()
            },
            {
                key:'32033',
                name:'dangaAccident',
                value:data.dangerousAct.dangaAccident.toString()
            },
            {
                key:'32034',
                name:'dangaZhaohuo',
                value:data.dangerousAct.dangaZhaohuo.toString()
            },
            {
                key:'32035',
                name:'dangaOtherHazards',
                value:data.dangerousAct.dangaOtherHazards.toString()
            },
            {
                key:'32036',
                name:'dangaSelfInjury',
                value:data.dangerousAct.dangaSelfInjury.toString()
            },
            {
                key:'32037',
                name:'dangaAttemptedSuicide',
                value:data.dangerousAct.dangaAttemptedSuicide.toString()
            },
            {
                key:'32072',
                name:'dangaFlag',
                value:data.dangerousAct.dangaFlag == 2 ? '√' : ''
            },
            {
                key:'32038',
                name:'mentvLock',
                value:data.mentvLock
            },
            {
                key:'32039',
                name:'mentvHospitalization',
                value:(data.mentvHospitalization - 1+'')
            },
            {
                key:'32040',
                name:'mentvHospitalizationLeave',
                value:data.mentvHospitalization == 3 ? new Date(data.mentvHospitalizationLeave).getFullYear():''
            },
            {
                key:'32041',
                name:'mentvHospitalizationLeave',
                value:data.mentvHospitalization == 3 ? new Date(data.mentvHospitalizationLeave).getMonth()+1 :''
            },
            {
                key:'32042',
                name:'mentvHospitalizationLeave',
                value:data.mentvHospitalization == 3 ? new Date(data.mentvHospitalizationLeave).getDate():''
            },
            {
                key:'32043',
                name:'mentvLabExam',
                value:data.mentvLabExam == 1 ? 2 : data.mentvLabExam == 2 ? 1 : ' '
            },
            {
                key:'32044',
                name:'mentvLabDescribe',
                value:data.mentvLabDescribe
            },
            {
                key:'32045',
                name:'mentvMedicationComp',
                value:data.mentvMedicationComp
            },
            {
                key:'32046',
                name:'mentvDrugReaction',
                value:data.mentvDrugReaction == 1 ? 2 : data.mentvDrugReaction == 2 ? 1 : ' '
            },
            {
                key:'32047',
                name:'mentvDrugDescribe',
                value:data.mentvDrugDescribe
            },
            {
                key:'32048',
                name:'mentvTreatmentEffect',
                value:data.mentvTreatmentEffect
            },
            {
                key:'32049',
                name:'mentvReferralFlag',
                value:data.mentvReferralFlag == 1 ? 2 : data.mentvReferralFlag == 2 ? 1 : ' '
            },
            {
                key:'32050',
                name:'mentvReferralReason',
                value:data.mentvReferralReason
            },
            {
                key:'32051',
                name:'mentvReferralHospital',
                value:data.mentvReferralHospital
            },
            {
                key:'32066',
                name:'mentvClassic',
                value:data.mentvClassic
            },
            {
                key:'32067',
                name:'nextVisitDate',
                value:new Date(data.nextVisitDate).getFullYear()
            },
            {
                key:'32068',
                name:'nextVisitDate',
                value:new Date(data.nextVisitDate).getMonth()+1
            },
            {
                key:'32069',
                name:'nextVisitDate',
                value:new Date(data.nextVisitDate).getDate()
            },
            {
                key:'32070',
                name:'mentvSignDoctor',
                value:data.mentvSignDoctor
            },
            {
                key:'32071',
                name:'mentvStyle',
                value:data.mentvStyle
            }
        ];
        var bodysympots = [];
        var bodySymptomList_key = ['32011','32012','32013','32014','32015','32016','32017','32018','32019','32020','32021','32022'],
            bodySymptomList_valueA = [],bodySymptomList_valueB = [],bodySymptomListObj = [];
        //症状
        for(var i = 0;i<data.bodySymptomList.length;i++){
            switch (data.bodySymptomList[i].symName){
                case 'sym_hallucination':
                    data.bodySymptomList[i].symType === 1 ? bodySymptomList_valueA.push(1):bodySymptomList_valueB.push(' ');
                    break;
                case 'sym_communication_difficulties':
                    data.bodySymptomList[i].symType === 1 ? bodySymptomList_valueA.push(2):bodySymptomList_valueB.push(' ');
                    break;
                case 'sym_suspicion':
                    data.bodySymptomList[i].symType === 1 ? bodySymptomList_valueA.push(3):bodySymptomList_valueB.push(' ');
                    break;
                case 'sym_changing_moods':
                    data.bodySymptomList[i].symType === 1 ? bodySymptomList_valueA.push(4):bodySymptomList_valueB.push(' ');
                    break;
                case 'sym_bizarre_behavior':
                    data.bodySymptomList[i].symType === 1 ? bodySymptomList_valueA.push(5):bodySymptomList_valueB.push(' ');
                    break;
                case 'sym_excited_words':
                    data.bodySymptomList[i].symType === 1 ? bodySymptomList_valueA.push(6):bodySymptomList_valueB.push(' ');
                    break;
                case 'sym_wounding_destruction':
                    data.bodySymptomList[i].symType === 1 ? bodySymptomList_valueA.push(7):bodySymptomList_valueB.push(' ');
                    break;
                case 'sym_worldweary':
                    data.bodySymptomList[i].symType === 1 ? bodySymptomList_valueA.push(8):bodySymptomList_valueB.push(' ');
                    break;
                case 'sym_go_without':
                    data.bodySymptomList[i].symType === 1 ? bodySymptomList_valueA.push(9):bodySymptomList_valueB.push(' ');
                    break;
                case 'sym_from_laughing':
                    data.bodySymptomList[i].symType === 1 ? bodySymptomList_valueA.push(10):bodySymptomList_valueB.push(' ');
                    break;
                case 'sym_unsociable_lazy':
                    data.bodySymptomList[i].symType === 1 ? bodySymptomList_valueA.push(11):bodySymptomList_valueB.push(' ');
                    break;
                case 'sym_other':
                    data.bodySymptomList[i].symDescribe ? bodySymptomList_valueA.push(12):bodySymptomList_valueB.push(' ');
                    bodySymptomListObj.push({
                        key:'32023',
                        name:'sym_other',
                        value:data.bodySymptomList[i].symDescribe
                    });
                    break;
            }

        }
        var bodySymptomList_value = bodySymptomList_valueA.concat(bodySymptomList_valueB);
        for(var index = 0;index < bodySymptomList_key.length;index++){
            bodySymptomListObj.push({
                key:bodySymptomList_key[index],
                name:'bodysymptom',
                value:bodySymptomList_value[index]
            });
        }
        dataArr = dataArr.concat(bodySymptomListObj);
        //用药
        var useMedicationListObj = [];
        var arr_key_medication = ['32052','32055','32058'],arr_key_use = ['32053','32056','32059'],arr_key_dose = ['32054','32057','32060'],
            arr_key_rate_day = ['32072','32074','32076'],arr_key_rate_mon = ['32073','32075','32077'];
        for(var idx = 0;idx<arr_key_medication.length;idx++){
            var medication = {
                key:arr_key_medication[idx],
                name:'medication',
                value:data.useMedicationList[idx] ? data.useMedicationList[idx].medDrugName : ''
            };
            var usemethod = {
                key:arr_key_use[idx],
                name:'method',
                value:data.useMedicationList[idx] ? data.useMedicationList[idx].medUsage : ''
            };
            var dose = {
                key:arr_key_dose[idx],
                name:'dose',
                value:data.useMedicationList[idx] ? data.useMedicationList[idx].medConsumption : ''
            };
            var rate_day = {
                key:arr_key_rate_day[idx],
                name:'medicationrate',
                value:data.useMedicationList[idx] ? jageStr(data.useMedicationList[idx].medDrupRate) ? '' : '---' : ''
            };
            var rate_mon = {
                key:arr_key_rate_mon[idx],
                name:'medicationrate',
                value:data.useMedicationList[idx] ? jageStr(data.useMedicationList[idx].medDrupRate) ? '---' : '' : ''
            };
            useMedicationListObj.push(medication);
            useMedicationListObj.push(usemethod);
            useMedicationListObj.push(dose);
            useMedicationListObj.push(rate_day);
            useMedicationListObj.push(rate_mon)
        }
        //康复措施
        var mentv_key = ['32061','32062','32063','32064'],mentv_valueA = [],mentv_valueB = [],metv_valueObj = [];
        data.mentvLivingAbility === 1 ? mentv_valueA.push(1):mentv_valueB.push(' ');
        data.mentvVocationalTraining === 1 ? mentv_valueA.push(2):mentv_valueB.push(' ');
        data.mentvLearningAbility === 1 ? mentv_valueA.push(3):mentv_valueB.push(' ');
        data.mentvSocialCommunication === 1 ? mentv_valueA.push(4):mentv_valueB.push(' ');
        data.mentvRecoveryDescribe ? mentv_valueA.push(5):mentv_valueB.push(' ');
        var metv_value = mentv_valueA.concat(mentv_valueB);
        for(var indx = 0;indx < mentv_key.length;indx ++){
            metv_valueObj.push({
                key:mentv_key[indx],
                name:'mentv',
                value:metv_value[indx]
            });
        }
        dataArr.push({
            key:'32065',
            name:'mentvRecoveryDescribe',
            value:data.mentvRecoveryDescribe
        });
        dataArr = dataArr.concat(bodysympots,useMedicationListObj,metv_valueObj);
        return dataArr;
    };
    return formTemplate;
}));